import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/app/components/PageLayout";
import Section from "@/app/components/Section";
import { Mandala } from "@/app/components";
import { sanityFetch } from "@/src/sanity/lib/live";
import { VIDEO_CATEGORIES_QUERY } from "@/src/sanity/lib/queries";
import { VideoCard } from "../../components";
import Link from "next/link";

const VIDEO_CATEGORY_QUERY = `*[_type == "videoCategory" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description
}`;

const VIDEOS_BY_CATEGORY_QUERY = `*[_type == "video" && category._ref == $categoryId] | order(publishedAt desc) {
  _id,
  title,
  slug,
  youtubeId,
  description,
  publishedAt,
  featured,
  "category": category->{ _id, title, slug }
}`;

interface VideoCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

interface Video {
  _id: string;
  title: string;
  slug: { current: string };
  youtubeId: string;
  description: string;
  publishedAt?: string;
  featured?: boolean;
  category?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await sanityFetch<VideoCategory | null>({
    query: VIDEO_CATEGORY_QUERY,
    params: { slug },
  });

  if (!category) {
    return { title: "Category Not Found | Yogi Blevins" };
  }

  return {
    title: `${category.title} Videos | Yogi Blevins`,
    description: category.description || `Browse ${category.title} yoga videos from Yogi Blevins.`,
  };
}

export default async function VideoCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  const category = await sanityFetch<VideoCategory | null>({
    query: VIDEO_CATEGORY_QUERY,
    params: { slug },
  });

  if (!category) {
    notFound();
  }

  const [videos, allCategories] = await Promise.all([
    sanityFetch<Video[]>({
      query: VIDEOS_BY_CATEGORY_QUERY,
      params: { categoryId: category._id },
    }),
    sanityFetch<VideoCategory[]>({ query: VIDEO_CATEGORIES_QUERY }),
  ]);

  return (
    <PageLayout>
      <Section
        id="category-hero"
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
            <Link
              href="/videos"
              className="mb-4 inline-flex items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Videos
            </Link>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-text md:text-5xl lg:text-6xl">
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-6 text-lg leading-relaxed text-primary-text-muted md:text-xl">
                {category.description}
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/videos"
              className="rounded-full border-2 border-accent bg-transparent px-5 py-2 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent/10"
            >
              All Videos
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat._id}
                href={`/videos/category/${cat.slug.current}`}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  cat._id === category._id
                    ? "bg-accent text-primary-text"
                    : "border-2 border-accent bg-transparent text-primary-text hover:bg-accent/10"
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="category-videos"
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#F8EDE3" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {videos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-primary-text">
                No videos in {category.title}
              </h2>
              <p className="mt-3 text-lg text-primary-text-muted">
                Check back soon! New content is on its way.
              </p>
              <Link
                href="/videos"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md"
              >
                View All Videos
              </Link>
            </div>
          )}
        </div>
      </Section>
    </PageLayout>
  );
}

