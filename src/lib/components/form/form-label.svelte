<script lang="ts">
	import { cn } from '$lib/cn';
	import { getContext, type Snippet } from 'svelte';
	import getErrorMessage from './get-error-message';
	import type { ZodType } from 'zod';

	const { children, class: className } = $props<{ children?: Snippet; class?: string }>();

	const name = getContext<string>('name');
	const exiterContext = getContext<{ exited: boolean }>('exiterContext');
	const form = getContext<Record<string, unknown>>('form');
	const schema = getContext<ZodType>('schema');
	const submitterContext = getContext<{ submitted: boolean }>('submitterContext');
</script>

<svelte:boundary>
	{@const message = getErrorMessage(form, schema, name)}
	<label
		class={cn('block', className, {
			'text-red-400': !!message && (exiterContext.exited || submitterContext.submitted)
		})}
		for={name}>{@render children?.()}</label
	>
</svelte:boundary>
