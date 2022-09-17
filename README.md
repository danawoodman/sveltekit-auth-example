# SvelteKit Auth Example

![image](https://user-images.githubusercontent.com/157695/190524032-cc22bf37-de46-4d9b-aa05-1c2ef7fca60f.png)

> An example SvelteKit app implementing a simple authentication system.

[**View the demo**](https://sveltekit-auth-example.pages.dev)

**NOTE: this is very much a work in progress!**

### Tools:

- SvelteKit
- TypeScript
- TailwindCSS
- DaisyUI for basic UI components
- svelte-fa for FontAwesome icons
- neverthrow for elegantly handling exceptions

### Features:

- Form actions to login and signup
- Store the users's auth token in a cookie
- Fetch the user in the `handle` hook in `hooks.server`
- Implementation of a basic session store
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

# Run with debug logging:
DEBUG="app:*" npm run dev
```

## License

MIT

## Credits

Copyright Dana Woodman 2022
