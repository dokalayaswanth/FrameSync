import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          CollabVideo
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/project/demo">Demo Project</Link>
        </nav>
      </div>
    </header>
  );
}