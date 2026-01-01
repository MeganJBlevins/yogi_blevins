interface VideoCardProps {
  video: {
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
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const formattedDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-secondary-bg shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {video.category && (
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-primary-text">
              {video.category.title}
            </span>
          )}
          {formattedDate && (
            <time dateTime={video.publishedAt} className="text-sm text-primary-text-muted">
              {formattedDate}
            </time>
          )}
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold leading-tight text-primary-text transition-colors duration-200 group-hover:text-primary-text-hover md:text-2xl">
          {video.title}
        </h3>

        <p className="mt-3 flex-1 text-base leading-relaxed text-primary-text-muted line-clamp-3">
          {video.description}
        </p>
      </div>
    </article>
  );
}

