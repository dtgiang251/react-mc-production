"use client";
import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

import { i18n } from "@/i18n.config";
import { useParams } from 'next/navigation';
import { translations } from '@/translations/common';
import { Locale } from '@/translations/types';

// Helper to get YouTube video ID from URL
const getYoutubeVideoId = (url: string) => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : "";
};

type PortfolioItem = {
  image: { url: string; alternativeText?: string };
  youtube_link?: string;
  video_mp4?: { url: string };
};

type TabItem = {
  title: string;
  tabID: string;
  PortfolioItem: PortfolioItem[];
};

export const PortfolioTab = ({ PortfolioTabItem }: { PortfolioTabItem: TabItem[] }) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(12);
  const [mediaType, setMediaType] = useState<'video' | 'image' | null>(null);

  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);

  // Set active tab dựa trên query parameter khi component mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const tabIndex = PortfolioTabItem.findIndex(item => item.tabID === tabParam);
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
      }
    }
  }, [searchParams, PortfolioTabItem]);

  const currentItems = PortfolioTabItem[activeTab]?.PortfolioItem || [];
  const displayedItems = currentItems.slice(0, visibleItems);
  const hasMore = visibleItems < currentItems.length;
  const currentItem = currentItems[currentIndex];
  const currentVideoId = currentItem?.youtube_link ? getYoutubeVideoId(currentItem.youtube_link) : "";

  const plyrProps = useMemo(() => {
    if (!currentVideoId) return null;
    return {
      source: {
        type: "video" as const,
        sources: [
          {
            src: currentVideoId,
            provider: "youtube" as const,
          },
        ],
      },
      options: {
        autoplay: true,
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      },
    };
  }, [currentVideoId]);

  const handleItemClick = (index: number) => {
    setCurrentIndex(index);
    setMediaType(null);
    setShowGallery(true);
    setTimeout(() => {
      const item = currentItems[index];
      if (item?.youtube_link) {
        setMediaType('video');
      } else if (item?.video_mp4) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }, 10);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : currentItems.length - 1;
    setMediaType(null);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      const item = currentItems[newIndex];
      if (item?.youtube_link) {
        setMediaType('video');
      } else if (item?.video_mp4) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }, 10);
  };

  const goToNext = () => {
    const newIndex = currentIndex < currentItems.length - 1 ? currentIndex + 1 : 0;
    setMediaType(null);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      const item = currentItems[newIndex];
      if (item?.youtube_link) {
        setMediaType('video');
      } else if (item?.video_mp4) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }, 10);
  };

  const handleThumbnailClick = (index: number) => {
    setMediaType(null);
    setCurrentIndex(index);
    setTimeout(() => {
      const item = currentItems[index];
      if (item?.youtube_link) {
        setMediaType('video');
      } else if (item?.video_mp4) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }, 10);
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + 12);
  };

  return (
    <>
      <section className="bg-white relative py-20">
        
        <Container className="px-5 md:px-10 lg:px-24 relative z-10">
          {/* Tab Navigation - scrollable on mobile, centered on desktop */}
          <div className="w-full overflow-x-auto scrollbar-none mb-12">
            <div className="flex flex-nowrap gap-4 min-w-max justify-center sm:justify-center">
              {PortfolioTabItem.map((tab, index) => (
                <button
                  key={tab.tabID}
                  onClick={() => {
                    setActiveTab(index);
                    setVisibleItems(12);
                  }}
                  className={`text-lg font-medium transition-colors whitespace-nowrap px-4 py-2 ${
                    activeTab === index
                      ? 'text-primary2 border-b-2 border-primary2'
                      : 'text-secondary hover:text-primary2'
                  }`}
                  style={{ minWidth: 100 }}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]">
            {displayedItems.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => handleItemClick(index)}
              >
                {item.image?.url && (
                  <>
                    <Image
                      src={strapiImage(item.image.url)}
                      alt={item.image.alternativeText || `Portfolio image ${index + 1}`}
                      width={1000}
                      height={300}
                      className="object-cover transition-transform duration-300 h-[300px]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {(item.youtube_link || item.video_mp4) ? (
                        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="25.5" cy="25.5" r="25" fill="white"/>
                          <path d="M35.6562 24.5894C36.6979 25.1716 36.6979 26.6272 35.6562 27.2094L21.5937 35.0695C20.5521 35.6517 19.25 34.9239 19.25 33.7595L19.25 18.0393C19.25 16.8749 20.5521 16.1471 21.5938 16.7293L35.6562 24.5894Z" fill="#1B2431"/>
                        </svg>
                      ) : (
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                {translations[currentLocale]?.loadmore || translations[i18n.defaultLocale].loadmore}Load more
              </button>
            </div>
          )}

          {/* Gallery Lightbox */}
          {showGallery && currentItem && (
            <div className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center p-4">
              {/* Close Button */}
              <button 
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
              >✕</button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7507 0L12.834 0.5L1.83398 14L12.834 27L11.7507 28L0.000712395 14L11.7507 0Z" fill="#D0BFAC"/>
</svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.08327 0L0 0.5L11 14L0 27L1.08327 28L12.8333 14L1.08327 0Z" fill="#D0BFAC"/>
</svg>
              </button>

              {/* Main Content */}
              <div className="w-full max-w-6xl flex flex-col items-center gap-4">
                {/* Image or Video */}
                <div className="relative w-full min-h-[400px] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  {mediaType === 'video' && currentVideoId && plyrProps ? (
                    <div className="aspect-video w-full">
                      <Plyr key={currentVideoId} {...plyrProps} />
                    </div>
                  ) : mediaType === 'video' && currentItem.video_mp4?.url ? (
                    <div className="aspect-video w-full">
                      <video
                        key={currentItem.video_mp4.url}
                        controls
                        autoPlay
                        className="w-full h-full"
                      >
                        <source src={strapiImage(currentItem.video_mp4.url)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : mediaType === 'image' && currentItem.image?.url ? (
                    <div className="relative w-full flex items-center justify-center">
                      <Image
                        src={strapiImage(currentItem.image.url)}
                        alt={currentItem.image.alternativeText || ''}
                        width={1440}
                        height={775}
                        className="max-h-[70vh] w-auto object-contain"
                      />
                      {currentItem.image.alternativeText && (
                        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded">
                          {currentItem.image.alternativeText}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Thumbnail Slider */}
                <div className="w-full overflow-x-auto">
                  <div className="flex gap-2 justify-center min-w-max px-4">
                    {currentItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-20 h-20 overflow-hidden transition-all ${
                          index === currentIndex ? 'opacity-40' : 'opacity-100'
                        }`}
                      >
                        {item.image?.url && (
                          <>
                            <Image
                              src={strapiImage(item.image.url)}
                              alt=""
                              fill
                              className="object-cover"
                            />
                            {(item.youtube_link || item.video_mp4) && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <svg width="20" height="20" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="25.5" cy="25.5" r="25" fill="white"/>
                                  <path d="M35.6562 24.5894C36.6979 25.1716 36.6979 26.6272 35.6562 27.2094L21.5937 35.0695C20.5521 35.6517 19.25 34.9239 19.25 33.7595L19.25 18.0393C19.25 16.8749 20.5521 16.1471 21.5938 16.7293L35.6562 24.5894Z" fill="#1B2431"/>
                                </svg>
                              </div>
                            )}
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
