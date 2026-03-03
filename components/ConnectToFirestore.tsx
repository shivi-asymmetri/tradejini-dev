// "use client";
// // import data from "@/data.json";
// import { Button } from "./ui/button";
// import { IDfy } from "@/utils/convertID";
// import { FAQType } from "@/types/FAQType";
// // import {
// //   collection,
// //   doc,
// //   documentId,
// //   getDoc,
// //   getDocs,
// //   setDoc,
// // } from "firebase/firestore";
// // import { db } from "@/firebase";
// import { useState } from "react";
// import back from "@/data/knowledge_back.json";
// // import org from "@/org.json";
// // import useAuth from "@/context/AuthContext";
// // import useData from "@/context/DataContext";
// // import all from "@/data/all.json";
// // // import data from "@/data/formatted_output.json";
// // import data from "@/data/final.json";
// // import backup from "@/data/backup_215307012025.json";
// // import upload from "@/data/modified_backup_updated.json";
// // // import blogs from "@/data/sample-blogs.json";
// // import blogs from "@/data/nandblogs.json";
// // import us from "@/data/us.json";
// // // import tags from "@/utils/returnTagStyles"
// // import final from "@/data/final.json";
// // import manual from "@/data/manual.json";
// // import myimage from "@/data/myiamge.json";
// // import imagestodo from "@/data/imagestodo.json";
// // import sushi from "@/data/sushi.json";
// // import sushiFinal from "@/data/sushiFinal.json";
// // import blogs from "@/data/blog";
// import update from "@/data/blogs_update_no_ashy.json";
// import updatefaq from "@/data/faq_no_ashy.json";
// import questions from "@/data/questions.json";
// import { BlogType } from "@/types/BlogType";
// import { blogStore } from "@/utils/blogStore";

// import allblogs from "@/data/blogs.json";
// import altdata from "@/data/altdata.json";
// import { categoriesWithId } from "@/utils/categories";
// export default function CTF() {
//   const main_id = "offline-account-opening";
//   const main_name = "Offline Account Opening";
//   const [root, setRoot] = useState<FAQType[]>([]);
//   // console.log(root);
//   const [bad, setBad] = useState([]);
//   console.log(bad);
//   const [b, B] = useState([]);
//   return (
//     <div>
//       <Button
//         onClick={async () => {
//           categoriesWithId.forEach(async (x) => {
//             await setDoc(doc(db, "blogs", x.id), {
//               blogs: allblogs.filter((a) => a.category === x.title),
//               id: x.id,
//               name: x.title,
//             });
//           });
//         }}
//       ></Button>

//       <Button
//         onClick={async () => {
//           let verify = [];
//           // const blogs = await blogStore("*");
//           // console.log(altdata);
//           const update = allblogs.map((blog) => {
//             if (
//               altdata
//                 .map((x) =>
//                   x.url.replace("https://www.tradejini.com/blogs/", ""),
//                 )
//                 .includes(blog.metadata.permalink)
//             ) {
//               return {
//                 ...blog,
//                 content: {
//                   ...blog.content,
//                   coverImage: {
//                     ...blog.content.coverImage,
//                     alt: "unga bunga",
//                   },
//                 },
//               };
//             } else {
//               return blog;
//             }
//           });
//           console.log(update);
//         }}
//       >
//         hhehee
//       </Button>
//       {/* <Button
//         onClick={async () => {
//           try {
//             const querySnapshot = await getDocs(collection(db, "blogs"));
//             const blogs = querySnapshot.docs.flatMap((doc) => {
//               const data = doc.data();
//               return Array.isArray(data.blogs)
//                 ? data.blogs
//                 : [
//                     {
//                       id: doc.id,
//                       ...data,
//                     },
//                   ];
//             });
//             console.log(blogs);
//           } catch (error) {
//             console.error("Error fetching blogs:", error);
//           }
//         }}
//       >
//         Fetch Blog
//       </Button> */}
//       {/* <div className="ungabunga">
//         {b.map((x, i) => (
//           <h1 key={i}>
//             <h2>
//               https://www.tradejini.com/blogs/
//               {x.metadata.permalink || IDfy(x.content.title)}
//             </h2>
//             <h3>{new Date().toISOString()}</h3>
//             <h4>monthly</h4>
//             <h5>0.5</h5>
//           </h1>
//         ))}
//       </div> */}
//       {/* <Button
//       onClick={async()=>{
//         const allQuestions = 
//         }}
//         ></Button> */}
//       {/* <Button
//         onClick={async () => {
//           try {
//             updatefaq.forEach(async (blog) => {
//               await setDoc(doc(db, "knowledge-base", blog.id), blog);
//             });
//             // const querySnapshot = await getDocs(collection(db, "blogs"));
//             // const documents = querySnapshot.docs.map((doc) => ({
//             //   ...doc.data(),
//             // }));
//             // console.log(documents);
//           } catch (error) {
//             console.error("Error fetching documents:", error);
//           }
//         }}
//       ></Button> */}
//       {/* <Button
//         onClick={async () => {
//           const querySnapshot = await getDocs(collection(db, "knowledge-base"));
//           const documents = querySnapshot.docs.map((doc) => ({
//             // id: doc.id,
//             ...doc.data(),
//           }));
//           // console.log(documents);
//           const flat = [
//             ...documents.map((x) =>
//               x.topics.map((x) => x.categories.map((x) => x.questions)),
//             ),
//           ];
//           const allFAQ = flat.flat(3);

//           const sitemap = `
//           <url>
//         		<loc>https://www.tradejini.com/blogs/company-demergers-impact-on-investors</loc>
// 	          <lastmod>2025-01-21T07:29:40.239Z</lastmod>
//             <changefreq>monthly</changefreq>
//             <priority>0.5</priority>
//             </url>
//           `;

//           allFAQ.map((faq) => {
//             return `
//             <url>
//         		<loc>https://www.tradejini.com/blogs/company-demergers-impact-on-investors</loc>
// 	          <lastmod>2025-01-21T07:29:40.239Z</lastmod>
//             <changefreq>monthly</changefreq>
//             <priority>0.5</priority>
//             </url>
//             `
//           });

//           // const woi = questions.map((x) => ({
//           //   ...x,
//           //   objectID: x.id,
//           // }));
//           // console.log(woi);
//           // console.log(questions);
//         }}
//       >
//         ugnaungau
//       </Button> */}
//       {/* <Button
//         onClick={async () => {
//           try {
//             const querySnapshot = await getDocs(
//               collection(db, "knowledge-base"),
//             );
//             const documents = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             console.log(documents);
//           } catch (error) {
//             console.error("Error fetching documents:", error);
//           }
//         }}
//       >
//         Fetch All Documents
//       </Button> */}

//       {/* <div className="flex flex-col gap-3 p-6">
//         {back.map((b) => {
//           return (
//             <Button
//               onClick={async () => {
//                 setDoc(doc(db, "knowledge-base", b.id), b);
//               }}
//             >
//               {b.title}
//             </Button>
//           );
//         })}
//       </div> */}

//       {/* <div>
//         {questions.map((b) => {
//           return (
//             <div>
//               <h1>https://tradejini.com/blogs/b{b.pathname}</h1>
//               <h2>${new Date().toISOString()}</h2>
//               <h3>monthly</h3>
//               <h4>0.5</h4>
//             </div>
//           );
//         })}
//       </div> */}

//       {/* <Button
//         onClick={async () => {
//           let categories = [];
//           try {
//             const querySnapshot = await getDocs(
//               collection(db, "knowledge-base"),
//             );
//             const questions = querySnapshot.docs.flatMap((doc) => {
//               const data = doc.data();
//               return data.topics;
//             });
//             questions.forEach((x) => {
//               categories = [...categories, ...x.categories];
//             });
//             console.log(categories);
//           } catch (error) {
//             console.error("Error fetching knowledge base:", error);
//           }
//         }}
//       >
//         Fetch Questions
//       </Button> */}
//     </div>
//     // <div>
//     //   <Button
//     //     onClick={() => {
//     //       const filteredBlogs = blogs.filter((blog) => {
//     //         return us.some((article) => {
//     //           const cleanBlogTitle = blog.content.title
//     //             .toLowerCase()
//     //             .replace(/[^a-z0-9\s]/g, "");
//     //           const cleanArticleTitle = article.content.title
//     //             .toLowerCase()
//     //             .replace(/[^a-z0-9\s]/g, "");

//     //           const isTitleMatch =
//     //             cleanBlogTitle.includes(cleanArticleTitle) ||
//     //             cleanArticleTitle.includes(cleanBlogTitle);

//     //           if (!isTitleMatch) return false;

//     //           const duplicates = blogs.filter((b) => {
//     //             const cleanTitle = b.content.title
//     //               .toLowerCase()
//     //               .replace(/[^a-z0-9\s]/g, "");
//     //             return cleanTitle === cleanBlogTitle;
//     //           });

//     //           if (duplicates.length > 1) {
//     //             return blog.content.coverImage.src.includes("firebasestorage");
//     //           }

//     //           return true;
//     //         });
//     //       });
//     //       console.log("Filtered blogs:", filteredBlogs);
//     //     }}
//     //   >
//     //     Filter Blogs
//     //   </Button>

//     //   <Button
//     //     onClick={() => {
//     //       const ahh = blogs.map((x) => {
//     //         if (!x.content.coverImage.src.match("https://tradejini")) {
//     //           return x;
//     //         } else {
//     //           return null;
//     //         }
//     //       });
//     //       const naa = sushi.map((x) => {
//     //         if (!x.content.coverImage.src.match("https://tradejini")) {
//     //           return x;
//     //         } else {
//     //           return null;
//     //         }
//     //       });

//     //       console.log(
//     //         ahh.filter((x) => x),
//     //         naa.filter((x) => x),
//     //       );
//     //     }}
//     //   >
//     //     Check Blogs Length
//     //   </Button>
//     //   {/* <Button
//     //     onClick={() => {
//     //       console.log(imagestodo.length, myimage.length);
//     //     }}
//     //   >
//     //     Check Length
//     //   </Button> */}
//     //   {/* <Button
//     //     onClick={() => {
//     //       const todo = myimage.filter((x) => {
//     //         return my.some((title) => {
//     //           // Convert both strings to lowercase and remove special characters for comparison
//     //           const cleanTitle = title
//     //             .toLowerCase()
//     //             .replace(/[^a-z0-9\s]/g, "");
//     //           const cleanBlogName = x.blogName
//     //             .toLowerCase()
//     //             .replace(/[^a-z0-9\s]/g, "");
//     //           // Check if strings are similar (one contains the other)
//     //           return (
//     //             cleanTitle.includes(cleanBlogName) ||
//     //             cleanBlogName.includes(cleanTitle)
//     //           );
//     //         });
//     //       });
//     //       console.log(todo);
//     //     }}
//     //   >
//     //     hehe
//     //   </Button> */}
//     //   <Button
//     //     onClick={async () => {
//     //       try {
//     //         // Import merged blogs data
//     //         const mergedBlogs = sushiFinal;

//     //         // Define blog type
//     //         interface Blog {
//     //           category?: string;
//     //           content?: {
//     //             title?: string;
//     //           };
//     //           [key: string]: any;
//     //         }

//     //         // Group blogs by category with proper typing
//     //         const groupedBlogs = mergedBlogs.reduce<Record<string, Blog[]>>(
//     //           (acc, blog: Blog) => {
//     //             // Get category from blog, clean and standardize it
//     //             let category = blog.category || "Uncategorized";

//     //             // Clean up category name
//     //             category = category.trim();
//     //             // Remove any trailing spaces after |
//     //             category = category
//     //               .split("|")
//     //               .map((c) => c.trim())
//     //               .join(" | ");

//     //             // Convert keys to camelCase
//     //             const cleanedBlog = Object.entries(blog).reduce(
//     //               (obj, [key, value]) => {
//     //                 const camelKey = key
//     //                   .toLowerCase()
//     //                   .replace(/([-_][a-z])/g, (group) =>
//     //                     group.toUpperCase().replace("-", "").replace("_", ""),
//     //                   );
//     //                 obj[camelKey] = value;
//     //                 return obj;
//     //               },
//     //               {} as any,
//     //             );

//     //             if (!acc[category]) {
//     //               acc[category] = [];
//     //             }
//     //             acc[category].push(cleanedBlog);
//     //             return acc;
//     //           },
//     //           {},
//     //         );

//     //         // Log what would be uploaded
//     //         for (const [category, categoryBlogs] of Object.entries(
//     //           groupedBlogs,
//     //         )) {
//     //           const docId = IDfy(category);
//     //           console.log(
//     //             "%c Would upload to blogs/",
//     //             "font-size: 16px; color: blue;",
//     //             docId,
//     //             ":",
//     //             {
//     //               id: docId,
//     //               title: category,
//     //               blogs: categoryBlogs,
//     //             },
//     //           );
//     //         }

//     //         // Upload to Firestore
//     //         for (const [category, categoryBlogs] of Object.entries(
//     //           groupedBlogs,
//     //         )) {
//     //           const docId = IDfy(category);
//     //           const docRef = doc(db, "blogs", docId);

//     //           await setDoc(docRef, {
//     //             id: docId,
//     //             title: category,
//     //             blogs: categoryBlogs,
//     //           });
//     //           console.log(
//     //             "%c Successfully uploaded category:",
//     //             "font-size: 16px; color: green;",
//     //             category,
//     //           );
//     //         }

//     //         console.log(
//     //           "%c All blogs uploaded successfully!",
//     //           "font-size: 20px; color: green; font-weight: bold;",
//     //         );
//     //       } catch (error) {
//     //         console.error(
//     //           "%c Error uploading blogs:",
//     //           "font-size: 16px; color: red;",
//     //           error,
//     //         );
//     //       }
//     //     }}
//     //   >
//     //     Test Blog Upload
//     //   </Button>
//     //   <Button
//     //     onClick={async () => {
//     //       try {
//     //         const querySnapshot = await getDocs(collection(db, "blogs"));
//     //         const blogs = querySnapshot.docs.map((doc) => ({
//     //           id: doc.id,
//     //           ...doc.data(),
//     //         }));
//     //         console.log("Fetched blogs:", blogs);
//     //       } catch (error) {
//     //         console.error("Error fetching blogs:", error);
//     //       }
//     //     }}
//     //   >
//     //     Fetch Blog
//     //   </Button>
//     //   {/* <Button
//     //     onClick={async () => {
//     //       try {
//     //         const faqData = require("@/data/faq_structured.json");

//     //         // Loop through each collection
//     //         for (const collection of faqData.collections) {
//     //           const id = crypto.randomUUID();
//     //           // Create document reference with collection ID as document ID
//     //           const docRef = doc(db, "knowledge-base", id);

//     //           // Upload collection data
//     //           await setDoc(docRef, {
//     //             id,
//     //             slug: collection.id,
//     //             documentId: id,
//     //             title: collection.title,
//     //             pathname: collection.pathname,
//     //             topics: collection.topics,
//     //             created_at: Date.now(),
//     //             modified_at: Date.now(),
//     //           });

//     //           console.log(`Uploaded collection: ${collection.id}`);
//     //         }

//     //         console.log("Successfully uploaded all collections to Firestore");
//     //       } catch (error) {
//     //         console.error("Error uploading collections:", error);
//     //       }
//     //     }}
//     //   >
//     //     Upload FAQ Collections
//     //   </Button> */}

//     //   {/* <Button
//     //     onClick={async () => {
//     //       await setDoc(doc(db, "tags", "tags"), {
//     //         tags: [
//     //           { tag: "OptionsStrategies", color: "#FF6347" },
//     //           { tag: "Delta", color: "#FFD700" },
//     //           { tag: "Gamma", color: "#6A5ACD" },
//     //           { tag: "Volume", color: "#1E90FF" },
//     //           { tag: "EMA", color: "#32CD32" },
//     //           { tag: "RSI", color: "#FF1493" },
//     //           { tag: "ADX", color: "#4B0082" },
//     //           { tag: "CMP", color: "#FF4500" },
//     //           { tag: "MACD", color: "#00CED1" },
//     //           { tag: "RiskManagement", color: "#2E8B57" },
//     //           { tag: "StopLoss", color: "#8B0000" },
//     //           { tag: "Scalping", color: "#FF69B4" },
//     //           { tag: "Mean Reversion", color: "#9370DB" },
//     //           { tag: "GapUp", color: "#FFA500" },
//     //           { tag: "GapDown", color: "#8B4513" },
//     //           { tag: "Intraday", color: "#4682B4" },
//     //           { tag: "SwingTrading", color: "#FF7F50" },
//     //           { tag: "FII", color: "#20B2AA" },
//     //           { tag: "DII", color: "#FF4500" },
//     //           { tag: "Inflation", color: "#FF6347" },
//     //           { tag: "InterestRates", color: "#8A2BE2" },
//     //           { tag: "Startups", color: "#00FA9A" },
//     //           { tag: "Innovation", color: "#7B68EE" },
//     //           { tag: "Banking", color: "#00BFFF" },
//     //           { tag: "Fintech", color: "#DC143C" },
//     //           { tag: "Energy", color: "#FFD700" },
//     //           { tag: "IT", color: "#6495ED" },
//     //           { tag: "GreenInitiatives", color: "#228B22" },
//     //           { tag: "Mergers", color: "#8B0000" },
//     //           { tag: "Hedging", color: "#ADFF2F" },
//     //           { tag: "Equity", color: "#FF8C00" },
//     //           { tag: "Bonds", color: "#808080" },
//     //           { tag: "MutualFunds", color: "#00FF7F" },
//     //           { tag: "ETFs", color: "#4682B4" },
//     //           { tag: "SIP", color: "#20B2AA" },
//     //           { tag: "Compounding", color: "#9932CC" },
//     //           { tag: "Retirement", color: "#708090" },
//     //           { tag: "Budgeting", color: "#FF4500" },
//     //           { tag: "Savings", color: "#00CED1" },
//     //           { tag: "DebtManagement", color: "#8B4513" },
//     //           { tag: "TaxBenefits", color: "#6A5ACD" },
//     //           { tag: "AI", color: "#4682B4" },
//     //           { tag: "Automation", color: "#7FFF00" },
//     //           { tag: "Markets", color: "#FF6347" },
//     //           { tag: "Elections", color: "#FFD700" },
//     //           { tag: "Demat", color: "#1E90FF" },
//     //           { tag: "Orders", color: "#FF69B4" },
//     //           { tag: "Insurance", color: "#8A2BE2" },
//     //           { tag: "Default", color: "#808080" },
//     //         ],
//     //       });

//     //       // const cats = Array.from(
//     //       //   new Set(
//     //       //     blogs.map((x, i) => {
//     //       //       return x.category.trim();
//     //       //     }),
//     //       //   ),
//     //       // );
//     //       // const list = cats.map((c) => {
//     //       //   return {
//     //       //     [c]: [...blogs.filter((x) => x.category === c)],
//     //       //   };
//     //       // });
//     //       // const tags = blogs.map((x) => x.content.tags.map((y) => y));
//     //       // let total = [];
//     //       // tags.forEach((x) => {
//     //       //   total = [...total, ...x];
//     //       // });
//     //       // console.log(Array.from(new Set(total)));
//     //       // list.forEach(async (cat) => {
//     //       //   const id = IDfy(Object.keys(cat)[0].trim());
//     //       //   await setDoc(doc(db, "blogs", id), {
//     //       //     id,
//     //       //     blogs: Object.values(cat)[0],
//     //       //     title: Object.keys(cat)[0],
//     //       //   });
//     //       // });
//     //       // await setDoc(doc(db, "blogs", "blogs"), {
//     //       //   ...list,
//     //       // });
//     //     }}
//     //   >
//     //     Upload blogs
//     //   </Button> */}
//     //   <Button
//     //     className="hidden"
//     //     onClick={async () => {
//     //       upload.forEach(async (document) => {
//     //         try {
//     //           await setDoc(doc(db, "faq", document.docId), document);
//     //           console.log("%cPASSED", "font-size:32px; color:limegreen");
//     //         } catch (err) {
//     //           console.log(
//     //             "%cFAILED",
//     //             "font-size:32px; color:red",
//     //             document.docId,
//     //             err,
//     //           );
//     //         }
//     //       });
//     //     }}
//     //   >
//     //     UPLOAD
//     //   </Button>

//     //   <Button
//     //     className="hidden"
//     //     onClick={async () => {
//     //       const bad_doc: FAQType[] = root.filter((x) => x.docId.includes(" "));
//     //       const bad_children: FAQType[] = root.filter(
//     //         (x) => x.children.filter((y) => y.slug.includes(" ")).length > 0,
//     //       );
//     //       const bad_parent: FAQType[] = root.filter(
//     //         (x) => x.related_to !== "root" && x.related_to?.slug.includes(" "),
//     //       );

//     //       // console.log(bad_doc);
//     //       bad_doc.forEach(async (i: FAQType) => {
//     //         await setDoc(doc(db, "faq", i.id), {
//     //           ...i,
//     //           docId: i.docId.replaceAll(" ", "-"),
//     //         });
//     //         console.log("%cPASSED", "color:limegreen; font-size:32px");
//     //       });
//     //       const querySnapshot = await getDocs(collection(db, "faq"));
//     //       // // querySnapshot.forEach((doc) => {
//     //       // //   const data = doc.data();
//     //       // //   setBad((org) => {
//     //       // //     return [...org, data];
//     //       // //   });
//     //       // //   // if (data.docId == undefined) {
//     //       // //   // }
//     //       // // });
//     //     }}
//     //     // const data: FAQType = doc.data();
//     //     //     if (data.docId) {
//     //     //       try {
//     //     //         await setDoc(doc(db, "faq", data.docId), {
//     //     //           ...data,
//     //     //           docId: data.docId.trim(),
//     //     //         });
//     //     //         console.log("%cPASSED", "color:limegreen; font-size:32px");
//     //     //       } catch (err) {
//     //     //         console.log(
//     //     //           "%cFAILED",
//     //     //           "color:red; font-size:32px",
//     //     //           data.docId,
//     //     //           err,
//     //     //         );
//     //     //       }
//     //     //     }
//     //   >
//     //     convert
//     //   </Button>
//     //   <Button
//     //     className="hidden"
//     //     onClick={async () => {
//     //       setRoot(() => []);
//     //       const querySnapshot = await getDocs(collection(db, "faq"));
//     //       querySnapshot.forEach((doc: any) => {
//     //         setRoot((org: any) => {
//     //           return [...org, doc.data()];
//     //         });
//     //       });
//     //     }}
//     //   >
//     //     Backup
//     //   </Button>

//     //   {/* <Button
//     //     onClick={async () => {
//     //       const children = data.map((section) => {
//     //         const section_id = Object.keys(section)[0]
//     //           .replaceAll("_", "-")
//     //           .replace(/[^a-zA-Z0-9\s\-]/g, "")
//     //           .toLowerCase();
//     //         const section_title = Object.keys(section)[0].replaceAll("_", " ");
//     //         return { slug: section_id, title: section_title };
//     //       });

//     //       const root = (await getDoc(doc(db, "faq", main_id))).data();
//     //       if (!root) {
//     //         const uploadRoot = await setDoc(doc(db, "faq", main_id), {
//     //           title: main_name,
//     //           slug: main_id,
//     //           id: main_id,
//     //           children: children,
//     //           content: "",
//     //           created_at: Date.now(),
//     //           modified_at: Date.now(),
//     //           related_to: "root",
//     //           pathName: "/" + main_id,
//     //           docid: main_id,
//     //           collection: [],
//     //         });
//     //       }
//     //       if (root) {
//     //         const uploadRoot = await setDoc(doc(db, "faq", main_id), {
//     //           title: main_name,
//     //           slug: main_id,
//     //           id: main_id,
//     //           children,
//     //           content: "",
//     //           created_at: Date.now(),
//     //           modified_at: Date.now(),
//     //           related_to: "root",
//     //           pathName: "/" + main_id,
//     //           docid: main_id,
//     //           collection: [],
//     //         });
//     //       }

//     //       data.forEach(async (section) => {
//     //         const section_id = Object.keys(section)[0]
//     //           .replaceAll("_", "-")
//     //           .replace(/[^a-zA-Z0-9\s\-]/g, "")
//     //           .toLowerCase();
//     //         const section_title = Object.keys(section)[0].replaceAll("_", " ");
//     //         const docs = Object.values(section)[0][0];

//     //         const questions = Object.keys(docs).map((doc, i) => {
//     //           const document_id = doc
//     //             .replaceAll("_", "-")
//     //             .replace(/[^a-zA-Z0-9\s\-]/g, "")
//     //             .toLowerCase();

//     //           const children = docs[doc].map((c: any) => {
//     //             const question_id = IDfy(c.question);
//     //             return {
//     //               id: question_id,
//     //               slug: question_id,
//     //               created_at: Date.now(),
//     //               children: [],
//     //               content: `<p>${c.answer}</p>`,
//     //               modified_at: Date.now(),
//     //               title: c.question,
//     //               related_to: {
//     //                 slug: document_id,
//     //                 title: doc,
//     //               },
//     //               status: 2,
//     //               pathName:
//     //                 "/" +
//     //                 main_id +
//     //                 "/" +
//     //                 section_id +
//     //                 "/" +
//     //                 document_id +
//     //                 "/" +
//     //                 question_id,
//     //               docId:
//     //                 main_id +
//     //                 "+" +
//     //                 section_id +
//     //                 "+" +
//     //                 document_id +
//     //                 "+" +
//     //                 question_id,
//     //             };
//     //           });

//     //           return children;
//     //         });

//     //         const document = Object.keys(docs).map((doc, i) => {
//     //           const document_id = doc
//     //             .replaceAll("_", "-")
//     //             .replace(/[^a-zA-Z0-9\s\-]/g, "")
//     //             .toLowerCase();
//     //           // console.log(docs[doc]);
//     //           return {
//     //             id: document_id,
//     //             slug: document_id,
//     //             title: doc.replaceAll("_", " "),
//     //             created_at: Date.now(),
//     //             children: questions[i].map((q: any) => ({
//     //               slug: q.id,
//     //               title: q.title,
//     //               status: 2,
//     //               timestamp: Date.now(),
//     //               pathName:
//     //                 "/" +
//     //                   main_id +
//     //                   "/" +
//     //                   section_id +
//     //                   "/" +
//     //                   document_id +
//     //                   "/" +
//     //                   q?.id || "",
//     //             })),
//     //             content: "",
//     //             modified_at: Date.now(),
//     //             related_to: {
//     //               slug: section_id,
//     //               title: section_title,
//     //             },
//     //             pathName: "/" + main_id + "/" + section_id + "/" + document_id,
//     //             docId: main_id + "+" + section_id + "+" + document_id,
//     //             //   data: Object.values(docs)[i],
//     //           };
//     //         });
//     //         const dtu: any = {
//     //           title: section_title,
//     //           slug: section_id,
//     //           id: section_id,
//     //           created_at: Date.now(),
//     //           children: document.map((c) => ({
//     //             slug: c.id,
//     //             title: c.title,
//     //             timestamp: Date.now(),
//     //             pathName: "/" + main_id + "/" + section_id + "/" + c.id,
//     //           })),
//     //           content: "",
//     //           modified_at: Date.now(),
//     //           related_to: {
//     //             slug: main_id,
//     //             title: main_name,
//     //           },
//     //           pathName: "/" + main_id + "/" + section_id,
//     //           docId: main_id + "+" + section_id,
//     //         };

//     //         // console.log(root);
//     //         //   THIS WORKS
//     //         // await setDoc(doc(db, "faq", main_id + "+" + section_id), dtu);
//     //         // THIS WORKS

//     //         //   THIS WORKS
//     //         // document.map(async (d) => {
//     //         //   await setDoc(
//     //         //     doc(db, "faq", main_id + "+" + section_id + "+" + d.id),
//     //         //     d,
//     //         //   );
//     //         // });
//     //         //   THIS WORKS

//     //         //   THIS WORKS
//     //         // questions.map(async (q) =>
//     //         //   q.map(async (a: any) => {
//     //         //     await setDoc(
//     //         //       doc(
//     //         //         db,
//     //         //         "faq",
//     //         //         main_id +
//     //         //           "+" +
//     //         //           section_id +
//     //         //           "+" +
//     //         //           a.related_to.slug +
//     //         //           "+" +
//     //         //           a.id,
//     //         //       ),
//     //         //       a,
//     //         //     );
//     //         //   }),
//     //         // );
//     //         //   THIS WORKS
//     //       });
//     //     }}
//     //   >
//     //     Upload data
//     //   </Button> */}

//     //   {/* <Button
//     //       className=""
//     //       onClick={async () => {
//     //         // console.log(py, data);
//     //         // const data = py;
//     //         const children = data.map((section) => {
//     //           const section_id = Object.keys(section)[0]
//     //             .replaceAll(" ", "-")
//     //             .replace(/[^a-zA-Z0-9\s\-]/g, "")
//     //             .toLowerCase();
//     //           const section_title = Object.keys(section)[0].replaceAll(
//     //             "_",
//     //             " ",
//     //           );

//     //           return { slug: section_id, title: section_title };
//     //         });

//     //         const root = (await getDoc(doc(db, "faq", main_id))).data();
//     //         if (!root) {
//     //           const uploadRoot = await setDoc(doc(db, "faq", main_id), {
//     //             title: main_name,
//     //             slug: main_id,
//     //             id: main_id,
//     //             children: children,
//     //             content: "",
//     //             created_at: Date.now(),
//     //             modified_at: Date.now(),
//     //             related_to: "root",
//     //             pathName: "/" + main_id,
//     //             docId: main_id,
//     //           });
//     //         }
//     //         if (root) {
//     //           const uploadRoot = await setDoc(doc(db, "faq", main_id), {
//     //             title: main_name,
//     //             slug: main_id,
//     //             id: main_id,
//     //             children,
//     //             content: "",
//     //             created_at: Date.now(),
//     //             modified_at: Date.now(),
//     //             related_to: "root",
//     //             pathName: "/" + main_id,
//     //             docId: main_id,
//     //           });
//     //         }

//     //         data.forEach(async (section) => {
//     //           // console.log(section);
//     //           const section_id = IDfy(Object.keys(section)[0]);
//     //           const section_title = Object.keys(section)[0];
//     //           const docs = Object.values(section)[0][0];
//     //           const questions = Object.keys(docs).map((doc, i) => {
//     //             const document_id = IDfy(doc);
//     //             const children = docs[doc].map((c: any) => {
//     //               const question_id = IDfy(c.question);
//     //               return {
//     //                 id: question_id,
//     //                 slug: question_id,
//     //                 created_at: Date.now(),
//     //                 children: [],
//     //                 content: `<p>${c.answer}</p>`,
//     //                 modified_at: Date.now(),
//     //                 title: c.question,
//     //                 related_to: {
//     //                   slug: document_id,
//     //                   title: doc,
//     //                 },
//     //                 status: 2,
//     //                 pathName:
//     //                   "/" +
//     //                   main_id +
//     //                   "/" +
//     //                   section_id +
//     //                   "/" +
//     //                   document_id +
//     //                   "/" +
//     //                   question_id,
//     //                 docId:
//     //                   main_id +
//     //                   "+" +
//     //                   section_id +
//     //                   "+" +
//     //                   document_id +
//     //                   "+" +
//     //                   question_id,
//     //               };
//     //             });

//     //             return children;
//     //           });

//     //           const document = Object.keys(docs).map((doc, i) => {
//     //             const document_id = IDfy(doc);
//     //             return {
//     //               id: document_id,
//     //               slug: document_id,
//     //               title: doc.replaceAll("_", " "),
//     //               created_at: Date.now(),
//     //               children: questions[i].map((q: any) => ({
//     //                 slug: q.id,
//     //                 title: q.title,
//     //                 status: 2,
//     //                 timestamp: Date.now(),
//     //                 pathName:
//     //                   "/" +
//     //                     main_id +
//     //                     "/" +
//     //                     section_id +
//     //                     "/" +
//     //                     document_id +
//     //                     "/" +
//     //                     q?.id || "",
//     //               })),
//     //               content: "",
//     //               modified_at: Date.now(),
//     //               related_to: {
//     //                 slug: section_id,
//     //                 title: section_title,
//     //               },
//     //               pathName:
//     //                 "/" + main_id + "/" + section_id + "/" + document_id,
//     //               docId: main_id + "+" + section_id + "+" + document_id,
//     //               //   data: Object.values(docs)[i],
//     //             };
//     //           });
//     //           // console.log(Object.keys(docs));
//     //           const dtu: any = {
//     //             title: section_title,
//     //             slug: section_id,
//     //             id: section_id,
//     //             created_at: Date.now(),
//     //             children: document.map((c) => ({
//     //               slug: c.id,
//     //               title: c.title,
//     //               timestamp: Date.now(),
//     //               pathName: "/" + main_id + "/" + section_id + "/" + c.id,
//     //             })),
//     //             content: "",
//     //             modified_at: Date.now(),
//     //             related_to: {
//     //               slug: main_id,
//     //               title: main_name,
//     //             },
//     //             pathName: "/" + main_id + "/" + section_id,
//     //             docId: main_id + "+" + section_id,
//     //           };
//     //           // console.log(data, py);
//     //           console.log(docs);
//     //           // console.log(root);
//     //           //   THIS WORKS
//     //           // await setDoc(doc(db, "faq", main_id + "+" + section_id), dtu);
//     //           //   THIS WORKS

//     //           //   THIS WORKS
//     //           // document.map(async (d) => {
//     //           //   await setDoc(doc(db, "faq", d.id), d);
//     //           // });
//     //           //   THIS WORKS

//     //           //   THIS WORKS
//     //           // questions.map(async (q) =>
//     //           //   q.map(async (a: any) => {
//     //           //     await setDoc(doc(db, "faq", a.id), a);
//     //           //   }),
//     //           // );
//     //           //   THIS WORKS
//     //         });
//     //       }}
//     //     >
//     //       Upload data
//     //     </Button> */}
//     // </div>
//   );
// }
