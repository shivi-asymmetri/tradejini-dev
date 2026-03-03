// "use client";

// import { useState, useEffect } from "react";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { File, Image, Upload, Save, ArrowLeft, Plus, X } from "lucide-react";
// import { toast } from "react-toastify";
// import { storage } from "@/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { IDfy } from "@/utils/convertID";
// import "@uiw/react-markdown-preview/markdown.css";
// import "@uiw/react-md-editor/markdown-editor.css";

// interface Tag {
//   id: number;
//   tag: string;
//   color: string;
// }

// interface Author {
//   id: string;
//   name: string;
//   bio: string;
//   image: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   slug: string;
// }

// interface Blog {
//   id?: string;
//   title: string;
//   permalink: string;
//   categoryId: string;
//   authorId: string;
//   gist: string;
//   articleContent: string;
//   coverImageSrc: string;
//   coverImageAlt: string;
//   seoTitle: string;
//   description: string;
//   focusKeywords: string[];
//   readingTime: string;
//   publicationDate: string;
//   isPublished: boolean;
//   category?: Category;
//   author?: Author;
//   tags?: Tag[];
// }

// interface BlogEditorProps {
//   initialData?: Blog | null;
//   categoryId?: string;
//   categoryName?: string;
//   isEditing?: boolean;
//   onSuccess?: (blog: Blog) => void;
//   onCancel?: () => void;
// }

// export default function BlogEditor({
//   initialData,
//   categoryId = "",
//   categoryName = "",
//   isEditing = false,
//   onSuccess,
//   onCancel,
// }: BlogEditorProps) {
//   // Use a clean initial state for new blogs
//   const getInitialBlogState = (): Blog => ({
//     title: "",
//     permalink: "",
//     categoryId: categoryId,
//     authorId: "",
//     gist: "",
//     articleContent: "",
//     coverImageSrc: "",
//     coverImageAlt: "",
//     seoTitle: "",
//     description: "",
//     focusKeywords: [],
//     readingTime: "5 min read",
//     publicationDate: new Date().toISOString().split("T")[0],
//     isPublished: true,
//     author: undefined,
//     tags: [],
//   });

//   const [blogData, setBlogData] = useState<Blog>(
//     initialData || getInitialBlogState(),
//   );
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [tags, setTags] = useState<Tag[]>([]);
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [tagSearch, setTagSearch] = useState("");
//   const [selectedTags, setSelectedTags] = useState<number[]>([]);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [uploadingAuthorImage, setUploadingAuthorImage] = useState(false);
//   const [activeTab, setActiveTab] = useState("content");
//   const [newTag, setNewTag] = useState("");

//   // Reset the form when isEditing changes
//   useEffect(() => {
//     if (!isEditing) {
//       setBlogData(getInitialBlogState());
//       setSelectedTags([]);
//     } else if (initialData) {
//       setBlogData(initialData);
//       if (initialData.tags) {
//         setSelectedTags(initialData.tags.map((tag: Tag) => tag.id));
//       }
//     }
//   }, [isEditing, initialData, categoryId]);

//   // Fetch tags and authors
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const [tagsRes, authorsRes] = await Promise.all([
//           fetch("/api/admin/tags"),
//           fetch("/api/admin/authors"),
//         ]);

//         if (tagsRes.ok && authorsRes.ok) {
//           const [tagsData, authorsData] = await Promise.all([
//             tagsRes.json(),
//             authorsRes.json(),
//           ]);

//           setTags(tagsData);
//           setAuthors(authorsData);

//           if (!isEditing && authorsData.length > 0 && !blogData.authorId) {
//             setBlogData((prev) => ({
//               ...prev,
//               authorId: authorsData[0].id,
//               author: authorsData[0],
//             }));
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Failed to load required data");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleTitleChange = (title: string) => {
//     const permalink =
//       !isEditing || !blogData.permalink ? IDfy(title) : blogData.permalink;

//     setBlogData((prev) => ({
//       ...prev,
//       title,
//       permalink,
//       seoTitle: !prev.seoTitle ? title : prev.seoTitle,
//     }));
//   };

//   // Handle image upload
//   const handleImageUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     type: "cover" | "author",
//   ) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       if (type === "cover") {
//         setUploadingImage(true);
//       } else {
//         setUploadingAuthorImage(true);
//       }

//       const storageRef = ref(storage, `Tradejini-Blogs-Media/${file.name}`);

//       // Upload to Firebase
//       await uploadBytes(storageRef, file);

//       const downloadURL = await getDownloadURL(storageRef);

//       if (type === "cover") {
//         setBlogData((prev) => ({
//           ...prev,
//           coverImageSrc: downloadURL,
//         }));
//         setUploadingImage(false);
//       } else {
//         setBlogData((prev) => {
//           const author = prev.author || {
//             id: prev.authorId || "",
//             name: "",
//             bio: "",
//             image: "",
//           };

//           return {
//             ...prev,
//             author: {
//               ...author,
//               image: downloadURL,
//             },
//           };
//         });
//         setUploadingAuthorImage(false);
//       }

//       toast.success(
//         `${type === "cover" ? "Cover" : "Author"} image uploaded successfully`,
//       );
//     } catch (error) {
//       console.error(`Error uploading ${type} image:`, error);
//       toast.error(`Failed to upload ${type} image`);
//       if (type === "cover") {
//         setUploadingImage(false);
//       } else {
//         setUploadingAuthorImage(false);
//       }
//     }
//   };

//   const handleAddTag = (tagId: number) => {
//     if (!selectedTags.includes(tagId)) {
//       setSelectedTags([...selectedTags, tagId]);
//     }
//     setTagSearch("");
//   };

//   const handleRemoveTag = (tagId: number) => {
//     setSelectedTags(selectedTags.filter((id) => id !== tagId));
//   };

//   const handleSaveBlog = async () => {
//     if (!blogData.title) {
//       toast.error("Title is required");
//       setActiveTab("content");
//       return;
//     }

//     if (!blogData.permalink) {
//       toast.error("Permalink is required");
//       setActiveTab("content");
//       return;
//     }

//     if (!blogData.authorId && blogData.author?.name) {
//       try {
//         const authorResponse = await fetch("/api/admin/authors", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: blogData.author.name,
//             bio: blogData.author.bio || "",
//             image: blogData.author.image || "",
//           }),
//         });

//         if (authorResponse.ok) {
//           const newAuthor = await authorResponse.json();
//           blogData.authorId = newAuthor.id;
//         } else {
//           toast.error("Failed to create author");
//           setActiveTab("author");
//           return;
//         }
//       } catch (error) {
//         console.error("Error creating author:", error);
//         toast.error("Failed to create author");
//         setActiveTab("author");
//         return;
//       }
//     }

//     if (!blogData.authorId) {
//       toast.error("Author is required");
//       setActiveTab("author");
//       return;
//     }

//     try {
//       setSaving(true);

//       const method = isEditing ? "PUT" : "POST";
//       const url = isEditing
//         ? `/api/admin/blogs/${blogData.id}`
//         : "/api/admin/blogs";

//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...blogData,
//           tags: selectedTags,
//         }),
//       });

//       if (response.ok) {
//         const savedBlog = await response.json();
//         toast.success(`Blog ${isEditing ? "updated" : "created"} successfully`);

//         if (onSuccess) {
//           onSuccess(savedBlog);
//         }
//       } else {
//         const error = await response.json();
//         toast.error(
//           error.error || `Failed to ${isEditing ? "update" : "create"} blog`,
//         );
//       }
//     } catch (error) {
//       console.error("Error saving blog:", error);
//       toast.error(`Failed to ${isEditing ? "update" : "create"} blog`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center p-10">Loading...</div>;
//   }

//   const filteredTags = tagSearch
//     ? tags.filter((tag) =>
//         tag.tag.toLowerCase().includes(tagSearch.toLowerCase()),
//       )
//     : [];

//   const selectedTagsData = tags.filter((tag) => selectedTags.includes(tag.id));

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-2">
//         <span className="text-sm font-medium text-gray-500">Category:</span>
//         <Badge variant="secondary" className="text-md">
//           {categoryName}
//         </Badge>
//       </div>

//       <Tabs
//         defaultValue="content"
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="w-full"
//       >
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="content">Content</TabsTrigger>
//           <TabsTrigger value="seo">SEO</TabsTrigger>
//           <TabsTrigger value="publication">Publication</TabsTrigger>
//           <TabsTrigger value="author">Author</TabsTrigger>
//         </TabsList>

//         <TabsContent value="content" className="space-y-6 pt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Blog Content</CardTitle>
//               <CardDescription>
//                 Create or edit the main content of your blog post
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Title*</Label>
//                 <Input
//                   id="title"
//                   placeholder="Blog title"
//                   value={blogData.title}
//                   onChange={(e) => handleTitleChange(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="permalink">Permalink*</Label>
//                 <Input
//                   id="permalink"
//                   placeholder="URL-friendly permalink"
//                   value={blogData.permalink}
//                   onChange={(e) =>
//                     setBlogData((prev) => ({
//                       ...prev,
//                       permalink: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//                 <p className="text-xs text-gray-500">
//                   This will be the URL path for your blog post
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="gist">Gist/Summary</Label>
//                 <Textarea
//                   id="gist"
//                   placeholder="A brief summary of the blog post"
//                   value={blogData.gist}
//                   onChange={(e) =>
//                     setBlogData((prev) => ({
//                       ...prev,
//                       gist: e.target.value,
//                     }))
//                   }
//                   className="min-h-[100px]"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="articleContent">Content*</Label>
//                 <div data-color-mode="dark">
//                   <MDEditor
//                     value={blogData.articleContent}
//                     onChange={(value) =>
//                       setBlogData((prev) => ({
//                         ...prev,
//                         articleContent: value || "",
//                       }))
//                     }
//                     height={800}
//                     preview="edit"
//                     hideToolbar={false}
//                     enableScroll={true}
//                     style={{
//                       backgroundColor: "#1E1F29 ",
//                       color: "#ffffff",
//                     }}
//                     previewOptions={{
//                       style: {
//                         backgroundColor: "#1E1F29 ",
//                         color: "#ffffff",
//                       },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <Label htmlFor="tags">Tags</Label>

//                 {/* Tag search input */}
//                 <div className="space-y-2">
//                   <Input
//                     id="tagSearch"
//                     placeholder="Search for tags"
//                     value={tagSearch}
//                     onChange={(e) => setTagSearch(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-4 mt-2 flex flex-wrap gap-2">
//                   {tags
//                     .filter(
//                       (tag) =>
//                         tagSearch === "" ||
//                         tag.tag.toLowerCase().includes(tagSearch.toLowerCase()),
//                     )
//                     .map((tag) => (
//                       <div
//                         key={tag.id}
//                         onClick={() => handleAddTag(tag.id)}
//                         className="cursor-pointer rounded-full px-3 py-1 text-sm transition-colors"
//                         style={{
//                           backgroundColor: `${tag.color}15`,
//                           borderColor: tag.color,
//                           borderWidth: "1px",
//                           color: tag.color,
//                         }}
//                       >
//                         {tag.tag}
//                       </div>
//                     ))}
//                 </div>

//                 {selectedTags.length > 0 && (
//                   <div className="mt-4">
//                     <Label className="mb-2 block">Selected Tags:</Label>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedTags.map((tagId) => {
//                         const tag = tags.find((t) => t.id === tagId);
//                         if (!tag) return null;

//                         return (
//                           <div
//                             key={tagId}
//                             className="flex items-center gap-2 rounded-full px-3 py-1 text-sm"
//                             style={{
//                               backgroundColor: `${tag.color}15`,
//                               borderColor: tag.color,
//                               borderWidth: "1px",
//                               color: tag.color,
//                             }}
//                           >
//                             {tag.tag}
//                             <X
//                               className="h-3 w-3 cursor-pointer"
//                               style={{ color: tag.color }}
//                               onClick={() => handleRemoveTag(tagId)}
//                             />
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 <Label>Cover Image</Label>
//                 <div className="rounded-lg border border-gray-200 p-4">
//                   {blogData.coverImageSrc ? (
//                     <div className="relative mb-4">
//                       <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
//                         <img
//                           src={blogData.coverImageSrc}
//                           alt={blogData.coverImageAlt || "Cover image"}
//                           className="absolute inset-0 h-full w-full object-contain"
//                         />
//                       </div>

//                       <div className="mt-4 space-y-3">
//                         <div className="space-y-2">
//                           <Label htmlFor="coverImageUrl">Image URL</Label>
//                           <Input
//                             id="coverImageUrl"
//                             value={blogData.coverImageSrc}
//                             readOnly
//                             className="bg-gray-50 font-mono text-xs"
//                           />
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="coverImageAlt">Alt Text</Label>
//                           <Input
//                             id="coverImageAlt"
//                             placeholder="Describe the image for accessibility"
//                             value={blogData.coverImageAlt}
//                             onChange={(e) =>
//                               setBlogData((prev) => ({
//                                 ...prev,
//                                 coverImageAlt: e.target.value,
//                               }))
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="mb-4 flex aspect-[21/9] w-full items-center justify-center rounded-lg bg-gray-100">
//                       <div className="text-center">
//                         <Image className="mx-auto h-12 w-12 text-gray-400" />
//                         <p className="mt-2 text-sm text-gray-500">
//                           No cover image selected
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-center">
//                     <Label
//                       htmlFor="coverImage"
//                       className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 text-center text-primary-foreground hover:bg-primary/90"
//                     >
//                       <Upload className="h-4 w-4" />
//                       {uploadingImage
//                         ? "Uploading..."
//                         : blogData.coverImageSrc
//                           ? "Change Cover Image"
//                           : "Add Cover Image"}
//                     </Label>
//                     <Input
//                       id="coverImage"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, "cover")}
//                       disabled={uploadingImage}
//                       className="hidden"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="seo" className="space-y-6 pt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>SEO Settings</CardTitle>
//               <CardDescription>
//                 Optimize your blog post for search engines
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="seoTitle">SEO Title</Label>
//                 <Input
//                   id="seoTitle"
//                   placeholder="SEO title (defaults to blog title)"
//                   value={blogData.seoTitle}
//                   onChange={(e) =>
//                     setBlogData((prev) => ({
//                       ...prev,
//                       seoTitle: e.target.value,
//                     }))
//                   }
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Meta Description</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Brief description for search results"
//                   value={blogData.description}
//                   onChange={(e) =>
//                     setBlogData((prev) => ({
//                       ...prev,
//                       description: e.target.value,
//                     }))
//                   }
//                   className="min-h-[100px]"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="focusKeywords">Focus Keywords</Label>
//                 <Input
//                   id="focusKeywords"
//                   placeholder="Comma-separated keywords"
//                   value={
//                     blogData.focusKeywords
//                       ? blogData.focusKeywords.join(", ")
//                       : ""
//                   }
//                   onChange={(e) => {
//                     const keywords = e.target.value
//                       .split(",")
//                       .map((k) => k.trim())
//                       .filter(Boolean);
//                     setBlogData((prev) => ({
//                       ...prev,
//                       focusKeywords: keywords,
//                     }));
//                   }}
//                 />
//                 <p className="text-sm text-gray-500">
//                   Enter keywords separated by commas to help with SEO.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="publication" className="space-y-6 pt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Publication Settings</CardTitle>
//               <CardDescription>
//                 Configure when and how your blog will be published
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="readingTime">Reading Time</Label>
//                   <Input
//                     id="readingTime"
//                     placeholder="e.g., 5 min read"
//                     value={blogData.readingTime}
//                     onChange={(e) =>
//                       setBlogData((prev) => ({
//                         ...prev,
//                         readingTime: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="publicationDate">Publication Date</Label>
//                   <Input
//                     id="publicationDate"
//                     placeholder="10th Jul 2024"
//                     value={
//                       blogData.publicationDate
//                         ? blogData.publicationDate.split("T")[0]
//                         : ""
//                     }
//                     onChange={(e) =>
//                       setBlogData((prev) => ({
//                         ...prev,
//                         publicationDate: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="isPublished"
//                   checked={blogData.isPublished}
//                   onCheckedChange={(checked) =>
//                     setBlogData((prev) => ({
//                       ...prev,
//                       isPublished: !!checked,
//                     }))
//                   }
//                 />
//                 <Label htmlFor="isPublished">Publish immediately</Label>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="author" className="space-y-6 pt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Author Information</CardTitle>
//               <CardDescription>
//                 Enter author details for this blog post
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="authorName">Author Name*</Label>
//                   <Input
//                     id="authorName"
//                     placeholder="Author's name"
//                     value={blogData.author?.name || ""}
//                     onChange={(e) => {
//                       setBlogData((prev) => {
//                         const existingAuthor = authors.find(
//                           (author) =>
//                             author.name.toLowerCase() ===
//                             e.target.value.toLowerCase(),
//                         );

//                         if (existingAuthor) {
//                           return {
//                             ...prev,
//                             authorId: existingAuthor.id,
//                             author: existingAuthor,
//                           };
//                         } else {
//                           const author = prev.author || {
//                             id: "",
//                             name: "",
//                             bio: "",
//                             image: "",
//                           };

//                           return {
//                             ...prev,
//                             authorId: "",
//                             author: {
//                               ...author,
//                               name: e.target.value,
//                             },
//                           };
//                         }
//                       });
//                     }}
//                     required
//                   />
//                   <p className="text-xs text-gray-500">
//                     {blogData.authorId
//                       ? "Using existing author"
//                       : "New author will be created"}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="authorBio">Author Bio</Label>
//                   <Textarea
//                     id="authorBio"
//                     placeholder="Brief author biography"
//                     value={blogData.author?.bio || ""}
//                     onChange={(e) => {
//                       setBlogData((prev) => {
//                         const author = prev.author || {
//                           id: prev.authorId || "",
//                           name: "",
//                           bio: "",
//                           image: "",
//                         };

//                         return {
//                           ...prev,
//                           author: {
//                             ...author,
//                             bio: e.target.value,
//                           },
//                         };
//                       });
//                     }}
//                     className="min-h-[100px] resize-none"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label>Author Image</Label>
//                 <div className="flex flex-col items-center space-y-4 rounded-md border border-gray-200 p-4">
//                   {blogData.author?.image ? (
//                     <div className="relative h-32 w-32 overflow-hidden rounded-full">
//                       <img
//                         src={blogData.author.image}
//                         alt={blogData.author?.name || "Author"}
//                         className="h-full w-full object-contain"
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
//                       <File className="h-10 w-10 text-gray-400" />
//                     </div>
//                   )}

//                   {blogData.author?.image && (
//                     <div className="w-full space-y-2">
//                       <Label htmlFor="authorImageUrl">
//                         Image URL (Firebase)
//                       </Label>
//                       <Input
//                         id="authorImageUrl"
//                         value={blogData.author.image}
//                         readOnly
//                         className="bg-gray-50 font-mono text-xs"
//                       />
//                     </div>
//                   )}

//                   <div className="w-full">
//                     <Label
//                       htmlFor="authorImage"
//                       className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-2 text-center text-primary-foreground hover:bg-primary/90"
//                     >
//                       <Upload className="h-4 w-4" />
//                       {uploadingAuthorImage
//                         ? "Uploading..."
//                         : blogData.author?.image
//                           ? "Change Author Image"
//                           : "Add Author Image"}
//                     </Label>
//                     <Input
//                       id="authorImage"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, "author")}
//                       disabled={uploadingAuthorImage}
//                       className="hidden"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <div className="flex justify-between">
//         <Button
//           variant="outline"
//           onClick={onCancel}
//           className="flex items-center gap-2"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Cancel
//         </Button>

//         <Button
//           onClick={handleSaveBlog}
//           disabled={saving}
//           className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
//         >
//           <Save className="h-4 w-4" />
//           {saving ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
//         </Button>
//       </div>
//     </div>
//   );
// }
