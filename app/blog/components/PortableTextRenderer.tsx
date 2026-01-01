"use client";

import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-primary-text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-serif text-3xl font-bold text-primary-text first:mt-0 md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 font-serif text-2xl font-semibold text-primary-text first:mt-0 md:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-8 font-serif text-xl font-semibold text-primary-text first:mt-0 md:text-2xl">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-primary-text">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-accent bg-accent/10 py-4 pl-6 pr-4 italic text-primary-text">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-primary-text">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-primary-text">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-accent/20 px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    link: ({ value, children }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-accent underline decoration-accent/50 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}

