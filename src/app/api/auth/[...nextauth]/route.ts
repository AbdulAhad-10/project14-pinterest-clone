// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import NextAuth, {
//   DefaultSession,
//   NextAuthOptions,
//   User as NextAuthUser,
// } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// // Extend the built-in session types
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       profilePicture: string;
//       pinsCreated: any[]; // Replace 'any' with the correct type for pins
//       pinsSaved: any[]; // Replace 'any' with the correct type for pins
//     } & DefaultSession["user"];
//   }
// }

// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user && token.sub) {
//         await connectMongoDB();
//         const user = await User.findById(token.sub);

//         if (user) {
//           session.user.id = token.sub;
//           session.user.name = user.name;
//           session.user.email = user.email;
//           session.user.profilePicture = user.profilePicture;
//           session.user.pinsCreated = user.pinsCreated;
//           session.user.pinsSaved = user.pinsSaved;
//         }
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };

//         try {
//           await connectMongoDB();
//           const user = await User.findOne({ email });

//           if (!user) {
//             throw new Error("No user found with this email");
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (!passwordsMatch) {
//             throw new Error("Invalid password");
//           }

//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             profilePicture: user.profilePicture,
//             pinsCreated: user.pinsCreated,
//             pinsSaved: user.pinsSaved,
//           };
//         } catch (error) {
//           console.log("Error: ", error);
//           throw error;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
