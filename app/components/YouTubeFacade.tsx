"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

interface YouTubeFacadeProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export default function YouTubeFacade({ 
  youtubeId, 
  title,
  className = ""
}: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsLoaded(true);
    }
  }, []);

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`aspect-video h-full w-full ${className}`}
      />
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative aspect-video w-full cursor-pointer overflow-hidden bg-black ${className}`}
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={`Thumbnail for ${title}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <svg 
            className="ml-1 h-7 w-7 text-white md:h-8 md:w-8" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm font-medium text-white line-clamp-2">{title}</p>
      </div>
    </div>
  );
}

