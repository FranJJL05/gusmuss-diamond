# Justificación de Rúbrica - Defensa DAW

Este documento desgrana **todos los criterios de evaluación** de tu tribunal y explica exactamente cómo y dónde los cumple tu proyecto *Gusmuss Diamond*. Úsalo para preparar tu discurso, ya que aquí tienes la "respuesta oficial" para cada requisito que te exigen.

---

## 1. ASPECTOS GENERALES
- **Objetivo del sitio y Oportunidad de Negocio:** Una plataforma de e-commerce de lujo diseñada para digitalizar joyerías o boutiques de alta costura, ofreciendo una experiencia de compra premium ("Pixel Perfect").
- **Exposición y Presentación:** Utiliza el archivo `PRESENTACION_DEFENSA.md` para cuadrar el tiempo (30 min) y mantenerlo ameno, enseñando mucho código y funcionalidad.
- **Arquitectura:** Explica el modelo cliente/servidor separado. Frontend SPA (React) + API Backend (Symfony) + MySQL, todo sobre contenedores (Docker).
- **Justifica Tecnologías:** React permite una fluidez sin recargas (SPA). Symfony es robusto para transacciones financieras. Tailwind agiliza el diseño responsive. JWT asegura autenticación "stateless" (sin estado), ideal para APIs escalables.
- **Añade Valor:** Diseño Mobile-First extremo (barra de navegación inferior en móviles), generador de facturas PDF automático, y webhook con n8n.

## 2. DESARROLLO EN ENTORNO SERVIDOR (Backend - Symfony)
El tribunal exige una serie de hitos en el servidor. Así es como los cumples:
- **Administración en lenguaje de servidor:** Tienes configurado **EasyAdmin** en PHP. Entras al `/admin` y puedes crear categorías, productos y ver usuarios de forma 100% renderizada por Symfony.
- **Autenticación con Token (API):** Has implementado **LexikJWTAuthenticationBundle**. El login devuelve un JWT Token. El carrito y el perfil exigen mandar ese token en la cabecera `Authorization: Bearer...` para acceder.
- **Consumir un Servicio Web:** En el checkout (`OrderController.php`), tu backend actúa de cliente y hace un `POST` al webhook de n8n para enviar los datos del pedido al sistema de automatización.
- **Generación de informes PDF:** En la vista de pedidos, el usuario descarga la factura generada "al vuelo" utilizando **DOMPDF** (una librería de servidor).
- **Validación por correo:** Tienes el flujo de registro que envía un mail de verificación usando el componente `Mailer` de Symfony (probado localmente con MailHog).
- **Subida de Archivos:** Desde EasyAdmin, subes imágenes físicas que se guardan en el servidor (`public/uploads/products`).
- **Descarga de archivos:** La factura PDF devuelve headers HTTP específicos (`Content-Disposition: attachment`) para forzar la descarga en el navegador.

## 3. DISEÑO DE INTERFACES WEB (Frontend HTML/CSS)
- **Maquetación (Flexbox/Grid/BEM):** Aunque usas Tailwind, tu código está plagado de `flex`, `justify-between`, `grid` y `grid-cols-2`. Tu estructura de componentes React simula la metodología BEM al mantener estilos aislados por componente (ej. `<ImageGallery />`, `<ProductCard />`).
- **Interactividad y Animaciones:** Tienes transiciones suaves en todos los botones (`transition-colors`, `duration-300`), efectos al pasar el ratón (`hover:-translate-y-1`), carrusel interactivo en el detalle de producto, y atenuaciones cuando no hay tallas (`disabled:opacity-40`).
- **Responsive:** El diseño es un 10 en Mobile-First. En escritorio muestra un grid editorial asimétrico y en móviles una interfaz táctil de una columna con menú fijo inferior (BottomNav).

## 4. AGENTES IA PARA WEB Y AUTOMATIZACIÓN
- **Integración de IA (Contenido y Lógica):** Explica que la concepción inicial, generación de los assets visuales (renders fotorrealistas de los anillos y la ropa), así como la generación de fixtures y mockups de datos, se han asistido mediante herramientas de Inteligencia Artificial generativa.
- **Automatización mediante workflows (n8n):** ¡Punto clave! Cuando la compra termina en `OrderController.php`, los datos viajan al contenedor de **n8n**. Explica que en n8n tienes un workflow visual que atrapa ese webhook y permite derivar acciones (por ejemplo, mandar un mensaje a Slack/Telegram al administrador sobre la nueva venta, o guardar el registro en Google Sheets) de manera automatizada.

## 5. EMPLEABILIDAD Y EMPRESA (EIE)
*Nota: Esta parte es más teórica, pero debes prepararla.*
- **Negocio:** Plataforma Saas/e-commerce marca blanca para el sector del lujo.
- **Viabilidad y Financiación:** Debes indicar que los costes de servidores son bajos (usando plataformas cloud como Render o AWS) y que el proyecto podría acogerse a subvenciones tipo "Kit Digital" para pymes.

## 6. DESARROLLO EN ENTORNO CLIENTE (React)
- **Framework Web y SPA:** Usas React con Vite. La página no recarga nunca (Single Page Application).
- **Enrutamiento:** Has usado `react-router-dom` para navegar entre `/coleccion`, `/carrito`, `/producto/:slug`.
- **Reutilización de componentes:** Tienes carpetas claras. Usas un layout padre (`<Layout>`) que envuelve a todo, e inyectas páginas como hijos (`children`). Tienes `ProductCard`, `Navbar`, etc.
- **Formularios y parámetros:** Los formularios de Register y Checkout manejan el estado interno y envían peticiones JSON. El detalle del producto atrapa el parámetro dinámico de la URL (`const { slug } = useParams()`).

## 7. INGLÉS
- **Selector de lenguaje:** Has construido un Context API nativo (`LanguageContext.jsx`) que interconecta un diccionario de variables en un archivo `translations.js`.
- El botón flotante abajo a la derecha de la pantalla (ESP/ENG) cambia toda la interfaz en caliente al inglés comercial, afectando menús, avisos del carrito y descripciones generales.

## 8. DESPLIEGUE (DevOps)
- **Nube, Contenedores y Kubernetes:** Todo tu proyecto está dockerizado (`Dockerfile` y `docker-compose.yml`). Explicarás que utilizas la plataforma en la nube **Render**, que internamente orquesta contenedores bajo su propia red (basada en Kubernetes/Cloud).
- **SCV (Sistema Control de Versiones):** Todo el proyecto está versionado en **Git** (GitHub).
- **HTTPS y Dominio:** Al desplegar en Render, te asignan un nombre de dominio público y generan automáticamente los certificados seguros **SSL/TLS**.
- **CI/CD (Integración Continua / Despliegue Continuo):** Has creado flujos con **GitHub Actions**. Explica que cada vez que haces un "push" a la rama principal, el servidor ejecuta las pruebas para ver si compila y lanza automáticamente la orden a Render para que actualice la web sin tirar el servidor.

---

### 🔥 Consejo para la Presentación
Imprime este documento o llévalo en la tablet. Cuando el tribunal pregunte por la rúbrica (por ejemplo: *"¿Dónde aplicaste Flexbox y animaciones?"* o *"¿Cómo validaste el uso de Web Services?"*), miras este guión y les apuntas exactamente al archivo o momento de la demo correspondiente. ¡Lo tienes todo cubierto!
