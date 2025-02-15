// import type { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'text',
//           placeholder: 'example@example.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // 🔹 여기에 실제 로그인 API 요청 로직 추가
//         const user = { id: '1', name: 'User', email: credentials.email };
//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       session.user = user;
//       return session;
//     },
//   },
// };
