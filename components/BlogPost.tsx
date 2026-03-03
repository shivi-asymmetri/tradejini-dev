// "use client";

// import { BlogType } from "@/types/BlogType";
// import { useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// export default function BlogPost({ blog }: { blog: BlogType }) {
//   // Format date
//   const formattedDate = useMemo(() => {
//     if (!blog?.stats?.publicationDate) return "";
    
//     try {
//       const date = new Date(blog.stats.publicationDate);
//       return new Intl.DateTimeFormat("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }).format(date);
//     } catch (error) {
//       console.error("Date formatting error:", error);
//       return blog.stats?.publicationDate;
//     }
//   }, [blog?.stats?.publicationDate]);

//   return (
//     <article className="max-w-4xl mx-auto px-4 py-8">
//       {/* Blog Header */}
//       <header className="mb-10">
//         <div className="mb-6">
//           <Link 
//             href={`/blogs/category/${blog.category.toLowerCase().replace(/\s+/g, "-")}`}
//             className="text-sm font-medium text-blue-600 hover:underline"
//           >
//             {blog.category}
//           </Link>
//         </div>
        
//         <h1 className="text-3xl sm:text-4xl font-bold mb-4">{blog?.content.title}</h1>
        
//         <div className="flex items-center mb-6">
//           <div className="flex items-center">
//             {blog.author.image ? (
//               <Image 
//                 src={blog.author.image} 
//                 alt={blog.author.name}
//                 width={40}
//                 height={40}
//                 className="rounded-full mr-3"
//               />
//             ) : (
//               <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
//             )}
//             <div>
//               <p className="font-medium">{blog.author.name}</p>
//               <div className="text-sm text-gray-500">
//                 {formattedDate} • {blog.stats.readingTime}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {blog.content.coverImage?.src && (
//           <div className="mb-8">
//             <Image
//               src={blog.content.coverImage.src}
//               alt={blog.content.coverImage.alt || blog.content.title}
//               width={1200}
//               height={630}
//               className="rounded-lg w-full h-auto"
//               priority
//             />
//           </div>
//         )}
        
//         {blog.content.gist && (
//           <div className="text-lg text-gray-700 mb-6 italic border-l-4 border-blue-500 pl-4 py-2">
//             {blog.content.gist}
//           </div>
//         )}
//       </header>
      
//       {/* Blog Content */}
//       <div className="prose prose-lg max-w-none">
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//           {blog.content.articleContent}
//         </ReactMarkdown>
//       </div>
      
//       {/* Tags */}
//       {blog.content.tags && blog.content.tags.length > 0 && (
//         <div className="mt-8 pt-6 border-t">
//           <h3 className="text-lg font-medium mb-3">Tags:</h3>
//           <div className="flex flex-wrap gap-2">
//             {blog.content.tags.map((tag, index) => (
//               <Link 
//                 key={index}
//                 href={`/blogs/tag/${tag}`}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
//               >
//                 {tag}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Author Bio */}
//       {blog.author.bio && (
//         <div className="mt-10 pt-6 border-t">
//           <h3 className="text-lg font-medium mb-3">About the Author</h3>
//           <div className="flex items-start">
//             {blog.author.image && (
//               <Image 
//                 src={blog.author.image} 
//                 alt={blog.author.name}
//                 width={60}
//                 height={60}
//                 className="rounded-full mr-4"
//               />
//             )}
//             <div>
//               <h4 className="font-medium">{blog.author.name}</h4>
//               <p className="text-gray-700">{blog.author.bio}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </article>
//   );
// } 