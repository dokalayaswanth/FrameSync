import { getCurrentUser } from "@/lib/auth/current-user";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createProjectSchema } from "@/lib/validation/project";

export async function GET(){
    try{
        const currentUser = await getCurrentUser();

        const projects = await prisma.project.findMany({
            where: {
                ownerId: currentUser.id,
            },
            orderBy:{
                createdAt: "desc"
            }
        });

        return NextResponse.json({projects});
    }catch(err){
        // throw new Error("Unknown error occured");
        console.error(err);
    }
}

export async function POST(req: NextRequest){
    try{
        const currentDbUser = await getCurrentUser();

        const body = await req.json();

        const parsed = createProjectSchema.safeParse(body);

        if (!parsed.success) {
        return NextResponse.json(
            {
            error: "Invalid input",
            details: parsed.error.flatten(),
            },
            { status: 400 }
        );
        }

        const { name, description } = parsed.data;

        const project = await prisma.project.create({
        data: {
            name,
            description: description || null,
            ownerId: currentDbUser.id,
        },
        });

        return NextResponse.json({ project }, { status: 201 });
        }catch(err){
        console.error(err);
       return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}