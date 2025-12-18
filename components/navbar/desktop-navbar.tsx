"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/elements/button";
import { NavbarItem } from "./navbar-item";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "next-view-transitions";
import { LocaleSwitcher } from "../locale-switcher";
import { i18n } from "@/i18n.config";
import { Container } from "../container";

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
};

// Helper function để nhóm menu thành cấu trúc parent-children
const groupMenuItems = (items: NavbarItemType[]) => {
  const result: Array<NavbarItemType & { children?: NavbarItemType[] }> = [];
  let currentParent: (NavbarItemType & { children?: NavbarItemType[] }) | null = null;

  items.forEach((item) => {
    //console.log('Processing item:', item);
    if (item.is_submenu) {
      // Nếu là submenu, thêm vào children của parent hiện tại
      if (currentParent) {
        if (!currentParent.children) {
          currentParent.children = [];
        }
        currentParent.children.push(item);
      }
    } else {
      // Nếu không phải submenu, đây là parent mới
      currentParent = { ...item, children: [] };
      result.push(currentParent);
    }
  });

  return result;
};

export const DesktopNavbar = ({ leftNavbarItems, rightNavbarItems, logo, locale }: Props) => {
  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  const groupedMenuItems = groupMenuItems(leftNavbarItems);

  return (
    <motion.div
      className={cn(
        "w-full relative py-5 transition duration-200 bg-transparent mx-auto"
      )}
      animate={{
        width: showBackground ? "100%" : "100%",
        background: showBackground ? "white" : "transparent",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <Container className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Logo locale={locale} image={logo?.image} company={logo?.company} active={showBackground} />
        </div>
        <div className="flex space-x-3 items-center">

          <div className={`flex items-center gap-1.5 ${showBackground ? 'text-secondary' : 'text-white'}`}>
            {groupedMenuItems.map((item) => (
              Array.isArray(item.children) && item.children.length > 0 ? (
                <div key={item.text} className="relative group">
                  <NavbarItem href={item.URL as never} target={item.target}>
                    {item.text}
                    <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </NavbarItem>
                  <div className="absolute left-[30%] top-full mt-2 min-w-[130px] bg-[#f8f8f7]/90 shadow-[0px_4px_20px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 px-2 rounded-[6px]">
                    {item.children.map((child, index) => (
                      <NavbarItem 
                        key={child.text}
                        href={child.URL as never}
                        target={child.target}
                        className={`block font-normal text-sm px-0 py-0 text-left ${showBackground ? 'text-[#504847]' : 'text-[#504847]'} transition-colors ${item.children && index !== item.children.length - 1 ? 'border-b' : ''} rounded-none border-[#9c9b9a] relative`}
                      >
                        {child.text}
                      </NavbarItem>
                    ))}
                  </div>
                </div>
              ) : (
                <NavbarItem 
                  key={item.text}
                  href={item.URL as never}
                  target={item.target}
                >
                  {item.text}
                </NavbarItem>
              )
            ))}
          </div>


          {rightNavbarItems.map((item, index) => (
            <Button 
              key={item.text} 
              variant={index === rightNavbarItems.length - 1 ? 'primary' : 'simple'} 
              as={Link} 
              href={`${locale === i18n.defaultLocale ? '' : `/${locale}`}${item.URL}`}
            >
              {item.text}
            </Button>
          ))}

          <div className="pl-5">
            <LocaleSwitcher currentLocale={locale} />
          </div>

        </div>
      </Container>
    </motion.div>
  );
};
