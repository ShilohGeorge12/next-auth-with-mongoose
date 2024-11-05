import { ClientAuth } from '@/features/homePage/client-auth';

export default async function Home() {
	return (
		<main className="w-full h-screen flex flex-col items-center justify-center gap-5">
			<h1>Home page</h1>
			<ClientAuth />
		</main>
	);
}
