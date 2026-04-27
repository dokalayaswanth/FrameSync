import {z} from "zod";
export const createProjectSchema= z.object({
    name: z.string().min(3, "Project name must be 3 characters long").max(50, "Project name can be only 50 characters long"),
    description: z.string().max(500, "Description can be only 500 characters long").optional().or(z.literal("")),
})
export type createProjectInput=z.infer<typeof createProjectSchema>;