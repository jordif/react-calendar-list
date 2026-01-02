import { getMonthsBetweenDates, groupPosts, sortPosts } from "./helpers";
import Month from "./Month";
import type { CalendarListProps } from "./types";

const CalendarList = ({
	posts,
	locale = "en-US",
	startOnMonday = false,
}: CalendarListProps) => {
	const sortedPosts = sortPosts(posts);
	const groupedPosts = groupPosts(sortedPosts);

	const startDate = sortedPosts?.at(0)?.date || new Date();
	const endDate = sortedPosts?.at(-1)?.date || new Date();

	const monthsInRange = getMonthsBetweenDates(startDate, endDate);

	return (
		<>
			{monthsInRange.map((month) => {
				return (
					<Month
						key={`${month.year}-${month.month}`}
						month={month}
						locale={locale}
						startOnMonday={startOnMonday}
						events={groupedPosts[month.year]?.[month.month]}
					></Month>
				);
			})}
		</>
	);
};

export { CalendarList };
