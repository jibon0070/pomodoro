<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	const { children, class: className } = $props<{
		className?: string;
		children?: Snippet;
		class?: string;
	}>();
</script>

<div class={cn('p-6 pt-0', className)}>{@render children?.()}</div>
