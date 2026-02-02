// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Konfiguracja klienta
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Znajdziesz to w sanity.config.ts lub panelu
  dataset: "production", // Domyślny dataset
  apiVersion: "2024-01-01", // Wersja API
  useCdn: false, // false = zawsze świeże dane (dobre przy developmencie), true = szybciej (cache)
});

// Helper do generowania URLi zdjęć
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
