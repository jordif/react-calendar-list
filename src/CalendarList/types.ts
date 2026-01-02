export interface Month {
	month: number;
	year: number;
}

export interface Post {
	date: Date;
	url?: string;
	className?: string;
}

export interface GroupedPosts {
	[year: number]: {
		[month: number]: {
			[day: number]: Post[];
		};
	};
}

export interface CalendarListProps {
	posts: Post[];
	locale?: string;
	startOnMonday?: boolean;
}

export interface MonthProps {
	month: Month;
	locale: string;
	startOnMonday: boolean;
	events?: { [day: number]: Post[] };
}

export interface DayCell {
	index: number;
	day: number;
}

export interface DayRow {
	index: number;
	cells: DayCell[];
}
