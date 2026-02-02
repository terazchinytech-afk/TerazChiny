import { defineField, defineType } from "sanity";
import { MessageSquare } from "lucide-react";

export const review = defineType({
  name: "review",
  title: "Opinie Klientów",
  type: "document",
  icon: MessageSquare,
  fields: [
    defineField({
      name: "author",
      title: "Imię i Nazwisko / Autor",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Ocena (1-5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
      },
    }),
    defineField({
      name: "content",
      title: "Treść Opinii",
      type: "text",
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error(
            "Opinia jest za długa. Skróć ją do 200 znaków, aby zmieściła się na karcie.",
          ),
    }),
    defineField({
      name: "trip",
      title: "Dotyczy wyprawy (Opcjonalnie)",
      type: "reference",
      to: [{ type: "trip" }],
    }),
    defineField({
      name: "reviewImage", // Zmieniona nazwa na bardziej opisową
      title: "Zdjęcie z wyprawy",
      type: "image",
      options: { hotspot: true },
      description:
        "Wgraj zdjęcie uczestnika zrobione podczas wyjazdu. Jeśli nie dodasz zdjęcia, system użyje zdjęcia głównego danej wyprawy.",
    }),
    defineField({
      name: "date",
      title: "Data wystawienia",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "content",
      rating: "rating",
    },
    prepare({ title, subtitle, rating }) {
      const stars = "★".repeat(rating || 5);
      return {
        title: `${title} (${stars})`,
        subtitle: subtitle,
      };
    },
  },
});
