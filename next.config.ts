/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ❌ USUŃ TE DWIE LINIKI (One blokują optymalizację lokalnych zdjęć):
    // loader: "custom",
    // loaderFile: "./app/lib/sanityImageLoader.ts",

    // ✅ DODAJ TE LINIKI (To pozwoli generować malutkie zdjęcia na telefon):
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920, 2048],

    // Opcjonalnie: Włącz format AVIF (jest jeszcze lżejszy niż WebP)
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
