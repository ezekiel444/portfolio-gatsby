import React, { useRef, useEffect, useState, useCallback } from "react"

const GatsbyKineticMotion = ({ children, className = "", style = {} }) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const touchStartRef = useRef(null)

  const targetTiltRef = useRef({ x: 0, y: 0 })
  const currentTiltRef = useRef({ x: 0, y: 0 })
  const pointerNormRef = useRef({ x: 0, y: 0, active: false })

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    targetTiltRef.current = { x: nx * 1.8, y: ny * 1.8 }
    pointerNormRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    setIsInteracting(true)
  }, [])

  const handlePointerLeave = useCallback(() => {
    targetTiltRef.current = { x: 0, y: 0 }
    pointerNormRef.current = { x: 0, y: 0, active: false }
    setIsInteracting(false)
  }, [])

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length > 0 && containerRef.current) {
      const touch = e.touches[0]
      const rect = containerRef.current.getBoundingClientRect()
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
      const localX = touch.clientX - rect.left
      const localY = touch.clientY - rect.top
      const nx = localX / rect.width - 0.5
      const ny = localY / rect.height - 0.5
      targetTiltRef.current = { x: nx * 2, y: ny * 2 }
      pointerNormRef.current = { x: localX, y: localY, active: true }
      setIsInteracting(true)
    }
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0 && containerRef.current) {
      const touch = e.touches[0]
      const rect = containerRef.current.getBoundingClientRect()
      const localX = touch.clientX - rect.left
      const localY = touch.clientY - rect.top
      const nx = localX / rect.width - 0.5
      const ny = localY / rect.height - 0.5
      targetTiltRef.current = { x: nx * 2, y: ny * 2 }
      pointerNormRef.current = { x: localX, y: localY, active: true }
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null
    targetTiltRef.current = { x: 0, y: 0 }
    pointerNormRef.current = { x: 0, y: 0, active: false }
    setIsInteracting(false)
  }, [])

  // Gyroscope tilt
  useEffect(() => {
    const handleOrientation = (e) => {
      if (touchStartRef.current) return
      if (e.gamma !== null && e.beta !== null) {
        const gx = Math.min(Math.max(e.gamma / 20, -1), 1)
        const gy = Math.min(Math.max((e.beta - 40) / 20, -1), 1)
        targetTiltRef.current = { x: gx, y: gy }
      }
    }
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true })
    }
    return () => {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation)
      }
    }
  }, [])

  // 60FPS Orbit & Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId
    let isVisible = true

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    if (containerRef.current) observer.observe(containerRef.current)

    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      if (!canvas || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const particleCount = 28
    const particles = []
    const colors = [
      "rgba(44, 174, 186, 0.75)",
      "rgba(44, 174, 186, 0.35)",
      "rgba(17, 105, 121, 0.65)",
      "rgba(232, 155, 92, 0.75)",
    ]

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const dist = 130 + Math.random() * 60
      particles.push({
        x: 0,
        y: 0,
        baseX: dist * Math.cos(angle),
        baseY: dist * Math.sin(angle),
        radius: Math.random() * 2 + 1,
        color: colors[i % colors.length],
        speed: 0.001 + Math.random() * 0.001,
        angle: angle,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0

    const render = () => {
      if (isVisible) {
        time += 0.016

        currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * 0.08
        currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * 0.08

        setTilt({ x: currentTiltRef.current.x, y: currentTiltRef.current.y })

        ctx.clearRect(0, 0, width, height)

        const cx = width / 2
        const cy = height / 2
        const ox = currentTiltRef.current.x * 10
        const oy = currentTiltRef.current.y * 10

        ctx.save()
        ctx.translate(cx + ox, cy + oy)

        const r1 = Math.min(width, height) * 0.45
        ctx.beginPath()
        ctx.arc(0, 0, r1, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(44, 174, 186, 0.3)"
        ctx.lineWidth = 1.2
        ctx.setLineDash([6, 10])
        ctx.stroke()

        const a1 = -time * 0.6
        const s1x = r1 * Math.cos(a1)
        const s1y = r1 * Math.sin(a1)
        ctx.beginPath()
        ctx.arc(s1x, s1y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = "#2caeba"
        ctx.shadowColor = "#2caeba"
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0

        const r2 = Math.min(width, height) * 0.49
        const arcStart = time * 0.35
        ctx.beginPath()
        ctx.arc(0, 0, r2, arcStart, arcStart + Math.PI * 0.75)
        ctx.strokeStyle = "rgba(17, 105, 121, 0.6)"
        ctx.lineWidth = 2
        ctx.setLineDash([])
        ctx.stroke()

        particles.forEach((p) => {
          p.angle += p.speed
          const harmonic = Math.sin(time * 1.5 + p.phase) * 10
          const curR = 140 + harmonic
          const rawX = curR * Math.cos(p.angle)
          const rawY = curR * Math.sin(p.angle)

          if (pointerNormRef.current.active) {
            const relPointerX = pointerNormRef.current.x - cx - ox
            const relPointerY = pointerNormRef.current.y - cy - oy
            const dx = rawX - relPointerX
            const dy = rawY - relPointerY
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 80 && d > 0) {
              const force = (80 - d) / 80
              p.x = rawX + (dx / d) * force * 20
              p.y = rawY + (dy / d) * force * 20
            } else {
              p.x = rawX
              p.y = rawY
            }
          } else {
            p.x = rawX
            p.y = rawY
          }

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        })

        ctx.restore()
      }
      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      observer.disconnect()
    }
  }, [])

  const rx = (-tilt.y * 12).toFixed(2)
  const ry = (tilt.x * 12).toFixed(2)

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        touchAction: "pan-y",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${isInteracting ? 1.02 : 1}, ${isInteracting ? 1.02 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: isInteracting ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default GatsbyKineticMotion
