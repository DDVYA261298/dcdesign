import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const ADMIN_EMAIL = "admin@gmail.com"; // ✅ Replace with your actual admin email

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔒 Google Login for admin email only
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔐 Credentials-based login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("User not found");

        const isPasswordValid = await user.comparePassword(credentials.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          username: user.username // ✅ Add this line

        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ account, user }) {
      // Only allow Google sign-in if it's the admin email
      if (account?.provider === "google" && user.email !== ADMIN_EMAIL) {
        console.warn("❌ Unauthorized Google login attempt:", user.email);
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role || "admin"; // fallback
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
