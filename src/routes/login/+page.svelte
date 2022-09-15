<script lang="ts">
	import { enhance } from "$app/forms";
	import { faWarning } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Log In</title>
</svelte:head>

<section class="max-w-sm mx-auto">
	<div class="prose">
		<h1 class="">Log In</h1>
		<p>
			Use email <code>a@b.com</code> and password <code>asdf</code> to login.
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
			<button class="btn btn-primary">Log In</button>
			or
			<a href="/signup" class="link">Sign Up</a>
		</p>
	</form>

	{#if form}
		<section class="my-12 prose">
			<h3>Form data:</h3>
			<pre>{JSON.stringify(form, null, 2)}</pre>
		</section>
	{/if}
</section>
