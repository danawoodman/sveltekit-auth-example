/**
 * NOTE: You don't want to actually store the user in the cookie
 * we're doing this for demo purposes only so we don't need a database.
 */
import type { Cookies } from "@sveltejs/kit";
import debug from "debug";
import { err, ok } from "neverthrow";

const log = debug("app:lib:auth:cookie");

const seed_user: User = {
	id: "seed-user-id",
	email: "a@b.com",
	password: "asdfasdf",
	token: "seed-user-sesion-token",
};

const one_day = 60 * 60 * 24;
const maxAge = one_day * 365;

export const cookie: AuthAdapter = {
	async validate_session({ token, opts }) {
		const [_, session_token] = token.split(":");

		// TODO: add Zod
		if (!opts?.cookies) throw new Error("must pass cookies in to options");
		if (!token) return err(new Error("no token provided"));

		const users = get_users(opts.cookies);

		log("users:", users);

		const user = users.find((user: User) => user.token === session_token);

		if (!user) return err(new Error("no user found"));

		return ok(user);
	},
	async login({ email, password, opts }) {
		// TODO: add Zod
		if (!opts?.cookies)
			return err(new Error("must pass cookies in to options"));
		if (!email) return err(new Error("email is required"));
		if (!password) return err(new Error("password is required"));

		const users = get_users(opts.cookies);
		const user = users.find(
			(u) => u.email === email && u.password === password
		);

		if (!user) return err(new Error("no user found"));

		user.token = generate_token();

		set_users(
			opts.cookies,
			users.map((u) => {
				if (u.id === user.id) u.token = user.token ?? "";
				return u;
			})
		);

		return ok(user);
	},

	async signup({ email, password, password_confirm, opts }) {
		// TODO: add Zod
		if (!opts?.cookies)
			return err(new Error("must pass cookies in to options"));
		if (!email) return err(new Error("email is required"));
		if (!password) return err(new Error("password is required"));
		if (password !== password_confirm)
			return err(new Error("passwords do not match"));

		const token = generate_token();
		const user = { id: generate_token(), email, password, token };
		const users = get_users(opts.cookies);

		set_users(opts.cookies, [...users, user]);

		return ok(user);
	},

	async logout({ token, opts }) {
		if (!opts?.cookies)
			return err(new Error("must pass cookies in to options"));
		//  const token = cookies.get("auth_token") as string;
		opts.cookies.delete("auth_token", { path: "/" });

		// Remove token from the user
		set_users(
			opts.cookies,
			get_users(opts.cookies).map((u) => {
				if (u.token === token) u.token = undefined;
				return u;
			})
		);

		return;
	},
};

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
