import { useEffect, useRef } from 'react'
import { on } from '../lib/bus'

interface P {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  size: number
  color: string
  life: number
}

const COLORS = ['#3388fb', '#f59e0b', '#10b981', '#ef4444', '#a855f7', '#eab308']

/** Leichtgewichtiges Canvas-Konfetti – reagiert auf das Bus-Event `confetti`. */
export function Confetti({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const parts = useRef<P[]>([])
  const raf = useRef(0)

  useEffect(() => {
    if (!enabled) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      parts.current = parts.current.filter((p) => p.life > 0 && p.y < canvas.height + 40)
      for (const p of parts.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.16
        p.vx *= 0.995
        p.rot += p.vr
        p.life -= 1
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.min(1, p.life / 40)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        ctx.restore()
      }
      raf.current = parts.current.length ? requestAnimationFrame(tick) : 0
    }

    const off = on('confetti', ({ power = 90 }) => {
      const w = canvas.width
      for (let i = 0; i < power; i++) {
        parts.current.push({
          x: w / 2 + (Math.random() - 0.5) * w * 0.5,
          y: -20 - Math.random() * 120,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 3 + 1,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          size: 6 + Math.random() * 8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 160 + Math.random() * 80,
        })
      }
      if (!raf.current) raf.current = requestAnimationFrame(tick)
    })

    return () => {
      off()
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[70]" aria-hidden />
}
