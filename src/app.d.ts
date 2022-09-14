// See: https://kit.svelte.dev/docs/types#app

interface User {
	id?: number;
	email: string;
	password?: string;
}

declare namespace App {
	interface Locals {
		user?: User;
	}
	// interface PageData { }
	// interface PageError {}
	// interface Platform {}
}
