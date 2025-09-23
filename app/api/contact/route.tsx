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
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
            .container { background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0C2C5B 0%, #C62828 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 30px; }
            .field { margin-bottom: 25px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #C62828; }
            .field-label { font-weight: bold; color: #0C2C5B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
            .field-value { font-size: 16px; color: #333; word-wrap: break-word; }
            .message-field { background-color: #fff; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin-top: 10px; }
            .footer { background-color: #0C2C5B; color: white; padding: 25px 30px; text-align: center; }
            .priority-badge { display: inline-block; background-color: #C62828; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
            .divider { height: 2px; background: linear-gradient(90deg, #0C2C5B 0%, #C62828 100%); margin: 30px 0; border: none; }
            a { color: #C62828; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛩️ GML Servicios Aéreos</h1>
                <p>Nueva Consulta Recibida</p>
            </div>
            <div class="content">
                <div class="priority-badge">Nueva Consulta</div>

                <div class="field">
                    <div class="field-label">👤 Nombre Completo</div>
                    <div class="field-value">${name}</div>
                </div>

                <div class="field">
                    <div class="field-label">📧 Correo Electrónico</div>
                    <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>

                ${phone ? `
                <div class="field">
                    <div class="field-label">📱 Teléfono</div>
                    <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                </div>` : ""}

                <hr class="divider" />

                <div class="field">
                    <div class="field-label">💬 Mensaje</div>
                    <div class="message-field">
                        <div class="field-value">${String(message).replace(/\n/g, "<br>")}</div>
                    </div>
                </div>

                <hr class="divider" />

                <p style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0C2C5B;">
                    <strong>💡 Recordatorio:</strong> Responde a esta consulta lo antes posible para brindar un excelente servicio al cliente.
                </p>
            </div>
            <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de GML Servicios Aéreos</p>
                <p style="font-size: 12px; margin-top: 10px;">
                    Fecha: ${new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
            </div>
        </div>
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
