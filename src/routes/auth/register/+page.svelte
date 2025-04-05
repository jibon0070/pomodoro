<script lang="ts">
	import CardContent from '$lib/components/card/card-content.svelte';
	import CardHeader from '$lib/components/card/card-header.svelte';
	import CardTitle from '$lib/components/card/card-title.svelte';
	import Card from '$lib/components/card/card.svelte';
	import Input from '$lib/components/form/input.svelte';
	import { z } from 'zod';
	import FormGroup from '$lib/components/form/form-group.svelte';
	import Form from '$lib/components/form/form.svelte';
	import FormMessage from '$lib/components/form/form-message.svelte';
	import FormLabel from '$lib/components/form/form-label.svelte';
	import Button from '$lib/components/button.svelte';

	const schema = z.object({
		username: z
			.string()
			.min(1, 'Username is required.')
			.min(4, 'Username is too short.')
			.max(50, 'Username is too long.')
			.regex(/^[a-z0-9]+$/, 'Username must be lowercase and contain only numbers and letters.'),
		/*.superRefine(async (value, ctx) => {
				const message = await usernameAvailableValidator(value);

				if (!!message) {
					ctx.addIssue({ message, code: 'custom' });
				}
			})*/ password: z
			.string()
			.min(1, 'Password is required.')
			.max(50, 'Password must be less than 50 characters.')
			.refine((value) => /[a-z]/.test(value), {
				message: 'Password must contain lowercase letter.'
			})
			//must contain uppercase letter
			.refine((value) => /[A-Z]/.test(value), {
				message: 'Password must contain uppercase letter.'
			})
			//must contain number
			.refine((value) => /[0-9]/.test(value), {
				message: 'Password must contain number.'
			})
			//must contain special character
			.refine((value) => /[^a-zA-Z0-9]/.test(value), {
				message: 'Password must contain special character.'
			})
			//must be at least 8 characters
			.refine((value) => value.length >= 8, {
				message: 'Password must be at least 8 characters.'
			}),
		confirmPassword: z.string().min(8, 'Confirm password does not match.')
	});

	const form = $state<z.infer<typeof schema>>({
		username: '',
		password: '',
		confirmPassword: ''
	});
</script>

<svelte:head>
	<title>Register | Auth | Pomodoro</title>
</svelte:head>

<Card>
	<CardHeader>
		<CardTitle class="text-center text-3xl">Register</CardTitle>
	</CardHeader>
	<CardContent>
		<Form {form} {schema} onsubmit={console.log}>
			<FormGroup {form} name="username">
				<FormLabel>Username</FormLabel>
				<Input autocomplete="username" />
				<FormMessage />
			</FormGroup>
			<FormGroup {form} name="password">
				<FormLabel>Password</FormLabel>
				<Input type="password" autocomplete="new-password" />
				<FormMessage />
			</FormGroup>
			<FormGroup {form} name="confirmPassword">
				<FormLabel>Confirm Password</FormLabel>
				<Input type="password" autocomplete="new-password" />
				<FormMessage />
			</FormGroup>
			<div class="flex items-center justify-end gap-2">
				<Button type="button" variant="secondary" as="a" href="login">Login</Button>
				<Button>Register</Button>
			</div>
		</Form>
	</CardContent>
</Card>
