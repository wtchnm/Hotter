export interface Pendency {
	id: number;
	openingTimestamp: number;
	openingUser: string;
	openingName: string;
	closingTimestamp: number;
	closingUser: string;
	closingName: string;
	reason: string;
	solution: string;
	closed: boolean;
}
