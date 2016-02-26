declare module Models {

	export interface IUser {
		id: number;
		email: string;
		password: string;
		twitterId: string;
		twitterToken: string;
		twitterUserName: string;
		twitterDisplayName: string;
	}
}
