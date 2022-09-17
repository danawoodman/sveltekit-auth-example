// See: https://kit.svelte.dev/docs/types#app
// import { Result} from "neverthrow";

declare namespace App {
	interface Locals {
		user?: User;
	}
	// interface PageData { }
	// interface PageError {}
	// interface Platform {}
}

interface User {
	id?: string;
	email: string;
	password?: string;
	token?: string;
	[key: string]: any;
}

type AuthResponse = Result<User>;

interface AuthAdapter {
	login(props: {
		email: string;
		password: string;
		// TEMPORARY
		opts?: any;
	}): Promise<AuthResponse>;
	signup(props: {
		email: string;
		password: string;
		password_confirm: string;
		// TEMPORARY
		opts?: any;
	}): Promise<AuthResponse>;
	validate_session(props: {
		token: string;
		// TEMPORARY
		opts?: any;
	}): Promise<AuthResponse>;
	logout(props: {
		token: string;
		// TEMPORARY
		opts?: any;
	}): Promise<Result<void>>;
}
