"use client"

import { useState, type FormEvent } from "react"
import { useToast } from "@/hooks/use-toast"

const WHATSAPP = "541139468007"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PERF_DOTS = 22

/** Cupón para recortar: el visitante lo completa y ve su envío escrito a la izquierda de la perforación. */
export function Coupon() {
  const { toast } = useToast()
  const [from, setFrom] = useState("")
  const [goods, setGoods] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  const message = [
    `Origen en Estados Unidos: ${from.trim() || "a definir"}`,
    `Mercadería: ${goods.trim() || "a definir"}`,
  ].join("\n")
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero cotizar un envío.\n${message}`)}`

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return setError("Escriba su nombre para poder responderle.")
    if (!EMAIL_RE.test(email.trim())) return setError("Revise el email: ahí le enviamos la cotización.")
    setError("")
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: `Pedido de cotización\n${message}` }),
      })
      if (!res.ok) throw new Error()
      toast({ title: "Recibimos su cupón", description: "Le respondemos con la cotización en horario de oficina." })
      setGoods("")
    } catch {
      toast({ title: "No pudimos enviar el cupón", description: "Pruebe de nuevo o escríbanos por WhatsApp.", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="coupon" onSubmit={submit} noValidate aria-labelledby="contacto-titulo">
      <span className="coupon__notch coupon__notch--top" aria-hidden="true" />
      <span className="coupon__notch coupon__notch--bottom" aria-hidden="true" />
      <span className="coupon__perf" aria-hidden="true">
        {Array.from({ length: PERF_DOTS }, (_, i) => (
          <span key={i} />
        ))}
      </span>

      <div className="coupon__left">
        <h2 id="contacto-titulo">Pida su cotización</h2>
        <p className="coupon__preview" aria-live="polite">
          De <em>{from.trim() || "Estados Unidos"}</em> a su puerta
          {goods.trim() ? (
            <>
              , con <em>{goods.trim().toLowerCase()}</em>
            </>
          ) : null}
          .
        </p>
        <p className="coupon__small">
          Respondemos de lunes a viernes de 8 a 18 h y los sábados de 9 a 14 h. ¿Prefiere hablar?{" "}
          <a href={whatsappHref}>Envíelo por WhatsApp</a>.
        </p>
      </div>

      <div className="coupon__right">
        <label className="coupon__field">
          <span className="visually-hidden">Ciudad de origen en Estados Unidos</span>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Desde (Miami, Nueva York…)" autoComplete="off" />
        </label>
        <label className="coupon__field">
          <span className="visually-hidden">Qué envía</span>
          <input value={goods} onChange={(e) => setGoods(e.target.value)} placeholder="Qué envía (repuestos, ropa…)" autoComplete="off" />
        </label>
        <label className="coupon__field">
          <span className="visually-hidden">Su nombre</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Su nombre" autoComplete="name" />
        </label>
        <label className="coupon__field">
          <span className="visually-hidden">Su email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Su email" autoComplete="email" />
        </label>
        {error ? (
          <p className="coupon__error" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="button coupon__submit" disabled={sending}>
          {sending ? "Enviando…" : "Enviar cupón"}
        </button>
      </div>
    </form>
  )
}
