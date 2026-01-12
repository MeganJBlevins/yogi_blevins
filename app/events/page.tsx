import { Metadata } from "next";
import PageLayout from "@/app/components/PageLayout";
import Section from "@/app/components/Section";
import { Mandala } from "@/app/components";
import { sanityFetch } from "@/src/sanity/lib/live";
import { UPCOMING_EVENTS_QUERY, EVENT_CATEGORIES_QUERY } from "@/src/sanity/lib/queries";
import { EventCard } from "./components";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | Yogi Blevins",
  description: "Join Yogi Blevins for upcoming workshops, classes, and retreats.",
};

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

interface EventCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export default async function EventsPage() {
  const [events, categories] = await Promise.all([
    sanityFetch<Event[]>({ query: UPCOMING_EVENTS_QUERY, revalidate: 0 }),
    sanityFetch<EventCategory[]>({ query: EVENT_CATEGORIES_QUERY }),
  ]);

  return (
    <PageLayout>
      <Section
        id="events-hero"
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
              Upcoming Events
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-text-muted md:text-xl">
              Join me for workshops, classes, and retreats designed to deepen your practice 
              and nurture your spirit.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/events"
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent-hover"
              >
                All Events
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/events/category/${category.slug.current}`}
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
        id="events-list"
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#F8EDE3" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {events.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-primary-text">
                No upcoming events
              </h2>
              <p className="mt-3 text-lg text-primary-text-muted">
                Check back soon! New workshops and classes are being planned.
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

