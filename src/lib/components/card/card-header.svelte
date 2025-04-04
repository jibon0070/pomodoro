<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	const { class: className, children } = $props<{ children?: Snippet; class?: string }>();
</script>

<div class={cn('flex flex-col space-y-1.5 p-6', className)}>{@render children?.()}</div>
