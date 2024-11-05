import { SignInClient } from './signUpClient';

export default async function SignInPage() {
	return (
		<section className="w-full h-screen flex flex-col items-center justify-center gap-7">
			<h1>Sign In Page</h1>

			<SignInClient />
		</section>
	);
}
