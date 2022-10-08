<script lang="ts">
	import { enhance } from "$app/forms";
	import { faWarning } from "@fortawesome/free-solid-svg-icons";
	import debug from "debug";
	import Fa from "svelte-fa";
	import type { ActionData } from "./$types";

	const log = debug("app:routes:login:page.svelte");

	export let form: ActionData;

	$: log("form:", form);
</script>

<section class="max-w-sm mx-auto">
	<div class="prose">
		<h1 class="">Log In</h1>
		<p>
			Use email <code>a@b.com</code> and password <code>asdfasdf</code> to login.
		</p>
	</div>
	<form class="flex flex-col gap-6 my-6" method="POST" use:enhance>
		{#if form?.error}
			<div class="alert alert-error">
				<div>
					<Fa icon={faWarning} />
					{form.error}
				</div>
			</div>
		{/if}
		<p>
			<input
				autocomplete="email"
				autocorrect="off"
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
				autocomplete="current-password"
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
