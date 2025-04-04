<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	const { class: className, children } = $props<{ children?: Snippet; class?: string }>();
</script>

<div class={cn('leading-none font-semibold tracking-tight', className)}>{@render children?.()}</div>
