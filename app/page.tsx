// app/page.tsx
import { Metadata } from "next";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { CalendarSection } from "./components/sections/CalendarSection";
import { TestimonialsSection } from "./components/sections/TestimonialSection";
import { BlogSection } from "./components/sections/BlogSection";
import { FaqSection } from "./components/sections/FaqSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/Footer";
import { getLandingPageData } from "./lib/api";

// --- DYNAMICZNE METADANE (SEO) ---
export async function generateMetadata(): Promise<Metadata> {
  const sanityData = await getLandingPageData();
  const seo = sanityData?.seo;

  const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "http://localhost:3000";

  const title = seo?.metaTitle || "Teraz Chiny - Wyprawy do Państwa Środka";
  const description =
    seo?.metaDescription ||
    "Organizujemy świadome wyjazdy do Chin, łącząc kulturę, biznes i autentyczne doświadczenia.";
  const images = seo?.ogImage ? [seo.ogImage] : ["/heroBackground.png"];

  return {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    keywords: seo?.keywords || ["Chiny", "Wyprawy", "Podróże", "Azja"],

    openGraph: {
      title: title,
      description: description,
      url: "/",
      siteName: "Teraz Chiny",
      locale: "pl_PL",
      type: "website",
      images: [
        {
          url: images[0],
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: images,
    },
  };
}

// --- GŁÓWNY KOMPONENT STRONY ---
export default async function Home() {
  const sanityData = await getLandingPageData();

  if (!sanityData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Brak danych</h1>
          <p>Upewnij się, że opublikowałeś dokument w Sanity.</p>
        </div>
      </main>
    );
  }
  console.log(sanityData.testimonialsSection);

  return (
    <main className="min-h-screen flex flex-col bg-brand-white">
      <HeroSection data={sanityData.heroSection} />
      <AboutSection data={sanityData.aboutSection} />
      <CalendarSection data={sanityData.calendarSection} />
      <TestimonialsSection data={sanityData.testimonialsSection} />
      <BlogSection
        headerData={sanityData.blogSection}
        posts={sanityData.blogSection?.latestPosts || []}
      />
      <FaqSection data={sanityData.faqSection} />
      <ContactSection data={sanityData.contactSection} />
      <Footer data={sanityData.footer} />
    </main>
  );
}
