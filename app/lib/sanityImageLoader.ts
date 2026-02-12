export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("/")) {
    return src;
  }

  try {
    const url = new URL(src);

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
    return src;
  }
}
