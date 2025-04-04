<script lang="ts">
	import { cn } from '$lib/cn';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const buttonVariants = cva(
		cn(
			'inline-flex',
			'items-center',
			'justify-center',
			'gap-2',
			'whitespace-nowrap',
			'rounded-md',
			'text-sm',
			'font-medium',
			'transition-colors',
			'focus-visible:outline-none',
			'focus-visible:ring-1',
			'focus-visible:ring-ring',
			'disabled:pointer-events-none',
			'disabled:opacity-50',
			'[&_svg]:pointer-events-none',
			'[&_svg]:size-4',
			'[&_svg]:shrink-0'
		),
		{
			variants: {
				variant: {
					default: cn('bg-primary', 'text-primary-foreground', 'shadow', 'hover:bg-primary/90'),
					destructive: cn(
						'bg-destructive',
						'text-destructive-foreground',
						'shadow-sm',
						'hover:bg-destructive/90'
					),
					outline: cn(
						'border',
						'border-input',
						'bg-background',
						'shadow-sm',
						'hover:bg-accent',
						'hover:text-accent-foreground'
					),
					secondary: cn(
						'bg-secondary',
						'text-secondary-foreground',
						'shadow-sm',
						'hover:bg-secondary/80'
					),
					ghost: cn('hover:bg-accent', 'hover:text-accent-foreground'),
					link: cn('text-primary', 'underline-offset-4', 'hover:underline')
				},
				size: {
					default: cn('h-9', 'px-4', 'py-2'),
					sm: cn('h-8', 'rounded-md', 'px-3', 'text-xs'),
					lg: cn('h-10', 'rounded-md', 'px-8'),
					icon: cn('h-9', 'w-9')
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);
	type Props = HTMLButtonAttributes &
		VariantProps<typeof buttonVariants> & { as?: string | false; href?: string };

	let { children, variant, size, class: className, as = false, ...props }: Props = $props();
	className = cn(buttonVariants({ variant, size, class: className }));
</script>

{#if as}
	<svelte:element this={as} class={className} {...props}>{@render children?.()}</svelte:element>
{:else}
	<button class={className} {...props}>
		{@render children?.()}
	</button>
{/if}
