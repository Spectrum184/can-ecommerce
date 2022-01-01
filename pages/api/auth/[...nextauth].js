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
      name: 'credentials',
      async authorize(credentials, req) {
        const { username, password } = req.body;

        if (username === 'facebook' || username === 'google') {
          throw new Error('Tài khoản không tồn tại!');
        }

        const user = await User.findOne({
          username,
        });

        if (!user) {
          throw new Error('Tài khoản không tồn tại!');
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
    session: async ({ session }) => {
      if (session) {
        let newUser;
        if (!session.user.image) {
          newUser = await User.findOne({
            email: session.user.email,
            username: { $nin: ['google', 'facebook'] },
          }).select('-password');
        } else {
          if (session.user.image.includes('google')) {
            newUser = await User.findOne({
              email: session.user.email,
              username: 'google',
            }).select('-password');
          } else {
            newUser = await User.findOne({
              email: session.user.email,
              username: 'facebook',
            }).select('-password');
          }
        }
        session.user = newUser;
      }

      return session;
    },
    signIn: async ({ user, account }) => {
      if (account.provider !== 'credentials') {
        let newUser = await User.findOne({
          username: account.provider,
          email: user.email,
        });

        if (!newUser) {
          const newPassword = await bcrypt.hash('123456', 12);
          newUser = new User({
            name: user.name,
            username: account.provider,
            email: user.email,
            password: newPassword,
          });

          await newUser.save();
        }
      }

      return true;
    },
  },
});

const loginUser = async ({ password, user }) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu nhập sai.');
  }

  return user;
};
