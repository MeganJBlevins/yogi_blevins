import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/app/components/PageLayout";
import Section from "@/app/components/Section";
import { Mandala } from "@/app/components";
import { sanityFetch } from "@/src/sanity/lib/live";
import { EVENT_CATEGORIES_QUERY } from "@/src/sanity/lib/queries";
import { EventCard } from "../../components";
import Link from "next/link";

const EVENT_CATEGORY_QUERY = `*[_type == "eventCategory" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description
}`;

const UPCOMING_EVENTS_BY_CATEGORY_QUERY = `*[_type == "event" && category._ref == $categoryId && eventDate >= now()] | order(eventDate asc) {
  _id,
  title,
  slug,
  description,
  eventDate,
  endDate,
  location,
  registrationUrl,
  image,
  featured,
  "category": category->{ _id, title, slug }
}`;

interface EventCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await sanityFetch<EventCategory | null>({
    query: EVENT_CATEGORY_QUERY,
    params: { slug },
  });

  if (!category) {
    return { title: "Category Not Found | Yogi Blevins" };
  }

  return {
    title: `${category.title} Events | Yogi Blevins`,
    description: category.description || `Browse upcoming ${category.title} events with Yogi Blevins.`,
  };
}

export default async function EventCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  const category = await sanityFetch<EventCategory | null>({
    query: EVENT_CATEGORY_QUERY,
    params: { slug },
  });

  if (!category) {
    notFound();
  }

  const [events, allCategories] = await Promise.all([
    sanityFetch<Event[]>({
      query: UPCOMING_EVENTS_BY_CATEGORY_QUERY,
      params: { categoryId: category._id },
    }),
    sanityFetch<EventCategory[]>({ query: EVENT_CATEGORIES_QUERY }),
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
              href="/events"
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
              All Events
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
              href="/events"
              className="rounded-full border-2 border-accent bg-transparent px-5 py-2 text-sm font-medium text-primary-text transition-all duration-200 hover:bg-accent/10"
            >
              All Events
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat._id}
                href={`/events/category/${cat.slug.current}`}
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
        id="category-events"
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
                No upcoming {category.title} events
              </h2>
              <p className="mt-3 text-lg text-primary-text-muted">
                Check back soon! New events are being planned.
              </p>
              <Link
                href="/events"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md"
              >
                View All Events
              </Link>
            </div>
          )}
        </div>
      </Section>
    </PageLayout>
  );
}

