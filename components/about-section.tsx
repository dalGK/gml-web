import { Shield, Award, Users, Zap } from "lucide-react"

export default function AboutSection() {
  const values = [
    {
      icon: Shield,
      title: "Seguridad",
      description: "Cumplimos con los más altos estándares internacionales de seguridad aérea",
    },
    {
      icon: Award,
      title: "Confiabilidad",
      description: "Más de una década de experiencia respaldando nuestros servicios",
    },
    {
      icon: Zap,
      title: "Innovación",
      description: "Utilizamos tecnología de vanguardia para optimizar nuestros procesos",
    },
    {
      icon: Users,
      title: "Experiencia",
      description: "Equipo altamente calificado con certificaciones internacionales",
    },
  ]

  return (
    <section id="nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
            Sobre GML Servicios Aéreos
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-pretty">
            Somos una empresa especializada en servicios de aviación con más de 10 años de experiencia en el sector.
            Nuestro compromiso es brindar soluciones aéreas integrales con los más altos estándares de seguridad,
            calidad y profesionalismo, adaptándonos a las necesidades específicas de cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <value.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-primary mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
