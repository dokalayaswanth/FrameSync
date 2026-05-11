import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "../db/prisma";

export async function getCurrentUser(){
    const clerkUser = await currentUser();
    if(!clerkUser){
        throw new Error("Unauthorized");
    }
    console.log(clerkUser);
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if(!email){
        throw new Error("Email not found");
    }
    const name = clerkUser.fullName || clerkUser.firstName || clerkUser.lastName || "User";
    const user = await prisma.user.upsert({
        where: {
            clerkId: clerkUser.id,
        },
        update: {
            email,
            name,
        },
        create: {
            clerkId: clerkUser.id,
            email,
            name,
        },
    });
    return user;
}