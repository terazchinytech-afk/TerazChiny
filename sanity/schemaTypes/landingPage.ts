import { defineField, defineType } from "sanity";
import {
  Home,
  Info,
  Calendar,
  BookOpen,
  HelpCircle,
  Phone,
  LayoutTemplate,
  Image as ImageIcon,
  MapPin,
  Globe,
  Users,
  MessageSquare,
  Anchor,
  Search,
} from "lucide-react";

export const landingPage = defineType({
  name: "landingPage",
  title: "Strona Główna (Landing)",
  type: "document",
  icon: Home,
  // Dzielimy panel na zakładki, żeby nie było "ściany" pól
  groups: [
    { name: "hero", title: "Hero (Slider)", icon: LayoutTemplate },
    { name: "about", title: "O Nas", icon: Info },
    { name: "calendar", title: "Kalendarz", icon: Calendar },
    { name: "testimonials", title: "Opinie", icon: MessageSquare },
    { name: "blog", title: "Blog", icon: BookOpen },
    { name: "faq", title: "FAQ", icon: HelpCircle },
    { name: "contact", title: "Kontakt", icon: Phone },
    { name: "footer", title: "Stopka", icon: Anchor },
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
          name: "mainTitle",
          title: "Tytuł Główny",
          type: "string",
          initialValue: "chiny",
        }),
        defineField({
          name: "mainDescription",
          title: "Główny Opis",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ctaLabel",
          title: "Tekst Przycisku",
          type: "string",
          initialValue: "Sprawdź terminy",
        }),
      ],
    }),

    // --- 2. SEKCJA O NAS ---
    defineField({
      name: "aboutSection",
      title: "Sekcja O Nas",
      type: "object",
      group: "about",
      fields: [
        defineField({
          name: "sectionTag",
          title: "Tag Sekcji",
          type: "string",
          initialValue: "O Nas",
        }),
        defineField({
          name: "title",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "fullText",
              title: "Pełny tekst nagłówka",
              type: "string",
              description: "Np. 'Nie jesteśmy zwykłym biurem podróży.'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "highlight",
              title: "Fragment do wyróżnienia",
              type: "string",
              description: "Np. 'biurem podróży.'",
            }),
          ],
        }),
        defineField({
          name: "description",
          title: "Opis",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "images",
          title: "Zdjęcia",
          type: "object",
          fields: [
            defineField({
              name: "mainImage",
              title: "Zdjęcie Główne",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "secondaryImage",
              title: "Zdjęcie Małe",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
        defineField({
          name: "statistics",
          title: "Statystyki",
          type: "array",

          // --- TUTAJ JEST OGRANICZENIE ---
          validation: (Rule) =>
            Rule.max(3).error("Możesz dodać maksymalnie 3 karty statystyk."),
          // -------------------------------
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Etykieta",
                  type: "string",
                }),
                defineField({
                  name: "value",
                  title: "Wartość",
                  type: "string",
                }),
                defineField({
                  name: "iconType",
                  title: "Ikona",
                  type: "string",
                  options: {
                    list: [
                      { title: "Kula Ziemska (Globe)", value: "Globe" },
                      { title: "Mapa (Map)", value: "Map" },
                      { title: "Ludzie (Users)", value: "Users" },
                    ],
                  },
                }),
              ],
              preview: {
                select: { title: "label", subtitle: "value" },
              },
            },
          ],
        }),
      ],
    }),

    // --- 3. SEKCJA KALENDARZ ---
    defineField({
      name: "calendarSection",
      title: "Sekcja Kalendarz",
      type: "object",
      group: "calendar",
      fields: [
        defineField({
          name: "header",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "badge",
              title: "Badge (np. Sezon)",
              type: "string",
            }),
            // --- ZMIANA: NOWY SPOSÓB NA TYTUŁ ---
            defineField({
              name: "title",
              title: "Tytuł Sekcji",
              type: "object",
              fields: [
                defineField({
                  name: "fullText",
                  title: "Pełny tekst nagłówka",
                  type: "string",
                  description: "Np. 'Rezerwuj miejsce w przygodzie.'",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "highlight",
                  title: "Fragment do wyróżnienia",
                  type: "string",
                  description: "Np. 'przygodzie.'",
                }),
              ],
            }),
            // ------------------------------------
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "ctaText",
              title: "Tekst Przycisku",
              type: "string",
            }),
          ],
        }),

        defineField({
          name: "tripsSettings",
          title: "Ustawienia Wypraw",
          type: "object",
          fields: [
            defineField({
              name: "mode",
              title: "Tryb Wyświetlania",
              type: "string",
              options: {
                list: [
                  { title: "Wybór Ręczny", value: "manual_selection" },
                  {
                    title: "Automatycznie (Najbliższe)",
                    value: "automatic_nearest",
                  },
                ],
              },
              initialValue: "manual_selection",
            }),
            defineField({
              name: "selectedTrips",
              title: "Wybierz Wyprawy",
              type: "array",
              of: [{ type: "reference", to: [{ type: "trip" }] }],
              hidden: ({ parent }) => parent?.mode !== "manual_selection",
            }),
          ],
        }),
      ],
    }),
    // --- SEKCJA OPINIE (TESTIMONIALS) ---
    defineField({
      name: "testimonialsSection",
      title: "Sekcja Opinie",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({
          name: "header",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "fullText",
              title: "Pełny tekst nagłówka",
              type: "string",
              initialValue: "Głosy z Wyprawy",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "highlight",
              title: "Fragment do wyróżnienia",
              type: "string",
              initialValue: "Wyprawy",
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 2,
              initialValue:
                "Nasi podróżnicy to serce każdej przygody. Poznaj ich historie zapisane we wspomnieniach.",
            }),
          ],
        }),

        // Tutaj wybieramy opinie z bazy danych
        defineField({
          name: "selectedReviews",
          title: "Wybierz Opinie",
          description:
            "Wybierz opinie, które mają pojawić się w karuzeli. Jeśli nic nie wybierzesz, system automatycznie pobierze najnowsze.",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "review" }], // Odwołujemy się do schematu 'review.ts'
            },
          ],
        }),
      ],
    }),
    // --- 4. SEKCJA BLOG ---
    defineField({
      name: "blogSection",
      title: "Sekcja Blog",
      type: "object",
      group: "blog",
      fields: [
        defineField({
          name: "header",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "subtitle",
              title: "Podtytuł",
              type: "string",
            }),
            defineField({
              name: "fullText",
              title: "Pełny tekst nagłówka",
              type: "string",
              description: "Np. 'Ostatnie Historie z Chin'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "highlight",
              title: "Fragment do wyróżnienia (Kolor)",
              type: "string",
              description:
                "Wpisz dokładnie to słowo lub frazę, która ma być złota. Np. 'Historie'",
            }),
          ],
        }),
        defineField({
          name: "ctaText",
          title: "Tekst Przycisku",
          type: "string",
        }),
      ],
    }),

    // --- 5. SEKCJA FAQ ---
    defineField({
      name: "faqSection",
      title: "Sekcja FAQ",
      type: "object",
      group: "faq",
      fields: [
        defineField({
          name: "header",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "badge",
              title: "Badge",
              type: "string",
              description:
                "Mały teskt obok złotej lini opisujący czym jest sekcja",
            }),
            defineField({
              name: "mainText",
              title: "Tekst Główny",
              type: "string",
            }),
            defineField({
              name: "highlightedText",
              title: "Tekst Wyróżniony",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "contactCtaText",
          title: "Tekst kontaktu",
          type: "string",
        }),

        defineField({
          name: "items",
          title: "Pytania i Odpowiedzi",
          type: "array",
          of: [
            {
              type: "object",
              icon: HelpCircle,
              fields: [
                defineField({
                  name: "question",
                  title: "Pytanie",
                  type: "string",
                }),
                defineField({
                  name: "answer",
                  title: "Odpowiedź",
                  type: "text",
                  rows: 3,
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // --- 6. SEKCJA KONTAKT ---
    defineField({
      name: "contactSection",
      title: "Sekcja Kontakt",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "heroImage",
          title: "Zdjęcie Główne",
          type: "image",
          options: { hotspot: true },
        }),

        // --- ZMIANA: NOWY STANDARD TYTUŁU ---
        defineField({
          name: "headline",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "fullText",
              title: "Pełny tekst nagłówka",
              type: "string",
              description: "Np. 'Porozmawiajmy o Twojej podróży'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "highlight",
              title: "Fragment do wyróżnienia",
              type: "string",
              description: "Np. 'podróży'",
            }),
          ],
        }),
        // ------------------------------------

        defineField({
          name: "description",
          title: "Opis",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "contactCard",
          title: "Wizytówka",
          type: "object",
          fields: [
            defineField({
              name: "cardLogo",
              title: "Logo na karcie",
              type: "image",
            }),
            defineField({ name: "email", title: "Email", type: "string" }),
            defineField({ name: "phone", title: "Telefon", type: "string" }),
            defineField({
              name: "workingHours",
              title: "Godziny pracy",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Ustawienia Stopki",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "socials",
          title: "Social Media",
          type: "object",
          fields: [
            defineField({
              name: "facebook",
              title: "Facebook URL",
              type: "url",
            }),
            defineField({
              name: "instagram",
              title: "Instagram URL",
              type: "url",
            }),
          ],
        }),
        defineField({
          name: "contactInfo",
          title: "Dane kontaktowe w stopce",
          type: "object",
          fields: [
            defineField({
              name: "email",
              title: "Email",
              type: "string",
              initialValue: "kontakt@terazchiny.pl",
            }),
            defineField({
              name: "phone",
              title: "Telefon",
              type: "string",
              initialValue: "+48 123 456 789",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Ustawienia SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Tytuł Strony (Meta Title)",
          type: "string",
          description:
            "Tytuł widoczny w pasku przeglądarki i w Google. Max 60 znaków.",
          validation: (Rule) =>
            Rule.max(60).warning("Tytuł może być ucięty w Google."),
        }),
        defineField({
          name: "metaDescription",
          title: "Opis Strony (Meta Description)",
          type: "text",
          rows: 3,
          description: "Krótki opis pod linkiem w Google. Max 160 znaków.",
          validation: (Rule) =>
            Rule.max(160).warning("Opis może być ucięty w Google."),
        }),
        defineField({
          name: "keywords",
          title: "Słowa kluczowe",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Wpisz słowa kluczowe i naciśnij Enter. Np. 'wycieczki do Chin', 'wakacje azja'",
        }),
        defineField({
          name: "ogImage",
          title: "Obrazek Udostępniania (Social Media)",
          type: "image",
          description:
            "Obrazek widoczny po wklejeniu linku na FB/LinkedIn. Zalecane 1200x630px.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      // Pobieramy tytuł z sekcji Hero, żeby wyświetlić go jako ciekawostkę w podtytule
      title: "heroSection.mainTitle",
    },
    prepare({ title }) {
      return {
        // GŁÓWNY TYTUŁ (To naprawi ten bałagan na górze)
        title: "Strona Główna (Landing)",
        // PODTYTUŁ (Opcjonalnie pokaże tytuł z sekcji Hero lub tekst statyczny)
        subtitle: title
          ? `Nagłówek: ${title}`
          : "Zarządzanie treścią strony głównej",
      };
    },
  },
});
