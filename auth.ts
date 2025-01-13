import "reflect-metadata";
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import {UserController} from "@/app/lib/user";

async function verifyUser(id: string): Promise<{ result: boolean, error: string }> {
    return new UserController().verifyUser(id);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ username: z.string().min(6), password: z.string().min(6) })
                    .safeParse(credentials);
                
                if (parsedCredentials.success) {
                    const { username, _ } = parsedCredentials.data;

                    const result = await verifyUser(username);
                    
                    if (!result.result) {
                        console.log("Invalid credentials.")
                        console.log(result.error)
                        return null
                    }
                    console.log("Good credentials.")
                    
                    return {id: username}
                } else {
                    console.log("Invalid ZOD validation.")
                    return null
                }

            },
        }),
    ],
})

