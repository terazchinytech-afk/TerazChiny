import { defineField, defineType } from "sanity";
import { Calendar } from "lucide-react";
// 1. Importujemy Twój komponent
import { WebPCompressor } from "../components/WebPCompressor";

export const galleryYear = defineType({
  name: "galleryYear",
  title: "Galeria Roczna",
  type: "document",
  icon: Calendar,
  fields: [
    defineField({
      name: "year",
      title: "Rok",
      type: "string",
      placeholder: "Np. 2025",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Zdjęcia w tym roku",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          // 2. TUTAJ PODMIENIAMY KOMPONENT
          components: {
            input: WebPCompressor,
          },
          fields: [
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Tekst alternatywny",
              type: "string",
            }),
            defineField({
              name: "date",
              title: "Dokładna data",
              type: "date",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "year",
      media: "images.0.asset",
      images: "images",
    },
    prepare({ title, media, images }) {
      return {
        title: title || "Nowy",
        subtitle: images ? `${images.length} zdjęć` : "Brak zdjęć",
        media: media,
      };
    },
  },
});
