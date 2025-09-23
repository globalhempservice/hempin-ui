export const metadata = { title: 'Settings — Hemp’in Playground' };

export default function SettingsPage() {
  return (
    <main className="min-h-[100dvh] text-white p-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </header>

        <section className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-white/80">Appearance</h2>
            <p className="text-white/60 text-sm">Dark theme is currently forced in the playground.</p>
          </div>
          <div className="h-px w-full bg-white/10" />
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/15 hover:bg-white/10/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
              Reset local data
            </button>
            <a
              href="/"
              className="rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/15 hover:bg-white/10/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-center"
            >
              Back to Home
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}