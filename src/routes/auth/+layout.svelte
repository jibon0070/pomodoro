<script lang="ts">
	let { children } = $props();
</script>

<main class="container mx-auto max-w-xl p-5">
	{@render children()}
</main>
