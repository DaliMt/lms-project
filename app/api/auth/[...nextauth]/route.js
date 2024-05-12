import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "../../../../../models/user";
// import connectMongoDB from "../../../../../libs/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }
          console.log("Finderuser is :::", user);

          // const passwordsMatch = await bcrypt.compare(password, user.password);
          // const passwordsMatch = await bcrypt.compare(password, user.password);

          // if (!passwordsMatch) {
          //   return null;
          // }
          if (password !== user.password) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    // strategy: "jwt",
    jwt: true, // Enable JSON Web Token
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  // callbacks: {
  //   async jwt(token, user) {
  //     if (user) {
  //       token.id = user.id; // Add the user ID to the token
  //     }
  //     return token;
  //   },
  //   async session(session, token) {
  //     session.user = token?.token?.user; // Add the user object from the token to the session
  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }; // Merge user data into the token
      }
      return token;
    },
    async session({ session, token }) {
     
      // session.user = token; // Assign the token, which contains user data, to session.user
      session.user = {
        _id: token._doc._id,
        username: token._doc.username,
        email: token._doc.email,
        role : token._doc.role,
        createdAt: token._doc.createdAt,
        updatedAt: token._doc.updatedAt
      }; // Extract necessary user data and assign it to session.user
      return session;
    },
    
    // async session(session, token) {
    //   session.user = token?.user || {}; // Use the user object from the token, or an empty object if not available
    //   return session;
    // },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
