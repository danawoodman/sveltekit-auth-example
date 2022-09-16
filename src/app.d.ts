// See: https://kit.svelte.dev/docs/types#app

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
	session_token?: string;
}

interface AuthAdapter {
	login: (email: string, password: string, opts?: any) => Promise<User | null>;
	signup: (email: string, password: string, opts?: any) => Promise<User | null>;
	validate_session: (token: string, opts?: any) => Promise<User | null>;
	logout: (token: string, opts?: any) => Promise<void>;
}
