import { defineField, defineType } from "sanity";
import { BookText } from "lucide-react";

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
    // --- GRUPA: TREŚĆ ---
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
    defineField({
      name: "mainImage",
      title: "Zdjęcie główne",
      type: "image",
      group: "content",
      options: { hotspot: true },
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
    defineField({
      name: "body",
      title: "Treść artykułu",
      type: "array",
      group: "content",
      of: [{ type: "block" }, { type: "image" }],
    }),

    // --- GRUPA: SEO (Tylko Tagi) ---
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
