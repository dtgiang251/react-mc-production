"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../elements/button";
import { HtmlParser } from "../html-parser";
import Link from "next/link";
import { BlogCard, BlogCardSmall } from "@/components/blog-card";
import fetchContentTypeClient from "@/lib/strapi/fetchContentTypeClient";
import { Article } from "@/types/types";
import { Container } from "../container";

export const Blog = ({ 
  layout, 
  title, 
  description, 
  button_text, 
  button_link,
  locale, // Add locale prop
}: { 
  layout: string; 
  title: string; 
  description: string; 
  button_text: string; 
  button_link: string;
  locale: string; // Add type for locale
}) => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const articles = await fetchContentTypeClient('articles', {
          filters: { locale },
          populate: '*',
          pagination: {
            page: currentPage,
            pageSize: layout === 'Featured Posts' ? 5 : 12
          }
        });

        if (articles?.data) {
          setPosts(articles.data);
          setTotalPages(articles.meta.pagination.pageCount);
        }
      } catch (error) {
        console.error('Lỗi khi fetch bài viết:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [locale, currentPage, layout]);

  const isInternalLink = (link: string) => {
    return link.startsWith('/') || link.startsWith('#');
  };

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 5);
  const allPosts = posts.slice(0, 12); // Lấy 12 bài viết cho layout Blog Posts

  const renderFeaturedLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {featuredPost && (
        <div className="featuredPost lg:col-span-4 md:sticky md:top-32 md:h-fit">
          <BlogCard 
            article={featuredPost}
            locale={locale}
          />
        </div>
      )}
      
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherPosts.map((article) => (
          <BlogCardSmall 
            key={article.id}
            article={article}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );

  const renderBlogPostsLayout = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((article) => (
          <BlogCard 
            key={article.id}
            article={article}
            locale={locale}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex gap-2 py-2 disabled:opacity-50 text-secondary text-[15px]"
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6276 10.5001H4.96094M4.96094 10.5001L10.7943 16.3334M4.96094 10.5001L10.7943 4.66675" stroke="#1B2431" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Previous
          </button>
          
          <div className="hidden md:flex items-center gap-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-10 h-10 text-[15px] flex items-center justify-center rounded-lg ${
                currentPage === idx + 1 
                  ? 'text-primary' 
                  : 'text-secondary'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex gap-2 py-2 disabled:opacity-50 text-secondary text-[15px]"
          >
            Next <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.96094 10.5001H16.6276M16.6276 10.5001L10.7943 4.66675M16.6276 10.5001L10.7943 16.3334" stroke="#1B2431" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="relative z-10 border-t border-gray-200 h-full flex flex-col py-25">
      <Container>
        {/* Header Section */}
        <div className="relative flex flex-row items-center justify-between mb-12">
          <div className="flex flex-col">
            {title && (
              <h3 className="text-[34px] sm:text-5xl leading-none font-bold relative text-secondary text-left">
                {title}
              </h3>
            )}
            {description && (
              <div className="mt-2 md:mt-6 text-base leading-relaxed text-secondary relative ttext-left">
                <HtmlParser html={description} />
              </div>
            )}
          </div>
          {button_text && (
            <div className="items-center hidden md:flex">
              {isInternalLink(button_link) ? (
                <Link href={button_link} passHref>
                  <Button as="span">{button_text}</Button>
                </Link>
              ) : (
                <Button as="a" href={button_link}>{button_text}</Button>
              )}
            </div>
          )}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className={`grid grid-cols-1 ${
            layout === 'Featured Posts' 
              ? 'lg:grid-cols-12' 
              : 'md:grid-cols-2 lg:grid-cols-3'
          } gap-8`}>
            {[...Array(layout === 'Featured Posts' ? 5 : 12)].map((_, i) => (
              <div key={i} className={`animate-pulse ${
                layout === 'Featured Posts' && i === 0 ? 'lg:col-span-4' : ''
              }`}>
                <div className="aspect-[380/250] bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          layout === 'Featured Posts' ? renderFeaturedLayout() : renderBlogPostsLayout()
        )}

        {/* Mobile Button */}
        {button_text && (
          <div className="flex md:hidden justify-center mt-8">
            {isInternalLink(button_link) ? (
              <Button href={button_link} as="a">{button_text}</Button>
            ) : (
              <Button as="a" href={button_link}>{button_text}</Button>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};