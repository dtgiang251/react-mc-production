"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSlugContext } from "@/app/context/SlugContext";
import { BlurImage } from "./blur-image";

type LocaleSwitcherProps = {
  currentLocale: string;
  variant?: "dropdown" | "inline";
};

export function LocaleSwitcher({
  currentLocale,
  variant = "dropdown",
}: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname(); // Current path
  const segments = pathname.split("/"); // Split path into segments

  // Generate localized path for each locale
  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`; // Default to root path for the locale

    // Handle homepage (e.g., "/en" -> "/fr")
    if (segments.length <= 2) {
      return `/${locale}`;
    }

    // Handle dynamic paths (e.g., "/en/blog/[slug]")
    if (localizedSlugs[locale]) {
      segments[1] = locale; // Replace the locale
      segments[segments.length - 1] = localizedSlugs[locale]; // Replace slug if available
      return segments.join("/");
    }

    // Fallback to replace only the locale
    segments[1] = locale;
    return segments.join("/");
  };

  if (variant === "inline") {
    return (
      <div className="flex gap-4">
        {Object.keys(localizedSlugs).map((locale) => (
          <Link
            key={locale}
            href={generateLocalizedPath(locale)}
            className={locale === currentLocale ? "opacity-50" : ""}
          >
            <div className="flex items-center justify-center">
              <BlurImage
                src={`/images/${locale}.svg`}
                alt={locale}
                width={30}
                height={30}
                className=""
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex gap-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center">
          <BlurImage
            src={`/images/${currentLocale}.svg`}
            alt={currentLocale}
            width={30}
            height={30}
            className=""
          />
        </div>
      </div>

      {isOpen && !pathname.includes("/products/") && (
        <div className="absolute top-full left-0 z-10 pt-3">
          {Object.keys(localizedSlugs)
            .filter((locale) => locale !== currentLocale)
            .map((locale) => (
              <Link
                key={locale}
                href={generateLocalizedPath(locale)}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center">
                  <BlurImage
                    src={`/images/${locale}.svg`}
                    alt={locale}
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
