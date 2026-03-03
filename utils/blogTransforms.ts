import { BlogType, TransformedBlogType, BlogCategory as BlogCategoryType } from "@/types/BlogType";
import { Dispatch, SetStateAction } from "react";

export function transformToBlogType(blog: TransformedBlogType): BlogType {
  return {
    id: blog.id,
    categoryId: "", 
    authorId: "",
    template: blog.template,
    title: blog.content.title,
    permalink: blog.metadata.permalink,
    coverImageSrc: blog.content.coverImage.src,
    coverImageAlt: blog.content.coverImage.alt || "", 
    articleContent: blog.content.articleContent,
    gist: blog.content.gist || "",
    seoTitle: blog.metadata.seo_title || "", 
    description: blog.metadata.description || "",
    focusKeywords: blog.metadata.focus_keywords || [], 
    isPublished: true,
    publicationDate: blog?.stats?.publicationDate || new Date().toISOString(),
    publication_iso_date: blog?.stats?.publication_iso_date || null,
    readingTime: blog?.stats?.readingTime || "5 min read",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 0,
    category: blog.category
      ? {
          id: blog.category.id || "",
          name: blog.category.name,
          slug: blog.category.slug,
          isActive: blog.category.isActive || true,
        }
      : undefined,
    author: blog.author
      ? {
          id: "",
          name: blog.author.name,
          bio: blog.author.bio || "",
          image: blog.author.image || "",
          email: blog.author.email || "",
        }
      : undefined,
    tags: blog.content.tags.map((tag) => ({
      id: 0,
      tag: tag,
      color: "#000000", 
    })),
    stats: {
      views: blog?.stats?.views || 0,
      likes: blog?.stats?.likes || 0,
      shares: blog?.stats?.shares || 0,
      lastUpdated: blog?.stats?.lastUpdated || new Date().toISOString(),
      publicationDate: blog?.stats?.publicationDate || new Date().toISOString(),
      publication_iso_date: blog?.stats?.publication_iso_date || null,
      readingTime: blog?.stats?.readingTime || "5 min read",
    },
  };
}

export function transformToTransformedBlogType(
  blog: BlogType,
): TransformedBlogType {
  const category: BlogCategoryType = {
    id: blog.category?.id || "",
    name: blog.category?.name || "",
    slug: blog.category?.slug || "",
    isActive: blog.category?.isActive || false,
  };

  return {
    id: blog.id,
    template: blog.template,
    category,
    content: {
      title: blog.title,
      articleContent: blog.articleContent,
      gist: blog.gist || "",
      tags: blog.tags?.map((t) => t.tag) || [],
      coverImage: {
        src: blog.coverImageSrc,
        alt: blog.coverImageAlt,
      },
    },
    metadata: {
      permalink: blog.permalink,
      seo_title: blog.seoTitle || blog.title,
      description: blog.description || "",
      focus_keywords: blog.focusKeywords || [],
    },
    author: blog.author
      ? {
          name: blog.author.name,
          bio: blog.author.bio || "",
          image: blog.author.image || "",
          email: blog.author.email || "",
        }
      : undefined,
    stats: {
      views: blog.stats.views,
      likes: blog.stats.likes,
      shares: blog.stats.shares,
      lastUpdated: blog.stats.lastUpdated,
      publicationDate: blog.stats.publicationDate,
      publication_iso_date: blog.stats.publication_iso_date,
      readingTime: blog.stats.readingTime,
    },
  };
}

export function createBlogStateHandler(
  setBlogs: Dispatch<SetStateAction<TransformedBlogType[]>>,
): Dispatch<SetStateAction<BlogType[]>> {
  return (newBlogsOrUpdater: SetStateAction<BlogType[]>) => {
    if (typeof newBlogsOrUpdater === "function") {
      setBlogs((currentBlogs) => {
        const currentAsBlogType = currentBlogs.map(transformToBlogType);
        const updatedBlogType = newBlogsOrUpdater(currentAsBlogType);
        return updatedBlogType.map(transformToTransformedBlogType);
      });
    } else {
      setBlogs(newBlogsOrUpdater.map(transformToTransformedBlogType));
    }
  };
}
