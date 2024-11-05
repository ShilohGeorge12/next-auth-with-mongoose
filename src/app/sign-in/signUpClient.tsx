'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export function SignInClient() {
	const router = useRouter();
	const [form, setForm] = useState({ email: '', password: '' });
	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await signIn('credentials', {
			redirect: false,
			email: form.email,
			password: form.password,
		});

		if (!res?.ok) {
			console.log(res);
			return;
		}

		if (res?.ok) {
			router.push('/');
			return;
		}
		console.log(res);
	};

	return (
		<form
			onSubmit={onSignIn}
			className="w-full flex flex-col items-center justify-center gap-12 text-black">
			<input
				type="email"
				name="email"
				required
				placeholder="email"
				className="h-12 w-[400px]"
				onChange={onInputChange}
				value={form.email}
			/>
			<input
				type="text"
				name="password"
				required
				placeholder="password"
				className="h-12 w-[400px]"
				onChange={onInputChange}
				value={form.password}
			/>
			<button
				type="submit"
				name={`sign in button`}
				className={`w-[400px] h-12 bg-blue-500 text-white`}>
				Sign In
			</button>
		</form>
	);
}
