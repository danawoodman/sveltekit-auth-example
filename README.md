# SvelteKit Auth Example

![image](https://user-images.githubusercontent.com/157695/190524032-cc22bf37-de46-4d9b-aa05-1c2ef7fca60f.png)

> An example SvelteKit app implementing a variety of authentication backends

[**View the demo**](https://sveltekit-auth-example.pages.dev)

**NOTE: this is very much a work in progress!**

This project is designed as a sample implementation reference for getting authentication setup using SvelteKit. At this stage, I'd recommend just using it as something to refer to when building out your own app.

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

To debug in the browser, open up the `Console` in DevTools and type:

```js
localStorage.debug = "app:*";
```

### Using auth adapters

This project is built in a way to abstract the authentication layer so that you can pick and choose which type of auth you want to use.

Right now, we support the following auth adapters:

- `cookie` - Stores users and the auth token in a cookie. The is purely for demo purposes as it means we don't need any backend. You should NOT use this in production.
- `pocketbase` - Uses [PocketBase](https://pocketbase.io) as the backend. All you need to do is follow their setup guide and then run `./pocketbase serve` and you should be up and running.

You can enable the adapter you want by commenting out the adapter you want in `src/lib/auth/index.ts`. Make sure all other adapters are commented out.

Then just configure your adapter backend and run the dev server!

## License

MIT

## Credits

Copyright Dana Woodman 2022
