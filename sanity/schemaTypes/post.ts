import { defineField, defineType } from "sanity";
import { BookText } from "lucide-react";
import { WebPCompressor } from "../components/WebPCompressor"; // <--- IMPORT

export const post = defineType({
  name: "post",
  title: "Artykuły",
  type: "document",
  icon: BookText,
  groups: [
    { name: "content", title: "Treść" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tytuł artykułu",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "publishedAt",
      title: "Data Publikacji",
      type: "datetime",
      group: "content",
    }),

    // --- ZDJĘCIE GŁÓWNE (Inline - bez przycisku Zatwierdź) ---
    defineField({
      name: "mainImage",
      title: "Zdjęcie główne",
      type: "image",
      group: "content",
      options: {
        hotspot: false, // Wyłączamy kadrowanie
        // @ts-expect-error - custom option
        hideModalUI: true, // Ukrywamy przycisk "Zatwierdź" (tryb inline)
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Tekst alternatywny (Alt)",
          validation: (Rule) => Rule.required(),
        }),
      ],
      components: {
        input: WebPCompressor,
      },
    }),

    defineField({
      name: "excerpt",
      title: "Krótki opis (Wstęp)",
      description: "Ten opis będzie również służył jako Meta Opis w Google.",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "readingTime",
      title: "Czas czytania",
      type: "string",
      group: "content",
    }),

    // --- TREŚĆ ARTYKUŁU (Portable Text) ---
    defineField({
      name: "body",
      title: "Treść artykułu",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        // Zdjęcie wewnątrz tekstu (Modal - z przyciskiem Zatwierdź)
        {
          type: "image",
          options: {
            hotspot: false,

            forceModalUI: true, // Wymuszamy przycisk "Zatwierdź" (bo to pop-up)
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Tekst alternatywny (Alt)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Podpis pod zdjęciem",
            },
          ],
          components: {
            input: WebPCompressor,
          },
        },
      ],
    }),

    defineField({
      name: "keywords",
      title: "Słowa kluczowe (SEO Tags)",
      type: "array",
      group: "seo",
      description: "Dodaj tagi pomocnicze dla wyszukiwarek.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
