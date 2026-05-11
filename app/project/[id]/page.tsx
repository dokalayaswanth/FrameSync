type ProjectPageProps = {
  params: {
    id: string;
  };
};

export default function ProjectDetailsPage({ params }: ProjectPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Project Details</h1>
        <p className="mt-2 text-slate-400">
          Current project ID: <span className="font-medium text-white">{params.id}</span>
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Project Overview</h2>
            <p className="mt-2 text-slate-400">
              Project metadata and collaborators will appear here.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Uploads</h2>
            <p className="mt-2 text-slate-400">
              Video upload and media list will appear here.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}