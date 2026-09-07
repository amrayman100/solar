import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { sessions, users } from "./schema";
import { eq, and } from "drizzle-orm";
import jsonwebtoken from "jsonwebtoken";

// const salt = bcrypt.genSaltSync(10);
// credentials.password;
// const pwHash = bcrypt.hashSync(credentials.password as string, salt);

// await db.insert(users).values([
//   {
//     name: "amr ayman",
//     id: "1",
//     email: "amrayman1996@yahoo.com",
//     passwordHash: pwHash,
//   },
// ]);

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await db
          .select()
          .from(users)
          .where(and(eq(users.email, credentials.email as string)))
          .limit(1);

        if (!user || user.length < 1) {
          throw new InvalidLoginError();
        }

        const currentUser = user[0];
        const isPasswordCorrect = bcrypt.compareSync(
          credentials.password as string,
          currentUser.passwordHash || ""
        );

        if (!isPasswordCorrect) {
          throw new InvalidLoginError();
        }

        if (!process.env.AUTH_SECRET) {
          throw new InvalidLoginError();
        }

        const token = jsonwebtoken.sign(
          { userId: currentUser.id },
          process.env.AUTH_SECRET,
          {
            expiresIn: "1h",
          }
        );

        try {
          await db
            .insert(sessions)
            .values({
              userId: currentUser.id,
              expires: new Date(new Date().setHours(new Date().getHours() + 1)),
              sessionToken: token,
            })
            .returning()
            .then((res) => res[0]);
        } catch (err) {
          console.log(err);
          throw new InvalidLoginError();
        }

        return user[0];
      },
    }),
  ],
} satisfies NextAuthConfig;
