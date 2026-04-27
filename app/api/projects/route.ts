import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createProjectSchema } from "@/lib/validation/project";

export async function GET() {
    try{
        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json({ projects })
    }catch(err){
        console.error(err);
        return NextResponse.json({
            error: "Failed to fetch projects"
        },
        {status: 500});
    }
}
export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const parsed = createProjectSchema.safeParse(body);
        if(!parsed.success){
            return NextResponse.json(
                {
                    error: "Invalid Input",
                    details: parsed.error.flatten()
                },
                {status: 500}
            )
        }
        const { name, description } = parsed.data;
        const demoUser = await prisma.user.upsert({
            where: {
                email: "demo@example.com",
            },
            update: {},
            create: {
                email: "demo@example.com",
                name: "Demo User"
            }
        });
        const project = await prisma.project.create({
            data: {
                name,
                description,
                ownerId: demoUser.id
            },
        })
        return NextResponse.json({project}, {status: 201});
    }catch(err){
        console.error(err);
        return NextResponse.json(
            {error: "Failed to create a project"},
            {status: 500}
        );
    }
}