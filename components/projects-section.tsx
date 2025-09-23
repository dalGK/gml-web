import { Card, CardContent } from "@/components/ui/card"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Transporte Ejecutivo Internacional",
      description: "Vuelos regulares para empresa multinacional con rutas América-Europa",
      image: "/executive-jet-on-tarmac.jpg",
    },
    {
      title: "Operaciones de Emergencia Médica",
      description: "Servicios de ambulancia aérea y traslados médicos urgentes",
      image: "/placeholder-jt62y.png",
    },
    {
      title: "Mantenimiento Flota Comercial",
      description: "Programa integral de mantenimiento para aerolínea regional",
      image: "/aircraft-maintenance-hangar.png",
    },
    {
      title: "Consultoría Regulatoria",
      description: "Asesoramiento para certificación de nueva aerolínea",
      image: "/placeholder-1ebno.png",
    },
    {
      title: "Operaciones Especiales",
      description: "Vuelos charter para eventos deportivos internacionales",
      image: "/placeholder-2evbc.png",
    },
    {
      title: "Servicios de Carga Aérea",
      description: "Transporte especializado de mercancías sensibles al tiempo",
      image: "/placeholder-rwq69.png",
    },
  ]

  return (
    <section id="proyectos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6">
            Proyectos Destacados
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Algunos de nuestros casos de éxito que demuestran nuestra experiencia y compromiso con la excelencia en
            servicios aeronáuticos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h4 className="font-heading font-semibold text-lg mb-2">{project.title}</h4>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl text-primary mb-3">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
