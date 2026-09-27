/* Winziger Event-Bus – damit z. B. der Store „+10 XP“ melden kann,
   ohne die UI-Komponenten zu kennen. */

export type BusEvents = {
  xp: { amount: number; reason?: string }
  levelup: { level: number; rank: string }
  badge: { id: string; icon: string; name: string }
  toast: { text: string; icon?: string; tone?: 'info' | 'good' | 'bad' }
  confetti: { power?: number }
  palette: undefined
}

type Handler<K extends keyof BusEvents> = (payload: BusEvents[K]) => void

const handlers: { [K in keyof BusEvents]?: Set<Handler<K>> } = {}

export function on<K extends keyof BusEvents>(event: K, fn: Handler<K>) {
  ;(handlers[event] ??= new Set() as never).add(fn as never)
  return () => void handlers[event]?.delete(fn as never)
}

export function emit<K extends keyof BusEvents>(event: K, payload: BusEvents[K]) {
  handlers[event]?.forEach((fn) => (fn as Handler<K>)(payload))
}

export const toast = (text: string, icon = '✨', tone: 'info' | 'good' | 'bad' = 'info') =>
  emit('toast', { text, icon, tone })
