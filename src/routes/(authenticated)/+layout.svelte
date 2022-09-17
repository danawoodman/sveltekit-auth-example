<script lang="ts">
	import { session } from "$lib/stores/session";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	$: if (data?.user) $session.user = data.user;
</script>

<slot />
