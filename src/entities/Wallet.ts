export type Deposit = {
	id: string;
	value: number;
	status: boolean;
	user_id: string;
	created_at: string;
};

export type Wallet = {
	id: string;
	value: number | 0;
	status: boolean;
	last_deposit?: string;
	created_at: string;
	user_id: string;
};
