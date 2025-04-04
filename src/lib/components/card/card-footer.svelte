<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	const { children, class: className } = $props<{ children?: Snippet; class?: string }>();
</script>

<div class={cn('flex items-center p-6 pt-0', className)}>{@render children?.()}</div>
