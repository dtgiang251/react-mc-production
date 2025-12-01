import { strapiImage } from '../strapi/strapiImage';

export function generateMetadataObject(seo: any) {
  //console.log('SEO data:', seo); // thêm dòng này để debug
  //console.log('metaImage:', seo?.metaImage); // kiểm tra metaImage
  
  return {
    title: seo?.metaTitle || 'Default Title', // Fallback to 'Default Title' if title is not provided
    description: seo?.metaDescription || 'Default Description', // Fallback to 'Default Description'
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || 'Default OG Title',
      description: seo?.ogDescription || seo?.metaDescription || 'Default OG Description',
      images: seo?.metaImage?.url 
        ? [{ url: strapiImage(seo.metaImage.url), width: seo.metaImage.width, height: seo.metaImage.height }] 
        : [],
    },
    twitter: {
      card: seo?.twitterCard || 'summary_large_image',
      title: seo?.twitterTitle || seo?.metaTitle || 'Default Twitter Title',
      description: seo?.twitterDescription || seo?.metaDescription || 'Default Twitter Description',
      images: seo?.twitterImage ? [{ url: seo.twitterImage }] : [],
    },
  }
}