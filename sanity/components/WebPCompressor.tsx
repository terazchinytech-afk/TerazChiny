import React, { useRef, useState } from "react";
import { useClient, PatchEvent, set, unset } from "sanity";
import { ObjectInputProps } from "sanity";
import imageCompression from "browser-image-compression";
import { UploadCloud, Loader2, RefreshCw, CheckCircle2 } from "lucide-react";

const randomKey = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const WebPCompressor = (props: ObjectInputProps) => {
  // Bierzemy schemaType, aby odczytać opcje zdefiniowane w trip.ts
  const { onChange, value, renderDefault, schemaType } = props;

  const client = useClient({ apiVersion: "2024-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIKA SPECJALNA ---
  // Sprawdzamy, czy w schemacie (np. w trip.ts -> gallery) dodaliśmy opcję forceModalUI: true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showSubmitButton = (schemaType.options as any)?.forceModalUI === true;

  // Funkcja zamykająca modal (symulacja wciśnięcia ESC)
  const handleClose = () => {
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(escapeEvent);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    // --- KONFIGURACJA KOMPRESJI ---
    const options = {
      maxSizeMB: 0.6, // Max 600KB
      maxWidthOrHeight: 1920, // Max szerokość/wysokość FullHD
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      // 1. Kompresja
      const compressedFile = await imageCompression(file, options);

      // 2. Upload do Sanity
      const assetDocument = await client.assets.upload(
        "image",
        compressedFile,
        {
          contentType: "image/webp",
          filename: file.name.replace(/\.[^/.]+$/, "") + ".webp",
        },
      );

      // 3. Ustawienie wartości w polu
      const newKey = value?._key || randomKey();
      const patch = set({
        _type: "image",
        _key: newKey,
        asset: {
          _type: "reference",
          _ref: assetDocument._id,
        },
      });

      onChange(PatchEvent.from(patch));
    } catch (error) {
      console.error("Błąd:", error);
      alert("Błąd podczas kompresji lub uploadu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onChange(PatchEvent.from(unset(["asset"])));
  };

  // --- WIDOK 1: ZDJĘCIE JEST WGRANE ---
  if (value?.asset) {
    return (
      <div className="relative p-3 border border-gray-800 rounded-lg bg-black/20">
        {/* renderDefault wyświetli obrazek ORAZ pole ALT */}
        <div className="mb-3">{renderDefault(props)}</div>

        {/* Kontener na przyciski */}
        <div className="flex gap-3">
          {/* Przycisk WYMIEŃ - zawsze widoczny */}
          <button
            onClick={handleRemove}
            className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-red-400 border border-red-900/50 hover:bg-red-900/20 py-2 px-4 rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw size={14} />
            Wymień zdjęcie
          </button>

          {/* Przycisk ZATWIERDŹ - tylko jeśli forceModalUI: true */}
          {showSubmitButton && (
            <button
              onClick={handleClose}
              className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-white/50 border  py-2 px-4 rounded-md transition-colors shadow-sm cursor-pointer"
            >
              <CheckCircle2 size={16} />
              Zatwierdź
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- WIDOK 2: BRAK ZDJĘCIA (Upload Button) ---
  return (
    <div className="w-full">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className="w-full h-48 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-700 bg-gray-900/30 rounded-xl hover:border-[#b32a2e] hover:bg-[#b32a2e]/5 transition-all cursor-pointer group relative overflow-hidden"
      >
        {isLoading ? (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 size={32} className="text-[#b32a2e] animate-spin mb-2" />
            <p className="text-sm text-gray-300 font-medium">
              Kompresja WebP...
            </p>
          </div>
        ) : (
          <>
            <UploadCloud
              size={32}
              className="text-gray-500 group-hover:text-[#b32a2e] transition-colors"
            />
            <div className="text-center px-4">
              <p className="text-sm text-gray-300 font-medium">
                Kliknij, aby dodać zdjęcie
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                Auto WebP
              </p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};
