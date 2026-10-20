import * as THREE from "three"

export const NAVY = "#0C2C5B"
export const RED = "#C62828"

// Texto sobre fondo opcional, como textura de canvas
export function textTexture(text: string, opts: { width?: number; height?: number; bg?: string; fg?: string } = {}) {
  const { width = 1024, height = 256, bg, fg = "#ffffff" } = opts
  const c = document.createElement("canvas")
  c.width = width
  c.height = height
  const ctx = c.getContext("2d")!
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)
  }
  ctx.fillStyle = fg
  ctx.font = `800 ${Math.round(height * 0.55)}px Poppins, system-ui, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, width / 2, height / 2 + height * 0.03)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

const flatShape = (points: [number, number][]) => {
  const shape = new THREE.Shape()
  points.forEach(([x, y], i) => (i ? shape.lineTo(x, y) : shape.moveTo(x, y)))
  shape.closePath()
  return shape
}

/** Avión de pasajeros con la librea de GML. Mide ~12.5 de largo y apunta hacia +z. */
export function createAirliner() {
  const plane = new THREE.Group()
  const white = new THREE.MeshStandardMaterial({ color: "#f6f7f9", roughness: 0.35, metalness: 0.15 })
  const grey = new THREE.MeshStandardMaterial({ color: "#d5dbe2", roughness: 0.45, metalness: 0.2, side: THREE.DoubleSide })
  const navy = new THREE.MeshStandardMaterial({ color: NAVY, roughness: 0.4 })
  const red = new THREE.MeshStandardMaterial({ color: RED, roughness: 0.4, side: THREE.DoubleSide })
  const glass = new THREE.MeshStandardMaterial({ color: "#1d2733", roughness: 0.15, metalness: 0.6 })

  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.castShadow = true
    plane.add(m)
    return m
  }

  // Fuselaje torneado: cola afilada, cuerpo recto, morro redondeado
  const profile = [
    [0, -6.3], [0.3, -6.1], [0.62, -5.3], [0.9, -3.8], [1, -2.2], [1, 3.2],
    [0.96, 4.3], [0.84, 5.15], [0.6, 5.85], [0.3, 6.2], [0, 6.3],
  ].map(([r, y]) => new THREE.Vector2(r, y))
  const fuselageGeo = new THREE.LatheGeometry(profile, 32)
  fuselageGeo.rotateX(Math.PI / 2)
  add(fuselageGeo, white)

  // Franjas de la librea y fila de ventanillas
  // θ medido desde la panza: 0.42π–0.5π queda justo bajo las ventanillas
  const stripe = new THREE.CylinderGeometry(1.012, 1.012, 6.6, 32, 1, true, Math.PI * 0.42, Math.PI * 0.08)
  stripe.rotateX(Math.PI / 2)
  for (const side of [1, -1]) {
    const s = add(stripe, red, 0, 0, 0.3)
    s.scale.x = side
    const n = add(stripe, navy, 0, -0.18, 0.3)
    n.scale.x = side
  }
  const windows = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.16, 0.2), glass, 36)
  const m4 = new THREE.Matrix4()
  for (let i = 0; i < 18; i++) {
    for (const [j, side] of [[0, 1], [1, -1]] as const) {
      m4.makeTranslation(side * 0.97, 0.28, -2.4 + i * 0.36)
      windows.setMatrixAt(i * 2 + j, m4)
    }
  }
  plane.add(windows)
  const cockpit = add(new THREE.SphereGeometry(0.5, 16, 10), glass, 0, 0.36, 5.2)
  cockpit.scale.set(1.15, 0.42, 0.9)

  // Alas con flecha (extrusiones finas)
  const wing = (span: number, rootZ: number, rootChord: number, sweep: number, tipChord: number) =>
    flatShape([
      [0.6, rootZ],
      [span, rootZ - sweep],
      [span, rootZ - sweep - tipChord],
      [0.6, rootZ - rootChord],
    ])
  const extrude = (shape: THREE.Shape, depth: number) => new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false })

  for (const side of [1, -1]) {
    const mainWing = extrude(wing(7.6, 1.9, 3.1, 3.1, 0.9), 0.16)
    mainWing.rotateX(Math.PI / 2)
    const w = add(mainWing, grey, 0, -0.32, 0)
    w.scale.x = side
    w.rotation.z = side * 0.06 // diedro

    const tailWing = extrude(wing(3.1, -4.4, 1.6, 1.4, 0.6), 0.1)
    tailWing.rotateX(Math.PI / 2)
    const t = add(tailWing, grey, 0, 0.25, 0)
    t.scale.x = side

    // Motores bajo las alas
    const engine = add(new THREE.CylinderGeometry(0.42, 0.36, 1.7, 20), white, side * 2.9, -0.85, 1.4)
    engine.rotation.x = Math.PI / 2
    add(new THREE.CircleGeometry(0.36, 20), glass, side * 2.9, -0.85, 2.26)
    add(new THREE.BoxGeometry(0.12, 0.5, 1), grey, side * 2.9, -0.5, 1.1)
  }

  // Deriva roja con el logo
  const finGeo = extrude(flatShape([[-3.6, 0.6], [-5.5, 3.5], [-6.4, 3.5], [-6.2, 0.6]]), 0.14)
  finGeo.rotateY(-Math.PI / 2)
  finGeo.translate(0.07, 0, 0)
  add(finGeo, red)
  const logo = textTexture("GML", { width: 512, height: 256 })
  const logoMat = new THREE.MeshBasicMaterial({ map: logo, transparent: true, side: THREE.DoubleSide, toneMapped: false })
  for (const side of [1, -1]) {
    const decal = add(new THREE.PlaneGeometry(1.4, 0.7), logoMat, side * 0.09, 2.1, -5.45)
    decal.rotation.y = side * (Math.PI / 2)
    decal.castShadow = false
  }

  // Tren de aterrizaje
  for (const [x, z] of [[0, 4.2], [1.1, 0], [-1.1, 0]]) {
    add(new THREE.CylinderGeometry(0.06, 0.06, 0.6), grey, x, -1.15, z)
    const wheel = add(new THREE.CylinderGeometry(0.22, 0.22, 0.25, 14), glass, x, -1.4, z)
    wheel.rotation.z = Math.PI / 2
  }

  return plane
}

/** Altura del centro del fuselaje cuando las ruedas tocan el suelo */
export const AIRLINER_GROUND_Y = 1.62
