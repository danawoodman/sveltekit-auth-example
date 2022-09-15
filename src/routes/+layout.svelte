<script lang="ts">
	import "../app.postcss";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
</script>

<Header />

<main class="max-w-screen-sm mx-auto my-20 px-6">
	<slot />
</main>

<Footer />
