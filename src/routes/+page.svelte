<script lang="ts">
	import { page } from "$app/stores";
</script>

<div class="prose">
	<h1>SvelteKit Auth Example</h1>
	<p>
		This project shows you how to implement a simple authentication system using
		SvelteKit.
	</p>
	<h4>Features</h4>
	<ul>
		<li>Built with TypeScript</li>
		<li>Styling utilities using TailwindCSS</li>
		<li>UI components with DaisyUI</li>
		<li>Icons via FontAwesome and svelte-fa</li>
	</ul>
	<p class="flex items-center gap-4 mt-12">
		{#if $page.data.user}
			<a href="/dashboard" class="btn btn-primary">Dashboard</a>
			<a href="/settings" class="btn">Settings</a>
		{:else}
			<a href="/signup" class="btn btn-primary">Sign Up</a>
			<a href="/login" class="btn">Log In</a>
		{/if}
	</p>
</div>
