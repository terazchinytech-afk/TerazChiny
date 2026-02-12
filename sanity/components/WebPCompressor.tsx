import React, { useRef, useState } from "react";
import { useClient, PatchEvent, set, unset } from "sanity";
import { ObjectInputProps } from "sanity";
import imageCompression from "browser-image-compression";
import { UploadCloud, Loader2, X, RefreshCw } from "lucide-react";

// Prosta funkcja do generowania losowego klucza (rozwiązuje błąd "Missing Keys")
const randomKey = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const WebPCompressor = (props: ObjectInputProps) => {
  const { onChange, value, renderDefault } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1920,
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

      // 3. Patch z dodaniem _key (NAPRAWA BŁĘDU)
      // Jeśli edytujemy istniejący obiekt, zachowujemy jego stary _key.
      // Jeśli to nowy obiekt, generujemy nowy _key.
      const newKey = value?._key || randomKey();

      const patch = set({
        _type: "image",
        _key: newKey, // Tutaj naprawiamy błąd "Brakujące klucze"
        asset: {
          _type: "reference",
          _ref: assetDocument._id,
        },
      });

      onChange(PatchEvent.from(patch));
    } catch (error) {
      console.error("Błąd:", error);
      alert("Błąd podczas kompresji.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    // Czyścimy wszystko, ale zachowujemy _key jeśli chcemy edytować ten sam element tablicy,
    // albo po prostu unset() jeśli chcemy usunąć zawartość pola.
    // W przypadku pól typu Object wewnątrz Array, unset() wyczyści pola, ale zostawi "pusty" obiekt.
    // Aby usunąć zdjęcie i pozwolić wgrać nowe, najlepiej ustawić asset na undefined.
    onChange(PatchEvent.from(unset(["asset"])));
  };

  // --- LOGIKA WYŚWIETLANIA ---

  // SCENARIUSZ 1: ZDJĘCIE JEST WGRANE
  // Pokazujemy standardowy podgląd Sanity (żebyś miał dostęp do pól Alt, Date i Hotspotu)
  if (value?.asset) {
    return (
      <div className="relative p-2 border border-gray-800 rounded-lg bg-black/20">
        {/* Renderujemy domyślny interfejs Sanity (Pola + Podgląd) */}
        {renderDefault(props)}

        {/* Przycisk do podmiany zdjęcia */}
        <div className="mt-4 border-t border-gray-700 pt-2 flex justify-end">
          <button
            onClick={handleRemove}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors py-2 px-3 hover:bg-red-900/20 rounded-md"
          >
            <RefreshCw size={14} /> Wymień zdjęcie (Prześlij nowe WebP)
          </button>
        </div>
      </div>
    );
  }

  // SCENARIUSZ 2: BRAK ZDJĘCIA (Czysty start)
  // NIE renderujemy renderDefault(). Dzięki temu nie ma standardowego uploadera.
  // Jest tylko Twój przycisk.
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
        className="w-full h-64 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-600 bg-gray-900/30 rounded-xl hover:border-[#b32a2e] hover:bg-[#b32a2e]/5 transition-all cursor-pointer group relative overflow-hidden"
      >
        {isLoading ? (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 size={48} className="text-[#b32a2e] animate-spin mb-4" />
            <p className="text-sm text-gray-300 font-medium">
              Kompresja do WebP...
            </p>
            <p className="text-xs text-gray-500">To może chwilę potrwać</p>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-[#b32a2e]/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#b32a2e]/20 transition-all duration-300">
              <UploadCloud size={40} className="text-[#b32a2e]" />
            </div>
            <div className="text-center px-4">
              <h3 className="font-bold text-xl text-gray-200 mb-1">
                Dodaj zdjęcie
              </h3>
              <p className="text-xs text-gray-400">
                Kliknij, aby wybrać plik. System automatycznie:
                <br />
                <span className="text-green-500 font-bold">
                  • Skonwertuje do WebP
                </span>
                <br />
                <span className="text-green-500 font-bold">
                  • Zmniejszy wagę (&lt;600KB)
                </span>
              </p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};
