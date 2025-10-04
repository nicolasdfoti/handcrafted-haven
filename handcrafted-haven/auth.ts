import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Define a schema for the credentials
const userCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async credentials => {
        console.log("credentials :>> ", credentials);

        const parseCredentials = userCredentials.safeParse(credentials);

        if (!parseCredentials.success) {
          console.log("Invalid credentials");
          return null
        } 

        const { email, password } = parseCredentials.data;

        try {
            const login = await fetch ("http://localhost:3000/api/auth/login", {
                headers: { "Content-Type": "application/json" }, 
                method: "POST",
                body: JSON.stringify({ email, password }),
        })
        
            if (login.status !== 200) {
                console.log("login.statu :>> ", login.status);
                return null;
            }
            const user = await login.json();
            console.log("resulLogin :>> ", user);
            return user;


            } catch (error) {
                console.log("Error during login:", error);
                return null;
            }
            },
        })
    ],
});