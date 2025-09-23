"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gml-blue mb-4 font-heading">Contáctanos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte con todos tus requerimientos de servicios aéreos. Contáctanos y te responderemos
            a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold gml-blue mb-6 font-heading">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gml-red p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold gml-blue mb-1">Teléfono</h4>
                    <p className="text-gray-600">+(54) 11 3946-8007</p>
                    <p className="text-gray-600">+(54) 11 3946-8007</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gml-red p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold gml-blue mb-1">Email</h4>
                    <p className="text-gray-600">info@gml.com.ar</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gml-red p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold gml-blue mb-1">Ubicación</h4>
                    <p className="text-gray-600">
                      <br />
                      Honduras 5730 CABA
                      <br />
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gml-red p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold gml-blue mb-1">Horarios</h4>
                    <p className="text-gray-600">
                      Lunes - Viernes: 6:00 AM - 10:00 PM
                      <br />
                      Sábados: 8:00 AM - 6:00 PM
                      <br />
                      Domingos: Emergencias únicamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold gml-blue mb-6 font-heading">Solicitar Información</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium gml-blue mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium gml-blue mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium gml-blue mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="+54 11 3946 8007"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium gml-blue mb-2">
                    Servicio de Interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar servicio</option>
                    <option value="transporte-pasajeros">Transporte de Pasajeros</option>
                    <option value="carga-aerea">Carga Aérea</option>
                    <option value="vuelos-charter">Vuelos Charter</option>
                    <option value="servicios-emergencia">Servicios de Emergencia</option>
                    <option value="mantenimiento">Mantenimiento Aeronáutico</option>
                    <option value="consultoria">Consultoría Aeronáutica</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium gml-blue mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full"
                  placeholder="Describe tus requerimientos o consulta..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gml-red hover:bg-gml-blue text-white py-3 text-lg font-semibold transition-colors duration-200"
              >
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
