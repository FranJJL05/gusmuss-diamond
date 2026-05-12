# 🎤 GUIÓN DE DIAPOSITIVAS — Gusmuss Diamond
## Presentación de Defensa · Canva · ~30 minutos

> **Consejos para la presentación:** 
> - Habla con naturalidad, como si le estuvieras explicando el proyecto a un compañero de trabajo. Demuestra que tú has picado el código y controlas lo que pasa por debajo.
> - En Canva, usa fondo oscuro (negro/crema), poco texto y las capturas que te indico. Lo importante es lo que tú cuentas de viva voz.

---

## 📌 DIAPOSITIVA 1 — Portada

**Visual en Canva:**
- Foto elegante de la tienda o un producto (fondo oscuro).
- Título grande: **Gusmuss Diamond**
- Subtítulo: *E-commerce de Lujo con Arquitectura Full-Stack y Automatización*
- Tu nombre y "2º DAW".

**Qué tienes que decir:**
> *"Buenos días al tribunal. Hoy os presento Gusmuss Diamond. No quería hacer la típica tienda online básica, así que me he propuesto construir una plataforma de lujo completa. Es una Single Page Application (SPA) real, dividida en frontend y backend, con autenticación segura, base de datos relacional y automatización con IA. Os voy a enseñar cómo he montado todo este ecosistema."*

---

## 📌 DIAPOSITIVA 2 — El Problema y la Solución

**Visual en Canva:**
- Foto real de la tienda (tienda3.jpeg).
- Dos columnas simples:
  - **Problema:** Negocio local físico, gestión a mano, sin ventas online.
  - **Solución:** Plataforma 24/7, stock en tiempo real, interfaz bilingüe.

**Qué tienes que decir:**
> *"Gusmuss es una tienda física real en Puerto Banús. El problema que tenían es que dependían 100% de la venta presencial y gestionaban el almacén un poco a ojo. Mi solución ha sido crearles un e-commerce que refleje la exclusividad de su marca, automatizando el control de stock y permitiendo a clientes internacionales comprar en inglés o en español de forma fluida."*

---

## 📌 DIAPOSITIVA 3 — Organización, Estructura y Git

**Visual en Canva:**
- Un esquema de carpetas muy sencillo:
  - 📁 `gusmuss-diamond/` (Raíz, Docker, GitHub Actions)
    - 📁 `frontend/` (React, Vite, Tailwind)
    - 📁 `src/`, `config/`, `migrations/` (Backend Symfony)
- Un diagrama pequeño de Git (ramas `main`, `dev`...).

**Qué tienes que decir:**
> *"He organizado el proyecto como se hace en las empresas de verdad, en un 'monorepo'. La carpeta `frontend` contiene toda la interfaz en React de forma aislada, y la raíz del proyecto levanta el backend en Symfony. A nivel de control de versiones con Git, he trabajado separando ramas por cada nueva característica o arreglo (ramas feature/fix) y haciendo 'merge' a la rama `main` solo cuando el código era estable y estaba listo para que Render lo desplegara a producción automáticamente."*

---

## 📌 DIAPOSITIVA 4 — Stack Tecnológico

**Visual en Canva:**
- Pon los logos de las tecnologías bien ordenados:
  - **Frontend:** React + Vite + Tailwind
  - **Backend:** Symfony 7 + PHP + MySQL
  - **DevOps:** Docker + GitHub Actions + Render
  - **IA/Automatización:** n8n + MailHog

**Qué tienes que decir:**
> *"Sobre el stack tecnológico: por un lado tengo React, que es rapidísimo porque no recarga la página. Por otro, Symfony, que es el 'cerebro' y maneja la base de datos de forma segura. Todo esto lo he encapsulado en Docker para no tener problemas de versiones, desplegándolo en la nube de Render automáticamente. La automatización la gestiona n8n conectado a mi servidor local."*

---

## 📌 DIAPOSITIVA 5 — Arquitectura del Sistema (Esquema)

**Visual en Canva:**
- Haz un esquema con cajas y flechas:
`[Usuario con React]` ↔️ `[API Symfony]` ↔️ `[Base de Datos MySQL]`
Abajo de Symfony saca una flecha hacia:
`[n8n Webhook]` ➡️ `[MailHog (Correos)]`

**Qué tienes que decir:**
> *"Fijaos en la arquitectura. El cliente entra con React y este solo habla con Symfony mediante archivos JSON. Symfony es el único que toca la base de datos MySQL. Lo guay de tenerlo desacoplado es que si mañana Gusmuss quiere una App móvil en iOS, me vale el mismo backend sin programar nada nuevo. Y como veis abajo, Symfony dispara notificaciones asíncronas hacia n8n cada vez que alguien hace una compra."*

---

## 📌 DIAPOSITIVA 6 — 🎬 DEMO EN VIVO (El plato fuerte)

**Visual en Canva:**
- Fondo oscuro con letras grandes: **DEMOSTRACIÓN EN VIVO**.
- Sal de la presentación y vete al navegador.

**Flujo paso a paso para la demo (Síguelo al pie de la letra):**
1. **La web en Producción (`frandaw.com`):** Enseña el diseño elegante. Cambia de ES a EN para que vean cómo los productos se traducen al momento desde la base de datos.
2. **El Carrito:** Intenta comprar un vestido sin elegir talla para demostrar las validaciones de React. Añade algo al carrito.
3. **Seguridad JWT:** Dale a finalizar compra. Como no estás logueado, te pide acceso. Loguéate (con `cliente@gusmuss.com` / `cliente1234`) y verás cómo te devuelve al carrito gracias a que React guarda el token JWT en memoria.
4. **Comprar y Correo (Localhost):** Vete a tu localhost para enseñar la compra. Haz el pedido, y abre la pestaña de `localhost:8025` (MailHog). **¡Enseña cómo llega el correo de confirmación al instante!**
5. **Base de Datos y Panel Admin:** 
   - Entra al backend: `http://localhost:8000/admin` (o en Render: `https://gusmuss-backend.onrender.com/admin`)
   - Inicia sesión con el súper administrador: `admin@gusmuss.com` / `admin1234`
   - Vete al apartado de Productos en el menú lateral de EasyAdmin. Bájale el stock a 0 a cualquier producto que tengas a la vista.
   - Vuelve a la tienda pública (`localhost:5173`), busca ese mismo producto y enséñales cómo ahora pone "Agotado" en rojo y el botón de comprar está bloqueado. 
   - *("Como veis, este panel me permite controlar toda la base de datos de manera visual, y el frontend reacciona en tiempo real").*

---

## 📌 DIAPOSITIVA 7 — Automatización con n8n e IA

**Visual en Canva:**
- **Captura 1 (Izquierda):** Tu captura de pantalla de n8n con los dos nodos de Webhook y Email.
- **Captura 2 (Derecha):** Tu captura de pantalla de MailHog con el correo de "Gusmuss Diamond" recibido por María.

**Qué tienes que decir:**
> *"Como habéis visto en la demo, cuando un usuario compra, recibe un correo al instante. Esto no lo programa el backend de forma síncrona. He montado un nodo de n8n. Cuando Symfony guarda la compra, lanza un webhook a n8n con los datos del carrito. n8n lo procesa y construye el correo HTML. En un futuro, aquí podríamos añadir una capa de IA para que analice la compra y proponga correos hiper-personalizados al cliente."*

---

## 📌 DIAPOSITIVA 8 — Retos Técnicos que he superado

**Visual en Canva:**
- 3 bloques de texto corto con iconos:
  1. 🔐 Sesiones Seguras (Firewalls y JWT)
  2. 🛒 Control de Inventario Híbrido
  3. 📦 Despliegue en Render

**Qué tienes que decir:**
> *"Me he peleado bastante con la seguridad: configurar los firewalls de Symfony para que la ruta de registro fuera pública pero el carrito exigiera un Token JWT válido fue un reto enorme. Además, programé un algoritmo en React para que sumara todas las tallas distintas de un modelo en el carrito y verificara que no excedes el stock real de la base de datos. Por último, pelearme con los despliegues en contenedores efímeros de Render me hizo aprender muchísimo sobre DevOps."*

---

## 📌 DIAPOSITIVA 9 — Internacionalización (Bilingüe)

**Visual en Canva:**
- Pon dos capturas del mismo vestido (una con el texto en ES y otra en EN).

**Qué tienes que decir:**
> *"Estando en Puerto Banús, la web tenía que estar en inglés sí o sí. Lo fácil habría sido traducir solo los botones de React, pero yo he internacionalizado la base de datos añadiendo columnas específicas de traducción ('nombreEn', 'descripcionEn'). El estado global de React envía el idioma actual a la API y el backend le sirve los datos correctos al vuelo. Es un sistema 100% dinámico."*

---

## 📌 DIAPOSITIVA 10 — Cierre y Futuro

**Visual en Canva:**
- Logo de Gusmuss.
- GitHub: github.com/FranJJL05/gusmuss-diamond
- Enlaces a la web.

**Qué tienes que decir:**
> *"El proyecto está en una fase madura y lista para subir a un entorno B2C real. Los próximos pasos lógicos serían conectar la pasarela de pagos de Stripe y subir las imágenes a un bucket de AWS. Este proyecto me ha servido para tocar absolutamente todos los palos del desarrollo web profesional: desde hacer un `git init` hasta diseñar la base de datos, montar la API y automatizar los procesos. Muchas gracias y estoy a vuestra disposición."*
