<script lang="ts">
	import { page } from "$app/stores";
	import { fade } from "svelte/transition";

	let visible = false;
</script>

<footer class="max-w-screen-sm mx-auto prose my-32 px-6">
	<p class="text-center">
		<button class="btn btn-sm btn-ghost" on:click={() => (visible = !visible)}>
			{#if visible}
				Hide
			{:else}
				Show page data
			{/if}
		</button>
	</p>
	{#if visible && Object.keys($page.data).length}
		<section transition:fade>
			<h3>Page data:</h3>
			<pre>{JSON.stringify($page.data, null, 2)}</pre>
		</section>
	{/if}
</footer>
