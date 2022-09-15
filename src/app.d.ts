// See: https://kit.svelte.dev/docs/types#app

interface User {
	id?: string;
	email: string;
	password?: string;
	session_token?: string;
}

declare namespace App {
	interface Locals {
		user?: User;
	}
	// interface PageData { }
	// interface PageError {}
	// interface Platform {}
}
