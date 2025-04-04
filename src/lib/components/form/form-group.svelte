<script lang="ts" generics="Form extends Record<string, unknown>">
	import { cn } from '$lib/cn';
	import { setContext, type Snippet } from 'svelte';

	const {
		children,
		name,
		form,
		class: className
	} = $props<{ children?: Snippet; name: keyof Form; form: Form; class?: string }>();

	const exiterContext = $state({ exited: false });

	setContext('exiterContext', exiterContext);

	setContext('name', name);
	setContext('form', form);
</script>

<div class={cn('space-y-2', className)}>{@render children?.()}</div>
