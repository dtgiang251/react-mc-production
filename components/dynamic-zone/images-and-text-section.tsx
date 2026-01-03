"use client";
import React from "react";
import { Container } from "../container";
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from 'next/image';

export const ImagesAndTextSection = ({ layout = "Text Right - 3 Images Left", title, description, main_image, small_left_image, small_right_image, features_title, features }: { layout: string;title: string; description: string; main_image: { url: string }; small_left_image: { url: string }; small_right_image: { url: string }; features_title: string; features: any[] }) => {
  return (
    <>
    {layout === "Text Right - 3 Images Left" && (
    <Container className="mt-20 lg:mt-25 mb-20 md:mb-25">
        <div className="md:flex gap-[115px] md:gap-[40px] lg:gap-[100px] md:flex-row items-center">
         
          <div className="relative pl-[26px] md:pl-[46px] md:w-6/12 lg:w-7/12 mb-15">
            {main_image?.url && (
             <Image 
                src={strapiImage(main_image.url)}
                alt="Main interior shot"
                width={800}
                height={568}
                className="w-full h-[450px] lg:h-[568px] lg:w-[95%] object-cover rounded-[10px]"
              />
            )}
            {small_left_image?.url && (
            <div className="absolute bottom-[-30px] md:bottom-[-30px] lg:bottom-[-60px] left-0 lg:left-0">
              <Image 
                src={strapiImage(small_left_image.url)} 
                alt="Detail view"
                width={900}
                height={900}
                className="w-[173px] h-[216px] lg:w-[238px] lg:h-[325px] object-cover rounded-[10px]"
              />
            </div>  
            )}

            {small_right_image?.url && (
            <div className="absolute bottom-[-83px] right-0 md:bottom-[-83px] md:right-0 lg:right-[-20px]"> 
              <Image 
                src={strapiImage(small_right_image.url)} 
                alt="Secondary view"
                width={900}
                height={900}
                className="w-[150px] h-[167px] lg:w-[285px] lg:h-[294px] object-cover rounded-[10px]"
              />
            </div>
            )}
            
          </div>

          
          <div className="flex flex-col justify-center md:w-6/12 lg:w-5/12 md:mb-15">
            <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-bold mb-5 text-secondary">
              {title}
            </h2>
            <p className="font-normal text-gray-500 leading-relaxed text-base">{description}</p>
            
            {features_title && (
            <h3 className="font-semibold text-xl text-secondary/60 mt-6 mb-6">{features_title}</h3>
            )}

            {features && features.length > 0 && (
            <div className="flex flex-col gap-5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-[6px]">
                  <div className="mt-[6px]">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.3645 11.6355 0 7.5 0ZM6.00075 10.8098L3.216 8.031L4.275 6.969L5.99925 8.69025L9.96975 4.71975L11.0303 5.78025L6.00075 10.8098Z" fill="#D0BFAC"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-secondary font-bold text-xl">{feature.title}</h4>
                    <p className="text-base text-secondary">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            )}

          </div>
        </div>
    </Container>
    )}

    {layout === "Text Left - 2 Images Right" && (
    <section className="bg-primary mx-auto pt-15 pb-40 md:pb-16">
        <Container className="md:flex gap-10 lg:gap-10">
          
          <div className="md:w-6/12 lg:w-5/12 flex flex-col justify-center mb-10 md:mb-0">
            <h2 className="w-full md:w-[90%] text-[34px] leading-[40px] md:text-5xl md:leading-[55px]font-inter font-bold mb-5 lg:mb-8 text-secondary">
              {title}
            </h2>
            <p className="font-inter font-normal text-secondary leading-relaxed text-base opacity-[.6]">{description}</p>
          </div>

         
          <div className="md:w-6/12 lg:w-7/12 relative">
            {main_image?.url && (
            <div className="pr-[32px] lg:px-[65px]">
              <Image 
                src={strapiImage(main_image.url)} 
                alt="Main view"
                width={1000}
                height={1000}
                className="w-full h-[400px] lg:h-[590px] object-cover rounded-[10px]"
              />
            </div>
            )}

            {small_right_image?.url && (
            <div className="absolute bottom-[-100px] md:bottom-[-10px] lg:bottom-[-30px] right-0">
              <Image 
                src={strapiImage(small_right_image.url)} 
                alt="Detail view"
                width={1000}
                height={1000}
                className="w-[191px] md:w-[375px] h-[240px] lg:h-[294px] object-cover rounded-[10px]"
              />
            </div>
            )}
          </div>
        </Container>
      </section>
    )}

    {layout === "Heading Top - Features - Image" && (
      <section className="bg-primary mx-auto py-20 md:py-25">
        <Container className="gap-10 lg:gap-10">
          <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-inter font-bold text-secondary md:text-center mb-10 md:mb-25">
            {title}
          </h2>
          <div className="md:flex gap-[40px] md:gap-[40px] lg:gap-[100px] md:flex-row items-center">
            <div className="flex flex-col gap-[26px] md:w-6/12 mb-10 md:mb-0">
              <p className="font-normal text-secondary leading-relaxed text-base">{description}</p>
              
              {features_title && (
              <p className="font-normal text-base text-secondary">{features_title}</p>
              )}

              {features && features.length > 0 && (
              <div className="flex flex-col gap-5">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-[6px]">
                    <div className="mt-[6px]">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.3645 11.6355 0 7.5 0ZM6.00075 10.8098L3.216 8.031L4.275 6.969L5.99925 8.69025L9.96975 4.71975L11.0303 5.78025L6.00075 10.8098Z" fill="#1B2431"/></svg>

                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-secondary font-bold text-xl">{feature.title}</h4>
                      <p className="text-base text-secondary">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              )}

            </div>

            <div className="md:w-6/12">
              {main_image?.url && (
                <Image
                  src={strapiImage(main_image.url)} 
                  alt="Main view"
                  width={1000}
                  height={1000}
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-[10px]"
                />
              )}
            </div>
          </div>
        </Container>
      </section>
    )}

    {layout === "Text Left - 2 Images Right - Black" && (
    <section className="bg-secondary py-20 md:py-25">
    <Container>
      <div className="md:flex gap-[115px] md:gap-[40px] lg:gap-[100px] md:flex-row items-center flex-row-reverse">
        
        <div className="relative pl-[26px] md:pl-[46px] md:w-6/12 lg:w-7/12 mb-15">
          {main_image?.url && (
            <Image 
              src={strapiImage(main_image.url)}
              alt="Main interior shot"
              width={800}
              height={568}
              className="w-full h-[450px] lg:h-[568px] lg:w-[95%] object-cover rounded-[10px]"
            />
          )}
          {small_left_image?.url && (
          <div className="absolute bottom-[-30px] md:bottom-[-30px] lg:bottom-[-60px] left-0 lg:left-0">
            <Image 
              src={strapiImage(small_left_image.url)} 
              alt="Detail view"
              width={900}
              height={900}
              className="w-[173px] h-[216px] lg:w-[238px] lg:h-[325px] object-cover rounded-[10px]"
            />
          </div>  
          )}

          {small_right_image?.url && (
          <div className="absolute bottom-[-83px] right-0 md:bottom-[-83px] md:right-0 lg:right-[-20px]"> 
            <Image 
              src={strapiImage(small_right_image.url)} 
              alt="Secondary view"
              width={900}
              height={900}
              className="w-[150px] h-[167px] lg:w-[285px] lg:h-[294px] object-cover rounded-[10px]"
            />
          </div>
          )}
          
        </div>

        
        <div className="flex flex-col justify-center md:w-6/12 lg:w-5/12">
          <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-bold mb-5 text-primary">
            {title}
          </h2>
          <p className="font-normal text-white leading-relaxed text-base">{description}</p>
          
          {features_title && (
          <h3 className="font-semibold text-xl text-white mt-6 mb-6">{features_title}</h3>
          )}

          {features && features.length > 0 && (
          <div className="flex flex-col gap-5">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-[6px]">
                <div className="mt-[6px]">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.3645 11.6355 0 7.5 0ZM6.00075 10.8098L3.216 8.031L4.275 6.969L5.99925 8.69025L9.96975 4.71975L11.0303 5.78025L6.00075 10.8098Z" fill="#D0BFAC"/></svg>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-bold text-xl">{feature.title}</h4>
                  <p className="text-base text-white">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          )}

        </div>
      </div>
    </Container>
    </section>
    )}

    {layout === "Heading Top - Features Top - BigImage" && (
    <section className="bg-white py-20 md:py-25 px-2">
    <Container>
      <h2 className="text-[34px] leading-[40px] md:text-5xl md:leading-[55px] font-bold mb-5 text-secondary text-center">
        {title}
      </h2>
      <p className="max-w-[800px] mx-auto font-normal text-secondary text-center leading-relaxed text-base">{description}</p>

      {features_title && (
        <h3 className="font-semibold text-xl text-white mt-6 mb-6">{features_title}</h3>
      )}
      {features && features.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 my-15">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-[6px]">
            <div className="mt-[6px]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.3645 11.6355 0 7.5 0ZM6.00075 10.8098L3.216 8.031L4.275 6.969L5.99925 8.69025L9.96975 4.71975L11.0303 5.78025L6.00075 10.8098Z" fill="#D0BFAC"/></svg>
            </div>
            <div className="flex flex-col">
              <h4 className="text-secondary font-normal text-base">{feature.title}</h4>
              <p className="text-base text-secondary">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      )}
        
      <div className="relative">
        {main_image?.url && (
          <Image 
            src={strapiImage(main_image.url)}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        )}
      </div>

    </Container>
    </section>
    )}


    </>
  );
};