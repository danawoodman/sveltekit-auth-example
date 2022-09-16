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

export const cookie: AuthAdapter = {
	async validate_session(
		token: string,
		opts?: { cookies: Cookies }
	): Promise<User | null> {
		if (!opts?.cookies) throw new Error("must pass cookies in to options");
		const users = get_users(opts.cookies);
		return users.find((user: User) => user.session_token === token) ?? null;
	},

	async login(
		email: string,
		password: string,
		opts?: { cookies: Cookies }
	): Promise<User | null> {
		if (!opts?.cookies) throw new Error("must pass cookies in to options");
		const users = get_users(opts.cookies);
		const user = users.find(
			(u) => u.email === email && u.password === password
		);
		if (!user) return null;

		user.session_token = generate_token();

		opts.cookies.set("auth_token", user.session_token ?? "", {
			path: "/",
			maxAge,
		});
		set_users(
			opts.cookies,
			users.map((u) => {
				if (u.id === user.id) u.session_token = user.session_token ?? "";
				return u;
			})
		);
		return user;
	},

	async signup(email: string, password: string, opts?: { cookies: Cookies }) {
		if (!opts?.cookies) throw new Error("must pass cookies in to options");
		const session_token = generate_token();
		const user = { id: generate_token(), email, password, session_token };
		const users = get_users(opts.cookies);

		opts.cookies.set("auth_token", user.session_token ?? "", {
			path: "/",
			maxAge,
		});
		set_users(opts.cookies, [...users, user]);

		return user;
	},

	async logout(token: string, opts?: { cookies: Cookies }): Promise<void> {
		if (!opts?.cookies) throw new Error("must pass cookies in to options");
		//  const token = cookies.get("auth_token") as string;
		opts.cookies.delete("auth_token", { path: "/" });

		// Remove session_token from the user
		set_users(
			opts.cookies,
			get_users(opts.cookies).map((u) => {
				if (u.session_token === token) u.session_token = undefined;
				return u;
			})
		);
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
