import { BlogType, TransformedBlogType, BlogCategory } from "@/types/BlogType";

/**
 * Transforms a blog from the database format (BlogType) to the frontend format (TransformedBlogType)
 */
export function transformBlogForDisplay(blog: BlogType): TransformedBlogType {
  const category: BlogCategory = {
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
      tags: blog.tags?.map(t => t.tag) || [],
      coverImage: {
        src: blog.coverImageSrc,
        alt: blog.coverImageAlt || "",
      },
    },
    metadata: {
      permalink: blog.permalink,
      seo_title: blog.seoTitle || "",
      description: blog.description || "",
      focus_keywords: blog.focusKeywords || [],
    },
    author: blog.author ? {
      name: blog.author.name,
      bio: blog.author.bio || "",
      image: blog.author.image || "",
      email: blog.author.email || "",
    } : undefined,
    stats: {
      readingTime: blog.readingTime,
      publicationDate: blog.publicationDate,
      publication_iso_date: blog.publication_iso_date || null,
      views: blog.viewCount,
      likes: 0, // Default values
      shares: 0,
      lastUpdated: blog.updatedAt,
    },
  };
}

/**
 * Transforms an array of blogs from DB format to frontend format
 */
export function transformBlogsForDisplay(blogs: BlogType[]): TransformedBlogType[] {
  return blogs.map(transformBlogForDisplay);
} 