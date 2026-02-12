/* eslint-disable @typescript-eslint/no-explicit-any */
/* Section: MultiGalleryPicker Component */
import React, { useState, useEffect } from "react";
import {
  ArrayOfObjectsInputProps,
  PatchEvent,
  insert,
  unset,
  useClient,
} from "sanity";
import { Loader2, CheckCircle2, Search, AlertCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type GalleryItem = {
  yearId: string;
  yearTitle: string;
  imageKey: string;
  url: string;
  alt: string;
  fullRef: string;
};

export const MultiGalleryPicker = (props: ArrayOfObjectsInputProps) => {
  const { value = [], onChange } = props;
  const client = useClient({ apiVersion: "2024-01-01" });

  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(`
          *[_type == "galleryYear"] | order(year desc) {
            "yearId": _id,
            "yearTitle": year,
            images[] {
              "imageKey": _key,
              "url": asset->url,
              alt
            }
          }
        `);

        const flatList: GalleryItem[] = [];
        data.forEach((doc: any) => {
          if (doc.images && Array.isArray(doc.images)) {
            doc.images.forEach((img: any) => {
              flatList.push({
                yearId: doc.yearId,
                yearTitle: doc.yearTitle,
                imageKey: img.imageKey,
                url: img.url,
                alt: img.alt || "Bez opisu",
                fullRef: `${doc.yearId}::${img.imageKey}`,
              });
            });
          }
        });
        setAllItems(flatList);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [client]);

  const handleToggle = (item: GalleryItem) => {
    const currentIndex = value.findIndex(
      (v: any) => v.reference === item.fullRef,
    );

    if (currentIndex >= 0) {
      // USUWANIE: Zawsze pozwalamy usunąć już wybrane zdjęcie
      onChange(PatchEvent.from(unset([currentIndex])));
    } else {
      // DODAWANIE: Sprawdzamy limit przed dodaniem
      if (value.length >= 9) {
        // Jeśli mamy już 9 zdjęć, nie robimy nic
        return;
      }

      const newItem = {
        _type: "galleryImageWrapper",
        _key: uuidv4(),
        reference: item.fullRef,
        tag: item.yearTitle,
      };
      onChange(PatchEvent.from(insert([newItem], "after", [-1])));
    }
  };

  const filteredItems = allItems.filter(
    (item) =>
      item.yearTitle.includes(searchTerm) ||
      (item.alt && item.alt.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading)
    return (
      <div className="p-4 flex gap-2">
        <Loader2 className="animate-spin" /> Ładowanie galerii...
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold text-white">
            Wybrano zdjęć:{" "}
            <span
              className={`${value.length === 9 ? "text-green-500" : "text-orange-500"} text-lg`}
            >
              {value.length}
            </span>{" "}
            / 9
          </div>
          <div className="relative w-1/2">
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Filtruj rok..."
              className="w-full bg-black/40 border border-gray-600 rounded py-1 pl-8 text-sm text-white outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Informacje o limitach */}
        {value.length < 9 ? (
          <p className="text-xs text-orange-400 animate-pulse font-bold flex items-center gap-1">
            <AlertCircle size={12} /> Brakuje jeszcze {9 - value.length} zdjęć
            do limitu.
          </p>
        ) : (
          <p className="text-xs text-green-500 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> Osiągnięto limit 9 zdjęć. Odznacz coś,
            aby zmienić wybór.
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-[500px] overflow-y-auto p-2 bg-black/20 rounded border border-white/5">
        {filteredItems.map((item) => {
          const isSelected = value.some(
            (v: any) => v.reference === item.fullRef,
          );

          // Sprawdzamy czy przycisk powinien być wizualnie zablokowany (jeśli nie jest wybrany i mamy już 9)
          const isLimitReached = value.length >= 9 && !isSelected;

          return (
            <div
              key={item.fullRef}
              onClick={() => handleToggle(item)}
              className={`group relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
                isSelected
                  ? "border-green-500 scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer"
                  : isLimitReached
                    ? "border-transparent opacity-30 cursor-not-allowed"
                    : "border-transparent opacity-70 hover:opacity-100 cursor-pointer"
              }`}
            >
              <img
                src={item.url}
                loading="lazy"
                className="w-full h-full object-cover"
                alt={item.alt}
              />
              <div className="absolute bottom-0 right-0 bg-black/80 text-[9px] text-white px-1.5 py-0.5 rounded-tl">
                {item.yearTitle}
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="text-white" size={24} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
