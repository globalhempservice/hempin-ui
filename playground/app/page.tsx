export default function Page() {
    return (
      <div className="mx-auto max-w-3xl p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-white/70">
          Playground using the shared Shell (left rail, bottom bar, slide-in Settings).
          Try navigating to <a href="/notifications" className="underline">Notifications</a> or <a href="/you" className="underline">You</a>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg p-4 ring-1 ring-white/10 bg-white/5">Card A</div>
          <div className="rounded-lg p-4 ring-1 ring-white/10 bg-white/5">Card B</div>
        </div>
      </div>
    );
  }