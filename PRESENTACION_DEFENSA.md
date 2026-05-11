# 🎤 GUIÓN DE DIAPOSITIVAS — Gusmuss Diamond
## Presentación de Defensa · Canva · ~30 minutos

> **Consejo Canva:** Usa fondo negro o crema oscuro, tipografía serif dorada para títulos, fotos grandes de la tienda. Mínimo texto en pantalla — el texto largo es para que TÚ lo leas aquí.

---

## 📌 DIAPOSITIVA 1 — Portada

**Elementos visuales:**
- Foto de portada: vestido de noche o joya sobre fondo negro
- Logo "Gusmuss" centrado en tipografía elegante
- Texto pequeño debajo: *"E-commerce de lujo · Puerto Banús"*
- Tu nombre y curso abajo a la derecha

**Qué dices al abrir:**
> *"Buenos días. Os presento Gusmuss Diamond: una tienda online de alta moda y joyería de lujo, construida desde cero con una arquitectura profesional full-stack. No es un proyecto de formularios — es una SPA completa con API REST, autenticación JWT, automatizaciones y despliegue real en la nube."*

---

## 📌 DIAPOSITIVA 2 — El Problema / La Oportunidad

**Elementos visuales:**
- Foto de la tienda física (tienda3.jpeg)
- 2 columnas: **"El problema"** vs **"La solución"**

| El problema | La solución |
|---|---|
| Gusmuss solo vendía físicamente en Puerto Banús | Plataforma digital 24/7 accessible desde cualquier lugar |
| Gestión manual de stock e inventario | Sistema automatizado con stock en tiempo real |
| Sin presencia digital más allá de Instagram | Tienda online con catálogo, carrito y pagos |

**Qué dices:**
> *"Gusmuss Diamond es una tienda real en Puerto Banús. El objetivo era digitalizarla: crear un canal de venta online que refleje la misma exclusividad del producto físico, con gestión automatizada de stock, pedidos y clientes."*

---

## 📌 DIAPOSITIVA 3 — Stack Tecnológico

**Elementos visuales:**
- Diagrama limpio con iconos/logos:
  - 🖥️ React + Vite (Frontend SPA)
  - ⚙️ Symfony 7 + PHP (Backend API REST)
  - 🗄️ MySQL (Base de datos relacional)
  - 🐳 Docker (Contenedores locales)
  - ☁️ Render (Despliegue cloud)
  - 🔗 n8n (Automatización workflows)
  - 🔐 JWT (Autenticación)

**Qué dices:**
> *"Elegí este stack por razones técnicas concretas: Symfony me da una arquitectura robusta con inyección de dependencias y ORM Doctrine. React con Vite me permite una SPA sin recarga de página, con contextos globales para el carrito y la sesión. Toda la comunicación entre capas se hace mediante JSON sobre HTTP con tokens JWT para la autenticación. En local todo corre sobre Docker, y en producción está desplegado en Render con CI/CD automático desde GitHub."*

---

## 📌 DIAPOSITIVA 4 — Arquitectura del Sistema

**Elementos visuales:**
- Diagrama de flujo horizontal (hazlo en Canva con flechas):
```
[Usuario] → [React SPA frandaw.com] ←→ [API REST Symfony Render] ←→ [MySQL]
                                              ↓
                                         [n8n Webhooks]
                                              ↓
                                         [Email notif.]
```

**Qué dices:**
> *"La arquitectura está completamente desacoplada. El frontend y el backend son servicios independientes que se comunican exclusivamente por JSON. Esto significa que si mañana quisiera una app móvil, reutilizaría el mismo backend sin tocar nada. Los webhooks de n8n escuchan los pedidos y disparan las notificaciones automáticas."*

---

## 📌 DIAPOSITIVA 5 — Modelo de Datos (Entidad-Relación)

**Elementos visuales:**
- Diagrama ER simplificado con las entidades principales:
  - `User` → `Order` → `OrderItem` → `Product` → `Category`

**Tabla rápida:**
| Entidad | Campos clave |
|---|---|
| User | email, nombre, roles, isVerified |
| Product | nombre, precio, stock, material, tallas |
| Order | total, estado, fechaPedido |
| OrderItem | cantidad, precioUnitario |
| Category | nombre, slug |

**Qué dices:**
> *"El modelo relacional refleja la lógica de negocio: un usuario puede tener múltiples pedidos; cada pedido contiene líneas de pedido que apuntan a un producto concreto. El stock se descuenta de forma atómica en la base de datos para evitar condiciones de carrera — si dos usuarios compran el último artículo al mismo tiempo, solo uno consigue confirmación."*

---

## 📌 DIAPOSITIVA 6 — 🎬 DEMO EN VIVO (anuncia que vas a la web)

**Elementos visuales:**
- Fondo negro con texto grande: **"DEMO EN VIVO"**
- URL pequeña: `frandaw.com`

**Flujo de demo (10 min):**
1. **Home** → muestra la portada elegante, cambio de idioma ES/EN
2. **Colección** → filtro por Ropa / Accesorios, búsqueda
3. **Producto** → galería 3 fotos, selector de talla, stock en tiempo real
4. **Carrito sin login** → redirige a login (seguridad)
5. **Login y Checkout** → finaliza compra, stock se resta
6. **Perfil** → descarga PDF de factura generado automáticamente
7. **EasyAdmin** → muestra el pedido en el panel de admin

---

## 📌 DIAPOSITIVA 7 — Retos Técnicos Superados

**Elementos visuales:**
- 3 bloques/cards con icono, título y 2 líneas de explicación

**Card 1 — 🔐 Seguridad JWT**
> Firewall de Symfony bloqueaba el registro. Solución: `public_api` firewall con rutas explícitas antes del firewall JWT.

**Card 2 — 🛒 Control de Stock Híbrido**
> El carrito suma todas las tallas del mismo modelo y lo contrasta con el stock global para impedir sobrecompras.

**Card 3 — ☁️ Filesystem Efímero en Render**
> Las claves JWT desaparecen en cada redespliegue. Solución: endpoint `/api/dev/setup` que regenera claves + schema + fixtures automáticamente.

**Qué dices:**
> *"Estos tres retos son los que más me enseñaron. El de JWT fue especialmente frustrante porque el error no era evidente — el sistema de seguridad de Symfony interceptaba las rutas de registro antes de que nadie pudiera registrarse. Tuve que entender la cadena de firewalls para solucionarlo."*

---

## 📌 DIAPOSITIVA 8 — Automatización con n8n (IA)

**Elementos visuales:**
- Captura del workflow de n8n (flecha: Webhook → Procesar → Email)
- Captura de MailHog con el email recibido

**Qué dices:**
> *"El requisito de IA y automatización lo resolví con n8n, una herramienta de workflow automation. Cuando un cliente completa una compra, mi backend Symfony dispara un webhook HTTP hacia n8n. El workflow procesa el evento y envía un email de confirmación con los detalles del pedido. Esto implementa el patrón event-driven sin acoplar el backend al sistema de email."*

---

## 📌 DIAPOSITIVA 9 — Internacionalización (ES/EN)

**Elementos visuales:**
- Dos capturas lado a lado: producto en español vs en inglés
- Flecha entre ellas con el botón de idioma

**Qué dices:**
> *"Dado que el negocio está en Puerto Banús — zona internacional — implementé un sistema de internacionalización completo. El contexto de idioma en React sirve las traducciones de la interfaz, y los nombres y descripciones de los productos en inglés se almacenan como campos separados en la base de datos y se devuelven por la API."*

---

## 📌 DIAPOSITIVA 10 — Despliegue y DevOps

**Elementos visuales:**
- Flujo: `Git push → GitHub Actions CI → Render Auto-Deploy`
- Dos URLs: frontend (`frandaw.com`) y backend (`gusmuss-backend.onrender.com`)

**Qué dices:**
> *"El proyecto tiene un pipeline de CI/CD real. Cada push a main lanza los tests automáticos con GitHub Actions y, si pasan, Render despliega automáticamente. El frontend se sirve como sitio estático y el backend como web service con PHP. El dominio frandaw.com apunta al frontend con HTTPS automático."*

---

## 📌 DIAPOSITIVA 11 — Plan de Negocio (resumen)

**Elementos visuales:**
- 3 columnas simples:

| Modelo de negocio | Target | Escalabilidad |
|---|---|---|
| B2C directo con margen de lujo | Clienta 30-55 años, poder adquisitivo alto, zona Marbella-Banús | Stripe para pagos reales · AWS S3 para imágenes · App móvil |

**Qué dices:**
> *"El modelo de negocio es B2C con margen premium. El cliente objetivo es la misma clienta que ya conoce la tienda física pero quiere comprar desde casa o desde el extranjero. Los próximos pasos técnicos serían integrar Stripe para pagos reales y migrar las imágenes a AWS S3 para escalabilidad."*

---

## 📌 DIAPOSITIVA 12 — Cierre

**Elementos visuales:**
- Foto elegante de la colección
- Texto grande: *"Gracias"*
- GitHub: `github.com/FranJJL05/gusmuss-diamond`
- Web: `frandaw.com`
- Frase pequeña: *"Gusmuss Diamond · E-commerce de lujo · DAW 2025-26"*

**Qué dices:**
> *"Este proyecto engloba diseño, backend, frontend, base de datos, seguridad, automatización y despliegue cloud — el ciclo completo de desarrollo de software profesional. Quedo a vuestra disposición para cualquier pregunta técnica sobre el código, la arquitectura o las decisiones de diseño. Gracias."*

---

## ⏱️ TIMING RECOMENDADO

| Diapositiva | Contenido | Tiempo |
|---|---|---|
| 1-2 | Presentación + problema | 3 min |
| 3-4 | Stack + arquitectura | 4 min |
| 5 | Modelo de datos | 2 min |
| 6 | Demo en vivo | 10 min |
| 7-8 | Retos + n8n | 5 min |
| 9-10 | i18n + DevOps | 3 min |
| 11-12 | Negocio + cierre | 3 min |
| **Total** | | **~30 min** |

---

## 💡 CONSEJOS PARA CANVA

1. **Paleta:** Negro (#0a0a0a) + Dorado (#C5A55A) + Blanco (#FAFAFA)
2. **Tipografía:** Cormorant Garamond (títulos) + Lato (cuerpo)
3. **Fotos:** Usa las de la propia tienda — transmiten lujo real
4. **Animaciones:** Fade in en cada elemento — evita transiciones llamativas
5. **Máx. 6 líneas de texto por diapositiva** — el resto lo dices de memoria con este guión
