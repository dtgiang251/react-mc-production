"use client";
import { Container } from "@/components/container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import React, { useRef, useState } from "react";

type FeatureItem = {
  before: { url: string; alternativeText?: string };
  after: { url: string; alternativeText?: string };
  title: string;
  description: string;
  features?: { title: string; description: string }[];
  video: { url: string };
};

type BeforeAfterSectionProps = {
  title: string;
  description: string;
  features: FeatureItem[];
};


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

export const BeforeAfterSection = ({
  title,
  description,
  features,
}: BeforeAfterSectionProps) => {

  
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


  // Custom handle component
  const CustomHandle = () => (
    <div className="flex items-center justify-start h-[53px]">
      <svg width="68" height="91" viewBox="0 0 68 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_dd_1324_5326)">
          <rect x="20" y="50.2906" width="47.7762" height="27.6599" rx="13.83" transform="rotate(-90 20 50.2906)" fill="white"/>
          <rect x="21.2565" y="49.0358" width="45.2323" height="25.129" rx="12.5645" transform="rotate(-90 21.2565 49.0358)" fill="#7A6752"/>
          <path d="M38.6076 31.1803V21.1221M33.83 31.1803V21.1221M29.0524 31.1803V21.1221" stroke="white" strokeWidth="1.25645"/>
        </g>
        <defs>
          <filter id="filter0_dd_1324_5326" x="0" y="0.000110626" width="67.6599" height="92.8052" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="5" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1324_5326"/>
            <feOffset dy="10"/>
            <feGaussianBlur stdDeviation="5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1324_5326"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="5" operator="erode" in="SourceAlpha" result="effect2_dropShadow_1324_5326"/>
            <feOffset dy="20"/>
            <feGaussianBlur stdDeviation="12.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_1324_5326" result="effect2_dropShadow_1324_5326"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1324_5326" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  );



  return (
    <section className="bg-white py-20 md:py-25 px-2">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-bold text-[34px] md:text-5xl leading-snug text-secondary text-left md:text-center mb-6">
                {title}
            </h2>
            <p className="text-xl text-secondary text-left md:text-left mb-14">
                {description}
            </p>
          </div>
          <div className="flex flex-col gap-15 w-full">
            {features.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-25 items-center w-full">
                {/* Before/After Images or Video */}
                {(item.before?.url && item.after?.url) ? (
                  <div className="w-full mx-auto mb-8 [&_a]:transition-none [&_button]:transition-none">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src={strapiImage(item.before.url)}
                          alt={item.before.alternativeText || "Before"}
                          style={{ objectFit: "cover", width: "100%", height: "470px" }}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={strapiImage(item.after.url)}
                          alt={item.after.alternativeText || "After"}
                          style={{ objectFit: "cover", width: "100%", height: "470px" }}
                        />
                      }
                      style={{ width: "100%", height: "470px" }}
                      handle={<CustomHandle />}
                    />
                  </div>
                ) : item.video?.url ? (
                  <RenderVideo
                    videoUrl={item.video.url}
                    videoRef={videoRef}
                    paused={paused}
                    handlePause={handlePause}
                    handlePlay={handlePlay}
                  />
                ) : null}
                {/* Content */}
                {item.title && (
                <div className="w-full flex flex-col md:flex-row gap-10">
                  <div className="text-left w-full md:w-1/2">
                    <h3 className="text-xl md:text-3xl font-bold text-secondary mb-5">{item.title}</h3>
                    <p className="text-xl text-secondary">{item.description}</p>
                  </div>
                {item.features && item.features.length > 0 && (
                    <ul className="flex flex-col gap-5 mt-2 w-full md:w-1/2">
                    {item.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 flex-shrink-0">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.3645 11.6355 0 7.5 0ZM6.00075 10.8098L3.216 8.031L4.275 6.969L5.99925 8.69025L9.96975 4.71975L11.0303 5.78025L6.00075 10.8098Z" fill="#D0BFAC"/></svg>
                        </span>
                        <div>
                            <span className="text-xl font-bold text-secondary">{f.title}</span>
                            <span className="text-secondary text-base block">{f.description}</span>
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
