export default function Notifications() {
    return (
      <div className="mx-auto max-w-3xl p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg p-3 ring-1 ring-white/10 bg-white/5">
              <div className="text-sm text-white/80">Update {i + 1}</div>
              <div className="text-xs text-white/50">Just now</div>
            </div>
          ))}
        </div>
      </div>
    );
  }