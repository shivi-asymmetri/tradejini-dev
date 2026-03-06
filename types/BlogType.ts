// Base interfaces for nested objects
interface BlogAuthor {
  id?: string;
  name: string;
  bio: string;
  image: string;
  email?: string;
}

export interface BlogCategory {
  id?: string;
  name: string;
  slug: string;
  isActive?: boolean;
}

interface BlogStats {
  views: number;
  likes: number;
  shares: number;
  lastUpdated: string;
  publicationDate: string;
  publication_iso_date: Date | null;
  readingTime: string;
}

interface BlogContent {
  title: string;
  articleContent: string;
  gist: string;
  tags: string[];
  coverImage: {
    src: string;
    alt: string;
  };
}

interface BlogMetadata {
  seo_title: string;
  permalink: string;
  description: string;
  focus_keywords: string[];
}

// Unified blog type that combines all necessary fields
export interface UnifiedBlogType {
  id: string;
  template: string;
  content: BlogContent;
  metadata: BlogMetadata;
  category: BlogCategory;
  author?: BlogAuthor;
  stats: BlogStats;
}

// Keep existing types for backward compatibility
export interface BlogType {
  id: string;
  template: string;
  categoryId: string;
  authorId: string;
  title: string;
  coverImageSrc: string;
  coverImageAlt: string;
  articleContent: string;
  gist: string;
  publicationDate: string;
  publication_iso_date?: Date | null;
  readingTime: string;
  seoTitle: string;
  permalink: string;
  description: string;
  focusKeywords: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  viewCount: number;
  category?: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
  author?: {
    id: string;
    name: string;
    bio?: string;
    image?: string;
    email?: string;
  };
  tags?: Array<{
    id: number;
    tag: string;
    color: string;
  }>;
  stats: BlogStats;
}

// TransformedBlogType now includes all properties from UnifiedBlogType
export interface TransformedBlogType {
  id: string;
  template: string;
  content: BlogContent;
  metadata: BlogMetadata;
  category: BlogCategory;
  author?: BlogAuthor;
  stats: BlogStats;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  blogs: UnifiedBlogType[];
  pagination?: {
    currentPage: number;
    totalBlogs: number;
    hasMore: boolean;
    totalPages: number;
  };
}

export interface BlogsResponse {
  blogs: BlogType[];
  tags?: Array<{
    id: number;
    tag: string;
    color: string;
  }>;
}

