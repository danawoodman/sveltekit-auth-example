import debug from "debug";
import { writable } from "svelte/store";

const log = debug("app:lib:stores:session");

interface Session {
	user?: User | null;
}
export const session = writable<Session>({ user: null });

session.subscribe((session) => log("session:", session));
