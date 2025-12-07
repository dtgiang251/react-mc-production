"use client";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "@/components/elements/button";
import { Logo } from "@/components/logo";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { LocaleSwitcher } from "../locale-switcher";
import { MenuOpenIcon, MenuCloseIcon, PhoneIcon } from "@/components/icons/menu-icons";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { SvgLoader } from '@/components/svg-loader';
import { i18n } from "@/i18n.config";
import Image from 'next/image';
import { useScrollLock } from '@/hooks/useScrollLock';

type NavbarItemType = {
  URL: string;
  text: string;
  target?: string;
  is_submenu?: boolean;
};

type Props = {
  leftNavbarItems: NavbarItemType[];
  rightNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: any;
  locale: string;
  footer: any;
};

// Helper function để nhóm menu thành cấu trúc parent-children
const groupMenuItems = (items: NavbarItemType[]) => {
  const result: Array<NavbarItemType & { children?: NavbarItemType[] }> = [];
  let currentParent: (NavbarItemType & { children?: NavbarItemType[] }) | null = null;

  items.forEach((item) => {
    if (item.is_submenu) {
      if (currentParent) {
        if (!currentParent.children) {
          currentParent.children = [];
        }
        currentParent.children.push(item);
      }
    } else {
      currentParent = { ...item, children: [] };
      result.push(currentParent);
    }
  });

  return result;
};

export const MobileNavbar = ({ leftNavbarItems, rightNavbarItems, logo, locale, footer }: Props) => {
  const [open, setOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  const getLocalizedHref = (path: string) => {
    return `${locale === i18n.defaultLocale ? '' : `/${locale}`}${path}`;
  };

  const groupedMenuItems = groupMenuItems(leftNavbarItems);

  const toggleSubmenu = (text: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(text)) {
        newSet.delete(text);
      } else {
        newSet.add(text);
      }
      return newSet;
    });
  };

  useScrollLock(open);

  return (
    <div
      className={cn(
        "relative flex justify-between bg-transparent items-center w-full px-5 md:px-10 py-4 transition duration-200 leading-none",
        showBackground && " bg-white"
      )}
    >
      <Logo locale={locale} image={logo?.image} company={logo?.company} active={showBackground} />

      <div className="flex flex-row gap-10 items-center">
        <div className="hidden sm:block"><LocaleSwitcher currentLocale={locale} /></div>

        {footer?.phone && (
        <a href={`tel:${footer.phone.replace(/\s+/g, '')}`}><PhoneIcon 
            className="w-10 h-10 cursor-pointer"
            color={showBackground ? "black" : "white"}
          /></a>
        )}

        {open ? (
          <MenuCloseIcon 
            className="w-10 h-10 cursor-pointer"
            color={showBackground ? "black" : "white"}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <MenuOpenIcon 
            className="w-10 h-10 cursor-pointer"
            color={showBackground ? "black" : "white"}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {open && (
        <div className="absolute top-full right-5 md:right-10 mt-5 bg-white w-[335px] rounded-[10px] z-50 flex flex-col items-start justify-start text-base">
         
          <div className="mobile-menu flex flex-col w-full items-center justify-start px-6 pb-6 text-primary2 font-semibold">
            {groupedMenuItems.map((item, idx: number) => (
              <div key={`menu-${idx}`} className="w-full">
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.text)}
                      className="relative w-full text-center py-6 flex items-center justify-center gap-2 has-sub-menu"
                    >
                      <span className="block">{item.text}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${expandedMenus.has(item.text) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedMenus.has(item.text) && (
                      <div className="bg-[#F9FAFB] rounded-[10px] py-2 sub-menu">
                        {item.children.map((child, childIdx: number) => (
                          <Link
                            key={`child-${childIdx}`}
                            href={getLocalizedHref(child.URL)}
                            onClick={() => setOpen(false)}
                            className="block text-center py-3 text-gray-600 hover:text-primary2 transition-colors"
                          >
                            {child.text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={getLocalizedHref(item.URL)}
                    onClick={() => setOpen(false)}
                    className="relative w-full text-center py-6 block"
                  >
                    <span className="block">{item.text}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full items-center justify-center gap-2.5  px-8 pb-4 ">
            {rightNavbarItems.map((item, index) => (
              <Button 
                key={item.text} 
                variant={index === rightNavbarItems.length - 1 ? 'primary' : 'simple'} 
                as={Link}
                className="sm:w-full"
                href={getLocalizedHref(item.URL)}
                onClick={() => setOpen(false)}
              >
                {item.text}
              </Button>
            ))}
          </div>

          {footer?.social && footer.social.length > 0 && (
            <div className="header-social-links mt-2 flex flex-row w-full items-center justify-center px-8 pb-6 gap-5">
              {footer.social.map((item: any) => (
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
                        priority
                      />
                    )
                  )}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-row items-center justify-center w-full px-8 pb-6 gap-5 sm:hidden"><LocaleSwitcher currentLocale={locale} variant="inline" /></div>


        </div>
      )}
    </div>
  );
};