"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/aerial-view-of-airplane-flying-over-clouds-at-suns.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-balance">
          Soluciones Aéreas con Confianza y Experiencia
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
          Más de 10 años brindando servicios de aviación profesionales con los más altos estándares de seguridad y
          calidad
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("contacto")}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold"
          >
            Solicitar Presupuesto
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("nosotros")}
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
          >
            Conócenos
          </Button>
        </div>
      </div>
    </section>
  )
}
