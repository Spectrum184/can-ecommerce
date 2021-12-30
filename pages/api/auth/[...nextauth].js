import { connectDB } from 'utils/connect-db';

import User from 'models/userModel';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

connectDB();

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const { username, password } = req.body;

        const user = await User.findOne({
          username,
        });

        if (!user) {
          throw new Error('Vui lòng đăng nhập bằng cách khác.');
        }

        return loginUser({ password, user });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    session: async (session, user) => {
      console.log(user);

      session = user;
      return Promise.resolve(session);
    },
  },
});

const loginUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Vui lòng đăng nhập bằng cách khác.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu nhập sai.');
  }

  return user;
};
