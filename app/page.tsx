import type { CSSProperties } from "react"
import { RouteGlobe } from "@/components/route-globe"
import { Coupon } from "@/components/site/coupon"
import { Reveal } from "@/components/site/reveal"
import { BuenosAiresClock } from "@/components/site/clock"
import { scallopPath, zigzag } from "@/components/site/shapes"

const WHATSAPP_HREF =
  "https://wa.me/541139468007?text=Hola,%20quiero%20consultar%20por%20un%20env%C3%ADo%20de%20Estados%20Unidos%20a%20Argentina"

const v = (vars: Record<string, string | number>) => vars as CSSProperties

const MENU = [
  {
    group: "Envíos",
    items: [
      ["Courier internacional", "puerta a puerta", "Pequeños envíos aéreos para importar mercadería nueva de forma simple y ágil."],
      ["Carga aérea", "consolidada o no", "Envíos de carga por avión, con despacho a Buenos Aires."],
      ["Carga marítima", "consolidada o no", "Envíos por barco para volúmenes mayores, con despacho a Buenos Aires."],
    ],
  },
  {
    group: "En Argentina",
    items: [
      ["Despacho aduanero", "zona primaria", "Manejo de la carga en zona primaria y las regulaciones de cada aeropuerto en el que operamos."],
      ["Transporte terrestre", "en todo el país", "Del proveedor a donde usted necesite su mercadería."],
      ["Almacenaje", "no refrigerado", "Depósito para mercadería envasada. Para más de un mes, consulte el costo."],
    ],
  },
  {
    group: "Asesoramiento",
    items: [
      ["Importación y exportación", "EE. UU. y Argentina", "Las leyes de exportación de Estados Unidos y de importación en Argentina, explicadas."],
      ["Desarrollo de su empresa", "a medida", "Courier y transporte aéreo pensados para que su negocio crezca."],
    ],
  },
]

const HERO_PHOTOS = [
  ["miami-aeropuerto", "Vista aérea del aeropuerto internacional de Miami"],
  ["miami-puerto", "Vista aérea del puerto de contenedores de Miami"],
  ["ezeiza", "Vista aérea del aeropuerto de Ezeiza, en Buenos Aires"],
  ["buenos-aires", "Vista aérea de la ciudad de Buenos Aires"],
]

const CREDITS = [
  ["Aerial view of Miami International Airport in 2026", "Quintin Soloviev", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Miami_International_Airport_in_2026.jpg", "https://creativecommons.org/licenses/by/4.0"],
  ["Aerial photograph of the Port of Miami Container Port", "James R. Tourtellotte", "dominio público", "https://commons.wikimedia.org/wiki/File:Aerial_photograph_of_the_Port_of_Miami_Container_Port.jpg", "https://creativecommons.org/publicdomain/mark/1.0/"],
  ["Aeropuerto Ministro Pistarini, Ezeiza, Buenos Aires, Argentina", "Lcachero", "CC BY 3.0", "https://commons.wikimedia.org/w/index.php?curid=8402490", "https://creativecommons.org/licenses/by/3.0"],
  ["Aerial view of Buenos Aires, 2009-03-28", "Martin Terber", "CC BY 2.0", "https://commons.wikimedia.org/w/index.php?curid=6990318", "https://creativecommons.org/licenses/by/2.0/"],
  ["India & Cerviño Streets, Palermo", "Pedro Angelini", "CC BY 2.0", "https://commons.wikimedia.org/w/index.php?curid=6845330", "https://creativecommons.org/licenses/by/2.0/"],
  ["Miami - International Pan American Airport", "W. F. Gerecke", "dominio público", "https://commons.wikimedia.org/wiki/File:Miami_-_International_Pan_American_Airport.jpg", "https://creativecommons.org/publicdomain/mark/1.0/"],
]

export default function HomePage() {
  return (
    <div className="site">
      {/* Portada: la etiqueta de correo aéreo junto a las fotografías */}
      <header className="hero" id="inicio">
        <div className="label paper">
          <div className="airmail" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} style={v({ "--i": i })} />
            ))}
          </div>
          <div className="label__body">
            <img className="label__logo" src="/images/logo-gml.jpg" alt="Logotipo de GML Servicios Aéreos" width={104} height={104} data-load style={v({ "--d": "120ms" })} />
            <h1>
              <span>De Estados Unidos</span>
              <span>a su puerta</span>
            </h1>
            <dl className="label__route" data-load style={v({ "--d": "320ms" })}>
              <div>
                <dt>Desde</dt>
                <dd>Estados Unidos</dd>
              </div>
              <span className="arrow" aria-hidden="true">
                →
              </span>
              <div>
                <dt>Hasta</dt>
                <dd>Argentina</dd>
              </div>
            </dl>
            <p className="label__lead" data-load style={v({ "--d": "400ms" })}>
              GML Servicios Aéreos trae su mercadería como courier o como carga, hace el despacho aduanero y se la entrega donde la
              necesite. Más de 30 años de oficio.
            </p>
            <a className="button" href="#contacto" data-load style={v({ "--d": "480ms" })}>
              Cotizar envío
            </a>
          </div>
          <nav aria-label="Secciones">
            <ul className="label__links">
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#recorrido">Recorrido</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
        </div>

        <figure className="hero__photos">
          {HERO_PHOTOS.map(([file, alt], i) => (
            <img key={file} src={`/photos/${file}.jpg`} alt={alt} width={1800} height={1200} fetchPriority={i ? "low" : "high"} />
          ))}
        </figure>
      </header>

      <main>
        {/* Servicios como hoja de tarifas, con dos fotos pegadas al lado */}
        <section className="services" id="servicios" aria-labelledby="servicios-titulo">
          <div className="menu paper" style={{ clipPath: zigzag(30, 12) }} data-reveal>
            <h2 id="servicios-titulo">Nuestros servicios</h2>
            {MENU.map(({ group, items }) => (
              <div className="menu__group" key={group}>
                <h3>{group}</h3>
                {items.map(([name, value, text]) => (
                  <div className="menu__item" key={name}>
                    <div className="menu__row">
                      <span>{name}</span>
                      <span className="menu__leader" aria-hidden="true" />
                      <span className="menu__value">{value}</span>
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="plates">
            <figure className="plate" data-reveal style={v({ "--i": 1 })}>
              <img src="/photos/miami-puerto.jpg" alt="Vista aérea del puerto de contenedores de Miami" width={1800} height={1189} loading="lazy" />
              <figcaption>El puerto de contenedores de Miami.</figcaption>
            </figure>
            <figure className="plate" data-reveal style={v({ "--i": 2 })}>
              <img src="/photos/ezeiza.jpg" alt="Vista aérea del aeropuerto de Ezeiza" width={1600} height={1200} loading="lazy" />
              <figcaption>El aeropuerto de Ezeiza, desde el aire.</figcaption>
            </figure>
          </div>
        </section>

        <RouteGlobe />

        {/* Nosotros: una carta de los socios */}
        <section className="letter-wrap" id="nosotros" aria-labelledby="nosotros-titulo">
          <figure className="postcard paper" data-reveal>
            <img
              src="/photos/miami-panam-1935.jpg"
              alt="Postal del aeropuerto Pan American de Miami, con sus hangares junto a la bahía, en los años treinta"
              width={1800}
              height={1128}
              loading="lazy"
            />
            <figcaption>
              El aeropuerto Pan American de Miami en una postal de los años treinta, cuando los hidroaviones salían de esa bahía hacia
              Sudamérica.
            </figcaption>
          </figure>

          <div className="letter" data-reveal style={v({ "--i": 1 })}>
            <div className="letter__sheet paper">
              <img className="letter__seal" src="/images/logo-gml.jpg" alt="" width={44} height={44} loading="lazy" />
              <h2 id="nosotros-titulo">Treinta años de oficio</h2>
              <p>Empezamos a mover mercadería entre Estados Unidos y Argentina hace más de treinta años, mucho antes de que existiera GML.</p>
              <p>
                Con el tiempo aprendimos lo que no figura en ningún folleto: qué pide cada aeropuerto, cómo se maneja la carga en zona
                primaria y qué modalidad conviene según lo que usted trae.
              </p>
              <p>
                GML nació para poner esa experiencia al servicio de cada cliente. Un envío chico y una carga consolidada reciben{" "}
                <mark>la misma atención</mark>.
              </p>
              <p>Si tiene una compra en Estados Unidos, escríbanos antes de pagar el envío. Le decimos cómo traerla y cuánto cuesta.</p>
              <p className="letter__sign">Los socios de GML</p>
              <p className="letter__role">GML Servicios Aéreos, Palermo, Buenos Aires</p>
            </div>
            <div className="perforation" aria-hidden="true">
              {Array.from({ length: 48 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <div className="letter__stub paper">
              <span>Escríbanos directamente</span>
              <a className="text-link" href="mailto:info@gml.com.ar">
                info@gml.com.ar
              </a>
            </div>
          </div>
        </section>

        {/* Contacto: el cupón para recortar */}
        <section className="coupon-wrap" id="contacto" data-reveal>
          <Coupon />
        </section>
      </main>

      {/* Pie: el dorso de la postal */}
      <footer className="back">
        <div className="back__panel">
          <svg className="back__scallops" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
            <path d={scallopPath(12)} fill="#f7f4ec" />
          </svg>
          <div className="back__body paper">
            <div className="back__message">
              <h2>Hasta pronto</h2>
              <p>Gracias por leer hasta acá. Si tiene algo para traer de Estados Unidos, cuéntenos y lo resolvemos juntos.</p>
              <p>
                Buenos Aires, <BuenosAiresClock />
              </p>
            </div>
            <div className="back__address">
              <figure className="back__stamp">
                <img src="/photos/palermo-jacarandas.jpg" alt="Jacarandás en flor en una esquina de Palermo" width={1800} height={1200} loading="lazy" />
              </figure>
              <ul>
                <li><a className="text-link" href="mailto:info@gml.com.ar">info@gml.com.ar</a></li>
                <li><a className="text-link" href="tel:+541139468007">+54 11 3946‑8007</a></li>
                <li><a className="text-link" href={WHATSAPP_HREF}>WhatsApp</a></li>
                <li>
                  <a className="text-link" href="https://maps.google.com/?q=Honduras+5730,+Palermo,+CABA">
                    Honduras 5730, Palermo (CABA)
                  </a>
                </li>
              </ul>
            </div>
            <p className="back__imprint">
              © {new Date().getFullYear()} GML Servicios Aéreos. Lunes a viernes de 8 a 18 h, sábados de 9 a 14 h.
            </p>
          </div>
        </div>
        <p className="back__credits">
          Fotografías:{" "}
          {CREDITS.map(([title, author, licence, page, licenceUrl], i) => (
            <span key={title}>
              <a href={page}>“{title}”</a> de {author}, <a href={licenceUrl}>{licence}</a>, vía Wikimedia Commons
              {i < CREDITS.length - 1 ? "; " : ". "}
            </span>
          ))}
          Textura de la Tierra: NASA Blue Marble (dominio público).
        </p>
      </footer>

      <a className="wa-float" href={WHATSAPP_HREF} aria-label="Escribir por WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
        </svg>
      </a>

      <Reveal />
    </div>
  )
}
