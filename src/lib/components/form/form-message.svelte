<script lang="ts">
	import { getContext } from 'svelte';
	import getErrorMessage from './get-error-message';
	import { ZodType } from 'zod';

	const name = getContext<string>('name');
	const form = getContext<Record<string, unknown>>('form');
	const schema = getContext<ZodType>('schema');

	const toucherContext = getContext<{ exited: boolean }>('exiterContext');
	const submitterContext = getContext<{ submitted: boolean }>('submitterContext');
</script>

<svelte:boundary>
	{@const message = getErrorMessage(form, schema, name)}
	{#if (toucherContext.exited || submitterContext.submitted) && !!message}<small
			class="text-red-400">{message}</small
		>{/if}
</svelte:boundary>
