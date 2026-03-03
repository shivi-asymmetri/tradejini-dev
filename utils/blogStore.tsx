// import { db } from "@/firebase";
// import { BlogType } from "@/types/BlogType";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import chalk from "chalk";
// let blogs: BlogType[] = [];
// export async function blogStore(category: string) {
//   console.log(chalk.bgGreenBright.black("FETCHING BLOGS"));
//   if (category === "*") {
//     const querySnapshot = await getDocs(collection(db, "blogs"));
//     querySnapshot.forEach((doc: any) => {
//       blogs = [...blogs, ...doc.data().blogs];
//     });
//   } else {
//     const data = await getDoc(doc(db, "blogs", category));
//     blogs = data.data()?.blogs;
//   }
//   return blogs;
// }
// export async function tagStore() {
//   const data = await getDoc(doc(db, "tags", "tags"));
//   return data.data()?.tags;
// }

// export async function FAQStore() {
//   const querySnapshot = await getDocs(collection(db, "knowledge-base"));
//   const documents = querySnapshot.docs.map((doc) => ({
//     // id: doc.id,
//     ...doc.data(),
//   }));
//   // console.log(documents);
//   const flat = [
//     ...documents.map((x) =>
//       x.topics.map((x: any) => x.categories.map((x: any) => x.questions)),
//     ),
//   ];
//   const allFAQ = flat.flat(3);
//   return allFAQ;
// }

// export async function categoryStore() {
//   if (blogs) {
//     const all = Array.from(new Set(blogs.map((x) => x.category)));
//     let countedCategories: { name: string; count: number }[] = [];

//     all.forEach((c) => {
//       countedCategories = [
//         ...countedCategories,
//         {
//           name: c,
//           count: blogs.filter((x) => x.category === c).length,
//         },
//       ];
//     });

//     return countedCategories;
//   }
// }

//==========================================
import { BlogType } from "@/types/BlogType";
import chalk from "chalk";

let blogs: BlogType[] = [];

// Helper function to get the base URL - more robust implementation
function getBaseUrl() {
  // Only add a base URL for server-side rendering
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  // For client-side, we can use relative URLs so return empty string
  return "";
}

export async function blogStore(category: string) {
  try {
    // Determine the API endpoint based on the category
    const endpoint =
      category === "*"
        ? `/api/admin/blogs`
        : `/api/admin/blogs?categoryId=${encodeURIComponent(category)}`;

    console.log("Fetching blogs from:", endpoint);

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.length} blogs`);

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function tagStore() {
  try {
    // Use a relative URL for client-side or a complete URL for server-side
    const url =
      typeof window === "undefined"
        ? new URL(
            "/api/admin/tags",
            process.env.NEXT_PUBLIC_BASE_URL,
          ).toString()
        : "/api/admin/tags";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`);
    }

    const tags = await response.json();
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function FAQStore() {
  try {
    const baseUrl = getBaseUrl();
    // Use the API endpoint to fetch FAQs
    const response = await fetch(`${baseUrl}/api/faqs`);

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }

    const faqs = await response.json();

    // Transform the data to match the expected format from the previous implementation
    return faqs;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function categoryStore() {
  if (blogs && blogs.length > 0) {
    // If blogs are already loaded, calculate categories from them
    const all = Array.from(new Set(blogs.map((x) => x.categoryId)));
    let countedCategories: { name: string; count: number }[] = [];

    all.forEach((c) => {
      countedCategories = [
        ...countedCategories,
        {
          name: blogs.filter((x) => x.categoryId === c)[0]?.category?.name || c,
          count: blogs.filter((x) => x.categoryId === c).length,
        },
      ];
    });

    return countedCategories;
  } else {
    // If blogs aren't loaded yet, fetch categories from API
    try {
      // Use a relative URL for client-side or a complete URL for server-side
      // This is safer than trying to construct a full URL
      const url =
        typeof window === "undefined"
          ? new URL(
              "/api/admin/categories",
              process.env.NEXT_PUBLIC_BASE_URL ,
            ).toString()
          : "/api/admin/categories";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const categories = await response.json();
      return categories.map((category: any) => ({
        name: category.name,
        count: category.count,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
}
