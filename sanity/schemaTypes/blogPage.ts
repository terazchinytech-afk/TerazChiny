import { defineField, defineType } from "sanity";
import { Search } from "lucide-react";

export const blogPage = defineType({
  name: "blogPage",
  title: "Ustawienia Strony Bloga",
  type: "document",
  icon: Search,
  fields: [
    defineField({
      name: "seo",
      title: "Ustawienia SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Tytuł Strony (Meta Title)",
          type: "string",
          description:
            "Tytuł widoczny w wyszukiwarce. Zalecane: Blog | Teraz Chiny",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Opis Strony (Meta Description)",
          type: "text",
          rows: 3,
          description: "Krótki opis listy artykułów dla Google.",
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "keywords",
          title: "Słowa kluczowe (SEO Tags)",
          type: "array",
          description: "Dodaj tagi opisujące Twój blog.",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        }),
        defineField({
          name: "ogImage",
          title: "Obrazek Udostępniania",
          type: "image",
          description:
            "Zdjęcie widoczne przy wklejaniu linku do bloga na FB/IG.",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "seo.metaTitle",
    },
    prepare({ title }) {
      return {
        title: "Konfiguracja SEO: Blog",
        subtitle: title || "Brak ustawionego tytułu meta",
      };
    },
  },
});
