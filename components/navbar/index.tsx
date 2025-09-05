"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion } from "framer-motion";

interface Props {
  data: any;
  footer: any;
  locale: string;
}

export function Navbar({ data, footer, locale }: Props) {
  if (!data) {
    console.warn("No navbar data provided");
    return null;
  }

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)",
        backdropFilter: "blur(0px)",
      }}
    >
      <div className="hidden xl:block w-full">
        {data?.left_navbar_items && (
          <DesktopNavbar
            locale={locale}
            leftNavbarItems={data?.left_navbar_items}
            rightNavbarItems={data?.right_navbar_items}
            logo={data?.logo}
          />
        )}
      </div>
      <div className="flex h-full w-full items-center xl:hidden ">
        {data?.left_navbar_items && (
          <MobileNavbar
            locale={locale}
            leftNavbarItems={data?.left_navbar_items}
            rightNavbarItems={data?.right_navbar_items}
            logo={data?.logo}
            footer={footer}
          />
        )}
      </div>
    </motion.nav>
  );
}