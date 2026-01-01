import { Metadata } from "next";
import PageLayout from "@/app/components/PageLayout";
import Section from "@/app/components/Section";
import { Mandala } from "@/app/components";
import { sanityFetch } from "@/src/sanity/lib/live";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/src/sanity/lib/queries";
import { PostCard } from "./components";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Yogi Blevins",
  description: "Explore yoga insights, wellness tips, and mindful living practices from Yogi Blevins.",
};

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<Post[]>({ query: POSTS_QUERY }),
    sanityFetch<Category[]>({ query: CATEGORIES_QUERY }),
  ]);

  return (
    <PageLayout>
      <Section
        id="blog-hero"
        className="relative overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-40"
        style={{ backgroundColor: "#F8EDE3" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div className="absolute -right-32 top-1/4 h-[600px] w-[600px]">
            <Mandala color="#798777" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-text md:text-5xl lg:text-6xl">
              The Journal
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-text-muted md:text-xl">
              Thoughts on yoga, mindfulness, and the journey to inner peace. 
              Join me as we explore ways to bring more balance and serenity into everyday life.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent-hover"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug.current}`}
                  className="rounded-full border-2 border-accent bg-transparent px-5 py-2 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent/10"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section
        id="blog-posts"
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#F8EDE3" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent/20">
                <svg
                  className="h-12 w-12 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-primary-text">
                No posts yet
              </h2>
              <p className="mt-3 text-lg text-primary-text-muted">
                Check back soon! New content is on its way.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md"
              >
                Return Home
              </Link>
            </div>
          )}
        </div>
      </Section>
    </PageLayout>
  );
}

