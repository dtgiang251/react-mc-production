"use client";

import React from "react";
import { Container } from "@/components/container";
import Image from "next/image";
import Slider from "react-slick"; // Import trực tiếp thay vì dynamic
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { strapiImage } from '@/lib/strapi/strapiImage';

type Feature = {
  title: string;
  description: string;
};

type GalleryImage = {
  url: string;
  alternativeText?: string;
  caption: string;
};

type SliderGalleryProps = {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  gallery: GalleryImage[];
};

export const SliderGallery = ({
  title,
  subtitle,
  description,
  features,
  gallery,
}: SliderGalleryProps) => {
  const [nav1, setNav1] = React.useState<any>(null);
  const [nav2, setNav2] = React.useState<any>(null);
  const sliderRef = React.useRef<Slider | null>(null);
  const thumbSliderRef = React.useRef<Slider | null>(null);
  const [thumbsToShow, setThumbsToShow] = React.useState(7);
  const thumbContainerRef = React.useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (thumbContainerRef.current) {
        const containerWidth = thumbContainerRef.current.offsetWidth;
        const count = Math.floor(containerWidth / 88);
        setThumbsToShow(count > 0 ? count : 1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cập nhật nav1/nav2 sau khi component đã mount
  React.useEffect(() => {
    if (sliderRef.current && nav1 !== sliderRef.current) {
      setNav1(sliderRef.current);
    }
    if (thumbSliderRef.current && nav2 !== thumbSliderRef.current) {
      setNav2(thumbSliderRef.current);
    }
  }, [sliderRef.current, thumbSliderRef.current]);

  const NextArrow = (props: any) => (
    <button
      {...props}
      type="button"
      className="slick-arrow slick-next !right-[-40px] !z-10 bg-transparent border-none p-0"
      aria-label="Next"
    >
      <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.08327 0L0 0.5L11 14L0 27L1.08327 28L12.8333 14L1.08327 0Z" fill="#D0BFAC"/>
      </svg>
    </button>
  );

  const PrevArrow = (props: any) => (
    <button
      {...props}
      type="button"
      className="slick-arrow slick-prev !left-[-40px] !z-10 bg-transparent border-none p-0"
      aria-label="Previous"
      style={{ transform: "rotate(180deg)" }}
    >
      <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.08327 0L0 0.5L11 14L0 27L1.08327 28L12.8333 14L1.08327 0Z" fill="#D0BFAC"/>
      </svg>
    </button>
  );

  const mainSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    asNavFor: nav2,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const thumbSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(gallery.length, thumbsToShow),
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    centerMode: false,
    asNavFor: nav1,
  };

  return (
    <section className="bg-[#1B2431] text-white py-20 md:py-25 px-2">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-[34px] md:text-5xl leading-snug text-primary text-center mb-4">
            {title}
          </h2>
          <h3 className="font-medium text-xl md:text-3xl text-primary text-center mb-[30px]">
            {subtitle}
          </h3>
          <p className="max-w-[800px] text-xl text-white text-center mb-14">
            {description}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-14 w-full">
            {features.map((feature, idx) => (
              <div key={idx} className="flex-1 text-center px-2">
                <h4 className="font-bold text-xl text-primary mb-2">
                  {feature.title}
                </h4>
                <p className="text-white text-base">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-[945px] mx-auto">
              <Slider
                {...mainSettings}
                ref={sliderRef}
                asNavFor={nav2}
              >
                {gallery.map((img, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-full h-[350px] md:h-[430px] flex items-center justify-center bg-black">
                      <Image
                        src={strapiImage(img.url)}
                        alt={img.alternativeText || ""}
                        width={945}
                        height={430}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="mt-[10px] text-primary text-sm pl-10">
                      {img.caption}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mt-12 w-full max-w-[945px] mx-auto" ref={thumbContainerRef}>
              <Slider
                {...thumbSettings}
                ref={thumbSliderRef}
                asNavFor={nav1}
              >
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (sliderRef.current) sliderRef.current.slickGoTo(idx);
                      if (thumbSliderRef.current) thumbSliderRef.current.slickGoTo(idx);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`border-0 ${
                        currentSlide === idx
                          ? "opacity-40"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={strapiImage(img.url)}
                        alt={img.alternativeText || ""}
                        width={88}
                        height={88}
                        className="object-cover w-[88px] h-[88px]"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Container>
      <style jsx global>{`
        .slick-prev:before,
        .slick-next:before {
          display: none !important;
        }
        @media (max-width: 767px) {
          .slick-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
