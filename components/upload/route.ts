import { NextResponse } from "next/server";
import cloudinary from "@/lib/storage/cloudinary";
import { prisma } from "@/lib/db/prisma";
import { error } from "console";

export async function POST(req: Request){
    try{
        const formData = req.formData();
        const file = (await formData).get("file") as File | null;
        const projectId = (await formData).get("projectId") as string | null;
        if(!file || !projectId){
            return NextResponse.json(
                { error: "Required fields are missiong", },
                { status:404 }
            );
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result =  await new Promise<{
            secure_url: string;
            public_id: string;
            original_filename?: string;
            bytes: number;
            format?: string;
            resource_type: string;
        }>((resolve, reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "collab-video-review",
                },
                (error, result) => {
                    if(error || !result){
                        reject (error);
                        return;
                    }
                    resolve({
                        secure_url: result.secure_url,
                        public_id: result.public_id,
                        original_filename: result.original_filename,
                        bytes: result.bytes,
                        format: result.format,
                        resource_type: result.resource_type,
                    });
                }
            )
            stream.end(buffer);
        })
        const video = await prisma.video.create({
            data: {
                projectId,
                fileName: file.name,
                originalUrl: result.secure_url,
                storageKey: result.public_id,
                size: file.size,
                mimeType: file.type || "video/mp4",
                status: "uploaded",
            },
        });

        return NextResponse.json({ video }, { status: 201 });
    }catch(err){
        console.log(err);
        return NextResponse.json(
            {error: err},
            {status: 500},
        )
    }
}