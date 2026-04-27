import Link from "next/link";

type Project = {
    id: string,
    name: string,
    description: string | null,
    createdAt: string
}

type ProjectCardProps = {
    project: Project;
}

export default function ProjectCard({project}: ProjectCardProps){
    return(
        <Link
            href={`/project/${project.id}`}
            className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700 hover:bg-slate-800"
            >
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>

            <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                {project.description || "No description provided."}
            </p>

            <p className="mt-4 text-xs text-slate-500">
                Created: {new Date(project.createdAt).toLocaleString()}
            </p>
        </Link>
    )
}