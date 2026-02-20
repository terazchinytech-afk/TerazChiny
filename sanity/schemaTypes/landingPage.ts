import { defineField, defineType } from "sanity";
import {
  Home,
  Info,
  Calendar,
  BookOpen,
  HelpCircle,
  Phone,
  LayoutTemplate,
  MessageSquare,
  Anchor,
  Search,
  Footprints,
} from "lucide-react";
import { WebPCompressor } from "../components/WebPCompressor";
export const landingPage = defineType({
  name: "landingPage",
  title: "Strona Główna (Landing)",
  type: "document",
  icon: Home,

  groups: [
    { name: "hero", title: "Hero (Slider)", icon: LayoutTemplate },
    { name: "about", title: "O Nas", icon: Info },
    { name: "calendar", title: "Kalendarz", icon: Calendar },
    { name: "what_next", title: "Co dalej?", icon: Footprints },
    { name: "testimonials", title: "Opinie", icon: MessageSquare },

    { name: "blog", title: "Blog", icon: BookOpen },
    { name: "faq", title: "FAQ", icon: HelpCircle },
    { name: "contact", title: "Kontakt", icon: Phone },
    { name: "footer", title: "Stopka", icon: Anchor },
    { name: "seo", title: "SEO / Meta", icon: Search },
  ],
  fields: [
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
          name: "statistics",
          title: "Statystyki",
          type: "array",
          validation: (Rule) =>
            Rule.max(3).error("Możesz dodać maksymalnie 3 karty statystyk."),
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
        // ... wewnątrz aboutSection -> fields ...

        defineField({
          name: "images",
          title: "Zdjęcia (Górny blok)",
          type: "object",
          fields: [
            defineField({
              name: "mainImage",
              title: "Zdjęcie Główne",
              type: "image",
              options: {
                hotspot: false, // <--- WYŁĄCZAMY TO GÓWNO
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
              name: "secondaryImage",
              title: "Zdjęcie Małe",
              type: "image",
              options: {
                hotspot: false, // <--- WYŁĄCZAMY
              },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Tekst alternatywny (Alt)",
                }),
              ],
              components: {
                input: WebPCompressor,
              },
            }),
          ],
        }),

        // ... wewnątrz differentiation -> fields ...
        defineField({
          name: "sideImage",
          title: "Zdjęcie po prawej stronie",
          type: "image",
          options: {
            hotspot: false, // <--- WYŁĄCZAMY
          },
          description:
            "Zdjęcie, które pojawi się w dolnym bloku po prawej stronie.",
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Tekst alternatywny (Alt)",
            }),
          ],
          components: {
            input: WebPCompressor,
          },
        }),

        defineField({
          name: "differentiation",
          title: "Nasze Wyróżniki (Blok dolny - odwrócony)",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Nagłówek wyróżników",
              type: "string",
              initialValue:
                "Podróżuj z lokalnymi ekspertami, nie z przewodnikami z biura.",
            }),
            defineField({
              name: "longDescription",
              title: "Dłuższy opis (Lokalni przewodnicy)",
              type: "text",
              rows: 5,
              description:
                "Opisz tutaj szczegółowo rodowitych przewodników i autentyczność wypraw.",
            }),
            defineField({
              name: "flexibilityTitle",
              title: "Tytuł elastyczności",
              type: "string",
              initialValue: "Luźna atmosfera i elastyczność",
            }),
            defineField({
              name: "flexibilityDesc",
              title: "Opis elastyczności",
              type: "text",
              rows: 3,
              description: "Opis braku drylu i partnerskiego podejścia.",
            }),
            defineField({
              name: "sideImage",
              title: "Zdjęcie po prawej stronie",
              type: "image",
              options: {
                hotspot: false, // <--- WYŁĄCZAMY
              },
              description:
                "Zdjęcie, które pojawi się w dolnym bloku po prawej stronie.",
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Tekst alternatywny (Alt)",
                }),
              ],
              components: {
                input: WebPCompressor,
              },
            }),
          ],
        }),
      ],
    }),

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
    defineField({
      name: "processSection",
      title: "Sekcja Proces (Co dalej?)",
      type: "object",
      group: "what_next",
      fields: [
        defineField({
          name: "header",
          title: "Nagłówek",
          type: "object",
          fields: [
            defineField({
              name: "badge",
              title: "Badge (Nad tytułem)",
              type: "string",
              initialValue: "Plan wyjazdu",
            }),
            defineField({
              name: "mainTitle",
              title: "Tytuł Główny (Górny wiersz)",
              type: "string",
              initialValue: "Kupiłeś bilet.",
            }),
            defineField({
              name: "highlightedTitle",
              title: "Tytuł Wyróżniony (Dolny wiersz - złoty)",
              type: "string",
              initialValue: "Co dzieje się teraz?",
            }),
          ],
        }),

        defineField({
          name: "step1",
          title: "Krok 01 ",
          type: "object",
          fields: [
            defineField({
              name: "stepName",
              title: "Nazwa Kroku",
              type: "string",
              initialValue: "FORMALNOŚCI",
            }),
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
              initialValue: "My załatwiamy wizę. Ty się pakujesz.",
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
            }),
          ],
        }),

        defineField({
          name: "step2",
          title: "Krok 02 ",
          type: "object",
          fields: [
            defineField({
              name: "stepName",
              title: "Nazwa Kroku",
              type: "string",
              initialValue: "PRZYGOTOWANIE",
            }),
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
              initialValue: "Odprawa i Wiedza",
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
            }),
          ],
        }),

        defineField({
          name: "step3",
          title: "Krok 03 ",
          type: "object",
          fields: [
            defineField({
              name: "stepName",
              title: "Nazwa Kroku",
              type: "string",
              initialValue: "LOTNISKO",
            }),
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
              initialValue: "Spotkanie w Warszawie",
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
            }),
          ],
        }),

        defineField({
          name: "step4",
          title: "Krok 04",
          type: "object",
          fields: [
            defineField({
              name: "stepName",
              title: "Nazwa Kroku",
              type: "string",
              initialValue: "LĄDOWANIE",
            }),
            defineField({
              name: "title",
              title: "Tytuł",
              type: "string",
              initialValue: "Prywatny Transfer",
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
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

        defineField({
          name: "selectedReviews",
          title: "Wybierz Opinie",
          description:
            "Wybierz opinie, które mają pojawić się w karuzeli. Jeśli nic nie wybierzesz, system automatycznie pobierze najnowsze.",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "review" }],
            },
          ],
        }),
      ],
    }),

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

    defineField({
      name: "contactSection",
      title: "Sekcja Kontakt",
      type: "object",
      group: "contact",
      fields: [
        // 1. TŁO (Hero Image) z WebP + Alt + Simplified UI
        defineField({
          name: "heroImage",
          title: "Zdjęcie Główne (Tło)",
          type: "image",
          options: {
            hotspot: false,
            // @ts-expect-error - custom option for your component
            hideModalUI: true,
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
            // 2. LOGO NA KARCIE z WebP + Alt + Simplified UI
            defineField({
              name: "cardLogo",
              title: "Logo na karcie (Obok formularza)",
              type: "image",
              options: {
                hotspot: false,
                // @ts-expect-error - custom option
                hideModalUI: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Tekst alternatywny (Alt)",
                }),
              ],
              components: {
                input: WebPCompressor,
              },
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

        // --- ZMODYFIKOWANE POLE OG IMAGE ---
        defineField({
          name: "ogImage",
          title: "Obrazek Udostępniania (Social Media)",
          type: "image",
          description:
            "Obrazek widoczny po wklejeniu linku na FB/LinkedIn. Zalecane 1200x630px.",
          options: {
            hotspot: false, // Wyłączamy kadrowanie
            // @ts-expect-error - custom option
            hideModalUI: true, // Uproszczony widok
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Tekst alternatywny (Alt)",
              description: "Opis obrazka dla robotów (opcjonalne dla OG Image)",
            }),
          ],
          components: {
            input: WebPCompressor,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heroSection.mainTitle",
    },
    prepare({ title }) {
      return {
        title: "Strona Główna (Landing)",

        subtitle: title
          ? `Nagłówek: ${title}`
          : "Zarządzanie treścią strony głównej",
      };
    },
  },
});
