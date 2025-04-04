<script lang="ts">
	import { cn } from '$lib/cn';
	import { getContext, hasContext } from 'svelte';
	import getErrorMessage from './get-error-message';
	import type { ZodType } from 'zod';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes;

	const { class: className, ...props }: Props = $props();

	function getClassNames(isInvalid = false) {
		return cn(
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
				'border-red-400': isInvalid
			}
		);
	}

	const form = getContext<Record<string, unknown>>('form');
	const name = getContext<string>('name');

	const exiterContext = getContext<{ exited: boolean }>('exiterContext');

	const schema = getContext<ZodType>('schema');
	const submitterContext = getContext<{ submitted: boolean }>('submitterContext');

	const formExists = hasContext('form');
	const nameExists = hasContext('name');
	const exiterExists = hasContext('exiterContext');
	const schemaExists = hasContext('schema');
	const submitterExists = hasContext('submitterContext');
</script>

{#if formExists && nameExists && exiterExists && schemaExists && submitterExists}
	{@const message = getErrorMessage(form, schema, name)}
	<input
		id={name}
		bind:value={form[name]}
		onblur={() => (exiterContext.exited = true)}
		{...props}
		class={getClassNames(!!message && (exiterContext.exited || submitterContext.submitted))}
	/>
{:else}
	<input
		class={getClassNames(true)}
		{...props}
		disabled
		value="Input component must always be used in a form group"
	/>
{/if}
