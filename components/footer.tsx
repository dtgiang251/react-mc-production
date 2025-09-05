"use client";
import Image from 'next/image';

import React from "react";
import { Logo } from "@/components/logo";
import { HtmlParser } from "./html-parser";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { usePathname } from "next/navigation";
import { BookingForm } from "./booking-form";
import { SvgLoader } from '@/components/svg-loader';
import { Container } from "./container";

export const Footer = ({ data, locale }: { data: any, locale: string }) => {
  const pathname = usePathname();
  // Updated isHomePage check
  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;
  return (
    <div className="relative">
      <div  id="booking" className="absolute -top-[80px] z-0 opacity-0 visibility-hidden"></div>
      <div className="pt-20 relative bg-secondary text-white bg-repeat" style={{ backgroundImage: "url('/images/bg_footer.png')" }}>

        <Container className="footer-main text-base">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-15">
            <div className="contact-left w-full md:w-2/5">
              <h3 className="text-primary font-bold text-[34px] md:text-[48px] mb-5 leading-none">{data?.contact_title || ''}</h3>
              <HtmlParser html={data?.contact_description || ''} />
              <div className="contact-info mt-8 space-y-6">
                {data?.phone && (
                  <div className="flex items-center gap-2">
                    <Image src="/images/phone.svg" alt="phone" width={20} height={20} className="w-5 h-5" />
                    <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-primary">{data.phone}</a>
                  </div>
                )}
                {data?.email && (
                  <div className="flex items-center gap-2">
                    <Image src="/images/email.svg" alt="email" width={20} height={20} className="w-5 h-5" />
                    <a href={`mailto:${data.email}`} className="text-gray-300 hover:text-primary">{data.email}</a>
                  </div>
                )}
                {data?.address && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Image src="/images/location.svg" alt="location" width={20} height={20} className="w-5 h-5" />
                    <span>{data.address}</span>
                  </div>
                )}
              </div>
              
              {data?.social && data.social.length > 0 && (
                <div className="social-links mt-8 flex gap-5">
                  {data.social.map((item: any) => (
                    <a 
                      key={item.id} 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-5 h-5 flex items-center justify-center"
                    >
                      {item.icon && (
                        item.icon.url.endsWith('.svg') ? (
                          <SvgLoader 
                            url={strapiImage(item.icon.url)}
                            className="w-5 h-5"
                          />
                        ) : (
                          <Image 
                            src={strapiImage(item.icon.url)} 
                            alt={item.icon.name}
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        )
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="contact-right w-full md:w-3/5">
              <BookingForm 
                data={data} 
              />
            </div>
          </div>
        </Container>
        <Container className="footer-main text-sm">
          
          <div className="flex flex-col lg:flex-row gap-5 justify-between items-center pb-[30px] lg:pb-16 pt-24">
            <div className="mr-4 md:flex pb-2 leading-none">
              
              <Logo locale={locale} image={data?.logo?.image} company={data?.logo?.company} />
              
            </div>
            <div className="copyright text-center md:text-right">
              <HtmlParser html={data?.copyright || ''} />
            </div>
          </div>

          {isHomePage && (
            <div className="copyright border-t border-gray-400 pt-[30px] lg:pt-[60px] pb-20 text-center">
              <HtmlParser html={data?.designed_developed_by || ''} />
            </div>
          )}
          
        </Container>
      </div>
    </div>
  );
};