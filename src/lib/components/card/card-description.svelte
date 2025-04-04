<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	const { children, class: className } = $props<{ children?: Snippet; class?: string }>();
</script>

<div class={cn('text-muted-foreground text-sm', className)}>{@render children?.()}</div>
