"use client"

import { useEffect, useRef, useState } from "react"

// Cada momento del envío: `at` es el avance (0–1) de la escena en el que su talón está a la vista
const MOMENTS = [
  {
    title: "Lo recibimos en Estados Unidos",
    text: "Su proveedor entrega la mercadería en nuestro depósito internacional.",
    at: 0.1,
  },
  {
    title: "Vuela a Argentina",
    text: "Como courier o como carga aérea, consolidada o no, según lo que más le convenga.",
    at: 0.42,
  },
  {
    title: "Pasa la aduana",
    text: "Hacemos el despacho en zona primaria, con más de 30 años de oficio.",
    at: 0.7,
  },
  {
    title: "Llega a su puerta",
    text: "Transporte terrestre hasta donde lo necesite en Argentina.",
    at: 0.94,
  },
]

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

/** Escena sostenida: el globo gira de Estados Unidos a Buenos Aires mientras la ruta se dibuja con el scroll. */
export function RouteGlobe() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stubRefs = useRef<(HTMLLIElement | null)[]>([])
  const [rest, setRest] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRest(true)
      return
    }
    let disposed = false
    let cleanup = () => {}

    Promise.all([import("three"), import("./globe")])
      .then(async ([THREE, { createGlobe }]) => {
        const earth = await new THREE.TextureLoader().loadAsync("/textures/earth.jpg")
        const canvas = canvasRef.current
        const section = sectionRef.current
        if (disposed || !canvas || !section) return earth.dispose()

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500)
        const globe = createGlobe(earth)
        const clock = new THREE.Clock()

        let target = 0
        let progress = 0
        let portrait = false
        let visible = false
        let frame = 0

        const readScroll = () => {
          const rect = section.getBoundingClientRect()
          target = clamp01(-rect.top / (rect.height - window.innerHeight))
        }
        const resize = () => {
          const w = canvas.clientWidth
          const h = canvas.clientHeight
          renderer.setSize(w, h, false)
          portrait = w / h < 1
          camera.aspect = w / h
          camera.fov = portrait ? 52 : 40
          camera.updateProjectionMatrix()
        }
        const showStubs = (p: number) =>
          MOMENTS.forEach((m, i) => {
            const stub = stubRefs.current[i]
            if (!stub) return
            const next = MOMENTS[i + 1]?.at ?? 2
            const prev = MOMENTS[i - 1]?.at ?? -1
            // Cada talón ocupa su tramo; el cambio ocurre a mitad de camino entre dos momentos
            const on = p >= (prev + m.at) / 2 && p < (m.at + next) / 2
            stub.style.opacity = on ? "1" : "0"
            stub.style.transform = on ? "none" : "translateY(12px)"
            stub.style.visibility = on ? "visible" : "hidden"
          })

        const render = () => {
          const dt = Math.min(clock.getDelta(), 0.1)
          progress += (target - progress) * (1 - Math.exp(-dt * 6))
          globe.update(progress, camera, clock.elapsedTime, portrait)
          renderer.render(globe.scene, camera)
          showStubs(progress)
          if (visible) frame = requestAnimationFrame(render)
        }

        const observer = new IntersectionObserver(([entry]) => {
          const was = visible
          visible = entry.isIntersecting
          if (visible && !was) {
            cancelAnimationFrame(frame)
            readScroll()
            frame = requestAnimationFrame(render)
          }
        })
        observer.observe(section)
        resize()
        readScroll()
        progress = target
        render()
        setReady(true)
        window.addEventListener("scroll", readScroll, { passive: true })
        window.addEventListener("resize", resize)

        cleanup = () => {
          cancelAnimationFrame(frame)
          observer.disconnect()
          window.removeEventListener("scroll", readScroll)
          window.removeEventListener("resize", resize)
          globe.dispose()
          renderer.dispose()
        }
      })
      .catch(() => setRest(true))

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  if (rest) {
    return (
      <section className="route-rest" id="recorrido" aria-labelledby="recorrido-titulo">
        <h2 id="recorrido-titulo">Cómo viaja su envío</h2>
        <ol>
          {MOMENTS.map((m) => (
            <li key={m.title} className="paper">
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
        <img src="/photos/americas.png" alt="Mapa de América" width={1194} height={1572} loading="lazy" />
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="route" id="recorrido" aria-labelledby="recorrido-titulo" style={{ height: "400vh" }}>
      <div className="route__stage">
        <canvas ref={canvasRef} className={`route__canvas ${ready ? "is-ready" : ""}`} aria-hidden="true" />
        <div className="route__text">
          <h2 id="recorrido-titulo">Cómo viaja su envío</h2>
          <ol className="stubs">
            {MOMENTS.map((m, i) => (
              <li
                key={m.title}
                ref={(el) => {
                  stubRefs.current[i] = el
                }}
                className="stub paper"
                style={i ? { opacity: 0, visibility: "hidden" } : undefined}
              >
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <span className="stub__count">
                  {i + 1} de {MOMENTS.length}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
