import { parseDate, DateFormatter } from "@internationalized/date";

/**
 * Utility function to parse a date string into a date object.
 * Returns the parsed date if successful, or null if not.
 *
 * @param {string} dateString - The date string to parse.
 * @returns {Date|null} The parsed date object, or null if parsing fails.
 */
export function parseDateUtil(dateString: string | null) {
	if (!dateString) return null;
	console.log(dateString);
	const parsedDate = parseDate(dateString as string);
	return parsedDate ? parsedDate : null;
}
