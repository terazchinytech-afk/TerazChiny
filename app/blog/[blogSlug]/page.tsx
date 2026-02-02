import { Metadata } from "next";
import { getPostBySlug, getRecommendedPosts } from "@/app/lib/api";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { notFound } from "next/navigation";
import { BlogPostClient } from "@/app/components/BlogPostClient";

interface Props {
  params: Promise<{ blogSlug: string }>;
}

// --- DYNAMICZNE METADANE ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug } = await params; // Obsługa asynchronicznych params
  const post = await getPostBySlug(blogSlug);

  if (!post) return { title: "Nie znaleziono artykułu" };

  return {
    title: `${post.title} | Teraz Chiny`,
    description: post.excerpt,
    keywords: post.keywords || [],
    openGraph: {
      title: `${post.title} | Teraz Chiny`,
      description: post.excerpt,
      images: [post.mainImage],
    },
  };
}

// --- GŁÓWNY SERVER COMPONENT ---
export default async function BlogPostPage({ params }: Props) {
  const { blogSlug } = await params;

  // Pobieramy post oraz rekomendacje jednocześnie
  const [postData, recommendedData] = await Promise.all([
    getPostBySlug(blogSlug),
    getRecommendedPosts(blogSlug),
  ]);

  if (!postData) notFound();

  const formattedPost = {
    ...postData,
    date: postData.publishedAt
      ? format(new Date(postData.publishedAt), "dd MMM yyyy", {
          locale: pl,
        }).toUpperCase()
      : "BRAK DATY",
    image: postData.mainImage || "/heroBackground.png",
  };

  return (
    <BlogPostClient post={formattedPost} recommendedPosts={recommendedData} />
  );
}
