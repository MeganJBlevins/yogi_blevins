import { Mandala } from "@/app/components";
import Section from "@/app/components/Section";
import { urlFor } from "@/src/sanity/lib/image";
import { sanityFetch } from "@/src/sanity/lib/live";
import { RECENT_UPCOMING_EVENTS_QUERY } from "@/src/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

interface Event {
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
}

interface EventsProps {
  mandalaColor?: string;
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

function EventCard({ event }: { event: Event }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white/90 shadow-sm transition-all duration-300 hover:shadow-lg">
      {event.image?.asset && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={urlFor(event.image).width(600).height(375).url()}
            alt={event.image.alt || event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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

      <div className="flex flex-1 flex-col p-5">
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

        <h3 className="mt-2 font-serif text-xl font-semibold text-primary-text transition-colors group-hover:text-primary-text-hover">
          {event.title}
        </h3>

        {event.location && (
          <div className="mt-2 flex items-center text-sm text-primary-text-muted">
            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        )}

        <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-text-muted line-clamp-2">
          {event.description}
        </p>

        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent-hover"
          >
            Register
            <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
        <svg
          className="h-10 w-10 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="font-serif text-2xl font-semibold text-primary-text">
        No Upcoming Events
      </h3>
      <p className="mt-3 text-lg text-primary-text-muted">
        Check back soon for new workshops, classes, and retreats!
      </p>
    </div>
  );
}

export default async function Events({
  mandalaColor = "#798777",
}: EventsProps) {
  const events = await sanityFetch<Event[]>({ query: RECENT_UPCOMING_EVENTS_QUERY, revalidate: 0 });

  return (
    <Section
      id="events"
      className="relative overflow-x-clip py-10 md:py-20 lg:py-32"
      style={{ backgroundColor: "#F8EDE3" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute -right-32 bottom-0 h-[800px] w-[800px] translate-y-1/4">
          <Mandala color={mandalaColor} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-primary-text md:text-5xl lg:text-6xl">
            Upcoming Yoga Events
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-text-muted md:text-xl">
            Here are some events that you might be interested in! I'm not involved in all of them, or able to join all of them, but wish I could!
          </p>
        </div>

        {events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/events"
                className="group inline-flex items-center justify-center rounded-full border-2 border-accent bg-transparent px-8 py-3 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent/10 hover:shadow-md"
              >
                View All Events
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
    </Section>
  );
}

