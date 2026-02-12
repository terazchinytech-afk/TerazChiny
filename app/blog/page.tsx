export const dynamic = "force-dynamic";
import { getAllPosts } from "@/app/lib/api";
import { BlogRecentGrid } from "@/app/components/sections/BlogRecentGrid";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default async function BlogPage() {
  const sanityPosts = await getAllPosts();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedPosts = sanityPosts.map((post: any) => ({
    ...post,

    date: post.date
      ? format(new Date(post.date), "dd MMM yyyy", { locale: pl }).toUpperCase()
      : "BRAK DATY",

    image: post.image || "/heroBackground.png",
  }));

  if (!formattedPosts || formattedPosts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-red">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">
            Wkrótce pojawią się tu artykuły
          </h1>
          <p>Trwa przygotowywanie treści...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pb-32 pt-0 overflow-hidden bg-brand-white">
      <div className="relative z-10">
        <BlogRecentGrid posts={formattedPosts} />
      </div>
    </main>
  );
}
