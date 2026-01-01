import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/src/sanity/lib/image";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    publishedAt?: string;
    mainImage?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-secondary-bg shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/blog/${post.slug.current}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {post.title}</span>
      </Link>

      {post.mainImage?.asset && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(600).height(375).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      {!post.mainImage?.asset && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-accent/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-16 w-16 text-accent/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {formattedDate && (
          <div className="text-sm text-primary-text-muted">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
        )}

        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-primary-text transition-colors duration-200 group-hover:text-primary-text-hover md:text-2xl">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-primary-text-muted">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center text-sm font-medium text-accent transition-colors duration-200 group-hover:text-accent-hover">
          Read more
          <svg
            className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  );
}
