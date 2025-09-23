import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 bg-gml-red">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6 font-poppins">
          ¿Listo para llevar tu proyecto al siguiente nivel con nuestros servicios aéreos?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Únete a las empresas que confían en GML Servicios Aéreos para sus operaciones más importantes
        </p>
        <Button size="lg" className="bg-white text-gml-blue hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
          Contáctanos Ahora
        </Button>
      </div>
    </section>
  )
}
