import type { DayCell, DayRow, GroupedPosts, Month, Post } from "./types";

/**
 * Sort posts by date
 * @param posts Array of posts
 * @returns New array of posts sorted by date
 */
export const sortPosts = (posts: Post[]): Post[] => {
	return [...posts].sort((a, b) => {
		if (a.date < b.date) {
			return -1;
		}
		if (a.date > b.date) {
			return 1;
		}
		return 0;
	});
};

/**
 * Group posts by year, month and day
 * @param posts Array of posts
 * @returns Nested object: GroupedPosts[year][month][day] = Post[]
 */
export const groupPosts = (posts: Post[]): GroupedPosts => {
	const grouped: GroupedPosts = {};

	posts.forEach((post) => {
		const year = post.date.getFullYear();
		const month = post.date.getMonth();
		const day = post.date.getDate();

		grouped[year] = grouped[year] || {};
		grouped[year][month] = grouped[year][month] || {};
		grouped[year][month][day] = grouped[year][month][day] || [];

		grouped[year][month][day].push(post);
	});

	return grouped;
};

/**
 * Calculate the number of days in a given month.
 * This function leverages a special behavior of the Date constructor where
 * a day value of 0 returns the last day of the previous month
 * @param year The year
 * @param month The month
 * @returns The number of days in the specified month
 */
export const getDaysInMonth = (month: Month): number => {
	return new Date(month.year, month.month + 1, 0).getDate();
};

/**
 * Get the list of months between two dates
 * @param startDate Beginning of the date range
 * @param endDate End of the date range
 * @returns Array of months, each containing a month and year property
 */
export function getMonthsBetweenDates(startDate: Date, endDate: Date): Month[] {
	const months = [];
	const currentDate = new Date(
		startDate.getFullYear(),
		startDate.getMonth(),
		1,
	);

	while (currentDate <= endDate) {
		months.push({
			month: currentDate.getMonth(),
			year: currentDate.getFullYear(),
		});
		currentDate.setMonth(currentDate.getMonth() + 1);
	}
	return months;
}

/**
 * Get the days of the week.
 * The function starts on a Sunday (Jan 5, 2025) or Monday (Jan 6, 2025)
 * @param locale The locale string ("en-US")
 * @param startOnMonday If true, week starts on Monday; otherwise, Sunday
 * @returns Array of the days of the week
 */
export function getDaysOfTheWeek(
	locale: string,
	startOnMonday: boolean = false,
): string[] {
	const days: string[] = [];
	const baseDay = startOnMonday ? 6 : 5;
	for (let i = 0; i < 7; i++) {
		const date = new Date(2025, 0, baseDay + i);
		const dayAbbreviation = new Intl.DateTimeFormat(locale, {
			weekday: "short",
		}).format(date);
		days.push(dayAbbreviation);
	}
	return days;
}

/**
 * Get the adjusted day of the week.
 * If startOnMonday is true, monday = 0; otherwise, sunday = 0.
 */
const getAdjustedDayOfWeek = (date: Date, startOnMonday: boolean): number => {
	const day = date.getDay();
	if (startOnMonday) {
		return day === 0 ? 6 : day - 1;
	}
	return day;
};

/**
 * Get the calendar grid for a given month and locale.
 * @param month The month object with year and month
 * @param locale The locale string for formatting
 * @returns Object containing days grid, label and daysOfTheWeek
 */
export const getCalendarGrid = (
	month: Month,
	locale: string,
	startOnMonday: boolean,
) => {
	const startDate = new Date(month.year, month.month, 1);
	const daysInMonth = getDaysInMonth(month);
	const endDate = new Date(month.year, month.month, daysInMonth);

	const leftPadding = getAdjustedDayOfWeek(startDate, startOnMonday);
	const rightPadding = 6 - getAdjustedDayOfWeek(endDate, startOnMonday);

	const totalCells = leftPadding + daysInMonth + rightPadding;
	const days: DayRow[] = [];
	for (let index = 0; index < totalCells; index++) {
		const dayNumber = index - leftPadding + 1;
		const isPadding = dayNumber < 1 || dayNumber > daysInMonth;
		const rowNumber = Math.floor(index / 7);
		const day: DayCell = {
			index,
			day: isPadding ? 0 : dayNumber,
		};
		if (!days[rowNumber]) {
			days[rowNumber] = { index: rowNumber, cells: [] };
		}
		days[rowNumber].cells.push(day);
	}

	const label =
		new Intl.DateTimeFormat(locale, { month: "long" }).format(startDate) +
		" " +
		month.year;
	const daysOfTheWeek = getDaysOfTheWeek(locale, startOnMonday);

	return { days, label, daysOfTheWeek };
};
