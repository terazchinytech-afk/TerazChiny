// lib/api.ts
import { client } from "./sanity";

// 1. DANE DLA STRONY GŁÓWNEJ (LANDING PAGE)
export async function getLandingPageData() {
  const query = `
    *[_type == "landingPage"][0] {
      heroSection {
        ...,
        slides[] {
          ...,
          "img": img.asset->url,
          "outlineImage": outlineImage.asset->url
        }
      },
      aboutSection {
        ...,
        images {
          "mainImage": mainImage.asset->url,
          "secondaryImage": secondaryImage.asset->url
        }
      },
      calendarSection {
        ...,
        tripsSettings {
          ...,
          selectedTrips[]->{
            title,
            slug,
            date,
            duration,
            price,
            location,
            status,
            spotsLeft,
            "mainImage": mainImage.asset->url
          }
        }
      },
      testimonialsSection {
        ...,
        selectedReviews[]->{
          author,
          rating,
          content,
          date,
         // Pobieramy dedykowane zdjęcie z opinii
          "reviewImage": reviewImage.asset->url,
          // Pobieramy dane wyprawy jako backup
          "trip": trip-> {
            title,
            "mainImage": mainImage.asset->url
          }
        }
      },
      blogSection { ... },
      faqSection { ... },
      contactSection {
        ...,
        "heroImage": heroImage.asset->url,
        contactCard {
          ...,
          "cardLogo": cardLogo.asset->url
        }
      },
      footer {
        socials,
        contactInfo
      },
      seo {
        metaTitle,
        metaDescription,
        keywords,
        "ogImage": ogImage.asset->url
      }
    }
  `;

  const data = await client.fetch(query);

  if (
    data?.blogSection?.postsSettings?.mode === "automatic_latest" ||
    !data?.blogSection?.postsSettings
  ) {
    const postsQuery = `
      *[_type == "post"] | order(publishedAt desc)[0..2] {
        title,
        slug,
        publishedAt,
        excerpt,
        category,
        readingTime,
        "mainImage": mainImage.asset->url
      }
    `;
    if (!data.blogSection) data.blogSection = {};
    data.blogSection.latestPosts = await client.fetch(postsQuery);
  }

  return data;
}

// 2. DANE DLA STRONY KALENDARZ (Poprawione przecinki)
export async function getCalendarPageData() {
  const query = `
    *[_type == "calendarPage"][0] {
      heroSection {
        titlePart1,
        titleHighlight,
        titlePart2,
        description,
        "heroImage": heroImage.asset->url
      }, // <--- TU BRAKOWAŁO PRZECINKA
      filterSection {
        title,
        subtitle,
        locationLabel,
        dateLabel,
        buttonText
      }, // <--- TU TEŻ WARTO DAĆ PRZECINEK
      seo {
        metaTitle,
        metaDescription,
        keywords,
        "ogImage": ogImage.asset->url
      }
    }
  `;
  return client.fetch(query);
}

// 3. WSZYSTKIE WYPRAWY
export async function getAllTrips() {
  const query = `
    *[_type == "trip"] | order(date asc) {
      "id": _id,
      title,
      slug,
      date,
      duration,
      price,
      location,
      status, 
      description,
      "mainImage": mainImage.asset->url
    }
  `;
  return client.fetch(query);
}

// lib/api.ts

// ... (pozostałe funkcje: getLandingPageData, getCalendarPageData itp.)

// NOWA FUNKCJA: Pobierz jedną wyprawę po slugu
export async function getTripBySlug(slug: string) {
  const query = `
    *[_type == "trip" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      date,
      duration,
      location,
      price,
      status,
      groupSize,
      shortDescription,
      content,
      highlights,
      faq,
      bookingUrl,
      "mainImage": mainImage.asset->url,
      // Pola SEO:
      seoTitle,
      seoDescription,
      seoKeywords,
      "ogImage": ogImage.asset->url
    }
  `;

  return client.fetch(query, { slug });
}

export async function getAllPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      excerpt,
      "slug": slug.current,
      "date": publishedAt,
      "category": category,
      "image": mainImage.asset->url,
      readingTime
    }
  `;
  return client.fetch(query);
}

export async function getPostBySlug(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      publishedAt,
      category,
      readingTime,
      keywords,
      "mainImage": mainImage.asset->url,
      // Pobieramy body i upewniamy się, że obrazki wewnątrz mają URL
      body[] {
        ...,
        _type == "image" => {
          ...,
          "assetUrl": asset->url
        }
      }
    }
  `;
  return client.fetch(query, { slug });
}

export async function getRecommendedPosts(currentSlug: string) {
  const query = `
    *[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      category,
      readingTime
    }
  `;
  return client.fetch(query, { currentSlug });
}
export async function getFooterData() {
  const query = `
    *[_type == "landingPage"][0] {
      contactInfo {
        email,
        phone,
        address
      },
      socials {
        facebook,
        instagram,
        youtube
      }
    }
  `;
  return client.fetch(query);
}
