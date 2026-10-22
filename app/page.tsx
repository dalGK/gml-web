import Image from "next/image"
import { Clock, Mail, MapPin, MessageCircle, Phone, Plane } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import WhatsAppButton from "@/components/whatsapp-button"

const WHATSAPP_URL =
  "https://wa.me/541139468007?text=Hola,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20courier%20internacional"

const nav = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#contacto", label: "Contacto" },
]

const values = [
  { title: "Seguridad", text: "Cumplimos las normativas internacionales de transporte aéreo en cada envío." },
  { title: "Confiabilidad", text: "Plazos claros y seguimiento de su mercadería de principio a fin." },
  { title: "Alcance", text: "Especialistas en el comercio entre Estados Unidos y Argentina." },
  { title: "Experiencia", text: "Más de 30 años de trayectoria de nuestros socios en el sector." },
]

const services = [
  {
    title: "Courier internacional",
    text: "Pequeños envíos aéreos para importar mercadería nueva de forma simple y ágil, con entrega puerta a puerta.",
    tag: "Puerta a puerta",
  },
  {
    title: "Asesoramiento en importación y exportación",
    text: "Conocemos las leyes de exportación de Estados Unidos y de importación en Argentina, y lo guiamos en cada paso.",
    tag: "EE.UU. – Argentina",
  },
  {
    title: "Transporte aéreo, marítimo y terrestre",
    text: "Carga consolidada o no, con despacho a Buenos Aires. Llevamos su mercadería donde la necesite.",
    tag: "Multimodal",
  },
  {
    title: "Almacenaje",
    text: "Depósito internacional no refrigerado para mercadería envasada. Para estadías de más de un mes, consulte el costo.",
    tag: "Depósito internacional",
  },
  {
    title: "Carga aeroexpress",
    text: "Experiencia en el manejo de carga en zona primaria aduanera y en las regulaciones de cada aeropuerto donde operamos.",
    tag: "Zona primaria",
  },
]

const steps = [
  {
    title: "Su proveedor nos envía la mercadería",
    text: "La recibimos en nuestro depósito internacional en Estados Unidos.",
  },
  {
    title: "Preparamos el envío",
    text: "Consolidamos la carga, armamos la documentación y elegimos la vía: courier, aérea o marítima.",
  },
  {
    title: "Despachamos en Argentina",
    text: "Gestionamos la aduana en zona primaria, en Ezeiza o en el puerto de Buenos Aires.",
  },
  {
    title: "Entregamos en su puerta",
    text: "Llevamos la mercadería a su domicilio, oficina o depósito.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Encabezado */}
      <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <a href="#inicio" className="flex items-center gap-3" aria-label="GML Servicios Aéreos, inicio">
            <Image src="/images/logo-gml.jpg" alt="" width={48} height={48} className="rounded-full" priority />
            <span className="heading hidden text-lg sm:block">GML Servicios Aéreos</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] text-[var(--slate)] transition-colors hover:text-[var(--navy)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contacto" className="btn btn-primary !min-h-10 !px-5 text-[15px]">
            Pedir presupuesto
          </a>
        </div>
      </header>

      <main>
        {/* Inicio */}
        <section id="inicio" className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <h1 className="display rise text-[clamp(2.5rem,5.4vw,4.25rem)]">
                Courier y carga de Estados Unidos a Argentina
              </h1>
              <p className="prose-gml rise rise-2 mt-6 max-w-[34rem] text-lg sm:text-xl">
                Envíos courier, importación y exportación con despacho aduanero y entrega puerta a puerta. Más de 30
                años de experiencia.
              </p>
              <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contacto" className="btn btn-primary">
                  Pedir presupuesto
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Escribir por WhatsApp
                </a>
              </div>

              {/* Ruta: el gesto propio de la página */}
              <div className="rise rise-3 mt-14 flex items-center gap-4" aria-label="Ruta Miami a Buenos Aires">
                <div>
                  <div className="heading text-2xl">MIA</div>
                  <div className="text-sm text-[var(--slate)]">Miami</div>
                </div>
                <div className="relative flex-1">
                  <div className="border-t-2 border-dashed border-[var(--red)]/60" />
                  <Plane
                    className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white text-[var(--red)] box-content px-1.5"
                    aria-hidden
                  />
                </div>
                <div className="text-right">
                  <div className="heading text-2xl">EZE</div>
                  <div className="text-sm text-[var(--slate)]">Buenos Aires</div>
                </div>
              </div>
            </div>

            <figure className="relative">
              <Image
                src="/photos/miami-aeropuerto.jpg"
                alt="Vista aérea del Aeropuerto Internacional de Miami"
                width={1800}
                height={1285}
                priority
                className="aspect-[4/5] w-full rounded-3xl object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm text-[var(--navy)] backdrop-blur">
                Aeropuerto Internacional de Miami
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="scroll-mt-20 bg-[var(--mist)] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="heading text-[clamp(2rem,4vw,3rem)]">Tres décadas moviendo mercadería entre dos países</h2>
              <p className="prose-gml mt-6 max-w-[36rem] text-lg">
                GML reúne más de 30 años de experiencia de sus socios en el manejo y el envío de mercadería. Nuestro
                trabajo es darle a cada cliente el servicio que su operación necesita, con el conocimiento de quien
                conoce los procesos por dentro.
              </p>
              <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="border-t-2 border-[var(--navy)] pt-4">
                    <dt className="heading text-lg">{v.title}</dt>
                    <dd className="prose-gml mt-2">{v.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="relative self-stretch">
              <Image
                src="/photos/buenos-aires.jpg"
                alt="Vista aérea de Buenos Aires"
                width={1800}
                height={1348}
                className="aspect-[4/3] w-full rounded-3xl object-cover lg:aspect-auto lg:h-full"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm backdrop-blur">
                Nuestra oficina está en Palermo, Buenos Aires
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="heading text-[clamp(2rem,4vw,3rem)]">Servicios</h2>
              <p className="prose-gml mt-5 max-w-sm text-lg">
                Desde un paquete hasta una carga consolidada: nos ocupamos de que llegue, y de los trámites del camino.
              </p>
              <a href="#contacto" className="btn btn-ghost mt-8">
                Consultar por un envío
              </a>
            </div>
            <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {services.map((s) => (
                <li key={s.title} className="grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <h3 className="heading text-xl sm:text-2xl">{s.title}</h3>
                    <p className="prose-gml mt-3 max-w-[38rem]">{s.text}</p>
                  </div>
                  <span className="h-fit w-fit rounded-full bg-[var(--mist)] px-3 py-1 text-sm text-[var(--navy)] sm:mt-1">
                    {s.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cómo funciona: es un proceso real, por eso va numerado */}
        <section id="como-funciona" className="scroll-mt-20 bg-[var(--navy)] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="heading max-w-2xl text-[clamp(2rem,4vw,3rem)]">Cómo llega su mercadería</h2>
            <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="relative">
                  {i < steps.length - 1 && (
                    <div className="absolute left-12 right-0 top-5 hidden border-t border-white/25 lg:block" aria-hidden />
                  )}
                  <div className="heading relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--red)] text-base">
                    {i + 1}
                  </div>
                  <h3 className="heading mt-6 text-lg">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="heading text-[clamp(2rem,4vw,3rem)]">Hablemos de su envío</h2>
              <p className="prose-gml mt-5 max-w-md text-lg">
                Cuéntenos qué necesita traer o enviar y le respondemos con un presupuesto.
              </p>
              <ul className="mt-10 space-y-6">
                <li className="flex gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden />
                  <div>
                    <div className="font-semibold">Teléfono y WhatsApp</div>
                    <a href="tel:+541139468007" className="prose-gml hover:text-[var(--navy)]">
                      +54 (11) 3946-8007
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:info@gml.com.ar" className="prose-gml hover:text-[var(--navy)]">
                      info@gml.com.ar
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden />
                  <div>
                    <div className="font-semibold">Oficina</div>
                    <p className="prose-gml">Honduras 5730, Palermo (CABA), Buenos Aires</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden />
                  <div>
                    <div className="font-semibold">Horario</div>
                    <p className="prose-gml">Lunes a viernes de 8 a 18 h. Sábados de 9 a 14 h.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl bg-[var(--mist)] p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Pie */}
      <footer className="bg-[var(--navy-deep)] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-gml.jpg" alt="" width={44} height={44} className="rounded-full" />
            <div>
              <div className="heading">GML Servicios Aéreos</div>
              <div className="text-sm text-white/60">Courier y carga de Estados Unidos a Argentina</div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70" aria-label="Pie de página">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/50 sm:px-6">
            © {new Date().getFullYear()} GML Servicios Aéreos. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
