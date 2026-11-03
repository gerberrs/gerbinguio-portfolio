/** "18:30" -> 1110 minutes. Returns null for empty or invalid input. */
export function toMinutes(time: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time)
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h > 23 || min > 59) return null
  return h * 60 + min
}

export function fromMinutes(total: number): string {
  const wrapped = ((total % 1440) + 1440) % 1440
  const h = Math.floor(wrapped / 60)
  const m = wrapped % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** "18:30" -> "6:30 PM" */
export function formatTime(time: string): string {
  const mins = toMinutes(time)
  if (mins === null) return 'No time'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const suffix = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

/** Default start for a new plan's first stop. */
export const DEFAULT_START = '17:00'
/** Gap between suggested times for new stops. */
export const DEFAULT_GAP_MIN = 90

/** Suggest a time for a stop appended after the given times. */
export function suggestNextTime(existing: string[]): string {
  const valid = existing.map(toMinutes).filter((m): m is number => m !== null)
  if (valid.length === 0) return DEFAULT_START
  return fromMinutes(Math.max(...valid) + DEFAULT_GAP_MIN)
}

/** True when stops with times are not in chronological order. */
export function isOutOfOrder(times: string[]): boolean {
  let last = -1
  for (const t of times) {
    const m = toMinutes(t)
    if (m === null) continue
    if (m < last) return true
    last = m
  }
  return false
}
