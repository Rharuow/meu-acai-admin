const { DateTime } = require("luxon");

export type User = {
	id: string;
	name: string;
	birthday?: string;
	phone: string;
	address: {
		house: number;
		square: number;
	};
	password: string;
	wallet: number;
	members?: Array<{ name: string; birthday?: string }>;
	created_at: Date;
};

export const mockedUser: User = {
	id: "1",
	name: "Harysson Soares",
	phone: "+55084981758502",
	address: {
		house: 39,
		square: 5,
	},
	members: [{ name: "Fernanda Oliveira", birthday: "1992-08-27" }],
	birthday: "1991-05-17",
	password: "123123123",
	wallet: 0.0,
	created_at: DateTime.fromSQL(),
};
