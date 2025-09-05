import { Container } from "./container"; 
import Image from "next/image";
import { Link } from "next-view-transitions";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Article } from "@/types/types";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { HtmlParser } from "./html-parser";
import { headers } from "next/headers";
import { i18n } from "@/i18n.config";
import { BlogCard, BlogCardSmall } from "@/components/blog-card";
import { Button } from "./elements/button";

export async function BlogLayout({
  article,
  locale,
  children,
}: {
  article: Article;
  locale: string;
  children: React.ReactNode;
}) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const shareUrl = `${protocol}://${domain}${
    locale === i18n.defaultLocale ? "" : `/${locale}`
  }/blog/${article.slug}`;

  const globalData = await fetchContentType(
    "global",
    {
      filters: { locale },
      populate: "*",
    },
    true
  );

  const relatedArticles = await fetchContentType(
    "articles",
    {
      filters: {
        locale,
        id: { $ne: article.id }, // exclude current article
        categories: {
          id: { $in: article.categories?.map((cat: any) => cat.id) || [] },
        },
      },
      pagination: {
        limit: 5,
      },
      populate: "*",
    },
    false
  );

  const featuredPost = relatedArticles?.data?.[0];
  const otherPosts = relatedArticles?.data?.slice(1, 5);

  const isInternalLink = (link: string) => {
    return link.startsWith('/') || link.startsWith('#');
  };

  return (
    <>
      <div className="w-full mx-auto">
        {article.image ? (
          <div className="relative">
            <Image
              src={strapiImage(article.image.url)}
              height="800"
              width="800"
              className="h-96 lg:h-[392px] w-full aspect-square object-cover"
              alt={article.title}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
          </div>
        ) : null }
      </div>
      <Container className="mt-0">
        <div className="xl:relative">
          <div className="mx-auto max-w-[800px]">
            <article className="pb-20 pt-20">
              <header className="flex flex-col">
                <h1 className="text-[34px] font-bold text-secondary sm:text-5xl ">
                  {article.title}
                </h1>
              </header>
              <div className="mt-10 post-content text-base text-gray-500 w-full">
                {children}
              </div>
              <div className="flex items-center justify-between mt-10 mb-10">
                {globalData?.Articles?.booking_message && (
                  <h3 className="text-secondary booking-message text-xl font-semibold">
                    <HtmlParser html={globalData.Articles.booking_message} />
                  </h3>
                )}
              </div>
              <div className="flex flex-col gap-4 items-center mt-10">
                <div className="flex-1">
                  <h4 className="text-secondary text-sm font-medium">
                    {globalData.Articles.share_label}
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.08301 9.99992C2.08301 6.26797 2.08301 4.40199 3.24237 3.24262C4.40175 2.08325 6.26772 2.08325 9.99967 2.08325C13.7316 2.08325 15.5976 2.08325 16.757 3.24262C17.9163 4.40199 17.9163 6.26797 17.9163 9.99992C17.9163 13.7318 17.9163 15.5978 16.757 16.7573C15.5976 17.9166 13.7316 17.9166 9.99967 17.9166C6.26772 17.9166 4.40175 17.9166 3.24237 16.7573C2.08301 15.5978 2.08301 13.7318 2.08301 9.99992Z"
                        stroke="#7A6752"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.1051 6.68933H11.651C10.7812 6.68933 10.0742 7.39108 10.0678 8.26093L9.9967 17.8564M8.40137 11.6688H12.4036"
                        stroke="#7A6752"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      shareUrl
                    )}&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.08301 9.9998C2.08301 6.26785 2.08301 4.40187 3.24237 3.2425C4.40175 2.08313 6.26772 2.08313 9.99967 2.08313C13.7316 2.08313 15.5976 2.08313 16.757 3.2425C17.9163 4.40187 17.9163 6.26785 17.9163 9.9998C17.9163 13.7317 17.9163 15.5977 16.757 16.7571C15.5976 17.9165 13.7316 17.9165 9.99967 17.9165C6.26772 17.9165 4.40175 17.9165 3.24237 16.7571C2.08301 15.5977 2.08301 13.7317 2.08301 9.9998Z"
                        stroke="#7A6752"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.75 9.99988C13.75 12.071 12.0711 13.7499 10 13.7499C7.92893 13.7499 6.25 12.071 6.25 9.99988C6.25 7.92881 7.92893 6.24988 10 6.24988C12.0711 6.24988 13.75 7.92881 13.75 9.99988Z"
                        stroke="#7A6752"
                      />
                      <path
                        d="M14.5907 5.41663H14.583"
                        stroke="#7A6752"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.08398 9.9998C2.08398 6.26785 2.08398 4.40187 3.24335 3.2425C4.40273 2.08313 6.2687 2.08313 10.0006 2.08313C13.7326 2.08313 15.5986 2.08313 16.758 3.2425C17.9173 4.40187 17.9173 6.26785 17.9173 9.9998C17.9173 13.7317 17.9173 15.5977 16.758 16.7571C15.5986 17.9165 13.7326 17.9165 10.0006 17.9165C6.2687 17.9165 4.40273 17.9165 3.24335 16.7571C2.08398 15.5977 2.08398 13.7317 2.08398 9.9998Z"
                        stroke="#7A6752"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.83398 14.1665L9.32863 10.6719M9.32863 10.6719L5.83398 5.83313H8.1488L10.6727 9.32771M9.32863 10.6719L11.8525 14.1665H14.1673L10.6727 9.32771M14.1673 5.83313L10.6727 9.32771"
                        stroke="#7A6752"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {relatedArticles?.data?.length > 0 && (
          <div className="relative z-10 h-full flex flex-col">
            <div className="max-w-7xl w-full px-0 lg:px-20 py-25 mx-auto">
              <div className="relative flex flex-row items-center justify-between mb-12">
                <div className="flex flex-col">
                  {globalData.Articles.more_articles_title && (
                    <h3 className="text-[34px] sm:text-5xl leading-none font-bold relative text-secondary text-center md:text-left">
                      {globalData.Articles.more_articles_title}
                    </h3>
                  )}
                </div>
                {globalData.Articles.more_articles_button_text && (
                  <div className="items-center hidden md:flex">
                    {isInternalLink(globalData.Articles.more_articles_button_link) ? (
                      <Link href={globalData.Articles.more_articles_button_link} passHref>
                        <Button as="span">{globalData.Articles.more_articles_button_text}</Button>
                      </Link>
                    ) : (
                      <Button as="a" href={globalData.Articles.more_articles_button_link}>
                        {globalData.Articles.more_articles_button_text}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {featuredPost && (
                  <div className="featuredPost lg:col-span-4 md:sticky md:top-32 md:h-fit">
                    <BlogCard 
                      key={featuredPost.id}
                      article={featuredPost}
                      locale={locale}
                    />
                  </div>
                )}
                
                {otherPosts && otherPosts.length > 0 && (
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {otherPosts.map((article: Article) => (
                      <BlogCardSmall 
                        key={article.id}
                        article={article}
                        locale={locale}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Button */}
              {globalData.Articles.more_articles_button_text && (
                <div className="flex md:hidden justify-center mt-8">
                  {isInternalLink(globalData.Articles.more_articles_button_link) ? (
                    <Link href={globalData.Articles.more_articles_button_link} passHref>
                      <Button as="span">{globalData.Articles.more_articles_button_text}</Button>
                    </Link>
                  ) : (
                    <Button as="a" href={globalData.Articles.more_articles_button_link}>{globalData.Articles.more_articles_button_text}</Button>
                  )}
                </div>
              )}

            </div>
          </div>
        )}
      </Container>
    </>
  );
}