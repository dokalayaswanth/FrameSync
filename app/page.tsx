export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-300">
          Adobe Portfolio Project
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Collaborative Video Review Tool
        </h1>

        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
          A full-stack project for video upload, timestamped review comments,
          real-time collaboration, lightweight editing, and export workflows.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/dashboard"
            className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
          >
            Go to Dashboard
          </a>

          <a
            href="/project/demo"
            className="rounded-xl border border-slate-600 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Open Demo Project Page
          </a>
        </div>
      </section>
    </main>
  );
}