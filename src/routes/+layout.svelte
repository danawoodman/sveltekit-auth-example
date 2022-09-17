<script lang="ts">
	import "../app.postcss";
	import type { LayoutData } from "./$types";
	import { page } from "$app/stores";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	import debug from "debug";
	import { session } from "$lib/stores/session";

	const log = debug("app:routes:layout.svelte");

	export let data: LayoutData;

	$: title = $page.data?.title ? $page.data.title + " | " : "";

	$: if (data?.user) $session.user = data.user;

	$: log("data:", data);
	$: log("$page.data:", $page.data);
</script>

<svelte:head>
	<title>{title}SvelteKit Auth Demo</title>
</svelte:head>

<Header />

<main class="max-w-screen-sm mx-auto my-20 px-6">
	<slot />
</main>

<Footer />
