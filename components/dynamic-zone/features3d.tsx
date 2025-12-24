"use client";
import React, { useRef, useState } from "react";
import { Container } from "../container";
import { strapiImage } from '@/lib/strapi/strapiImage';


export const Features3D = ({
  layout = "Black_HeadingTop_FeaturesLeft_3DRight",
  title,
  description,
  features_title,
  features,
  iframe_url
}: {
  layout: string;
  title: string;
  description: string;
  features_title: string;
  features: { title: string; description: string }[];
  iframe_url: string;
}) => {
  
  return (
    <>
    {layout == "Black_HeadingTop_FeaturesLeft_3DRight" && (
    <section className="bg-secondary py-20 md:py-25">
      <Container>
        <div className="max-w-[800px] mx-auto">
            <h2 className="text-[25px] md:text-[30px] font-semibold text-primary text-center mb-5">
            {title}
            </h2>
            <div
            className="text-white/80 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12"
            dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
        <div className="flex flex-col md:flex-row mt-25 gap-12 md:gap-20 items-start justify-center">
          <div className="flex-1">
            {features_title && (
              <h3 className="text-white/60 text-xl font-semibold mb-6">{features_title}</h3>
            )}
            <div className="grid grid-cols-1 gap-5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#D0BFAC"/></svg>
                  </span>
                  <div>
                    <div className="text-primary text-xl">{feature.title}</div>
                    <div className="text-white/80 text-base">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <iframe id="realsee-container"
                src={iframe_url}
                width="100%" 
                height="100%" 
                style={{minHeight: "400px", border: "none"}}
                allowFullScreen>
            </iframe>
          </div>
        </div>
      </Container>
    </section>
    )}

    {layout == "White_HeadingTop_Features_3D" && (
    <section className="bg-white py-20 md:py-25">
      <Container>
        <div className="max-w-[800px] mx-auto">
            <h2 className="text-[35px] md:text-[48px] font-bold text-secondary text-center mb-5">
            {title}
            </h2>
            <div
            className="text-secondary/80 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12"
            dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
        <div className="flex flex-col mt-15 gap-10 md:gap-15 items-start justify-center">
          <div className="flex-1">
            {features_title && (
              <h3 className="text-white/60 text-xl font-semibold mb-6">{features_title}</h3>
            )}
            <div className="grid grid-cols-1 gap-5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#D0BFAC"/></svg>
                  </span>
                  <div>
                    <div className="text-secondary text-xl">{feature.title}</div>
                    <div className="text-secondary/80 text-base">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <iframe id="realsee-container"
                src={iframe_url}
                width="100%" 
                height="100%" 
                style={{minHeight: "700px", border: "none"}}
                allowFullScreen>
            </iframe>
          </div>
        </div>
      </Container>
    </section>
    )}

    </>
  );
};