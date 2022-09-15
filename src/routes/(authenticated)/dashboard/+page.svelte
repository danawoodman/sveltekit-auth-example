<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<section class="prose">
	<h1>Dashboard</h1>
	<p>Hello there <strong>{data.user?.email}</strong>, you're logged in!</p>
	<ul>
		<li><a href="/settings">Settings</a></li>
		<li>
			<a href="/api/me" target="_blank"><code>/api/me</code></a> to get your user
			data in an authenticated API request.
		</li>
		<li>
			<!-- Use data-sveltekit-reload to prevent client-side navigation and force a reload of the page -->
			<a data-sveltekit-reload href="/logout" class="link">Log Out</a>
		</li>
	</ul>
</section>
