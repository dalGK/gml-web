"use client"

import { useEffect } from "react"

/** Activa las entradas escalonadas de cada sección y muestra el WhatsApp flotante pasada la portada. */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    const onScroll = () => root.classList.toggle("past-hero", window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"))
      return () => window.removeEventListener("scroll", onScroll)
    }
    const io = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in")
        io.unobserve(entry.target)
      }),
    )
    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])
  return null
}
