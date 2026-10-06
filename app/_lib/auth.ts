import type { MySession } from '@/app/_types/users';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';
export { MySession };

const authConfif: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],

	callbacks: {
		/*, request*/
		authorized({ auth }) {
			return !!auth;
		},
		/*, account, profile*/
		async signIn({ user }) {
			// const existingGuest: object = await getGuest(user.email);
			return await getGuest(user.email!)
				.then((res: object) => {
					if (!res) {
						const newGuestData = {
							email: user.email,
							fullName: user.name,
						};
						createGuest(newGuestData);
					}
					return true;
				})
				.catch(() => {
					return false;
				});
		},
		/*, user*/
		async session({ session }) {
			const guest = await getGuest(session.user.email);
			const typedSession = session as MySession;

			typedSession.user.guestId = guest.id;

			return typedSession;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfif);
