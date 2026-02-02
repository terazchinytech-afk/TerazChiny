// app/lib/sanityImageLoader.ts
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // 1. Jeśli to lokalny plik (zaczyna się od /), nie twórz obiektu URL, tylko go zwróć
  if (src.startsWith("/")) {
    return src;
  }

  try {
    const url = new URL(src);

    // 2. Obsługuj tylko zdjęcia z CDN Sanity
    if (url.hostname === "cdn.sanity.io") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "max");
      url.searchParams.set("w", width.toString());
      if (quality) {
        url.searchParams.set("q", quality.toString());
      }
      return url.href;
    }

    return src;
  } catch (e) {
    // 3. Fallback dla błędnych adresów
    return src;
  }
}
