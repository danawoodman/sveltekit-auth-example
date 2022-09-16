<script lang="ts">
	import "../app.postcss";
	import { page } from "$app/stores";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";

	$: title = $page.data?.title ? $page.data.title + " | " : "";
</script>

<svelte:head>
	<title>{title}SvelteKit Auth Demo</title>
</svelte:head>

<Header />

<main class="max-w-screen-sm mx-auto my-20 px-6">
	<slot />
</main>

<Footer />
