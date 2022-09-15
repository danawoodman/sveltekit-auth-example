# SvelteKit Auth Example

> An example SvelteKit app implementing a simple authentication system.

[**View the demo**](https://sveltekit-auth-example.pages.dev)

### Tools:

- SvelteKit
- TypeScript
- TailwindCSS
- DaisyUI for basic UI components
- svelte-fa for FontAwesome icons

### Features:

- Form actions to login and signup
- Store the users's auth token in a cookie
- Fetch the user in the `handle` hook in `hooks.server`
- Use route (groups) to protect pages
- Authenticate API endpoints via an auth token (`Authorization: Bearer <TOKEN>` header)
- Log out

## Setup

```shell
npm install
```

## Development

```shell
npm run dev
```

## License

MIT

## Credits

Copyright Dana Woodman 2022
