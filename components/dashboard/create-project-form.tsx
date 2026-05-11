import { POST } from "@/app/api/projects/route";
import React, { useState } from "react";
import { json } from "zod";
type CreateProjectFormProps = {
    onProjectCreated: () => Promise<void> | void;
}
export default function CreateProjectForm({
    onProjectCreated,
}: CreateProjectFormProps){
    const [ description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement> ){
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try{
            const response = await fetch("/api/projects",{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                })
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error)
            };
            setName("");
            setDescription("");
            await onProjectCreated();
        }catch(err){
            setError("Could not create project please try again");
            console.error(err);
        }finally{
            setIsSubmitting(false);
        }
    }
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Create Project</h2>
            <p className="mt-2 text-sm text-slate-400">
                Start a new collaborative video review workspace.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                <label className="mb-2 block text-sm font-medium">Project Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                    required
                />
                </div>

                <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description of this project"
                    className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                />
                </div>

                {error ? <p className="text-sm text-red-400">{error}</p> : null}

                <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                {isSubmitting ? "Creating..." : "Create Project"}
                </button>
            </form>
        </section>
    )
}