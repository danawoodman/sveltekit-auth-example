<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<section class="prose">
	<h1>Dashboard</h1>
	<p>🎉 Hello there <strong>{data.user?.email}</strong>, you're logged in!</p>
	<ul>
		<li><a href="/settings">Settings</a> - Another authenticated route.</li>
		<li>
			<a href="/api/me" target="_blank"><code>/api/me</code></a> to get your
			user data in an authenticated API request.
			<ul>
				<li>
					Note that if you want to make this request outside of the browser, you
					can pass in a <code>Authorization: Bearer &lt;TOKEN&gt;</code>
					header in your request (try the value
					<code>seed-user-sesion-token</code> to get our fake demo user's info).
				</li>
			</ul>
		</li>
		<li>
			<!-- Use data-sveltekit-reload to prevent client-side navigation and force a reload of the page -->
			<a data-sveltekit-reload href="/logout" class="link">Log Out</a> - Clears the
			user's token and redirects them back to the homepage.
		</li>
	</ul>
</section>
