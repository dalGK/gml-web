"use client"

import { useEffect, useState } from "react"

const format = () =>
  new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", hour: "2-digit", minute: "2-digit" }).format(
    new Date(),
  )

/** Hora actual en Buenos Aires; vacía hasta montar para no desajustar la hidratación. */
export function BuenosAiresClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    setTime(format())
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])
  return <time suppressHydrationWarning>{time}</time>
}
