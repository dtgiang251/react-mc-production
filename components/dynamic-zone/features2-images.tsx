"use client";
import React, { useRef, useState } from "react";
import { Container } from "../container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const Features2Images = ({
  title,
  description,
  features_left,
  image_left,
  features_right,
  image_right
}: {
  layout: string;
  title: string;
  description: string;
  features_left: { title: string; description: string }[];
  image_left: { url: string };
  features_right: { title: string; description: string }[];
  image_right: { url: string };
}) => {
  
  return (
    <>
    <section className="bg-primary py-20 md:py-25">
      <Container>
        <div className="max-w-[800px] mx-auto">
            <h2 className="text-[40px] md:text-[48px] font-bold text-secondary text-center mb-5">
            {title}
            </h2>
            <div
            className="text-secondary/80 text-lg md:text-xl text-center"
            dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-25">
            <div className="flex flex-col gap-5 items-start justify-center">
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-5">
                    {features_left.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                        <span className="mt-1">
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#1B2431"/></svg>
                        </span>
                        <div>
                            <div className="text-secondary text-xl">{feature.title}</div>
                            <div className="text-secondary/80 text-base">{feature.description}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    {image_left?.url && (
                        <Image 
                        src={strapiImage(image_left.url)}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center">
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-5">
                    {features_right.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                        <span className="mt-1">
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C14.6355 18 18 14.6355 18 10.5C18 6.3645 14.6355 3 10.5 3ZM9.00075 13.8098L6.216 11.031L7.275 9.969L8.99925 11.6903L12.9698 7.71975L14.0303 8.78025L9.00075 13.8098Z" fill="#1B2431"/></svg>
                        </span>
                        <div>
                            <div className="text-secondary text-xl">{feature.title}</div>
                            <div className="text-secondary/80 text-base">{feature.description}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    {image_right?.url && (
                        <Image 
                        src={strapiImage(image_right.url)}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                        />
                    )}
                </div>
            </div>
        </div>
      </Container>
    </section>

    </>
  );
};