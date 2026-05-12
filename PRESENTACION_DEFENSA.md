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

## 📌 DIAPOSITIVA 3 — Organización y Stack Tecnológico

**Visual en Canva:**
- Pon los logos de las tecnologías bien ordenados:
  - **Frontend:** React + Vite + Tailwind
  - **Backend:** Symfony 7 + PHP + MySQL
  - **DevOps:** Docker + GitHub Actions + Render
  - **IA/Automatización:** n8n + MailHog

**Qué tienes que decir:**
> *"He organizado el proyecto como se hace en las empresas de verdad. Nada de mezclar código. Por un lado tengo el Frontend hecho en React, que es rapidísimo porque no recarga la página. Por otro, el Backend en Symfony, que es el 'cerebro' y maneja la base de datos de forma segura. Y todo esto lo he encapsulado en Docker para no tener problemas de versiones, desplegándolo en la nube de Render automáticamente con cada 'push' que hago a GitHub."*

---

## 📌 DIAPOSITIVA 4 — Arquitectura del Sistema (Esquema)

**Visual en Canva:**
- Haz un esquema con cajas y flechas:
`[Usuario con React]` ↔️ `[API Symfony]` ↔️ `[Base de Datos MySQL]`
Abajo de Symfony saca una flecha hacia:
`[n8n Webhook]` ➡️ `[MailHog (Correos)]`

**Qué tienes que decir:**
> *"Fijaos en la arquitectura. El cliente entra con React y este solo habla con Symfony mediante archivos JSON. Symfony es el único que toca la base de datos MySQL. Lo guay de tenerlo desacoplado es que si mañana Gusmuss quiere una App móvil en iOS, me vale el mismo backend. Y como veis abajo, Symfony está conectado a n8n para avisarle en tiempo real cuando hay ventas y disparar automatizaciones."*

---

## 📌 DIAPOSITIVA 5 — 🎬 DEMO EN VIVO (El plato fuerte)

**Visual en Canva:**
- Fondo oscuro con letras grandes: **DEMOSTRACIÓN EN VIVO**.
- Sal de la presentación y vete al navegador.

**Flujo paso a paso para la demo (Síguelo al pie de la letra):**
1. **La web (frandaw.com):** Enseña el diseño, cambia de ES a EN para que vean cómo los productos se traducen al momento desde la base de datos.
2. **El Carrito:** Intenta comprar un vestido sin elegir talla (para demostrar validaciones). Añade algo al carrito.
3. **Seguridad JWT:** Dale a finalizar compra. Como no estás logueado, te pide acceso. Loguéate y verás cómo te devuelve al carrito gracias a que React guarda el token JWT en memoria.
4. **Comprar y Correo (Localhost):** Vete a tu localhost para enseñar la compra. Haz el pedido, y abre la pestaña de `localhost:8025` (MailHog). **¡Enseña cómo llega el correo de confirmación al instante!**
5. **Base de Datos y Stock en Directo:** Entra en el panel de administrador (`/admin`), vete a los Productos y bájale el stock a 0 a un anillo. Vuelve a la tienda pública, recarga y enséñales cómo ahora pone "Agotado" y el botón de comprar está bloqueado. *("Como veis, controlo la base de datos desde el backend y el frontend reacciona en tiempo real").*

---

## 📌 DIAPOSITIVA 6 — Automatización con n8n e IA

**Visual en Canva:**
- **Captura 1 (Izquierda):** Tu captura de pantalla de n8n (la que me acabas de pasar) con los dos nodos de Webhook y Email.
- **Captura 2 (Derecha):** Tu captura de pantalla de MailHog con el correo recibido.

**Qué tienes que decir:**
> *"Como habéis visto en la demo, cuando un usuario compra, recibe un correo. Esto no lo hace el backend directamente. He montado un nodo de n8n. Cuando Symfony guarda la compra en MySQL, lanza una petición HTTP (un webhook) a n8n con los datos del carrito en JSON. n8n lo atrapa, lo procesa y construye este correo HTML dinámico. En producción, aquí es donde conectaríamos una IA para personalizar el mensaje o enviar ofertas según lo que haya comprado la persona."*

---

## 📌 DIAPOSITIVA 7 — Retos Técnicos que he superado

**Visual en Canva:**
- 3 bloques de texto corto con iconos:
  1. 🔐 Sesiones Seguras (Firewalls y JWT)
  2. 🛒 Control de Inventario Híbrido
  3. 📦 Despliegue en Render

**Qué tienes que decir:**
> *"No ha sido un camino fácil. Me he pegado bastante con la seguridad: configurar los firewalls de Symfony para que la ruta de registro fuera pública pero el carrito exigiera un Token JWT válido fue un reto enorme. Además, programé un interceptor en el frontend para que, si metes 3 vestidos talla S y 2 talla M, React sume todo y verifique contra el stock real de la base de datos para que no compres de más. Por último, pelearme con los despliegues en contenedores efímeros de Render me hizo aprender muchísimo sobre DevOps."*

---

## 📌 DIAPOSITIVA 8 — Internacionalización (Bilingüe)

**Visual en Canva:**
- Pon dos capturas del mismo vestido (una con el texto en ES y otra en EN).

**Qué tienes que decir:**
> *"Estando en Puerto Banús, la web tenía que estar en inglés. Lo fácil habría sido traducir solo los menús de React, pero yo he ido más allá. He modificado la base de datos añadiendo columnas específicas ('nombreEn', 'descripcionEn'). Cuando pulsas el botón, el estado global de React cambia y le pide a la API que devuelva los campos en inglés. Es una internacionalización completa de los datos de negocio."*

---

## 📌 DIAPOSITIVA 9 — Cierre y Futuro

**Visual en Canva:**
- Logo de Gusmuss.
- GitHub: github.com/FranJJL05/gusmuss-diamond
- Enlace a la web.

**Qué tienes que decir:**
> *"Para terminar, el proyecto está en una fase madura y lista para subir a un entorno B2C real. Los próximos pasos lógicos serían conectar la pasarela de pagos de Stripe y subir las imágenes a un bucket de AWS. Este proyecto me ha servido para tocar absolutamente todos los palos del desarrollo web profesional: desde hacer un `git init` hasta diseñar la base de datos, montar la API y automatizar los procesos. Muchas gracias y estoy a vuestra disposición para cualquier duda del código."*
