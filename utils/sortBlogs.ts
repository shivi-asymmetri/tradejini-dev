import { BlogType, TransformedBlogType } from "@/types/BlogType";
import { compareDates } from "./dateUtils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Helper function to extract day number from date string with ordinal suffix
function extractDayNumber(dateStr: string): number {
  const match = dateStr.match(/^(\d+)(?:st|nd|rd|th)?/);
  return match ? parseInt(match[1], 10) : 0;
}

export function SORTBLOGS(blogs: BlogType[]) {
  // Log the blogs before sorting
  if (blogs.length > 0) {
    blogs.forEach((blog, index) => {
    });
  }

  const sortedBlogs = blogs.sort((a, b) => {
    // Use the compareDates function for consistent date comparison
    return compareDates(b.publicationDate, a.publicationDate);
  });

  // Log the blogs after sorting
  if (sortedBlogs.length > 0) {
    sortedBlogs.forEach((blog, index) => {
    });
  }

  return sortedBlogs;
}

export function SORTBLOGSFORCATEGORY(blogs: TransformedBlogType[]) {
  // Log the blogs before sorting
  if (blogs.length > 0) {
    blogs.forEach((blog, index) => {
    });
  }

  const sortedBlogs = blogs.sort((a, b) => {
    // Use the compareDates function for consistent date comparison
    const dateA = a.stats?.publicationDate || "0 Jan 1970";
    const dateB = b.stats?.publicationDate || "0 Jan 1970";

    return compareDates(dateB, dateA);
  });

  // Log the blogs after sorting
  if (sortedBlogs.length > 0) {
    sortedBlogs.forEach((blog, index) => {
    });
  }

  return sortedBlogs;
}
