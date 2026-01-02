import { getCalendarGrid } from "./helpers";
import type { MonthProps } from "./types";

const Month = ({ month, locale, startOnMonday, events }: MonthProps) => {
	const { days, label, daysOfTheWeek } = getCalendarGrid(
		month,
		locale,
		startOnMonday,
	);

	return (
		<table>
			<thead>
				<tr>
					<th colSpan={7}>{label}</th>
				</tr>
				<tr>
					{daysOfTheWeek.map((dayLabel) => (
						<th key={dayLabel}>{dayLabel}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{days.map((row) => {
					return (
						<tr key={row.index}>
							{row.cells.map((cell) => {
								const hasEvents =
									events?.[cell.day] && events[cell.day]?.length;
								if (!hasEvents) {
									return <td key={cell.index}>{cell.day ? cell.day : ""}</td>;
								}
								const className = events[cell.day]?.at(0)?.className;
								const url = events[cell.day]?.at(0)?.url;
								return (
									<td key={cell.index} className={className}>
										{url ? (
											<a href={url}>{cell.day}</a>
										) : (
											<strong>{cell.day}</strong>
										)}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Month;
