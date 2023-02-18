export type JobDay = {
	id: string;
	date: string;
	status: "On" | "Off" | "Pending";
	started_at: string;
	finished_at?: string;
};

export const mockedJobDay: JobDay = {
	id: "1",
	date: "20/01/2023",
	status: "Off",
	started_at: "20/01/2023.16:00",
	finished_at: "20/01/2023.23:00",
};
