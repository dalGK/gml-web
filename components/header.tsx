"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-lg">GML</span>
            </div>
            <span className="font-heading font-bold text-xl">GML Servicios Aéreos</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("inicio")} className="hover:text-secondary transition-colors">
              Inicio
            </button>
            <button onClick={() => scrollToSection("nosotros")} className="hover:text-secondary transition-colors">
              Nosotros
            </button>
            <button onClick={() => scrollToSection("servicios")} className="hover:text-secondary transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToSection("proyectos")} className="hover:text-secondary transition-colors">
              Proyectos
            </button>
            <button onClick={() => scrollToSection("contacto")} className="hover:text-secondary transition-colors">
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contacto")}
              className="bg-secondary hover:bg-primary hover:text-primary-foreground border-2 border-secondary hover:border-primary-foreground transition-all"
            >
              Solicitar Presupuesto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-primary-foreground/20">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-left hover:text-secondary transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("nosotros")}
                className="text-left hover:text-secondary transition-colors"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-left hover:text-secondary transition-colors"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("proyectos")}
                className="text-left hover:text-secondary transition-colors"
              >
                Proyectos
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-left hover:text-secondary transition-colors"
              >
                Contacto
              </button>
              <Button
                onClick={() => scrollToSection("contacto")}
                className="bg-secondary hover:bg-primary hover:text-primary-foreground border-2 border-secondary hover:border-primary-foreground transition-all w-full mt-4"
              >
                Solicitar Presupuesto
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
