import { env } from "$env/dynamic/private";
const one_day = 60 * 60 * 24;

export const AUTH_TOKEN_EXPIRY_SECONDS = Number(
	env?.AUTH_TOKEN_EXPIRY_SECONDS ?? one_day * 365
);
