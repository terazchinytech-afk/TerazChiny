// app/galeria/page.tsx (ścieżka przykładowa)

import { Footer } from "../components/Footer";
import GalleryPage from "../components/sections/gallerySection/GalleryPage";
import { getFooterData, getGalleryData } from "../lib/api";

// To jest Server Component, więc możemy użyć async/await
const Page = async () => {
  // 1. Pobieramy dane z Sanity
  const galleryData = await getGalleryData();
  const footerData = await getFooterData();

  // 2. Przekazujemy je do komponentu klienta
  return (
    <>
      <GalleryPage initialData={galleryData} />;
      <Footer data={footerData} />
    </>
  );
};

export default Page;
