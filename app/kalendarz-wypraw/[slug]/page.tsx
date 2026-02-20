/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { CheckCircle2 } from "lucide-react";

import { TripHero } from "@/app/components/sections/TripHero";
import { TripDetailsGrid } from "@/app/components/sections/TripDetailsGrid";
import { TripBookingCard } from "@/app/components/sections/TripBookingCard";
import { TripFAQ } from "@/app/components/sections/TripFaq";

import { getTripBySlug } from "@/app/lib/api";
import { MobileBookingManager } from "@/app/components/sections/singleTrip/MobileBookingManager";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";
import {
  InfinitePhotoCarousel,
  SanityGalleryImage,
} from "@/app/components/InfinitePhotoCarousel";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
const getImageDimensions = (ref: string) => {
  const dimensions = ref.split("-")[2]; // bierze "1216x1824"
  const [width, height] = dimensions.split("x").map(Number);
  return { width, height };
};
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <div className="flex items-center gap-4 mt-12 mb-6">
        <div className="w-1.5 h-8 bg-[#b32a2e] rounded-full" />
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3 flex items-center gap-2">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-gray-600 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 space-y-4 ml-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
        <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-[#b32a2e]" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900 border-b-2 border-[#b32a2e]/20">
        {children}
      </strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-[#b32a2e] font-bold hover:underline decoration-2 underline-offset-4"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      // Sprawdzamy, czy mamy dane assetu
      if (!value?.asset?._ref) {
        return null;
      }

      // 1. Generujemy URL
      const imageUrl = urlFor(value).url();

      // 2. Wyciągamy proporcje z nazwy pliku (dla optymalizacji Next Image)
      const { width, height } = getImageDimensions(value.asset._ref);

      return (
        <figure className="my-10 flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
            <Image
              src={imageUrl}
              alt={value.alt || "Zdjęcie z wyprawy"}
              width={width} // Oryginalna szerokość
              height={height} // Oryginalna wysokość
              // Opcjonalnie: placeholder "blur" jeśli chcesz
              placeholder="blur"
              blurDataURL={urlFor(value).width(20).quality(20).url()}
              className="h-auto w-auto max-h-[600px] object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          {/* Jeśli jest podpis (caption), wyświetl go */}
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-500 italic font-medium">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const formatDateDetails = (dateString: string, durationString: string) => {
  if (!dateString)
    return { year: new Date().getFullYear(), dates: "Termin wkrótce" };
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
  const durationDays = parseInt(durationString) || 14;
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + durationDays);
  const endDay = endDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endMonthString = endMonth < 10 ? `0${endMonth}` : endMonth;
  return { year, dates: `${day} - ${endDay}.${endMonthString}` };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) return { title: "Wyprawa nie znaleziona" };

  const title = trip.seoTitle || `${trip.title} | Teraz Chiny`;
  const description = trip.seoDescription || trip.shortDescription;
  const keywords = trip.seoKeywords || "";
  const shareImage = trip.ogImage || trip.mainImage;

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `https://terazchiny.pl/wyprawy/${slug}`,
      siteName: "Teraz Chiny",
      images: shareImage
        ? [
            {
              url: shareImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      locale: "pl_PL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: shareImage ? [shareImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TripDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawTrip = await getTripBySlug(slug);

  if (!rawTrip) notFound();
  const galleryData: SanityGalleryImage[] =
    rawTrip.gallery?.map((img: any, index: number) => ({
      id: img.url, // Używamy URL jako unikalnego klucza
      url: img.url,
      alt: img.alt || `Zdjęcie z wyprawy ${rawTrip.title}`,
      tag: rawTrip.year?.toString() || "Teraz Chiny", // Tag w rogu zdjęcia (np. rok wyprawy)
    })) || [];
  const { year, dates } = formatDateDetails(rawTrip.date, rawTrip.duration);

  const trip = {
    ...rawTrip,
    year,
    dates,
    image: rawTrip.mainImage || "/placeholder.jpg",
  };
  console.log(trip.content);

  return (
    <div className="min-h-screen bg-[#ffffff] pb-32 lg:pb-20 relative">
      <TripHero trip={trip} />

      <div className="max-w-7xl mx-auto px-6 mt-8 lg:mt-12">
        <div className="flex flex-col min-[1031px]:flex-row gap-12 lg:flex-row relative">
          <div className="flex-1 min-w-0">
            <MobileBookingManager
              price={trip.price}
              bookingUrl={trip.bookingUrl}
              tripTitle={trip.title}
            />

            <TripDetailsGrid trip={trip} />

            <article className="max-w-none mt-12">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                  O wyprawie
                </h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <div className="text-lg">
                {trip.content ? (
                  <PortableText
                    value={trip.content}
                    components={portableTextComponents}
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed italic">
                    {trip.shortDescription}
                  </p>
                )}
              </div>
            </article>

            {trip.highlights && trip.highlights.length > 0 && (
              <div className="mt-16 grid md:grid-cols-2 gap-4">
                {trip.highlights.map((item: string) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-6 border-l-4 border-[#b32a2e] rounded-r-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
                  >
                    <CheckCircle2
                      className="text-[#b32a2e] group-hover:scale-110 transition-transform"
                      size={24}
                    />
                    <span className="font-bold text-gray-800 tracking-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {galleryData.length > 0 && (
              <section className="mt-24 mb-16 100 pt-16">
                <InfinitePhotoCarousel images={galleryData} />
              </section>
            )}
            {trip.faq && trip.faq.length > 0 && <TripFAQ faqData={trip.faq} />}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-24">
              <TripBookingCard
                price={trip.price}
                bookingUrl={trip.bookingUrl}
                tripTitle={trip.title}
                tripSlug={trip.slug}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
