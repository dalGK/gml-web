"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"
import {
  Plane,
  Shield,
  Users,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Truck,
  Globe,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const fullText = "Courier Internacional y Servicios de Transporte"

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setTextVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/logo-gml.jpg"
              alt="GML Servicios Aéreos"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-[#0C2C5B] hover:text-[#C62828] transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-[#0C2C5B] hover:text-[#C62828] transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-[#0C2C5B] hover:text-[#C62828] transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("proyectos")}
              className="text-[#0C2C5B] hover:text-[#C62828] transition-colors"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-[#0C2C5B] hover:text-[#C62828] transition-colors"
            >
              Contacto
            </button>
          </nav>

          <Button
            onClick={() => scrollToSection("contacto")}
            className="bg-[#C62828] hover:bg-[#0C2C5B] text-white transform hover:scale-105 transition-all duration-300"
          >
            Solicitar Presupuesto
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-blue-800/90 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 animate-pulse"
          style={{
            backgroundImage: "url('/airplane-taking-off-from-runway-at-sunset.jpg')",
            animation: "parallax 20s ease-in-out infinite alternate",
          }}
        />
        <div className="absolute inset-0 bg-[#0C2C5B]/70" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 text-balance transition-all duration-2000 ${
              textVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {fullText}
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 text-gray-200 transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Especialistas en envíos Courier, importación y exportación con más de 30 años de experiencia
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contacto")}
              className="bg-[#C62828] hover:bg-[#C62828]/90 text-white px-8 py-3 transform hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-pulse hover:animate-none"
            >
              Solicitar Presupuesto
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("nosotros")}
              className="border-white text-white hover:bg-white hover:text-[#0C2C5B] px-8 py-3 bg-transparent transform hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              Conócenos
            </Button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("nosotros")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </button>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0C2C5B] mb-6">Sobre GML Servicios Aéreos</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Nuestra empresa cuenta con el aporte de más de 30 años de experiencia de sus socios. Nuestra misión es
              proveerle a nuestros clientes el servicio adecuado para sus necesidades con nuestro conocimiento de los
              procesos del manejo y envío de mercadería.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Seguridad</h3>
                <p className="text-gray-600">Cumplimiento estricto de normativas internacionales de aviación</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <CheckCircle className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Confiabilidad</h3>
                <p className="text-gray-600">Servicios puntuales y eficientes que superan expectativas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Alcance Global</h3>
                <p className="text-gray-600">Especialistas en comercio entre Estados Unidos y Argentina</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-[#C62828] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Experiencia</h3>
                <p className="text-gray-600">Más de 30 años de trayectoria comprobada en el sector</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0C2C5B] mb-6">Nuestros Servicios</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              GML ofrece una variedad de servicios tendientes a satisfacer las necesidades específicas de cada cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Package className="w-16 h-16 text-[#C62828] mb-6" />
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Courier Internacional</h3>
                <p className="text-gray-600 mb-4">
                  Nos especializamos en envíos Courier, modalidad de pequeños envíos aéreos para importación simple y
                  ágil de mercadería nueva. Servicio Puerta a Puerta disponible.
                </p>
                <Badge variant="secondary" className="bg-[#0C2C5B] text-white">
                  Puerta a Puerta
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-[#C62828] mb-6" />
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Asesoramiento Import/Export</h3>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo se especializa en movimientos logísticos con conocimiento de las leyes de exportación
                  desde Estados Unidos e importación en Argentina.
                </p>
                <Badge variant="secondary" className="bg-[#0C2C5B] text-white">
                  USA - Argentina
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Truck className="w-16 h-16 text-[#C62828] mb-6" />
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Servicios de Transporte</h3>
                <p className="text-gray-600 mb-4">
                  Transporte terrestre, envíos aéreos y marítimos de carga (consolidada o no) con despacho a Buenos
                  Aires. Llevamos su mercadería donde necesite.
                </p>
                <Badge variant="secondary" className="bg-[#0C2C5B] text-white">
                  Multimodal
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Shield className="w-16 h-16 text-[#C62828] mb-6" />
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Almacenaje de Mercancías</h3>
                <p className="text-gray-600 mb-4">
                  Ofrecemos servicio de almacenaje de mercadería envasada en depósito no refrigerado. Contamos con
                  depósito internacional para sus necesidades.
                </p>
                <Badge variant="secondary" className="bg-[#0C2C5B] text-white">
                  Depósito Internacional
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Plane className="w-16 h-16 text-[#C62828] mb-6" />
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Transporte Aeroexpress</h3>
                <p className="text-gray-600 mb-4">
                  Conocimiento profundo de la industria del transporte aeroexpress. Experiencia en manejo de carga en
                  zona primaria aduanera y regulaciones aeroportuarias.
                </p>
                <Badge variant="secondary" className="bg-[#0C2C5B] text-white">
                  Zona Primaria
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Globe className="w-16 h-16 text-[#C62828] mb-6" />
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Desarrollo Empresarial</h3>
                <p className="text-gray-600 mb-4">
                  Con nuestros servicios de Courier y transportación aérea, brindamos el servicio que necesite para
                  ayudar a desarrollar su compañía.
                </p>
                <Badge variant="secondary" className="bg-[#0C2C5B] text-white">
                  Crecimiento
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Qué está buscando Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#0C2C5B] mb-6">Qué está buscando</h2>
            <p className="text-lg text-gray-700 max-w-4xl">
              Con nuestros servicios de Courier, transportación aérea, podremos brindarle el servicio que necesite para
              ayudar a desarrollar su compañía.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0C2C5B] text-white rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">01</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Servicios de Transporte</h3>
                <p className="text-gray-600">
                  Lleve su mercadería del proveedor a donde necesite. Ofrecemos servicio en Argentina. También contamos
                  con un depósito internacional, para poder ayudar a transportar su carga de la forma que necesiten.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0C2C5B] text-white rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">02</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">Transporte de Mercancías Envasadas</h3>
                <p className="text-gray-600">
                  Ofrecemos servicio de almacenaje de mercadería en un depósito no refrigerado. Por estadías mayores a
                  un mes, por favor consultar costo de servicio.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0C2C5B] text-white rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">03</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-4">
                  Conocimiento Profundo de la Industria del Transporte Aeroexpreso
                </h3>
                <p className="text-gray-600">
                  Contamos con la experiencia y la información actualizada en el manejo de la carga en zona primaria
                  aduanera, el conocimiento de las regulaciones aduaneras de cada aeropuerto en el que operamos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0C2C5B] mb-6">Proyectos Destacados</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Algunos de nuestros casos de éxito que demuestran nuestra capacidad y compromiso
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/commercial-aircraft-maintenance-hangar.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Servicio Especializado</h3>
                  <p className="text-sm">Mantenimiento y servicios técnicos aeronáuticos de alta calidad</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Servicio Especializado</h3>
                <p className="text-gray-600">Servicios técnicos y mantenimiento aeronáutico profesional</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/airport-cargo-operations.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Servicio de Entrega</h3>
                  <p className="text-sm">Entregas rápidas y seguras con seguimiento completo</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Servicio de Entrega</h3>
                <p className="text-gray-600">Entregas eficientes y puntuales a nivel internacional</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/aviation-training-simulator.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Servicio Aéreo</h3>
                  <p className="text-sm">Operaciones aéreas especializadas y transporte de carga</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0C2C5B] mb-2">Servicio Aéreo</h3>
                <p className="text-gray-600">Transporte aéreo y operaciones especializadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#C62828]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para llevar tu proyecto al siguiente nivel con nuestros servicios aéreos?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos con soluciones aeronáuticas de
            clase mundial.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("contacto")}
            className="bg-white text-[#0C2C5B] hover:bg-gray-100 px-8 py-3"
          >
            Contáctanos Ahora
          </Button>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0C2C5B] mb-6">Contáctanos</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Estamos aquí para responder tus consultas y brindarte la mejor solución para tus necesidades aeronáuticas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="p-8">
                <CardContent className="pt-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#0C2C5B] mb-6">Información de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-[#C62828] mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-[#0C2C5B]">Teléfono</p>
                      <p className="text-gray-600">+54 (11) 3946-8007</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#C62828] mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-[#0C2C5B]">Email</p>
                      <p className="text-gray-600">info@gml.com.ar</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#C62828] mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-[#0C2C5B]">Dirección</p>
                      <p className="text-gray-600">
                        Honduras 5730, Palermo (CABA)
                        <br />
                        Buenos Aires, Argentina 
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-[#0C2C5B] mb-4">Horarios de Atención</h4>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Lunes - Viernes:</span> 8:00 AM - 6:00 PM
                  </p>
                  <p>
                    <span className="font-medium">Sábados:</span> 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C2C5B] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/logo-gml.jpg"
                  alt="GML Servicios Aéreos"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <h3 className="text-xl font-bold">GML Servicios Aéreos</h3>
              </div>
              <p className="text-gray-300">
                Especialistas en Courier internacional, importación y exportación con más de 30 años de experiencia.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("inicio")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("nosotros")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Nosotros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("proyectos")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Proyectos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> +54 (11) 3946-8007
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> info@gml.com.ar
                </p>
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1" /> Honduras 5730, Palermo (CABA)
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; 2025 GML Servicios Aéreos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() =>
            window.open(
              "https://wa.me/541139468007?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20de%20courier%20internacional",
              "_blank",
            )
          }
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      <style jsx>{`
        @keyframes parallax {
          0% { transform: scale(1.1) translateY(0px); }
          100% { transform: scale(1.15) translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
