import * as THREE from "three"
import { createAirliner, textTexture } from "./airliner"

const R = 10
const ORIGIN = { lat: 25.79, lon: -80.29 } // sur de Florida
const DESTINATION = { lat: -34.82, lon: -58.54 } // Buenos Aires

// Misma convención de UV que SphereGeometry con una textura equirectangular
function latLonToDir(lat: number, lon: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta))
}

const slerpDir = (a: THREE.Vector3, b: THREE.Vector3, t: number, out = new THREE.Vector3()) => {
  const omega = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1))
  const s = Math.sin(omega)
  return out
    .copy(a)
    .multiplyScalar(Math.sin((1 - t) * omega) / s)
    .addScaledVector(b, Math.sin(t * omega) / s)
}

const smooth = (t: number) => t * t * (3 - 2 * t)

export function createGlobe(earthMap: THREE.Texture, background = "#0C2C5B") {
  const scene = new THREE.Scene()
  const disposables: { dispose(): void }[] = [earthMap]

  // Fondo plano: el mismo azul marino que la página, para que el globo flote sobre ella
  scene.background = new THREE.Color(background)

  // Estrellas
  const starPos = new Float32Array(900 * 3)
  for (let i = 0; i < 900; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(140 + Math.random() * 60)
    starPos.set([v.x, v.y, v.z], i * 3)
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3))
  const starMat = new THREE.PointsMaterial({ color: "#ffffff", size: 0.7, transparent: true, opacity: 0.7 })
  scene.add(new THREE.Points(starGeo, starMat))
  disposables.push(starGeo, starMat)

  scene.add(new THREE.AmbientLight("#ffffff", 0.9))
  const sun = new THREE.DirectionalLight("#fff6e8", 2.4)
  scene.add(sun)

  // Tierra
  earthMap.colorSpace = THREE.SRGBColorSpace
  earthMap.anisotropy = 8
  const earthGeo = new THREE.SphereGeometry(R, 128, 96)
  const earthMat = new THREE.MeshStandardMaterial({ map: earthMap, roughness: 0.9, metalness: 0 })
  scene.add(new THREE.Mesh(earthGeo, earthMat))
  disposables.push(earthGeo, earthMat)

  // Atmósfera: halo aditivo por la cara trasera
  const atmoGeo = new THREE.SphereGeometry(R * 1.12, 64, 48)
  const atmoMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float i = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(0.42, 0.7, 1.0, 1.0) * i;
      }`,
  })
  scene.add(new THREE.Mesh(atmoGeo, atmoMat))
  disposables.push(atmoGeo, atmoMat)

  // Ruta: arco de círculo máximo elevado sobre la superficie
  const a = latLonToDir(ORIGIN.lat, ORIGIN.lon)
  const b = latLonToDir(DESTINATION.lat, DESTINATION.lon)
  const SEGMENTS = 240
  const RADIAL = 10
  const routePoints = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
    const t = i / SEGMENTS
    return slerpDir(a, b, t).multiplyScalar(R + 0.08 + Math.sin(Math.PI * t) * 2.4)
  })
  const routeCurve = new THREE.CatmullRomCurve3(routePoints)
  const routeGeo = new THREE.TubeGeometry(routeCurve, SEGMENTS, 0.075, RADIAL, false)
  const routeMat = new THREE.MeshBasicMaterial({ color: "#ff4040", toneMapped: false })
  const route = new THREE.Mesh(routeGeo, routeMat)
  route.geometry.setDrawRange(0, 0)
  scene.add(route)
  const ghostGeo = new THREE.TubeGeometry(routeCurve, SEGMENTS / 2, 0.03, 6, false)
  const ghostMat = new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.25 })
  scene.add(new THREE.Mesh(ghostGeo, ghostMat))
  disposables.push(routeGeo, routeMat, ghostGeo, ghostMat)

  // Marcadores de ciudad con pulso y etiqueta
  const pulses: THREE.Mesh[] = []
  const dotGeo = new THREE.SphereGeometry(0.13, 16, 12)
  const dotMat = new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false })
  const ringGeo = new THREE.RingGeometry(0.2, 0.28, 40)
  const ringMat = new THREE.MeshBasicMaterial({ color: "#ff5a5a", transparent: true, side: THREE.DoubleSide, toneMapped: false })
  disposables.push(dotGeo, dotMat, ringGeo, ringMat)
  const marker = (dir: THREE.Vector3, label: string, labelOffset: THREE.Vector3) => {
    const dot = new THREE.Mesh(dotGeo, dotMat)
    dot.position.copy(dir).multiplyScalar(R + 0.04)
    scene.add(dot)
    const ring = new THREE.Mesh(ringGeo, ringMat.clone())
    ring.position.copy(dir).multiplyScalar(R + 0.05)
    ring.lookAt(dir.clone().multiplyScalar(R * 2))
    scene.add(ring)
    pulses.push(ring)
    const tex = textTexture(label, { width: 1024, height: 160 })
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })
    const sprite = new THREE.Sprite(spriteMat)
    sprite.scale.set(2.6, 0.41, 1)
    sprite.position.copy(dir).multiplyScalar(R + 0.6).add(labelOffset)
    scene.add(sprite)
    disposables.push(tex, spriteMat, ring.material as THREE.Material)
  }
  marker(a, "Estados Unidos", new THREE.Vector3(0, 0.7, 0))
  marker(b, "Buenos Aires", new THREE.Vector3(0, -0.7, 0))

  const plane = createAirliner()
  plane.scale.setScalar(0.07)
  scene.add(plane)

  const focus = new THREE.Vector3()
  const tangent = new THREE.Vector3()
  const normal = new THREE.Vector3()
  const look = new THREE.Vector3()

  /** g: avance de la fase del globo (0–1) */
  const update = (g: number, camera: THREE.PerspectiveCamera, time: number, portrait: boolean) => {
    const r = smooth(THREE.MathUtils.clamp((g - 0.06) / 0.82, 0, 1))
    route.geometry.setDrawRange(0, Math.floor(r * SEGMENTS) * RADIAL * 6)

    routeCurve.getPoint(r, plane.position)
    routeCurve.getTangent(Math.min(r, 0.999), tangent)
    normal.copy(plane.position).normalize()
    plane.up.copy(normal)
    plane.lookAt(look.copy(plane.position).add(tangent))
    plane.visible = g > 0.02 && g < 0.98

    // Cerca del suelo al principio y al final, lejos a mitad del vuelo
    const arc = Math.sin(Math.PI * g)
    const dist = R + 9 + arc * (portrait ? 24 : 16)
    slerpDir(a, b, smooth(g), focus)
    // Inclinamos la vista hacia el sur para ver el arco en perspectiva
    camera.position.copy(focus).multiplyScalar(dist).add(new THREE.Vector3(0, -arc * 4, 0))
    camera.up.set(0, 1, 0)
    camera.lookAt(look.copy(focus).multiplyScalar(R * (1 - arc * 0.75)))

    sun.position.copy(camera.position).add(new THREE.Vector3(20, 30, 10))

    pulses.forEach((p, i) => {
      const k = (time * 0.8 + i * 0.5) % 1
      p.scale.setScalar(1 + k * 2.5)
      ;(p.material as THREE.MeshBasicMaterial).opacity = 1 - k
    })
  }

  const dispose = () => {
    plane.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.isMesh) {
        mesh.geometry.dispose()
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((m) => {
          ;(m as THREE.MeshBasicMaterial).map?.dispose()
          m.dispose()
        })
      }
    })
    disposables.forEach((d) => d.dispose())
  }

  return { scene, update, dispose }
}
