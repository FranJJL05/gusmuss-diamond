# 🎤 GUIÓN DE DIAPOSITIVAS — Gusmuss Diamond
## Adaptado a los Criterios de Evaluación Oficiales (Rúbrica)

> **Consejos para la presentación:** 
> Los profesores van a ir con una hoja marcando "checks" según lo que escuchen. He reestructurado tu presentación para **usar exactamente sus mismas palabras clave**. Cuando hables de React, di "SPA y enrutamiento", cuando hables de GitHub di "CI/CD", etc. 

---

## 📌 DIAPOSITIVA 1 — Portada
**Visual en Canva:**
- Título: **Gusmuss Diamond**
- Subtítulo: *E-commerce de Lujo SPA con Integración de IA y CI/CD*
- Tu nombre y "2º DAW".

**Discurso:**
> *"Buenos días al tribunal. Hoy presento Gusmuss Diamond, una plataforma de comercio electrónico de lujo. Mi objetivo principal era crear una solución técnica completa: desde el plan de negocio y la maquetación interactiva, hasta una arquitectura Full-Stack segura, desplegada en la nube con integración de IA. A continuación, desglosaré cómo he cubierto cada área de nuestro ciclo."*

---

## 📌 DIAPOSITIVA 2 — Viabilidad y Modelo de Negocio (EIE)
**Visual en Canva:**
- Tres iconos: 💼 (Oportunidad), 💶 (Presupuesto), ⚖️ (Forma Jurídica).

**Discurso:**
> *"Empezando por Empresa (EIE). Detecté una **oportunidad de negocio** clara: una tienda física en Puerto Banús que necesitaba digitalizarse para vender internacionalmente. He realizado un **estudio de viabilidad técnica e identificando las necesidades de financiación**. A nivel legal, he definido la constitución como S.L., asumiendo las obligaciones fiscales y laborales correspondientes para su puesta en marcha."*

---

## 📌 DIAPOSITIVA 3 — Metodología y Fases de Desarrollo
**Visual en Canva:**
- Un esquema tipo línea de tiempo o un pequeño tablero Kanban (Por hacer, En curso, Hecho).
- Fases: 1. Análisis y Diseño -> 2. Backend API -> 3. Frontend React -> 4. Integración CI/CD y Pruebas.

**Discurso:**
> *"Para garantizar que el proyecto llegara a buen puerto sin errores, he seguido una metodología ágil estructurada en 4 fases. Primero, planifiqué el modelo de base de datos y diseñé los prototipos visuales. En la segunda fase construí el cerebro del servidor (la API en Symfony). En la tercera levanté la SPA en React. Y finalmente, dediqué la última fase a automatizar los despliegues e integrar la IA, documentando los hitos y posibles mejoras en mi diario de desarrollo."*

---

## 📌 DIAPOSITIVA 4 — Diseño e Interfaces (DIW)
**Visual en Canva:**
- Captura de tu prototipo (si tienes Figma) o del diseño de la web.
- Logos: Tailwind, CSS, BEM.

**Discurso:**
> *"Para el Diseño de Interfaces, partí de una **Guía de Estilos**. La web es **totalmente Responsive**, adaptándose a cualquier móvil. He utilizado una maquetación moderna combinando **Flexbox y Grid Layout**. Todo el estilo se ha manejado de forma homogénea con **Tailwind CSS**, añadiendo elementos interactivos, animaciones y transiciones para que el usuario sienta que está en una app de lujo y no en una web estática."*

---

## 📌 DIAPOSITIVA 5 — Frontend: El Cliente React
**Visual en Canva:**
- Logo de React y Vite.

**Discurso:**
> *"En el lado del Cliente, he construido una **SPA (Single Page Application)** usando React. Esto me permite hacer un uso intensivo de **enrutamiento** sin recargar la página. La arquitectura se basa en la **reutilización de componentes** (como las tarjetas de producto o selectores). El frontend se encarga del manejo de formularios y del **consumo de la API REST** que he desarrollado en el servidor, creando una interfaz altamente interactiva."*

---

## 📌 DIAPOSITIVA 6 — Backend: El Servidor Symfony
**Visual en Canva:**
- Logo Symfony, MySQL.
- Captura pequeñita del panel de administrador (EasyAdmin).

**Discurso:**
> *"El cerebro del proyecto es Symfony. Toda la **administración del sistema y gestión de entidades** se hace de forma segura desde un panel de administrador generado en servidor, que permite **subir archivos** (imágenes de productos) y controlar el stock. El acceso a la API desde React está protegido con **autenticación mediante Token JWT** para los datos sensibles del carrito."*

---

## 📌 DIAPOSITIVA 7 — Despliegue, CI/CD y DevOps
**Visual en Canva:**
- Esquema: GitHub -> Actions -> Render.
- Texto: `frandaw.com` (HTTPS).

**Discurso:**
> *"Para el despliegue, he utilizado **contenedores Docker**. He configurado una metodología **CI/CD con GitHub Actions**, lo que hace que cada vez que subo código estable a la rama principal, se despliegue automáticamente en la **nube de Render**. El proyecto no usa IPs crudas, está vinculado a mi **nombre de dominio propio** y protegido con **certificados de seguridad HTTPS**."*

---

## 📌 DIAPOSITIVA 8 — Automatización e Inteligencia Artificial
**Visual en Canva:**
- Captura de tu flujo de n8n con los nodos.

**Discurso:**
> *"Cumpliendo con los requisitos de integración, he montado un **flujo de automatización (workflow)** utilizando n8n. Cuando el servidor detecta un nuevo pedido, lanza un Webhook que n8n atrapa. Aquí es donde conectamos los **agentes de IA** y servicios de correo, permitiendo generar respuestas dinámicas y notificar al cliente al instante, todo totalmente automatizado."*

---

## 📌 DIAPOSITIVA 9 — Internacionalización (Inglés)
**Visual en Canva:**
- Captura de la web mostrando el selector de idioma (ES / ENG).
- Texto en inglés de la descripción de un diamante.

**Discurso:**
> *"La internacionalización no se limita a traducir botones. He habilitado un **selector de lenguaje** en la web. Cuando se cambia a inglés, el sistema extrae textos de cierta complejidad técnica desde la base de datos (descripciones de quilates y pureza), demostrando que la app está preparada para el mercado B2C global."*

---

## 📌 DIAPOSITIVA 10 — Un Vistazo al Código (Dificultad técnica)
**Visual en Canva:**
- **Captura de código:** Tu controlador `OrderController` donde haces la llamada HTTP (CURL) al Webhook, o tu contexto de React gestionando el JWT.

**Discurso:**
> *"A nivel técnico, quería destacar esta pieza de código. Aquí es donde el servidor **consume un servicio web** externo para la automatización. El alcance del proyecto ha sido ambicioso y la dificultad alta, especialmente para aislar el frontend del backend y lograr que el token JWT viaje de forma segura en las cabeceras HTTP en cada petición de React."*

---

## 📌 DIAPOSITIVA 11 — 🎬 DEMO EN VIVO
**Visual en Canva:**
- Letras grandes: **DEMOSTRACIÓN FUNCIONAL**.
- *(Aquí sales de la presentación).*

**Discurso / Pasos a hacer:**
1. **Paseo visual:** Enseña la web, animaciones, cambia el idioma a Inglés y vuelve a Español.
2. **Carrito y JWT:** Intenta comprar, loguéate, enseña cómo React te reconoce al instante.
3. **Admin (Backend):** Entra a `https://gusmuss-backend.onrender.com/admin`, pon el stock de un producto a 0.
4. **Reactividad:** Vuelve a la web, recarga y enseña que pone "Agotado". 
5. **n8n / IA:** Haz un pedido válido y enseña en tu MailHog/Bandeja cómo ha llegado el correo automático procesado por el Workflow.

---

## 📌 DIAPOSITIVA 12 — Conclusión
**Visual en Canva:**
- Enlace al repositorio y QR.

**Discurso:**
> *"Gusmuss Diamond cumple los requisitos establecidos aportando valor real a un negocio. Es un proyecto escalable, con código limpio y arquitecturas profesionales. Muchas gracias por vuestra atención, quedo a vuestra disposición para cualquier pregunta."*
