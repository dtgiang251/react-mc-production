import React from 'react'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/context/cart-context';
import { FooterProvider } from '@/context/FooterContext';
import { cn } from '@/lib/utils';
import { ViewTransitions } from 'next-view-transitions';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { i18n } from '@/i18n.config'
import { CookieConsent } from '@/components/cookie-consent';

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
    params,
}: {
    params:  { locale: string; slug: string };
}): Promise<Metadata> {
    const pageData = await fetchContentType(
        'global',
        {
            filters: { locale: params.locale },
            populate: "seo. metaImage",
        },
        true
    );

    const seo = pageData?.seo;
    const metadata = generateMetadataObject(seo);
    
    // 🔥 Dùng absolute URLs - Giải pháp chắc chắn nhất
    const siteUrl = process.env.WEBSITE_URL || 'https://mc-production.lu/';
    
    return {
        ...metadata,
        metadataBase: new URL(siteUrl),
        icons: {
            icon: [
                // ⭐ QUAN TRỌNG: Dùng absolute URLs cho tất cả
                { url: `${siteUrl}/favicon.ico`, sizes: 'any' },
                { url: `${siteUrl}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
                { url: `${siteUrl}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
                // Google yêu cầu ít nhất 1 favicon >= 48x48px
                { url: `${siteUrl}/favicon-48x48.png`, sizes: '48x48', type: 'image/png' },
                { url:  `${siteUrl}/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
                { url: `${siteUrl}/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
            ],
            apple: [
                { url: `${siteUrl}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
            ],
            shortcut:  [`${siteUrl}/favicon.ico`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const currentLocale = locale || i18n.defaultLocale;
    
    const pageData = await fetchContentType('global', { 
        filters: { locale: currentLocale }
    }, true);

    const cookieTranslations = {
        title:  pageData?.cookie_consent?.title || 'Cookies',
        description: pageData?. cookie_consent?.description || 'We use cookies to improve your experience.',
        accept: pageData?.cookie_consent?. accept_button || 'Accept',
        decline: pageData?.cookie_consent?. decline_button || 'Decline'
    };

    return (
        <html lang={currentLocale}>
            <head>
                {/* Google tag (gtag.js) */}
                <script async src="https://www.googletagmanager.com/gtag/js? id=G-HYTK9KVPTG"></script>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-HYTK9KVPTG');
                    `,
                  }}
                />
            </head>
            <ViewTransitions>
                <CartProvider>
                    <body
                        className={cn(
                            inter.className,
                            "bg-white antialiased h-full w-full"
                        )}
                    >
                        <Navbar 
                            data={pageData?.navbar || {}} 
                            footer={pageData?.footer || {}} 
                            locale={currentLocale} 
                        />
                        <FooterProvider data={pageData?.footer || {}}>
                            {children}
                        </FooterProvider>
                        <Footer 
                            data={pageData?.footer || {}} 
                            locale={currentLocale} 
                        />
                        <CookieConsent translations={cookieTranslations} />
                    </body>
                </CartProvider>
            </ViewTransitions>
        </html>
    );
}