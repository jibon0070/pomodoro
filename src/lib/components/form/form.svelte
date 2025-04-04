<script lang="ts" generics="Form extends Record<string, unknown>">
	import { cn } from '$lib/cn';
	import { setContext, type Snippet } from 'svelte';
	import type { ZodType } from 'zod';

	type Props = {
		children?: Snippet;
		schema: ZodType;
		form: Form;
		onsubmit?: (data: Form) => void;
		onerror?: (error: Record<keyof Form, string>) => void;
		class?: string;
	};

	const { children, schema, form, onsubmit, onerror, class: className }: Props = $props();

	const submitterContext = $state({ submitted: false });

	setContext('schema', schema);
	setContext('submitterContext', submitterContext);
</script>

<form
	class={cn('space-y-2', className)}
	onsubmit={(e) => {
		submitterContext.submitted = true;
		e.preventDefault();
		const { success, data, error } = schema.safeParse(form);

		if (success) {
			onsubmit?.(data);
		} else {
			//@ts-expect-error aaa
			onerror?.(error.flatten().fieldErrors satisfies Record<keyof Form, string>);
		}
	}}
>
	{@render children?.()}
</form>
