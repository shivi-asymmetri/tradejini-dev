"use client";

import { useState, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import BlogFAQEditor from "@/app/admin/dashboard/blogs/[category]/[blog]/BlogFAQEditor";

import { File, Image, Upload, Save, ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IDfy } from "@/utils/convertID";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import {
  formatDateToCustomString,
  parseCustomDateString,
} from "@/utils/dateUtils";
import { format, parseISO, startOfDay } from "date-fns";
import { convertToWebP } from "@/utils/imageUtils";

interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

interface BlogFAQItem {
  id?: string;
  question: string;
  answer: string;
  sequence: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Blog {
  id?: string;
  title: string;
  permalink: string;
  categoryId: string;
  authorId: string;
  gist: string;
  articleContent: string;
  coverImageSrc: string;
  cover_image_src?: string;
  coverImageAlt: string;
  cover_image_alt?: string;
  seoTitle: string;
  seo_title?: string;
  description: string;
  focusKeywords: string[];
  focus_keywords?: string[];
  readingTime: string;
  reading_time?: string;
  publication_iso_date: string;
  isPublished: boolean;
  is_published?: boolean;
  faqs?: BlogFAQItem[];
  category?: Category;
  author?: Author;
  [key: string]: any;
}

interface BlogEditorProps {
  initialData?: Blog | null;
  categoryId?: string;
  categoryName?: string;
  isEditing?: boolean;
  onSuccess?: (blog: Blog) => void;
  onCancel?: () => void;
}

export default function BlogEditor({
  initialData,
  categoryId = "",
  categoryName = "",
  isEditing = false,
  onSuccess,
  onCancel,
}: BlogEditorProps) {
  const getInitialBlogState = (): Blog => {
    const currentDate = new Date();
    return {
      title: "",
      permalink: "",
      categoryId: categoryId,
      authorId: "",
      gist: "",
      articleContent: "",
      coverImageSrc: "",
      coverImageAlt: "",
      seoTitle: "",
      description: "",
      focusKeywords: [],
      readingTime: "5 min read",
      publication_iso_date: currentDate.toISOString(),
      isPublished: true,
      faqs: [],
      author: undefined,
    };
  };

  const [blogData, setBlogData] = useState<Blog>(
    initialData ? normalizeInitialData(initialData) : getInitialBlogState(),
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAuthorImage, setUploadingAuthorImage] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [publicationDateISO, setPublicationDateISO] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string>(
    blogData.articleContent,
  );
  const [blogFaqs, setBlogFaqs] = useState<BlogFAQItem[]>(blogData.faqs || []);

  // Update editor value when blogData changes
  useEffect(() => {
    setEditorValue(blogData.articleContent);
  }, [blogData.articleContent]);

  // Add debug logging for initial data
  useEffect(() => {
    console.log("Initial blog data:", blogData);
    console.log("Initial article content:", blogData.articleContent);
  }, []);

  // Add debug logging for article content changes
  useEffect(() => {
    console.log("Article content changed:", blogData.articleContent);
  }, [blogData.articleContent]);

  function normalizeInitialData(data: any): Blog {
    let dateObj;
    if (data.publication_iso_date) {
      dateObj = new Date(data.publication_iso_date);
    } else {
      dateObj = new Date();
    }
    return {
      ...data,
      coverImageSrc: data.coverImageSrc || data.cover_image_src || "",
      coverImageAlt: data.coverImageAlt || data.cover_image_alt || "",
      articleContent: data.articleContent || data.article_content || "",
      publication_iso_date: dateObj.toISOString(),
      readingTime: data.readingTime || data.reading_time || "5 min read",
      seoTitle: data.seoTitle || data.seo_title || "",
      focusKeywords: data.focusKeywords || data.focus_keywords || [],
      isPublished:
        data.isPublished !== undefined
          ? data.isPublished
          : data.is_published !== undefined
            ? data.is_published
            : true,
      categoryId: data.categoryId || data.category_id || categoryId,
      authorId: data.authorId || data.author_id || "",
      faqs: data.faqs || [],
    };
  }

  useEffect(() => {
    if (!isEditing) {
      const currentDate = new Date();
      setBlogData({
        ...getInitialBlogState(),
        publication_iso_date: currentDate.toISOString(),
      });
      setPublicationDateISO(format(currentDate, "yyyy-MM-dd"));
    } else if (initialData) {
      const normalized = normalizeInitialData(initialData);
      setBlogData(normalized);
      if (normalized.publication_iso_date) {
        setPublicationDateISO(
          format(new Date(normalized.publication_iso_date), "yyyy-MM-dd"),
        );
      }
    }
  }, [isEditing, initialData, categoryId]);

  // Fetch authors and categories
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [authorsRes, categoriesRes] = await Promise.all([
          fetch("/api/admin/authors"),
          fetch("/api/admin/categories"),
        ]);

        if (authorsRes.ok) {
          const authorsData = await authorsRes.json();
          setAuthors(authorsData);

          if (!isEditing && authorsData.length > 0 && !blogData.authorId) {
            setBlogData((prev) => ({
              ...prev,
              authorId: authorsData[0].id,
              author: authorsData[0],
            }));
          }
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load required data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Load FAQs when editing existing blog
  useEffect(() => {
    if (isEditing && blogData.id) {
      fetchBlogFAQs();
    }
  }, [isEditing, blogData.id]);

  const fetchBlogFAQs = async () => {
    if (!blogData.id) return;
    
    try {
      const response = await fetch(`/api/blogs/${blogData.id}/faqs`);
      if (response.ok) {
        const faqs = await response.json();
        setBlogFaqs(faqs);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleFAQsUpdate = (updatedFaqs: BlogFAQItem[]) => {
    setBlogFaqs(updatedFaqs);
  };

  const handleTitleChange = (title: string) => {
    const permalink =
      !isEditing || !blogData.permalink ? IDfy(title) : blogData.permalink;

    setBlogData((prev) => ({
      ...prev,
      title,
      permalink,
      seoTitle: !prev.seoTitle ? title : prev.seoTitle,
    }));
  };

  /* 
   * Image conversion logic has been moved to utils/imageUtils.ts
   * We now use the shared convertToWebP function.
   */

  // Handle image upload
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "author",
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    let file = e.target.files[0];
    if (!file) return;

    // Validate file type first
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Pre-conversion size limit to prevent extreme browser lag (e.g. 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Original image is too large (max 20MB for conversion)");
      return;
    }

    try {
      if (type === "cover") {
        setUploadingImage(true);
      } else {
        setUploadingAuthorImage(true);
      }

      // 1. Convert PNG/JPEG to WebP FIRST to reduce size
      if (file.type === "image/png" || file.type === "image/jpeg") {
        toast.info("Converting image to WebP...");
        try {
          const webpBlob = await convertToWebP(file);
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          file = new window.File([webpBlob], newFileName, { type: "image/webp" });
          console.log(`Converted from ${file.type} to WebP. Size reduced from ${(e.target.files[0].size / 1024 / 1024).toFixed(2)}MB to ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        } catch (convError) {
          console.error("Conversion to WebP failed:", convError);
          toast.warn("Conversion failed, attempting original upload.");
        }
      }

      // 2. NOW validate the final file size (max 5MB for the actual upload)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`Final image size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds 5MB limit`);
        if (type === "cover") setUploadingImage(false);
        else setUploadingAuthorImage(false);
        return;
      }

      if (type === "cover") {
        toast.info("Uploading cover image...");
      } else {
        toast.info("Uploading author image...");
      }

      const storageCategory = categoryName || blogData.category?.name || "Uncategorized";
      const storageTitle = blogData.title.trim() || "Untitled Blog";
      const storageRef = ref(storage, `Tradejini-Blogs-Media/${storageCategory}/${storageTitle}/${file.name}`);

      // Upload to Firebase
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      if (type === "cover") {
        setBlogData((prev) => ({
          ...prev,
          coverImageSrc: downloadURL,
          coverImageAlt: prev.coverImageAlt || prev.title || "Cover Image",
        }));
        setUploadingImage(false);
        toast.success("Cover image uploaded successfully");
      } else {
        setBlogData((prev) => {
          const author = prev.author || {
            id: prev.authorId || "",
            name: "",
            bio: "",
            image: "",
          };

          return {
            ...prev,
            author: {
              ...author,
              image: downloadURL,
            },
          };
        });
        setUploadingAuthorImage(false);
        toast.success("Author image uploaded successfully");
      }
    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
      toast.error(`Failed to upload ${type} image`);
      if (type === "cover") {
        setUploadingImage(false);
      } else {
        setUploadingAuthorImage(false);
      }
    }
  };

  const handleSaveBlog = async () => {
    if (!blogData.title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }

    if (!blogData.permalink.trim()) {
      toast.error("Please enter a permalink");
      return;
    }

    try {
      setSaving(true);

      const blogPayload = {
        ...blogData,
        // Add the snake_case version for the API
        article_content: editorValue || "",
      };

      const response = await fetch(
        isEditing ? `/api/admin/blogs/${blogData.id}` : "/api/admin/blogs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogPayload),
        },
      );

      if (response.ok) {
        const savedBlog = await response.json();
        
        // If creating a new blog and there are FAQs, save them
        if (!isEditing && blogFaqs.length > 0) {
          await saveBlogFAQs(savedBlog.id || savedBlog.blog?.id);
        }

        toast.success(
          isEditing ? "Blog updated successfully!" : "Blog created successfully!",
        );
        
        if (onSuccess) {
          onSuccess(savedBlog);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("An error occurred while saving the blog");
    } finally {
      setSaving(false);
    }
  };

  const saveBlogFAQs = async (blogId: string) => {
    if (!blogId || blogFaqs.length === 0) return;

    try {
      for (const faq of blogFaqs) {
        await fetch(`/api/blogs/${blogId}/faqs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: faq.question,
            answer: faq.answer,
            sequence: faq.sequence,
            isActive: faq.isActive,
          }),
        });
      }
    } catch (error) {
      console.error("Error saving FAQs:", error);
      toast.error("Blog saved but there was an error saving FAQs");
    }
  };

  const insertDisclaimer = () => {
    const disclaimerHtml = `
<br>
<p style="font-size: 0.7rem;">
  <strong>Disclaimer</strong>: The information provided in our blogs is for informational purposes only and should not be construed as financial, investment, or trading advice. Trading and investing in the securities market carries risk. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions. Past performance is not indicative of future results. Copyrighted and original content for your trading and investing needs.
</p>
<p style="font-size: 0.7rem;">
  <strong>&#169; 2026 — Tradejini. All Rights Reserved.</strong>
</p>
`;
    setEditorValue((prev) => prev + "\n" + disclaimerHtml);
    toast.success("Disclaimer added to content");
  };

  const handleContentImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    let file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      toast.info("Processing content image...");

      // Convert to WebP if PNG or JPEG
      if (file.type === "image/png" || file.type === "image/jpeg") {
        try {
          const webpBlob = await convertToWebP(file);
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          file = new window.File([webpBlob], newFileName, {
            type: "image/webp",
          });
        } catch (convError) {
          console.error("Content image conversion failed:", convError);
        }
      }

      // Final size check
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large (max 5MB after conversion)");
        return;
      }

      const storageCategory = categoryName || blogData.category?.name || "Uncategorized";
      const storageTitle = blogData.title.trim() || "Untitled Blog";
      const storageRef = ref(storage, `Tradejini-Blogs-Media/${storageCategory}/${storageTitle}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const imageHtml = `
<br>
<div class="image-container">
  <img
    src="${downloadURL}"
    class="responsive-image"
    alt="${blogData.title.trim() || "Blog Image"}"
  >
</div>
<br>
`;

      const styleBlock = `
<style>
  /* Image styles */
  .image-container {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  .responsive-image {
    height: auto;
    max-height: 450px;
    width: auto;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    .responsive-image {
      width: 100% !important;
      height: auto !important;
      max-height: 300px !important;
      object-fit: contain;
    }
  }
</style>
`;

      // Check if style block is already present, if not add it
      const contentToInsert = editorValue.includes(".image-container")
        ? imageHtml
        : styleBlock + imageHtml;

      setEditorValue((prev) => prev + "\n" + contentToInsert);
      toast.success("Image inserted into content");
    } catch (error) {
      console.error("Error uploading content image:", error);
      toast.error("Failed to upload content image");
    } finally {
      // Clear input
      e.target.value = "";
    }
  };

  const customImageCommand = {
    ...commands.image,
    execute: (state: any, api: any) => {
      document.getElementById("content-image-upload")?.click();
    },
  };

  // Add effect to sync editor value with blog data
  useEffect(() => {
    if (blogData.articleContent !== editorValue) {
      console.log("Syncing editor value with blog data");
      setEditorValue(blogData.articleContent);
    }
  }, [blogData.articleContent]);

  // Add effect to sync blog data with editor value
  useEffect(() => {
    if (editorValue !== blogData.articleContent) {
      console.log("Syncing blog data with editor value");
      setBlogData((prev) => ({
        ...prev,
        articleContent: editorValue,
      }));
    }
  }, [editorValue]);

  // Auto-calculate reading time
  useEffect(() => {
    if (!editorValue) return;

    const text = editorValue
      // Remove HTML tags
      .replace(/<[^>]*>/g, " ")
      // Remove image references
      .replace(/!\[.*?\]\(.*?\)/g, " ")
      // Remove link URLs but keep text: [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove headers markers: # Header -> Header
      .replace(/#{1,6}\s/g, " ")
      // Remove emphasis markers
      .replace(/(\*\*|__|\*|_)/g, "")
      // Remove blockquotes >
      .replace(/^>\s/gm, "")
      // Remove code blocks
      .replace(/`{3}[\s\S]*?`{3}/g, "")
      // Remove inline code
      .replace(/`[^`]*`/g, "")
      // Normalize whitespace
      .replace(/\s+/g, " ")
      .trim();

    const wordCount = text.length > 0 ? text.split(/\s+/).length : 0;
    // Lower threshold to 220 words per minute for better estimate
    const wordsPerMinute = 220; 
    const readingTimeVal = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    const newReadingTime = `${readingTimeVal} Mins Read`;

    if (blogData.readingTime !== newReadingTime) {
      setBlogData((prev) => ({
        ...prev,
        readingTime: newReadingTime,
      }));
    }
  }, [editorValue]);

  if (loading) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-500">Category:</span>
        <Badge variant="secondary" className="text-md">
          {categoryName || "Unknown Category"}
        </Badge>
      </div>

      <Tabs
        defaultValue="content"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="publication">Publication</TabsTrigger>
          <TabsTrigger value="author">Author</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Content</CardTitle>
              <CardDescription>
                Create or edit the main content of your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  placeholder="Blog title"
                  value={blogData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="permalink">Permalink*</Label>
                <Input
                  id="permalink"
                  placeholder="URL-friendly permalink"
                  value={blogData.permalink}
                  onChange={(e) =>
                    setBlogData((prev) => ({
                      ...prev,
                      permalink: e.target.value,
                    }))
                  }
                  required
                />
                <p className="text-xs text-gray-500">
                  This will be the URL path for your blog post
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gist">Gist/Summary</Label>
                <Textarea
                  id="gist"
                  placeholder="A brief summary of the blog post"
                  value={blogData.gist}
                  onChange={(e) =>
                    setBlogData((prev) => ({
                      ...prev,
                      gist: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="articleContent">Content*</Label>
                <div data-color-mode="dark">
                  <Input
                    type="file"
                    id="content-image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleContentImageUpload}
                  />
                  <MDEditor
                    value={editorValue}
                    commands={[
                      ...commands.getCommands().filter((c) => c.name !== "image"),
                      customImageCommand,
                    ]}
                    onChange={(value) => {
                      console.log(
                        "MDEditor onChange triggered with value:",
                        value,
                      );
                      setEditorValue(value || "");
                      setBlogData((prev) => {
                        const newData = {
                          ...prev,
                          articleContent: value || "",
                        };
                        console.log("New blog data after update:", newData);
                        return newData;
                      });
                    }}
                    height={800}
                    preview="edit"
                    hideToolbar={false}
                    enableScroll={true}
                    style={{
                      backgroundColor: "#1E1F29 ",
                      color: "#ffffff",
                    }}
                    previewOptions={{
                      style: {
                        backgroundColor: "#1E1F29 ",
                        color: "#ffffff",
                      },
                    }}
                  />
                  <div className="flex justify-end pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={insertDisclaimer}
                      type="button"
                    >
                      Add Disclaimer Footer
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Cover Image</Label>
                <div className="rounded-lg border border-gray-200 p-4">
                  {blogData.coverImageSrc ? (
                    <div className="relative mb-4">
                      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
                        <img
                          src={blogData.coverImageSrc}
                          alt={blogData.coverImageAlt || "Cover image"}
                          className="absolute inset-0 h-full w-full object-contain"
                        />
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="coverImageUrl">Image URL</Label>
                          <Input
                            id="coverImageUrl"
                            value={blogData.coverImageSrc}
                            readOnly
                            className="bg-gray-50 font-mono text-xs"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="coverImageAlt">Alt Text</Label>
                          <Input
                            id="coverImageAlt"
                            placeholder="Describe the image for accessibility"
                            value={blogData.coverImageAlt}
                            onChange={(e) =>
                              setBlogData((prev) => ({
                                ...prev,
                                coverImageAlt: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 flex aspect-[21/9] w-full items-center justify-center rounded-lg bg-gray-100">
                      <div className="text-center">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          No cover image selected
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Label
                      htmlFor="coverImage"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 text-center text-primary-foreground hover:bg-primary/90"
                    >
                      <Upload className="h-4 w-4" />
                      {uploadingImage
                        ? "Uploading..."
                        : blogData.coverImageSrc
                          ? "Change Cover Image"
                          : "Add Cover Image"}
                    </Label>
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "cover")}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your blog post for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  placeholder="SEO title (defaults to blog title)"
                  value={blogData.seoTitle}
                  onChange={(e) =>
                    setBlogData((prev) => ({
                      ...prev,
                      seoTitle: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description for search results"
                  value={blogData.description}
                  onChange={(e) =>
                    setBlogData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="focusKeywords">Focus Keywords</Label>
                <Input
                  id="focusKeywords"
                  placeholder="Comma-separated keywords"
                  value={
                    blogData.focusKeywords
                      ? blogData.focusKeywords.join(", ")
                      : ""
                  }
                  onChange={(e) => {
                    const keywords = e.target.value
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean);
                    setBlogData((prev) => ({
                      ...prev,
                      focusKeywords: keywords,
                    }));
                  }}
                />
                <p className="text-sm text-gray-500">
                  Enter keywords separated by commas to help with SEO.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publication" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Publication Settings</CardTitle>
              <CardDescription>
                Configure when and how your blog will be published
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={blogData.categoryId}
                    onChange={(e) => {
                      const selectedCategory = categories.find(
                        (cat) => cat.id === e.target.value,
                      );
                      setBlogData((prev) => ({
                        ...prev,
                        categoryId: e.target.value,
                        category: selectedCategory,
                      }));
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="readingTime">Reading Time</Label>
                  <Input
                    id="readingTime"
                    placeholder="e.g., 5 min read"
                    value={blogData.readingTime}
                    onChange={(e) =>
                      setBlogData((prev) => ({
                        ...prev,
                        readingTime: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publicationDate">Publication Date</Label>
                  <Input
                    id="publicationDate"
                    type="date"
                    value={publicationDateISO}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      setPublicationDateISO(selectedDate);
                      setBlogData((prev) => ({
                        ...prev,
                        publication_iso_date: selectedDate,
                      }));
                    }}
                  />
                  <p className="text-sm text-gray-500">
                    {blogData.publication_iso_date
                      ? format(
                          new Date(blogData.publication_iso_date),
                          "do MMM yyyy",
                        )
                      : "No date selected"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublished"
                  checked={blogData.isPublished}
                  onCheckedChange={(checked) =>
                    setBlogData((prev) => ({
                      ...prev,
                      isPublished: !!checked,
                    }))
                  }
                />
                <Label htmlFor="isPublished">Publish immediately</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="author" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Author Information</CardTitle>
              <CardDescription>
                Enter author details for this blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name*</Label>
                  <Input
                    id="authorName"
                    placeholder="Author's name"
                    value={blogData.author?.name || ""}
                    onChange={(e) => {
                      setBlogData((prev) => {
                        const existingAuthor = authors.find(
                          (author) =>
                            author.name.toLowerCase() ===
                            e.target.value.toLowerCase(),
                        );

                        if (existingAuthor) {
                          return {
                            ...prev,
                            authorId: existingAuthor.id,
                            author: existingAuthor,
                          };
                        } else {
                          const author = prev.author || {
                            id: "",
                            name: "",
                            bio: "",
                            image: "",
                          };

                          return {
                            ...prev,
                            authorId: "",
                            author: {
                              ...author,
                              name: e.target.value,
                            },
                          };
                        }
                      });
                    }}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {blogData.authorId
                      ? "Using existing author"
                      : "New author will be created"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorBio">Author Bio</Label>
                  <Textarea
                    id="authorBio"
                    placeholder="Brief author biography"
                    value={blogData.author?.bio || ""}
                    onChange={(e) => {
                      setBlogData((prev) => {
                        const author = prev.author || {
                          id: prev.authorId || "",
                          name: "",
                          bio: "",
                          image: "",
                        };

                        return {
                          ...prev,
                          author: {
                            ...author,
                            bio: e.target.value,
                          },
                        };
                      });
                    }}
                    className="min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Author Image</Label>
                <div className="flex flex-col items-center space-y-4 rounded-md border border-gray-200 p-4">
                  {blogData.author?.image ? (
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <img
                        src={blogData.author.image}
                        alt={blogData.author?.name || "Author"}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
                      <File className="h-10 w-10 text-gray-400" />
                    </div>
                  )}

                  {blogData.author?.image && (
                    <div className="w-full space-y-2">
                      <Label htmlFor="authorImageUrl">
                        Image URL (Firebase)
                      </Label>
                      <Input
                        id="authorImageUrl"
                        value={blogData.author.image}
                        readOnly
                        className="bg-gray-50 font-mono text-xs"
                      />
                    </div>
                  )}

                  <div className="w-full">
                    <Label
                      htmlFor="authorImage"
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 text-center text-primary-foreground hover:bg-primary/90"
                    >
                      <Upload className="h-4 w-4" />
                      {uploadingAuthorImage
                        ? "Uploading..."
                        : blogData.author?.image
                          ? "Change Author Image"
                          : "Add Author Image"}
                    </Label>
                    <Input
                      id="authorImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "author")}
                      disabled={uploadingAuthorImage}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Manage FAQs that will appear on the blog detail page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlogFAQEditor
                blogId={blogData.id}
                blogTitle={blogData.title}
                faqs={blogFaqs}
                onFAQsChange={handleFAQsUpdate}
                isNewBlog={!isEditing}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </Button>

        <Button
          onClick={handleSaveBlog}
          disabled={saving}
          className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
        </Button>
      </div>
    </div>
  );
}
