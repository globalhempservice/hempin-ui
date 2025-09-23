export default function You() {
    return (
      <div className="mx-auto max-w-3xl p-4 space-y-4">
        <h1 className="text-2xl font-semibold">You</h1>
        <div className="rounded-lg p-4 ring-1 ring-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/15" />
            <div>
              <div className="font-medium">shighman</div>
              <div className="text-xs text-white/50">at NADA</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-white/70">
            Leaf XP <span className="ml-2 rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">+128</span>
          </div>
        </div>
      </div>
    );
  }