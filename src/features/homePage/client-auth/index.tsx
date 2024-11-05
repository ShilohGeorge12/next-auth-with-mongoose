'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function ClientAuth() {
	const session = useSession();
	const { push } = useRouter();
	return (
		<div className="w-full flex flex-col gap-12 justify-center items-center">
			{session.status}
			{session.status === 'authenticated' ? (
				<button
					type="button"
					name={`sign out`}
					className={`w-[400px] h-12 rounded-lg bg-blue-500 hover:bg-blue-500/65 text-white`}
					onClick={async () => await signOut({ callbackUrl: '/sign-in' })}>
					Sign Out
				</button>
			) : (
				<button
					type="button"
					name={`sign in link`}
					onClick={async () => push('/sign-in')}
					className={`w-[400px] h-12 rounded-lg bg-blue-500 hover:bg-blue-500/65 text-white`}>
					Sign In
				</button>
			)}

			{session.data?.user?.email}
			{session.data?.user?.name}
		</div>
	);
}
