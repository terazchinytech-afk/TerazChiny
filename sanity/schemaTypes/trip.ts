import { defineField, defineType } from "sanity";
import { Plane, HelpCircle } from "lucide-react";

export const trip = defineType({
  name: "trip",
  title: "Wyprawy",
  type: "document",
  icon: Plane,
  groups: [
    { name: "basic", title: "Podstawowe" },
    { name: "details", title: "Szczegóły wyprawy" },
    { name: "content", title: "Treść strony" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nazwa Wyprawy",
      type: "string",
      group: "basic",
      validation: (Rule) =>
        Rule.required().error("Nazwa wyprawy jest wymagana"),
    }),
    defineField({
      name: "slug",
      title: "Slug (Adres URL)",
      type: "slug",
      group: "basic",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status dostępności",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Dostępne (Zielony)", value: "available" },
          { title: "Ostatnie miejsca (Żółty)", value: "last_spots" },
          { title: "Wyprzedane (Szary)", value: "sold_out" },
        ],
        layout: "radio",
      },
      initialValue: "available",
    }),

    defineField({
      name: "date",
      title: "Data Rozpoczęcia",
      type: "date",
      group: "details",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Czas trwania",
      type: "string",
      group: "details",
      initialValue: "14 dni",
    }),
    defineField({
      name: "location",
      title: "Region (Lokalizacja)",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Cena",
      type: "string",
      group: "details",
      description: "Np. '12 900 PLN + 1500 USD'",
    }),
    defineField({
      name: "groupSize",
      title: "Wielkość grupy",
      type: "string",
      group: "details",
      initialValue: "Max 12 osób",
      description: "Wyświetlane w gridzie szczegółów",
    }),
    defineField({
      name: "bookingUrl",
      title: "Link do rezerwacji",
      type: "url",
      group: "details",
      description:
        "Zewnętrzny link do formularza rezerwacji (np. Typeform, Google Forms). Jeśli zostawisz puste, przycisk może prowadzić do strony kontaktu.",
    }),

    defineField({
      name: "mainImage",
      title: "Zdjęcie Główne",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt tekst" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Krótki opis (na kartę)",
      type: "text",
      group: "content",
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "content",
      title: "Pełny opis wyprawy",
      type: "array",
      group: "content",
      description:
        "Główna treść strony (możesz używać nagłówków, pogrubień itp.)",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normalny", value: "normal" },
            { title: "Nagłówek H2", value: "h2" },
            { title: "Nagłówek H3", value: "h3" },
          ],
          lists: [{ title: "Lista", value: "bullet" }],
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Atuty wyprawy (Checklist)",
      type: "array",
      group: "content",
      description: "Te elementy z ikonką 'check' pod opisem",
      of: [{ type: "string" }],
      initialValue: ["Polski pilot", "Małe grupy", "Hotele 4*"],
    }),

    // --- GRUPA: FAQ ---
    defineField({
      name: "faq",
      title: "Najczęściej zadawane pytania (FAQ)",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          icon: HelpCircle,
          fields: [
            defineField({ name: "question", title: "Pytanie", type: "string" }),
            defineField({ name: "answer", title: "Odpowiedź", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Tytuł SEO (Meta Title)",
      type: "string",
      group: "seo",
      description:
        "Tytuł wyświetlany w Google. Jeśli puste, system użyje 'Nazwa Wyprawy | Teraz Chiny'.",
      validation: (Rule) =>
        Rule.max(60).warning(
          "Tytuł powyżej 60 znaków może zostać ucięty w Google.",
        ),
    }),
    defineField({
      name: "seoDescription",
      title: "Opis SEO (Meta Description)",
      type: "text",
      group: "seo",
      rows: 3,
      description:
        "Krótki opis do Google. Jeśli puste, system użyje krótkiego opisu z karty wyprawy.",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Opis powyżej 160 znaków może zostać ucięty w Google.",
        ),
    }),
    defineField({
      name: "seoKeywords",
      title: "Słowa kluczowe (opcjonalnie)",
      type: "string",
      group: "seo",
      description:
        "Oddzielone przecinkami (np. wycieczka chiny, syczuan 2026).",
    }),
    defineField({
      name: "ogImage",
      title: "Grafika udostępniania (Open Graph Image)",
      type: "image",
      group: "seo",
      description:
        "Obraz widoczny po wklejeniu linku na FB/IG. Jeśli puste, system użyje zdjęcia głównego.",
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: "title",
      date: "date",
      media: "mainImage",
      status: "status",
    },
    prepare(selection) {
      const { title, date, media, status } = selection;
      const statusIcons = {
        available: "🟢",
        last_spots: "🟡",
        sold_out: "⚫",
      };
      const icon = statusIcons[status as keyof typeof statusIcons] || "⚪";
      return {
        title: title,
        subtitle: `${icon} ${date || "Brak daty"}`,
        media: media,
      };
    },
  },
});
