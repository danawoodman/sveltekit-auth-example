<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import Fa from "svelte-fa";
	import { faWarning } from "@fortawesome/free-solid-svg-icons";
	import { enhance } from "$app/forms";

	export let data: PageData;
	export let form: ActionData;

	// TODO: redirect to /dashboard if logged in
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<section class="max-w-sm mx-auto">
	<div class="prose">
		<h1 class="">Sign Up</h1>
		<p>
			Use email <code>a@b.com</code> and password <code>sekret</code> to login.
		</p>
	</div>

	<form class="flex flex-col gap-6 my-6" method="POST" use:enhance>
		{#if form?.error}
			<div class="alert alert-error">
				<Fa icon={faWarning} />
				{form.error}
			</div>
		{/if}
		<p>
			<input
				type="email"
				name="email"
				placeholder="Email..."
				class="input input-bordered w-full"
				required
				value={form?.email ?? ""}
			/>
		</p>
		<p>
			<input
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
				required
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button class="btn btn-primary">Sign Up</button>
			or
			<a href="/login" class="link">Log In</a>
		</p>
	</form>

	{#if form}
		<section class="my-8">
			<h3>Form data:</h3>
			<pre>{JSON.stringify(form, null, 2)}</pre>
		</section>
	{/if}
</section>
