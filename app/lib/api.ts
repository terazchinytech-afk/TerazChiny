import { client } from "./sanity";

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
      processSection {
        ...
      },
      gallerySection {
        title,
        description,
        ctaText,
        selectedImages[] {
          "id": reference, // Oryginalny ciąg znaków jako ID
          "tag": tag,      // Rok przypisany w pickerze
          
          // Magia GROQ: Rozbijamy string "yearId::imageKey" i pobieramy konkretny obiekt
          "url": *[_type == "galleryYear" && _id == string::split(^.reference, "::")[0]][0].images[_key == string::split(^.reference, "::")[1]][0].asset->url,
          "alt": *[_type == "galleryYear" && _id == string::split(^.reference, "::")[0]][0].images[_key == string::split(^.reference, "::")[1]][0].alt
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
      shortDescription,
      "mainImage": mainImage.asset->url
    }
  `;
  return client.fetch(query);
}

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
      trendingText,
      bookingUrl,
      "mainImage": mainImage.asset->url,
      seoTitle,
      seoDescription,
      gallery[] {
        "url": asset->url,
        "alt": alt
      },
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
      category,
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

// sanity/lib/queries.ts (lub inny plik z API)

export async function getGalleryData() {
  const query = `
    *[_type == "galleryYear"] | order(year desc) {
      year,
      images[] {
        "id": _key,
        "url": asset->url,
        "alt": alt,
        "date": date
      }
    }
  `;
  return client.fetch(query);
}
