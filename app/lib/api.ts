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
        },
        // Pobieramy dane dla nowej sekcji z chińskimi przewodnikami
        differentiation {
          ...,
          "sideImage": sideImage.asset->url
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
          "reviewImage": reviewImage.asset->url,
          "trip": trip-> {
            title,
            "mainImage": mainImage.asset->url
          }
        }
      },
      // Rozszerzyłem blogSection i faqSection o konkretne pola zamiast {...}
      blogSection {
        header,
        ctaText,
        postsSettings
      },
      faqSection {
        header,
        contactCtaText,
        items[] {
          question,
          answer
        }
      },
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

  // LOGIKA AUTOMATYCZNYCH POSTÓW:
  // Jeśli tryb jest ustawiony na "latest" lub brak ustawień, dociągamy posty
  if (
    data?.blogSection?.postsSettings?.mode === "automatic_latest" ||
    !data?.blogSection?.postsSettings
  ) {
    const postsQuery = `
      *[_type == "post"] | order(publishedAt desc)[0..2] {
        title,
        "slug": slug.current,
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

// 2. DANE DLA STRONY KALENDARZ
export async function getCalendarPageData() {
  const query = `
    *[_type == "calendarPage"][0] {
      heroSection {
        titlePart1,
        titleHighlight,
        titlePart2,
        description,
        "heroImage": heroImage.asset->url
      },
      filterSection {
        title,
        subtitle,
        locationLabel,
        dateLabel,
        buttonText
      },
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
      "slug": slug.current,
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

// 4. POBIERZ WYPRAWĘ PO SLUGU
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
      seoTitle,
      seoDescription,
      seoKeywords,
      "ogImage": ogImage.asset->url
    }
  `;
  return client.fetch(query, { slug });
}

// 5. BLOG - LISTA POSTÓW
export async function getAllPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      excerpt,
      "slug": slug.current,
      "date": publishedAt,
      category,
      "image": mainImage.asset->url,
      readingTime
    }
  `;
  return client.fetch(query);
}

// 6. POJEDYNCZY POST
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

// 7. REKOMENDACJE (Wykluczamy obecny post)
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

// 8. STOPKA
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
