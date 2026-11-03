type Props = { message: string; actionLabel?: string; onAction?: () => void }

export function Toast({ message, actionLabel, onAction }: Props) {
  return (
    <div
      role="status"
      className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink py-2.5 pr-2.5 pl-4 text-sm text-white shadow-lg shadow-ink/30"
    >
      <span className="min-w-0 flex-1 truncate">{message}</span>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="h-9 shrink-0 rounded-xl bg-white/15 px-3 font-semibold hover:bg-white/25"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
