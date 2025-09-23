import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      company: "Aerolíneas del Pacífico",
      comment:
        "GML Servicios Aéreos ha sido nuestro socio estratégico durante más de 5 años. Su profesionalismo y atención al detalle son excepcionales.",
      rating: 5,
    },
    {
      name: "María González",
      company: "Transportes Aéreos Nacionales",
      comment:
        "La calidad de sus servicios de mantenimiento y la puntualidad en las entregas nos han permitido mantener nuestra flota operativa al 100%.",
      rating: 5,
    },
    {
      name: "Roberto Silva",
      company: "Aviación Comercial del Sur",
      comment:
        "Confiamos plenamente en GML para todos nuestros requerimientos aeronáuticos. Su experiencia y compromiso son incomparables.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gml-blue mb-4 font-poppins">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gml-blue rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gml-blue">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
