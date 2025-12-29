"use client";
import React, { useRef, useState } from "react";
import { Container } from "../container";
import { strapiImage } from '@/lib/strapi/strapiImage';

// Tách phần render video thành 1 hàm riêng
function RenderVideo({
  videoUrl,
  videoRef,
  paused,
  handlePause,
  handlePlay,
}: {
  videoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  paused: boolean;
  handlePause: () => void;
  handlePlay: () => void;
}) {
  return (
    <div className="relative w-full max-w-[570px]">
      <video
        ref={videoRef}
        src={strapiImage(videoUrl)}
        autoPlay
        loop
        muted
        controls={false}
        playsInline
        className="w-full h-[400px] object-cover bg-black"
        poster=""
      />
      <button
        type="button"
        onClick={!paused ? handlePause : handlePlay}
        className="absolute inset-0 z-10 bg-transparent rounded-[10px] cursor-pointer"
        aria-label="Pause video"
      >
        {!paused && (
          <svg className="absolute bottom-[15px] right-[15px]" width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 11.6667H3.33333V0H0V11.6667ZM6.66667 0V11.6667H10V0H6.66667Z" fill="white"/></svg>
        )}
        {paused && (
          <svg className="absolute bottom-[15px] right-[15px]" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2321 6.56901L1.73205 0.569011C1.36754 0.341509 0.842949 0.538012 0.842949 0.987017V13.013C0.842949 13.462 1.36754 13.6585 1.73205 13.431L11.2321 7.43101C11.5966 7.20351 11.5966 6.77651 11.2321 6.56901Z" fill="white"/></svg>
        )}
      </button>
    </div>
  );
}

function RenderMedia({
  video,
  image,
  videoRef,
  paused,
  handlePause,
  handlePlay,
}: {
  video?: { url?: string };
  image?: { url?: string };
  videoRef: React.RefObject<HTMLVideoElement>;
  paused: boolean;
  handlePause: () => void;
  handlePlay: () => void;
}) {
  // ✅ Ưu tiên video
  if (video?.url) {
    return (
      <RenderVideo
        videoUrl={video.url}
        videoRef={videoRef}
        paused={paused}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    );
  }

  // ✅ Fallback sang image (gif)
  if (image?.url) {
    return (
      <div className="relative w-full max-w-[570px]">
        <img
          src={strapiImage(image.url)}
          alt=""
          className="w-full h-[400px] object-cover"
        />
      </div>
    );
  }

  return null;
}


export const FeaturesVideo = ({
  layout = "Black_HeadingTop_FeaturesLeft_VideoRight",
  title,
  description,
  features_title,
  features,
  video,
  image
}: {
  layout: string;
  title: string;
  description: string;
  features_title: string;
  features: { title: string; description: string }[];
  video: { url: string };
  image: { url: string };
}) => {
  
  // Chia features thành 2 cột
  const mid = Math.ceil(features?.length / 2);
  const leftFeatures = features?.slice(0, mid) || [];
  const rightFeatures = features?.slice(mid) || [];

  // Video controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPaused(false);
    }
  };

  return (
    <>
    {layout == "Black_HeadingTop_FeaturesLeft_VideoRight" && (
    <section className="bg-secondary py-20 md:py-25">
      <Container>
        <h2 className="text-[40px] md:text-[48px] font-bold text-primary text-center mb-5">
          {title}
        </h2>
        <div
          className="text-white/80 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start justify-center">
          <div className="flex-1">
            {features_title && (
              <h3 className="text-white/60 text-xl font-semibold mb-6">{features_title}</h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {leftFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#D0BFAC"/></svg>
                  </span>
                  <div>
                    <div className="text-white text-base">{feature.title}</div>
                    <div className="text-white text-base">{feature.description}</div>
                  </div>
                </div>
              ))}
              {rightFeatures.map((feature, idx) => (
                <div key={mid + idx} className="flex items-start gap-3">
                  <span className="mt-1">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#D0BFAC"/></svg>
                  </span>
                  <div>
                    <div className="text-white text-base">{feature.title}</div>
                    <div className="text-white text-base">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center max-md:w-full">
            <RenderMedia
              video={video}
              image={image}
              videoRef={videoRef}
              paused={paused}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
          </div>
        </div>
      </Container>
    </section>
    )}

    {layout == "Black_HeadingTop_FeaturesLeft1Column_VideoRight" && (
    <section className="bg-secondary py-20 md:py-25">
      <Container>
        <h2 className="text-[40px] md:text-[48px] font-bold text-primary text-center mb-5">
          {title}
        </h2>
        <div
          className="text-white/80 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start justify-center">
          <div className="flex-1">
            {features_title && (
              <h3 className="text-white/60 text-xl font-semibold mb-6">{features_title}</h3>
            )}
            <div className="grid grid-cols-1 gap-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#D0BFAC"/></svg>
                  </span>
                  <div>
                    <div className="text-primary text-base">{feature.title}</div>
                    <div className="text-white/80 text-base">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center max-md:w-full">
            <RenderMedia
              video={video}
              image={image}
              videoRef={videoRef}
              paused={paused}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
          </div>
        </div>
      </Container>
    </section>
    )}

    {layout == "VideoLeft_FeaturesRight" && (
    <section className="bg-primary py-20 md:py-25">
        <Container>
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-25">
                <div className="flex-1 flex justify-center items-center max-md:w-full">
                    <RenderMedia
                      video={video}
                      image={image}
                      videoRef={videoRef}
                      paused={paused}
                      handlePause={handlePause}
                      handlePlay={handlePlay}
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-[40px] md:text-[48px] font-bold text-secondary mb-5">
                    {title}
                    </h2>
                    <div
                      className="text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-8 [&_img]:!max-w-full md:[&_img]:!max-w-none [&_img]:h-auto max-md:[&_img]:!mb-0 max-md:[&_img]:!mr-0"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <div className="flex flex-col gap-2">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                            <span className="mt-1">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#1B2431"/></svg>

                            </span>
                            <div>
                                <div className="text-secondary text-base">{feature.title}</div>
                                <div className="text-secondary text-base">{feature.description}</div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>            
        </Container>
    </section>
    )}

    {layout == "Black_HeadingLeft_VideoRight" && (
    <section className="bg-secondary py-20 md:py-25">
        <Container>
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-25">
                <div className="flex-1">
                    <h2 className="text-[40px] md:text-[48px] font-bold text-primary mb-5">
                    {title}
                    </h2>
                    <div
                      className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <div className="flex flex-col gap-2">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                            <span className="mt-1">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#1B2431"/></svg>

                            </span>
                            <div>
                                <div className="text-white text-base">{feature.title}</div>
                                <div className="text-white text-base">{feature.description}</div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center max-md:w-full">
                    <RenderMedia
                      video={video}
                      image={image}
                      videoRef={videoRef}
                      paused={paused}
                      handlePause={handlePause}
                      handlePlay={handlePlay}
                    />
                </div>
            </div>            
        </Container>
    </section>
    )}

    
    {layout == "White_HeadingLeft_VideoRight" && (
    <section className="bg-white py-20 md:py-25">
        <Container>
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-25">
                <div className="flex-1">
                    <h2 className="text-[40px] md:text-[48px] font-bold text-secondary mb-5">
                    {title}
                    </h2>
                    <div
                      className="text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-8"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <div className="flex flex-col gap-2">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                            <span className="mt-1">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#1B2431"/></svg>

                            </span>
                            <div>
                                <div className="text-secondary text-base">{feature.title}</div>
                                <div className="text-secondary text-base">{feature.description}</div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center max-md:w-full">
                    <RenderMedia
                      video={video}
                      image={image}
                      videoRef={videoRef}
                      paused={paused}
                      handlePause={handlePause}
                      handlePlay={handlePlay}
                    />
                </div>
            </div>            
        </Container>
    </section>
    )}
    </>
  );
};
