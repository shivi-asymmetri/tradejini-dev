/**
 * Formats a publication date from ISO format to display format
 * @param publicationDate Original publication date string (fallback)
 * @param publicationIsoDate ISO date string or Date object
 * @returns Formatted date string in "25th May 2025" format
 */
export function formatPublicationDate(
  publicationDate: string,
  publicationIsoDate?: string | Date | null,
): string {
  if (!publicationIsoDate) {
    return publicationDate;
  }

  try {
    const date =
      publicationIsoDate instanceof Date
        ? publicationIsoDate
        : new Date(publicationIsoDate);

    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getFullYear();

      // Add suffix to day
      const suffix =
        day >= 11 && day <= 13
          ? "th"
          : day % 10 === 1
            ? "st"
            : day % 10 === 2
              ? "nd"
              : day % 10 === 3
                ? "rd"
                : "th";

      return `${day}${suffix} ${month} ${year}`;
    }
  } catch (error) {
    return publicationDate;
  }

  return publicationDate;
}

/**
 * Compares two date strings and returns a value indicating their relative order
 * @param dateA First date string
 * @param dateB Second date string
 * @returns -1 if dateA is before dateB, 1 if dateA is after dateB, 0 if equal
 */
export function compareDates(dateA: string, dateB: string): number {
  const a = new Date(dateA);
  const b = new Date(dateB);

  if (isNaN(a.getTime()) || isNaN(b.getTime())) {
    return 0; // Return 0 for invalid dates
  }

  return a.getTime() - b.getTime();
}

/**
 * Formats a blog display date from various date formats
 * @param dateString Date string in any format
 * @returns Formatted date string in "25th May 2025" format
 */
export function formatBlogDisplayDate(
  dateString?: string | number | null,
): string {
  if (!dateString) return "No date";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Add suffix to day
    const suffix =
      day >= 11 && day <= 13
        ? "th"
        : day % 10 === 1
          ? "st"
          : day % 10 === 2
            ? "nd"
            : day % 10 === 3
              ? "rd"
              : "th";

    return `${day}${suffix} ${month} ${year}`;
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Formats a date to a custom string format
 * @param date Date object or date string
 * @returns Formatted date string in "25th May 2025" format
 */
export function formatDateToCustomString(date: Date | string): string {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-US", { month: "short" });
    const year = dateObj.getFullYear();

    // Add suffix to day
    const suffix =
      day >= 11 && day <= 13
        ? "th"
        : day % 10 === 1
          ? "st"
          : day % 10 === 2
            ? "nd"
            : day % 10 === 3
              ? "rd"
              : "th";

    return `${day}${suffix} ${month} ${year}`;
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Parses a custom date string in the format "25th May 2025" to a Date object
 * @param dateString Date string in format "25th May 2025"
 * @returns Date object or null if invalid
 */
export function parseCustomDateString(dateString: string): Date | null {
  if (!dateString) return null;

  try {
    // Remove ordinal indicators (st, nd, rd, th)
    const cleanDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");

    // Parse the date
    const date = new Date(cleanDateString);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  } catch (error) {
    return null;
  }
}
