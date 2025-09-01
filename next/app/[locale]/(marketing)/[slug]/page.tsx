import { Metadata } from 'next';
import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import ClientSlugHandler from '../ClientSlugHandler';
import { strapiImage } from '@/lib/strapi/strapiImage';
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: params.slug,
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true,
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Page({ params }: { params: { locale: string, slug: string } }) {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: params.slug,
        locale: params.locale,
      },
    },
    true,
  );

  const localizedSlugs = pageData.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = localization.slug;
      return acc;
    },
    { [params.locale]: params.slug }
  );
  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      {pageData.banner_background ? (
        <div 
          className="banner relative z-20 px-5 pb-20 pt-[160px] w-full flex flex-col items-center justify-center text-white"
          style={{ 
            backgroundImage: pageData.banner_background ? 
              `url(${strapiImage(pageData.banner_background.url)})` : 
              'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {pageData.banner_title ? (
          <h1 className="mb-3 text-[50px] md:text-[66px] lg:text-[78px] leading-none text-center font-bold">
            {pageData.banner_title}
          </h1>
          ) : null}

          {pageData.banner_description ? (
          <div className="mx-auto text-[28px] text-center">
            {pageData.banner_description}
          </div>
          ) : null}

        </div>
      ) : null }

      <PageContent pageData={pageData} />
    </>

  );
}