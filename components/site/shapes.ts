/** clip-path con los bordes superior e inferior en zigzag, como una hoja recortada con tijera dentada. */
export function zigzag(teeth = 28, depth = 12) {
  const step = 100 / teeth
  const top: string[] = []
  const bottom: string[] = []
  for (let i = 0; i <= teeth; i++) {
    const x = +(i * step).toFixed(3)
    top.push(`${x}% ${i % 2 ? 0 : depth}px`)
    bottom.unshift(`${x}% calc(100% - ${i % 2 ? 0 : depth}px)`)
  }
  return `polygon(${[...top, ...bottom].join(", ")})`
}

/** Trazado SVG de una fila de festones (semicírculos) en un viewBox de 1200 × 26. */
export function scallopPath(count = 12) {
  const w = 1200 / count
  let d = "M0 26"
  for (let i = 0; i < count; i++) d += ` A${w / 2} 26 0 0 1 ${(i + 1) * w} 26`
  return `${d} Z`
}
