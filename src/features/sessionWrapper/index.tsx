'use client';

import { SessionProvider } from 'next-auth/react';

export function SessionWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
	return <SessionProvider>{children}</SessionProvider>;
}
