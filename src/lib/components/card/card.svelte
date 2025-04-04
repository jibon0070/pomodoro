<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	const { children, class: className } = $props<{ children?: Snippet; class?: string }>();
</script>

<div class={cn('bg-card text-card-foreground rounded-xl border shadow', className)}>
	{@render children?.()}
</div>
