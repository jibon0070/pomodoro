import type { ZodType } from 'zod';

export default function getErrorMessage<FormValue>(
	formValue: FormValue,
	schema: ZodType,
	name: keyof FormValue
): string | undefined {
	const { success, error } = schema.safeParse(formValue);

	if (success) {
		return undefined;
	}

	return error.flatten().fieldErrors[name]?.at(0);
}
