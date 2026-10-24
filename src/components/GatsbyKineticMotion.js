import React, { useRef, useEffect, useState, useCallback } from "react"

const GatsbyKineticMotion = ({ children, status = "Available for Projects", location = "Lyon, FR" }) => {
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
    targetTiltRef.current = { x: nx * 2, y: ny * 2 }
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
      targetTiltRef.current = { x: nx * 2.2, y: ny * 2.2 }
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
      targetTiltRef.current = { x: nx * 2.2, y: ny * 2.2 }
      pointerNormRef.current = { x: localX, y: localY, active: true }
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null
    targetTiltRef.current = { x: 0, y: 0 }
    pointerNormRef.current = { x: 0, y: 0, active: false }
    setIsInteracting(false)
  }, [])

  // Gyroscope
  useEffect(() => {
    const handleOrientation = (e) => {
      if (touchStartRef.current) return
      if (e.gamma !== null && e.beta !== null) {
        const gx = Math.min(Math.max(e.gamma / 22, -1), 1)
        const gy = Math.min(Math.max((e.beta - 40) / 22, -1), 1)
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

  // 60FPS Orbit Canvas
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

    // Palette: Cyan/Teal (#2caeba) & Deep Navy (#116979)
    const particleCount = 32
    const particles = []
    const colors = [
      "rgba(44, 174, 186, 0.85)",  // Primary Teal
      "rgba(44, 174, 186, 0.45)",  // Soft Teal
      "rgba(17, 105, 121, 0.85)",  // Deep Teal
      "rgba(255, 255, 255, 0.65)", // Translucent White
    ]

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const dist = 140 + Math.random() * 60
      particles.push({
        x: 0,
        y: 0,
        baseX: dist * Math.cos(angle),
        baseY: dist * Math.sin(angle),
        radius: Math.random() * 2 + 1.2,
        color: colors[i % colors.length],
        speed: 0.0009 + Math.random() * 0.0012,
        angle: angle,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0

    const render = () => {
      if (isVisible) {
        time += 0.016

        currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * 0.09
        currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * 0.09

        setTilt({ x: currentTiltRef.current.x, y: currentTiltRef.current.y })

        ctx.clearRect(0, 0, width, height)

        const cx = width / 2
        const cy = height / 2
        const ox = currentTiltRef.current.x * 10
        const oy = currentTiltRef.current.y * 10

        ctx.save()
        ctx.translate(cx + ox, cy + oy)

        const r1 = Math.min(width, height) * 0.44
        ctx.beginPath()
        ctx.arc(0, 0, r1, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(44, 174, 186, 0.35)"
        ctx.lineWidth = 1.2
        ctx.setLineDash([6, 10])
        ctx.stroke()

        // Satellite node on Ring 1
        const a1 = -time * 0.55
        const s1x = r1 * Math.cos(a1)
        const s1y = r1 * Math.sin(a1)
        ctx.beginPath()
        ctx.arc(s1x, s1y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#2caeba"
        ctx.shadowColor = "#2caeba"
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0

        // Segmented Arc
        const r2 = Math.min(width, height) * 0.48
        const arcStart = time * 0.35
        ctx.beginPath()
        ctx.arc(0, 0, r2, arcStart, arcStart + Math.PI * 0.8)
        ctx.strokeStyle = "rgba(17, 105, 121, 0.75)"
        ctx.lineWidth = 2.2
        ctx.setLineDash([])
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(0, 0, r2, arcStart + Math.PI, arcStart + Math.PI * 1.55)
        ctx.strokeStyle = "rgba(44, 174, 186, 0.45)"
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Radar Pulse
        const pProg = (time * 0.35) % 1
        const pr = r1 * (0.82 + pProg * 0.45)
        const pa = Math.max(0, (1 - pProg) * 0.3)
        ctx.beginPath()
        ctx.arc(0, 0, pr, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(44, 174, 186, ${pa})`
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Reticle ticks
        const tickCount = 16
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)"
        ctx.lineWidth = 1
        for (let i = 0; i < tickCount; i++) {
          const a = (i / tickCount) * Math.PI * 2
          const x1 = (r1 - 4) * Math.cos(a)
          const y1 = (r1 - 4) * Math.sin(a)
          const x2 = (r1 + 4) * Math.cos(a)
          const y2 = (r1 + 4) * Math.sin(a)
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }

        // Particle dynamics
        particles.forEach((p) => {
          p.angle += p.speed
          const harmonic = Math.sin(time * 1.4 + p.phase) * 12
          const curR = 140 + harmonic
          const rawX = curR * Math.cos(p.angle)
          const rawY = curR * Math.sin(p.angle)

          if (pointerNormRef.current.active) {
            const relPointerX = pointerNormRef.current.x - cx - ox
            const relPointerY = pointerNormRef.current.y - cy - oy
            const dx = rawX - relPointerX
            const dy = rawY - relPointerY
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 85 && d > 0) {
              const force = (85 - d) / 85
              p.x = rawX + (dx / d) * force * 24
              p.y = rawY + (dy / d) * force * 24
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

  const rx = (-tilt.y * 14).toFixed(2)
  const ry = (tilt.x * 14).toFixed(2)
  const gx = (((tilt.x + 1) / 2) * 100).toFixed(1)
  const gy = (((tilt.y + 1) / 2) * 100).toFixed(1)

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        userSelect: "none",
        touchAction: "pan-y",
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ambient Glow */}
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          filter: "blur(28px)",
          background: "radial-gradient(circle, rgba(44, 174, 186, 0.35) 0%, rgba(17, 105, 121, 0.4) 65%, transparent 100%)",
          opacity: isInteracting ? 0.95 : 0.6,
          transform: `scale(${isInteracting ? 1.08 : 1})`,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* 3D Tilt Card Shell */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "82%",
          borderRadius: "24px",
          padding: "2px",
          background: "linear-gradient(135deg, rgba(44, 174, 186, 0.7), rgba(255, 255, 255, 0.15), rgba(17, 105, 121, 0.8))",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
          transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${isInteracting ? 1.03 : 1}, ${isInteracting ? 1.03 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: isInteracting ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "22px",
            overflow: "hidden",
            backgroundColor: "#0d2024",
          }}
        >
          {children}

          {/* Glare Sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.32) 0%, rgba(44, 174, 186, 0.15) 35%, transparent 70%)`,
              opacity: isInteracting ? 0.85 : 0.25,
              mixBlendMode: "overlay",
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Floating Pill */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              borderRadius: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 600,
              pointerEvents: "none",
              transform: "translateZ(25px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#2caeba",
                  boxShadow: "0 0 8px #2caeba",
                }}
              />
              <span>{status}</span>
            </div>
            <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.75)", fontFamily: "monospace" }}>
              {location}
            </span>
          </div>
        </div>
      </div>

      <p
        style={{
          marginTop: "10px",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "monospace",
          color: "rgba(0, 0, 0, 0.45)",
          textAlign: "center",
        }}
      >
        Touch · Swipe · Tilt
      </p>
    </div>
  )
}

export default GatsbyKineticMotion
