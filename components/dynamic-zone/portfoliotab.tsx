"use client";
import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

// Helper to get YouTube video ID from URL
const getYoutubeVideoId = (url: string) => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : "";
};

type PortfolioItem = {
  image: { url: string; alternativeText?: string };
  youtube_link?: string;
};

type TabItem = {
  title: string;
  tabID: string;
  PortfolioItem: PortfolioItem[];
};

export const PortfolioTab = ({ PortfolioTabItem }: { PortfolioTabItem: TabItem[] }) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState(12);

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

  const plyrProps = useMemo(() => ({
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
  }), [currentVideoId]);

  const handleItemClick = (item: PortfolioItem) => {
    if (item.youtube_link) {
      setCurrentVideoId(getYoutubeVideoId(item.youtube_link));
      setShowVideo(true);
    } else if (item.image?.url) {
      setCurrentImage(strapiImage(item.image.url));
      setShowImageModal(true);
    }
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + 12);
  };

  const currentItems = PortfolioTabItem[activeTab]?.PortfolioItem || [];
  const displayedItems = currentItems.slice(0, visibleItems);
  const hasMore = visibleItems < currentItems.length;

  return (
    <>
      <section className="bg-white relative py-20">
        <div className="absolute left-0 top-0 max-w-[487px] w-full h-[172px] md:h-[172px] bg-cover bg-center bg-no-repeat z-1"
            style={{ backgroundImage: "url('/images/illustration.svg')" }}
          ></div>
        <Container className="px-5 md:px-10 lg:px-24">
          {/* Tab Navigation */}
          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            {PortfolioTabItem.map((tab, index) => (
              <button
                key={tab.tabID}
                onClick={() => {
                  setActiveTab(index);
                  setVisibleItems(12);
                }}
                className={`text-lg font-medium transition-colors ${
                  activeTab === index
                    ? 'text-primary2  border-primary2'
                    : 'text-secondary hover:text-primary2'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Gallery Grid - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {displayedItems.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => handleItemClick(item)}
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
                      {item.youtube_link ? (
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
                Load more
              </button>
            </div>
          )}

          {/* Video Popup */}
          {showVideo && currentVideoId && (
            <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4" 
                 onClick={() => {
                   setShowVideo(false);
                   setCurrentVideoId("");
                 }}>
              <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => {
                    setShowVideo(false);
                    setCurrentVideoId("");
                  }}
                  className="absolute top-[-50px] right-0 text-white text-3xl hover:text-gray-300 z-10"
                >✕</button>
                {currentVideoId && <Plyr {...plyrProps} />}
              </div>
            </div>
          )}

          {/* Image Modal */}
          {showImageModal && currentImage && (
            <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4" 
                 onClick={() => {
                   setShowImageModal(false);
                   setCurrentImage("");
                 }}>
              <div className="relative max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => {
                    setShowImageModal(false);
                    setCurrentImage("");
                  }}
                  className="absolute top-[-50px] right-0 text-white text-3xl hover:text-gray-300 z-10"
                >✕</button>
                <Image
                  src={currentImage}
                  alt="Portfolio image"
                  width={1200}
                  height={800}
                  className="max-h-[90vh] w-auto object-contain"
                />
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
