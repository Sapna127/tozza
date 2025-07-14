export const dynamic = 'force-dynamic'
import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

// 1. Type extensions
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
  }
}

const handler = NextAuth({
  // 2. Provider configuration
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({ 
          where: { email: credentials.email } 
        });

        if (!user) return null;
        
        if (user.password === credentials.password) {
          return { id: user.id, email: user.email };
        }
        return null;
      }
    })
  ],

  // 3. Session configuration
  session: {
    strategy: "jwt"
  },

  // 4. Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (user.email) token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id;
      if (token.email) session.user.email = token.email;
      return session;
    }
  },

  // 5. Required configurations
  secret: process.env.AUTH_SECRET,
  
  // 6. Vercel-specific settings (replaces basePath)
  pages: {
    signIn: '/api/routes/auth/signin', // Custom paths
    error: '/api/routes/auth/error',
  },
  
  // 7. Cookie settings
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/api/routes/auth", // ← Path matches your custom route
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  
  debug: process.env.NODE_ENV === "development"
});

export { handler as GET, handler as POST };