import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/toaster"
import "./globals.css"
import "./site.css"

const text = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-text",
})

export const metadata: Metadata = {
  title: "GML Servicios Aéreos · Courier y carga de Estados Unidos a Argentina",
  description:
    "Courier internacional y carga aérea, marítima y terrestre de Estados Unidos a Argentina, con despacho aduanero y entrega puerta a puerta. Más de 30 años de experiencia. Oficina en Palermo, Buenos Aires.",
  keywords: "courier internacional, importación, exportación, Estados Unidos, Argentina, despacho aduanero, carga aérea, GML",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={text.variable} suppressHydrationWarning>
      <head>
        {/* Los estados ocultos de las animaciones solo se aplican si hay JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
