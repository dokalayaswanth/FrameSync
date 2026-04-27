"use client";

import { useEffect, useState } from "react";
import CreateProjectForm from "@/components/dashboard/create-project-form";
import ProjectCard from "@/components/dashboard/project-card";

type Project = {
    id: string,
    name: string,
    description: string | null,
    createdAt: string
}



export default function DashboardPage(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function getProjects(){
        try{
            setError("");
            const response = await fetch("/api/projects");
            const data = await response.json();
            console.log(response)
            if(!response.ok){
                throw new Error(data.error || "Failed to fetch projects");
            }
            setProjects(data.projects);
        }catch(err){
            console.error(err);
            setError("Colud not load projects");
        }
    }

    useEffect(()=>{
        getProjects();
    },[])

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-2 text-slate-400">
                Create and manage your collaborative video review projects.
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
                <CreateProjectForm onProjectCreated={getProjects} />

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <h2 className="text-xl font-semibold">Your Projects</h2>

                    {isLoading ? (
                    <p className="mt-4 text-slate-400">Loading projects...</p>
                    ) : error ? (
                    <p className="mt-4 text-red-400">{error}</p>
                    ) : projects.length === 0 ? (
                    <p className="mt-4 text-slate-400">
                        No projects yet. Create your first one.
                    </p>
                    ) : (
                    <div className="mt-6 grid gap-4">
                        {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                    )}
                </section>
                </div>
            </div>
        </main>
    );
}