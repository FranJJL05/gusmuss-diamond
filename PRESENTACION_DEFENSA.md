# Guión de Presentación - Defensa de Proyecto (Gusmuss Diamond)

Este documento es una guía estructurada para tu defensa oral del proyecto, adaptada a una duración aproximada de **30 minutos**. Al tener media hora, el tribunal espera profundidad técnica, justificación de decisiones y una demostración exhaustiva.

---

## 1. Introducción y Análisis de Negocio (4 minutos)
* **Lo que tienes que decir:**
  > "Buenos días al tribunal. Mi nombre es [Tu Nombre] y os presento **Gusmuss Diamond**, un e-commerce completo orientado al sector del lujo, la alta moda y la joyería minimalista."
  > "El objetivo no era montar un simple CRUD, sino construir una arquitectura escalable y una experiencia de usuario fluida, propia de una Single Page Application (SPA). He analizado la competencia y diseñado un flujo de compra donde el rendimiento y la estética (Mobile-First) son los protagonistas."
* **Captura recomendada (Fondo de diapositiva):**
  - **Captura 1:** La página de Inicio (`Home.jsx`), con el logo centrado, imágenes limpias y el eslogan para atrapar la atención.

## 2. Arquitectura Tecnológica y Stack (5 minutos)
* **Lo que tienes que decir:**
  > "Para lograr esto, he dividido el proyecto en dos capas totalmente independientes que se comunican por una API REST, aisladas dentro de contenedores Docker:"
  > 
  > *   **Backend (Symfony 6 + PHP + MySQL):** Es el cerebro de la aplicación. Maneja el modelo relacional (usuarios, pedidos, productos), la validación de negocio y la inyección de dependencias. Para el panel de administración he utilizado EasyAdmin.
  > *   **Frontend (React + Vite + Tailwind CSS):** La vista del cliente. Permite una navegación sin recargas de página. Tailwind me ha permitido crear un diseño a medida 'Pixel Perfect'.
  > *   **DevOps & Despliegue en Kubernetes:** Toda la aplicación está orquestada en la nube mediante contenedores Docker. Para el despliegue final he implementado Infraestructura como Código (IaC) en Render, una plataforma Cloud que abstrae toda la complejidad de los nodos de **Kubernetes** por debajo, dotando a la tienda de alta disponibilidad, integración continua (CI/CD) con GitHub Actions y certificados HTTPS automatizados. Además, he implementado **n8n** para procesar tareas asíncronas (como notificaciones de pedidos).
  - **Captura 2:** Un diagrama de arquitectura detallado: [Navegador React] <--(JSON/JWT)--> [Nginx + PHP-FPM Symfony] <--> [MySQL] + [n8n Webhooks].

## 3. Demostración en Directo (Live Demo) (10 minutos)
*(Al tener 30 minutos, la demo debe ser extensa y debes ir narrando lo que haces).*

* **Lo que tienes que hacer y decir:**
  1. **Navegación:** Muestra lo rápido que carga al cambiar de `Home` a `Colección`. Explica cómo la API filtra en el backend la 'Ropa' de los 'Accesorios'.
  2. **Galería de Producto:** Entra en una prenda. Destaca el carrusel de 3 imágenes (extraído del array `imagenesExtra` en la BBDD).
  3. **Lógica de Tallas y Stock:** Intenta añadir un producto sin elegir talla (demuestra que el UI te obliga). Elige una talla y añádelo. Luego, trata de añadir más unidades de las que permite el inventario global de esa prenda para mostrar que tu React lee el stock máximo y te bloquea ("Límite de stock alcanzado").
  4. **Seguridad (Login JWT):** Ve al Carrito y dale a Checkout. Al no estar logueado, demuestra cómo te redirige al Login y, tras loguearte, te devuelve al carrito (persistencia de sesión con JWT Token en LocalStorage).
  5. **Finalización de Pedido y Facturas:** Termina la compra. Ve al "Perfil" y descarga el PDF generado al vuelo en el backend con DOMPDF. Muestra cómo en tu base de datos (o EasyAdmin) ha entrado el pedido automáticamente y cómo n8n lo ha detectado.

## 4. Retos Técnicos Superados (8 minutos)
*(Esta es la parte más importante para subir nota. Debes mostrar dominio técnico).*

* **Lo que tienes que decir:**
  > "Desarrollar una arquitectura desacoplada me trajo varios retos complejos que logré solucionar:"
  > 
  > *   **Reto 1: Control Híbrido de Inventario en React.** "La necesidad de combinar tallas distintas de un mismo producto en el carrito (ej. vestido L y M) me obligó a refactorizar las claves primarias de estado en el `CartContext` a una ID combinada (`productId + talla`). Sin embargo, para evitar que compraran más de lo que había en la tienda real, programé un interceptor que suma dinámicamente todo lo que lleves de un mismo modelo y lo contrasta con el stock global, desactivando los botones de compra automáticamente."
  > *   **Reto 2: Gestión de Sesiones Seguras con JWT.** "En una SPA clásica, los interceptores de Axios me causaban bucles infinitos de recarga si el token expiraba y devolvía un Error 401. Tuve que programar un sistema de limpieza de tokens silencioso que te saca de la sesión sin romper la navegación de la página."
  > *   **Reto 3: Optimización Docker en Windows.** "Las instalaciones de dependencias en PHP en caliente hacían inmanejable el arranque. Tuve que construir un `Dockerfile` optimizado que pre-construye las extensiones y monta un volumen sincronizado exclusivamente para la caché de Symfony, pasando de minutos a milisegundos de tiempo de recarga."
* **Capturas recomendadas:**
  - **Captura 3:** Fragmento de código del controlador `ProductController.php` (demostrando buenas prácticas, tipado y serialización).
  - **Captura 4:** Fragmento de código de tu `CartContext.jsx` donde calculas el `totalItemsOfProduct` para bloquear el botón `+`.

## 5. Cierre y Preguntas (3 minutos)
* **Lo que tienes que decir:**
  > "El proyecto está listo para evolucionar: los siguientes pasos lógicos serían conectar una pasarela de pago real como Stripe y migrar la subida de imágenes a un bucket de AWS S3."
  > "Este trabajo engloba todos los conocimientos adquiridos en el ciclo y demuestra la capacidad de diseñar, construir y desplegar software full-stack profesional."
  > "Gracias por vuestra atención. Quedo a vuestra entera disposición para responder a cualquier pregunta técnica sobre el código, la base de datos o el despliegue."
