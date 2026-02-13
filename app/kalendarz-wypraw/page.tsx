/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { getAllTrips, getCalendarPageData } from "../lib/api";
import CalendarClient from "../components/sections/CalendarClient";

// --- FORMATOWANIE DATY (BEZ ZMIAN) ---
const formatDateDetails = (dateString: string, durationString: string) => {
  const date = new Date(dateString);
  const months = [
    "STY",
    "LUT",
    "MAR",
    "KWI",
    "MAJ",
    "CZE",
    "LIP",
    "SIE",
    "WRZ",
    "PAŹ",
    "LIS",
    "GRU",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const durationDays = parseInt(durationString) || 14;
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + durationDays);
  const endDay = endDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endMonthString = endMonth < 10 ? `0${endMonth}` : endMonth;
  const dates = `${day} - ${endDay}.${endMonthString}`;
  return {
    year,
    month: months[monthIndex],
    day: day.toString().padStart(2, "0"),
    dates,
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCalendarPageData();
  const seo = data?.seo;
  const baseUrl = process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "http://localhost:3000";
  const title = seo?.metaTitle || "Kalendarz Wypraw | Teraz Chiny";
  const description = seo?.metaDescription;
  const images = seo?.ogImage ? [seo.ogImage] : [];

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: seo?.keywords,
    openGraph: { title, description, url: "/kalendarz-wypraw", images },
  };
}

export default async function CalendarPage() {
  const [pageData, rawTrips] = await Promise.all([
    getCalendarPageData(),
    getAllTrips(),
  ]);

  // 1. Formatowanie wycieczek
  const formattedTrips: any = rawTrips.map((trip: any) => {
    const dateDetails = formatDateDetails(trip.date, trip.duration);
    return {
      id: trip.id,
      slug: trip.slug,
      year: dateDetails.year,
      month: dateDetails.month,
      day: dateDetails.day,
      dates: dateDetails.dates,
      duration: trip.duration,
      title: trip.title,
      region: trip.location || "Chiny",
      description: trip.shortDescription || "",
      price: trip.price,
      spots: trip.status || "available",
      image: trip.mainImage || "/placeholder.jpg",
    };
  });

  const uniqueRegions = Array.from(
    new Set(formattedTrips.map((trip: any) => trip.region)),
  )
    .filter(Boolean)
    .sort();

  return (
    <CalendarClient
      trips={formattedTrips}
      heroData={pageData?.heroSection}
      filterData={pageData?.filterSection}
      availableRegions={uniqueRegions as any}
    />
  );
}
