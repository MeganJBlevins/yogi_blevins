import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { type PortableTextBlock } from "@portabletext/react";
import PageLayout from "@/app/components/PageLayout";
import Section from "@/app/components/Section";
import { Mandala } from "@/app/components";
import { sanityFetch } from "@/src/sanity/lib/live";
import { POST_QUERY } from "@/src/sanity/lib/queries";
import { urlFor } from "@/src/sanity/lib/image";
import { PortableTextRenderer } from "../components";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  body?: PortableTextBlock[];
  excerpt?: string;
  publishedAt?: string;
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) {
    return { title: "Post Not Found | Yogi Blevins" };
  }

  return {
    title: `${post.title} | Yogi Blevins`,
    description: post.excerpt || `Read ${post.title} on the Yogi Blevins blog.`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <PageLayout>
      <article>
        <Section
          id="post-hero"
          className="relative overflow-hidden pb-12 pt-32 lg:pb-16 lg:pt-40"
          style={{ backgroundColor: "#F8EDE3" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden="true">
            <div className="absolute -left-32 top-1/2 h-[800px] w-[800px] -translate-y-1/2">
              <Mandala color="#798777" />
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Journal
            </Link>

            {post.categories && post.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog/category/${category.slug.current}`}
                    className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-primary-text transition-colors hover:bg-accent/30"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-primary-text md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {formattedDate && (
              <div className="mt-6">
                <time dateTime={post.publishedAt} className="text-primary-text-muted">
                  {formattedDate}
                </time>
              </div>
            )}
          </div>
        </Section>

        {post.mainImage?.asset && (
          <Section className="-mt-4 pb-8 lg:pb-12" style={{ backgroundColor: "#F8EDE3" }}>
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={urlFor(post.mainImage).width(1400).height(600).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>
          </Section>
        )}

        <Section
          id="post-content"
          className="py-12 lg:py-16"
          style={{ backgroundColor: "#F8EDE3" }}
        >
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {post.body && post.body.length > 0 ? (
              <div className="prose-custom">
                <PortableTextRenderer value={post.body} />
              </div>
            ) : (
              <p className="text-center text-lg text-primary-text-muted">
                This post has no content yet.
              </p>
            )}
          </div>
        </Section>

        <Section
          id="post-footer"
          className="border-t border-accent/20 py-12 lg:py-16"
          style={{ backgroundColor: "#F8EDE3" }}
        >
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border-2 border-accent bg-transparent px-8 py-3 text-base font-medium text-primary-text transition-all duration-200 hover:bg-accent/10"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                More Articles
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Section>
      </article>
    </PageLayout>
  );
}
