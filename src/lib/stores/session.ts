import debug from "debug";
import { writable } from "svelte/store";
import { setContext, getContext } from "svelte";

const log = debug("app:lib:stores:session");

interface Session {
	user?: User | null;
}

// If a store is created in SSR, it will end up being a global store shared by all users
// Let's wrap the store using Svelte's context API
// See https://github.com/sveltejs/kit/discussions/4339

const session = writable<Session>({ user: null });
session.subscribe((session) => log("session:", session));

export function createSessionStore() {
	return setContext("session", session);
}

export function getSessionStore() {
	return getContext("session");
}
