import { Divider, Mandala } from "@/app/components";
import Section from "@/app/components/Section";
import { sanityFetch } from "@/src/sanity/lib/live";
import { RECENT_VIDEOS_QUERY } from "@/src/sanity/lib/queries";
import Link from "next/link";

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

interface VideosProps {
  mandalaColor?: string;
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white/80 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {video.category && (
          <span className="mb-2 inline-block w-fit rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-primary-text">
            {video.category.title}
          </span>
        )}
        <h3 className="font-serif text-xl font-semibold text-primary-text transition-colors group-hover:text-primary-text-hover">
          {video.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-text-muted line-clamp-3">
          {video.description}
        </p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
        <svg
          className="h-10 w-10"
          style={{ color: "#F8EDE3" }}
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
      <h3 className="font-serif text-2xl font-semibold" style={{ color: "#F8EDE3" }}>
        Videos Coming Soon
      </h3>
      <p className="mt-3 text-lg" style={{ color: "#F8EDE3" }}>
        Check back soon for guided yoga sessions and practice videos!
      </p>
    </div>
  );
}

export default async function Videos({
  mandalaColor = "#798777",
}: VideosProps) {
  const videos = await sanityFetch<Video[]>({ query: RECENT_VIDEOS_QUERY });

  return (
    <Section
      id="videos"
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ backgroundColor: "#A2B29F" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute right-0 top-1/4 h-[800px] w-[800px] translate-x-1/4 -translate-y-1/2">
          <Mandala color={mandalaColor} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={{ color: "#F8EDE3" }}>
            Practice With Me
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#F8EDE3" }}>
            Explore these guided yoga sessions designed to meet you wherever you are in your practice.
          </p>
        </div>

        {videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/videos"
                className="group inline-flex items-center justify-center rounded-full border-2 border-[#F8EDE3] bg-transparent px-8 py-3 text-base font-medium text-[#F8EDE3] shadow-sm transition-all duration-200 hover:bg-[#F8EDE3]/10 hover:shadow-md"
              >
                View All Videos
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      <Divider flipped className="absolute bottom-0 left-0 right-0" />
    </Section>
  );
}
