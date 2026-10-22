// app/api/contact/route.tsx
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // evita cacheos de la ruta

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // 1) Validación básica del payload
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // 2) Validación de variables de entorno
    if (!process.env.RESEND_API_KEY) {
      console.error("Falta RESEND_API_KEY en .env.local");
      return NextResponse.json({ error: "Falta RESEND_API_KEY en .env.local" }, { status: 500 });
    }
    const TO = process.env.CONTACT_EMAIL;
    if (!TO) {
      console.error("Falta CONTACT_EMAIL en .env.local");
      return NextResponse.json({ error: "Falta CONTACT_EMAIL en .env.local" }, { status: 500 });
    }

    // 3) Plantilla HTML (tu diseño)
    // Helpers para sanear textos antes de inyectar en HTML (evita HTML raro)
const esc = (s: any) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const htmlTemplate = `
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nueva consulta – GML</title>
  <style>
    /* Estilos de soporte; la mayoría está inline para compatibilidad */
    @media (max-width:600px){
      .container{width:100% !important}
      .px{padding-left:16px !important;padding-right:16px !important}
      .stack td{display:block !important;width:100% !important}
    }
  </style>
</head>
<body style="margin:0;background:#f3f6f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6f9;">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" width="600" class="container" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(12,44,91,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:#0C2C5B;background:linear-gradient(135deg,#0C2C5B 0%,#173d77 55%,#C62828 120%);padding:28px 24px;color:#fff;text-align:center;">
              <div style="font-size:13px;letter-spacing:1.2px;text-transform:uppercase;opacity:.9;">GML Servicios Aéreos</div>
              <div style="font-size:24px;font-weight:800;line-height:1.2;margin-top:6px;">Nueva consulta recibida ✈️</div>
              <div style="font-size:12px;opacity:.9;margin-top:6px;">
                ${new Date().toLocaleDateString("es-AR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
              </div>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td class="px" style="padding:28px 32px 8px 32px;color:#0c2c5b;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:16px;">
                Has recibido un mensaje desde el formulario de contacto de <strong>GML</strong>.
              </div>
            </td>
          </tr>

          <!-- Datos -->
          <tr>
            <td class="px" style="padding:8px 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e7edf5;border-radius:10px;overflow:hidden;">
                <tr class="stack">
                  <td style="background:#f7f9fc;width:190px;padding:14px 16px;font:bold 12px Arial,Helvetica,sans-serif;color:#0C2C5B;text-transform:uppercase;letter-spacing:0.5px;">Nombre</td>
                  <td style="padding:14px 16px;font:14px Arial,Helvetica,sans-serif;color:#283041;">${esc(name)}</td>
                </tr>
                <tr class="stack">
                  <td style="background:#f7f9fc;width:190px;padding:14px 16px;font:bold 12px Arial,Helvetica,sans-serif;color:#0C2C5B;text-transform:uppercase;letter-spacing:0.5px;">Correo</td>
                  <td style="padding:14px 16px;font:14px Arial,Helvetica,sans-serif;color:#283041;">
                    <a href="mailto:${esc(email)}" style="color:#C62828;text-decoration:none;">${esc(email)}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr class="stack">
                  <td style="background:#f7f9fc;width:190px;padding:14px 16px;font:bold 12px Arial,Helvetica,sans-serif;color:#0C2C5B;text-transform:uppercase;letter-spacing:0.5px;">Teléfono</td>
                  <td style="padding:14px 16px;font:14px Arial,Helvetica,sans-serif;color:#283041;">
                    <a href="tel:${esc(phone)}" style="color:#283041;text-decoration:none;">${esc(phone)}</a>
                  </td>
                </tr>` : ``}
                <tr>
                  <td colspan="2" style="padding:0;border-top:1px solid #e7edf5;"></td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:0 16px 16px 16px;">
                    <div style="margin-top:16px;background:#ffffff;border:1px solid #e7edf5;border-radius:10px;">
                      <div style="background:#fef3f3;border-bottom:1px solid #fde2e2;padding:10px 14px;font:bold 12px Arial,Helvetica,sans-serif;color:#C62828;text-transform:uppercase;letter-spacing:.5px;">Mensaje</div>
                      <div style="padding:16px 14px;font:14px/1.6 Arial,Helvetica,sans-serif;color:#283041;white-space:pre-wrap;">${esc(message)}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Botones rápidos -->
          <tr>
            <td align="center" style="padding:0 32px 24px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px;background:#0C2C5B;">
                    <a href="mailto:${esc(email)}" style="display:inline-block;padding:12px 18px;font:14px Arial,Helvetica,sans-serif;color:#fff;text-decoration:none;">Responder ahora</a>
                  </td>
                  ${phone ? `
                  <td style="width:12px;"></td>
                  <td style="border-radius:8px;background:#C62828;">
                    <a href="tel:${esc(phone)}" style="display:inline-block;padding:12px 18px;font:14px Arial,Helvetica,sans-serif;color:#fff;text-decoration:none;">Llamar</a>
                  </td>` : ``}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer con datos GML -->
          <tr>
            <td style="background:#0C2C5B;color:#ffffff;padding:20px 24px;font:12px/1.6 Arial,Helvetica,sans-serif;text-align:center;">
              <div style="font-weight:bold;letter-spacing:.6px;text-transform:uppercase;">GML Servicios Aéreos</div>
              <div style="opacity:.95;margin-top:6px;">
                Honduras 5730, CABA — Buenos Aires, Argentina
              </div>
              <div style="opacity:.95;">Tel. +54 (11) 3946-8007 ·
                <a href="mailto:info@gml.com.ar" style="color:#fff;text-decoration:underline;">info@gml.com.ar</a>
              </div>
              <div style="opacity:.8;margin-top:6px;">Lun–Vie 08:00–18:00 · Sáb 09:00–14:00</div>
            </td>
          </tr>

        </table>
        <div style="font:11px Arial,Helvetica,sans-serif;color:#6b778c;margin-top:12px;text-align:center;">
          Este email se generó automáticamente desde el formulario de contacto de GML.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // 4) Envío con Resend
    const sendResult = await resend.emails.send({
      from: "GML Form <onboarding@resend.dev>", // remitente de pruebas (no necesitas dominio)
      to: TO,                                   // tu Gmail (CONTACT_EMAIL)
      subject: `🛩️ Nueva Consulta de ${name} - GML Servicios Aéreos`,
      html: htmlTemplate,
      replyTo: email,                           // ← corrección aquí (antes: reply_to)
    });

    if ((sendResult as any)?.error) {
      throw new Error((sendResult as any).error?.message || "Error enviando con Resend");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json({ ok: false, error: "Error interno del servidor" }, { status: 500 });
  }
}
