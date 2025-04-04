<script lang="ts">
	import { cn } from '$lib/cn';
	import { getContext } from 'svelte';
	import getErrorMessage from './get-error-message';
	import type { ZodType } from 'zod';

	const { className, type, placeholder } = $props<{
		className?: string;
		type?: 'text' | 'password';
		placeholder?: string;
		value?: string;
	}>();

	const form = getContext<Record<string, unknown>>('form');
	const name = getContext<string>('name');

	const exiterContext = getContext<{ exited: boolean }>('exiterContext');

	const schema = getContext<ZodType>('schema');
	const submitterContext = getContext<{ submitted: boolean }>('submitterContext');
</script>

<svelte:boundary>
	{@const message = getErrorMessage(form, schema, name)}
	<input
		id={name}
		bind:value={form[name]}
		onblur={() => (exiterContext.exited = true)}
		{type}
		{placeholder}
		class={cn(
			'border-input',
			'file:text-foreground',
			'placeholder:text-muted-foreground',
			'focus-visible:ring-ring',
			'flex',
			'h-9',
			'w-full',
			'rounded-md',
			'border',
			'bg-transparent',
			'px-3',
			'py-1',
			'text-base',
			'shadow-sm',
			'transition-colors',
			'file:border-0',
			'file:bg-transparent',
			'file:text-sm',
			'file:font-medium',
			'focus-visible:ring-1',
			'focus-visible:outline-none',
			'disabled:cursor-not-allowed',
			'disabled:opacity-50',
			'md:text-sm',
			className,
			{
				'border-red-400': !!message && (exiterContext.exited || submitterContext.submitted)
			}
		)}
	/>
</svelte:boundary>
