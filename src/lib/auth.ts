/**
 * NOTE: You don't want to actually store the user in the cookie
 * we're doing this for demo purposes only so we don't need a database.
 */
import type { Cookies } from "@sveltejs/kit";

const seed_user: User = {
	id: "seed-user-id",
	email: "a@b.com",
	password: "asdf",
	session_token: "seed-user-sesion-token",
};

const one_day = 60 * 60 * 24;
const maxAge = one_day * 365;

export async function find_by_token(cookies: Cookies, token: string) {
	const users = get_users(cookies);
	return users.find((user: User) => user.session_token === token);
}

export async function login(cookies: Cookies, email: string, password: string) {
	const users = get_users(cookies);
	const user = users.find((u) => u.email === email && u.password === password);
	if (!user) return null;

	user.session_token = generate_token();

	cookies.set("auth_token", user.session_token ?? "", { path: "/", maxAge });
	set_users(
		cookies,
		users.map((u) => {
			if (u.id === user.id) u.session_token = user.session_token ?? "";
			return u;
		})
	);
	return user;
}

export async function signup(
	cookies: Cookies,
	email: string,
	password: string
) {
	const session_token = generate_token();
	const user = { id: generate_token(), email, password, session_token };
	const users = get_users(cookies);

	cookies.set("auth_token", user.session_token ?? "", { path: "/", maxAge });
	set_users(cookies, [...users, user]);

	return user;
}

export async function logout(cookies: Cookies) {
	const token = cookies.get("auth_token") as string;
	// Waiting on: https://github.com/sveltejs/kit/issues/6817
	cookies.set("auth_token", "", { path: "/" });

	// Remove session_token from the user
	set_users(
		cookies,
		get_users(cookies).map((u) => {
			if (u.session_token === token) u.session_token = undefined;
			return u;
		})
	);
}

function get_users(cookies: Cookies): User[] {
	const stored = cookies.get("users");
	if (stored) return JSON.parse(stored);
	return [seed_user];
}

function set_users(cookies: Cookies, users: User[]) {
	cookies.set("users", JSON.stringify(users), { path: "/", maxAge });
}

function generate_token() {
	return Math.random().toString(36).slice(2);
}
