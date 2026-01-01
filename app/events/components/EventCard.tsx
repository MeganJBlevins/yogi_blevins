import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
    eventDate: string;
    endDate?: string;
    location?: string;
    registrationUrl?: string;
    image?: {
      asset: { _ref: string };
      alt?: string;
    };
    featured?: boolean;
    category?: {
      _id: string;
      title: string;
      slug: { current: string };
    };
  };
}

function formatEventDate(eventDate: string, endDate?: string): string {
  const start = new Date(eventDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };

  if (endDate) {
    const end = new Date(endDate);
    const isSameDay = start.toDateString() === end.toDateString();
    
    if (isSameDay) {
      return `${start.toLocaleDateString("en-US", options)} • ${start.toLocaleTimeString("en-US", timeOptions)} - ${end.toLocaleTimeString("en-US", timeOptions)}`;
    }
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`;
  }
  
  return `${start.toLocaleDateString("en-US", options)} • ${start.toLocaleTimeString("en-US", timeOptions)}`;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-secondary-bg shadow-sm transition-all duration-300 hover:shadow-lg">
      {event.image?.asset && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={urlFor(event.image).width(600).height(375).url()}
            alt={event.image.alt || event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      {!event.image?.asset && (
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {event.category && (
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-primary-text">
              {event.category.title}
            </span>
          )}
        </div>

        <time className="mt-2 text-sm font-medium text-accent" dateTime={event.eventDate}>
          {formatEventDate(event.eventDate, event.endDate)}
        </time>

        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-primary-text transition-colors duration-200 group-hover:text-primary-text-hover md:text-2xl">
          {event.title}
        </h3>

        {event.location && (
          <div className="mt-2 flex items-center text-sm text-primary-text-muted">
            <svg className="mr-1.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        <p className="mt-3 flex-1 text-base leading-relaxed text-primary-text-muted line-clamp-3">
          {event.description}
        </p>

        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent-hover"
          >
            Register Now
            <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

