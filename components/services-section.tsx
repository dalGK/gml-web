import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, MapPin, Wrench, Users, Clock, Shield } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: Plane,
      title: "Transporte Aéreo Ejecutivo",
      description: "Vuelos privados y corporativos con la máxima comodidad y puntualidad para ejecutivos y empresas.",
    },
    {
      icon: MapPin,
      title: "Servicios de Navegación",
      description:
        "Planificación de rutas optimizadas y servicios de navegación aérea con tecnología de última generación.",
    },
    {
      icon: Wrench,
      title: "Mantenimiento Aeronáutico",
      description:
        "Servicios especializados de mantenimiento preventivo y correctivo con certificaciones internacionales.",
    },
    {
      icon: Users,
      title: "Consultoría Aeronáutica",
      description: "Asesoramiento experto en regulaciones, certificaciones y optimización de operaciones aéreas.",
    },
    {
      icon: Clock,
      title: "Operaciones 24/7",
      description: "Disponibilidad completa para atender emergencias y vuelos programados en cualquier momento.",
    },
    {
      icon: Shield,
      title: "Gestión de Seguridad",
      description: "Implementación y supervisión de sistemas de gestión de seguridad operacional (SMS).",
    },
  ]

  return (
    <section id="servicios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Ofrecemos una amplia gama de servicios aeronáuticos diseñados para satisfacer las necesidades más exigentes
            del sector de la aviación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/30"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
