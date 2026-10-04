import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

const loginRateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@nexarch.co" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const ip = req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress || 'unknown';
        const now = Date.now();
        
        let attempts = loginRateLimit.get(ip);
        if (!attempts || now > attempts.resetTime) {
          attempts = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
        } else {
          attempts.count += 1;
        }
        loginRateLimit.set(ip, attempts);
        
        if (attempts.count > MAX_ATTEMPTS) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        await connectDB();
        
        // Prevent DoS by throwing out absurdly long passwords before bcrypt hashes them
        if (!credentials?.password || credentials.password.length > 200) {
          throw new Error("Invalid email or password");
        }

        const admin = await Admin.findOne({ email: credentials?.email?.toLowerCase() });
        if (!admin) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(credentials.password, admin.passwordHash);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        // Reset rate limit on success
        loginRateLimit.delete(ip);

        return { id: admin._id.toString(), email: admin.email, name: admin.name };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "nexarch_demo_secret_key_3829104829",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
