import { Divider, Mandala } from "@/app/components";
import Section from "@/app/components/Section";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
}

interface VideosProps {
  mandalaColor?: string;
  videos?: Video[];
}

const defaultVideos: Video[] = [
  {
    id: "1",
    youtubeId: "dQw4w9WgXcQ",
    title: "New Year's Twist Sequence",
    description: "A New Year's twist sequence to wring out what no longer serves you and make space for what's to come. Building toward Side Crow, we honor the turning of the year by letting go and opening to new possibilities.",
  }
];

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
        <h3 className="font-serif text-xl font-semibold text-primary-text transition-colors group-hover:text-primary-text-hover">
          {video.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-text-muted">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default function Videos({
  mandalaColor = "#798777",
  videos = defaultVideos,
}: VideosProps) {
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      <Divider flipped className="absolute bottom-0 left-0 right-0" />
    </Section>
  );
}

