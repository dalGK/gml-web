# Configuración de Email para GML Servicios Aéreos

## 📧 Configuración del Sistema de Correos

El formulario de contacto está configurado para enviar correos automáticamente a **Dalvin20099@gmail.com** con una plantilla profesional.

### 🚀 Pasos para Activar el Envío de Correos

#### Opción 1: Usar Gmail (Recomendado)

1. **Crear variables de entorno:**
   - Copia `.env.example` a `.env.local`
   - Completa las variables de entorno

2. **Configurar Gmail:**
   - Ve a tu [Cuenta de Google](https://myaccount.google.com/)
   - Activa la **Verificación en 2 pasos**
   - Ve a **Seguridad** → **Contraseñas de aplicaciones**
   - Genera una nueva contraseña de aplicación para "Mail"
   - Usa esta contraseña en `EMAIL_PASS`

3. **Variables de entorno necesarias:**
   \`\`\`env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=tu-contraseña-de-aplicacion
   \`\`\`

#### Opción 2: Usar otro proveedor SMTP

Modifica el archivo `app/api/contact/route.ts` y cambia la configuración del transporter:

\`\`\`javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.tu-proveedor.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})
\`\`\`

### ✨ Características del Sistema

- **Plantilla HTML profesional** con colores corporativos de GML
- **Validación de formulario** con mensajes de error en español
- **Notificaciones toast** para confirmar envío exitoso
- **Responsive design** que funciona en móviles y desktop
- **Campos opcionales** como teléfono
- **Formato de email atractivo** con información organizada

### 🎨 Plantilla de Email Incluye:

- Header con gradiente corporativo (azul y rojo)
- Información del contacto organizada en tarjetas
- Enlaces clickeables para email y teléfono
- Fecha y hora del envío
- Diseño responsive para todos los clientes de email

### 🔧 Personalización

Para cambiar el email de destino, edita la línea en `app/api/contact/route.ts`:

\`\`\`javascript
to: 'nuevo-email@ejemplo.com',
\`\`\`

### 📱 Funcionalidades del Formulario

- Validación en tiempo real
- Campos requeridos marcados con *
- Mensajes de error específicos
- Loading state durante el envío
- Confirmación visual del envío exitoso
