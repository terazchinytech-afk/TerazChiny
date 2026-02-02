import { defineField, defineType } from "sanity";
import { Calendar, LayoutTemplate, Search, Filter } from "lucide-react";

export const calendarPage = defineType({
  name: "calendarPage",
  title: "Strona Kalendarz",
  type: "document",
  icon: Calendar,
  groups: [
    { name: "hero", title: "Hero (Nagłówek)", icon: LayoutTemplate },
    { name: "filter", title: "Karta Filtrowania", icon: Filter },
    { name: "seo", title: "SEO / Meta", icon: Search },
  ],
  fields: [
    // --- 1. SEKCJA HERO ---
    defineField({
      name: "heroSection",
      title: "Sekcja Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "titlePart1",
          title: "Nagłówek - Linia 1",
          type: "string",
          initialValue: "Stwórz",
        }),
        defineField({
          name: "titleHighlight",
          title: "Wyróżnienie (Czerwone)",
          type: "string",
          initialValue: "wspomnienia",
        }),
        defineField({
          name: "titlePart2",
          title: "Nagłówek - Linia 2",
          type: "string",
          initialValue: "na całe życie",
        }),
        defineField({
          name: "description",
          title: "Opis",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "heroImage",
          title: "Zdjęcie w tle",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // --- 2. SEKCJA KARTY FILTRÓW ---
    // USUNĄŁEM pole 'regions' - reszta tekstów zostaje, bo warto je móc edytować
    defineField({
      name: "filterSection",
      title: "Teksty na Karcie Wyszukiwania",
      type: "object",
      group: "filter",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Karty",
          type: "string",
          initialValue: "Znajdź swoją wyprawę",
        }),
        defineField({
          name: "subtitle",
          title: "Podtytuł Karty",
          type: "string",
          initialValue: "Zaplanuj przygodę życia",
        }),
        defineField({
          name: "locationLabel",
          title: "Etykieta 'Lokalizacja'",
          type: "string",
          initialValue: "Gdzie jedziemy?",
        }),
        defineField({
          name: "dateLabel",
          title: "Etykieta 'Data'",
          type: "string",
          initialValue: "Kiedy?",
        }),
        defineField({
          name: "buttonText",
          title: "Tekst Przycisku",
          type: "string",
          initialValue: "Szukaj Wyprawy",
        }),
      ],
    }),

    // --- 3. SEO ---
    defineField({
      name: "seo",
      title: "Ustawienia SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
        }),
        defineField({
          name: "keywords",
          title: "Słowa kluczowe",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({ name: "ogImage", title: "Social Image", type: "image" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ustawienia Strony Kalendarz" };
    },
  },
});
