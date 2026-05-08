# DIARIO DE DESARROLLO — Gusmuss Diamond
## Proyecto Final de 2º DAW

---

## ENTRADA 1

**Fecha:** Marzo 2026  
**Qué hice:** Seguridad y roles de usuarios

Hoy he añadido lo del sistema de roles. La idea es que haya un usuario normal (ROLE_USER) y un administrador (ROLE_ADMIN) que pueda gestionar la tienda.

Lo primero que hice fue entrar en la base de datos directamente y cambiar el rol de mi usuario de prueba a ROLE_ADMIN para poder probar el panel. Luego creé el `AdminController` que es el controlador que protege las rutas del panel de administración.

Para la seguridad usé el atributo `#[IsGranted('ROLE_ADMIN')]` encima del controlador, que es la forma que tiene Symfony de decir "solo pueden entrar aquí si eres admin". Si un usuario normal intenta acceder le salta un error 403 (Acceso denegado).

Con esto ya tenía la parte de seguridad básica funcionando.

---

## ENTRADA 2

**Fecha:** Marzo 2026  
**Qué hice:** Panel de administración con EasyAdmin

Esta entrada fue bastante grande. Tuve que crear el panel de administración para gestionar todo el contenido de la tienda.

Primero creé las entidades de `Order` (pedido) y `OrderItem` (cada producto dentro del pedido) porque las necesitaba para el CRUD de pedidos. Un pedido tiene relación con el usuario que lo hizo, y cada línea del pedido está relacionada con un producto concreto.

Después generé la migración para crear esas tablas en MySQL. Un problema que tuve es que `order` es una palabra reservada de SQL, así que tuve que poner el nombre de la tabla entre comillas especiales en el código.

Luego creé los cuatro CRUDs de EasyAdmin:
- Categorías
- Productos (con el campo de precio en euros y la foto)
- Usuarios (con el campo de si está verificado)
- Pedidos (con los estados: pendiente, enviado, entregado...)

También configuré el menú del dashboard con secciones para que quedara organizado.

**Comandos que usé:**
```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
php bin/console cache:clear
```

---

## ENTRADA 3

**Fecha:** Marzo 2026  
**Qué hice:** Docker y corrección del panel de admin

Esta fue la entrada más complicada hasta ese momento. Docker me dio muchos problemas.

El problema principal era que al arrancar los contenedores tardaba entre 10 y 30 minutos porque estaba instalando extensiones de PHP cada vez que arrancaba. La solución fue crear un `Dockerfile` propio donde poner esas instalaciones, así solo se hacen una vez cuando construyes la imagen y no cada vez que arrancas.

Otro problema era que los archivos de Symfony (la carpeta `var/`) iban muy lentos porque Docker en Windows tiene problemas con el acceso a archivos. Lo solucioné creando un volumen de Docker específico para esa carpeta.

También tuve que arreglar el panel de administración porque había un bucle de redirecciones infinito cuando intentaba entrar. Era un problema de configuración del `DashboardController`.

**Comandos que usé:**
```bash
docker-compose build web
docker-compose up -d
docker exec gusmuss_web php bin/console cache:warmup
```

---

## ENTRADA 4

**Fecha:** Abril 2026  
**Qué hice:** Subida de imágenes de productos

Hoy añadí la posibilidad de subir fotos de los productos desde el panel de administración.

Lo primero fue renombrar el campo `imagen_url` a `imagenFilename` en la base de datos porque el nombre anterior era confuso (no guarda una URL sino el nombre del archivo).

Luego configuré el `ImageField` de EasyAdmin para que:
- Guarde los archivos en la carpeta `public/uploads/products/`
- Sirva las imágenes desde `/uploads/products/` en el navegador
- Genere nombres únicos para los archivos con la fecha, así no se pisan entre sí

También tuve un problema con las contraseñas: cuando intentaba actualizar la contraseña del admin por terminal, Git Bash interpretaba los caracteres especiales del hash bcrypt y lo corrompía. Lo solucioné haciendo el cambio con un script PHP ejecutado dentro del contenedor.

---

## ENTRADA 5

**Fecha:** Abril 2026  
**Qué hice:** API REST completa del backend

Esta entrada fue para terminar toda la parte del servidor que necesita el frontend de React para funcionar.

Primero mejoré el modelo de datos:
- Los productos ahora tienen `slug` (para las URLs), `material`, si son `destacados` o no, y la fecha de creación.
- El precio lo cambié de decimal a entero en céntimos (por ejemplo, 185000 = 1.850 €) para evitar problemas de redondeo.
- Los usuarios ahora tienen teléfono y dirección para el checkout.

Luego reescribí los datos de ejemplo (fixtures) porque los que tenía eran de ropa genérica y el proyecto es una joyería. Metí 12 joyas reales con categorías como Anillos, Collares, Pulseras, etc., con precios y materiales reales.

**Endpoints que creé:**

Para productos:
- `GET /api/productos` → lista el catálogo, se puede filtrar por categoría
- `GET /api/productos/destacados` → para la portada
- `GET /api/productos/buscar?q=...` → buscador
- `GET /api/productos/{slug}` → ficha de un producto

Para usuarios:
- `POST /api/auth/registro` → crear cuenta
- `POST /api/auth/login` → iniciar sesión
- `GET /api/auth/me` → saber quién está conectado

Para pedidos:
- `POST /api/pedidos` → confirmar la compra
- `GET /api/pedidos` → ver mis pedidos

También protegí con autenticación las rutas que lo necesitan (mis pedidos, mi perfil) y dejé públicas las de productos y registro.

---

## ENTRADA 6

**Fecha:** Abril 2026  
**Qué hice:** Frontend en React — Primera versión

Aquí empecé con la parte visual que ve el cliente.

Inicié un proyecto de React con Vite dentro de la carpeta `/frontend`. Configuré el proxy en Vite para que las llamadas a `/api` se redirijan automáticamente al backend de Symfony, así no hay problemas de CORS en desarrollo.

**Diseño:**
Hice el diseño con:
- Fondo blanco, cabecera negra con el logo y una barra inferior en tono caqui/dorado
- Tipografía: `Great Vibes` para el logo y `Playfair Display` para el texto
- Colores principales: negro, dorado (`#bda57b`) y blanco

**Páginas creadas:**
1. **Home** — con la galería de imágenes y los productos destacados
2. **Colección** — con la lista de ropa y el buscador
3. **Detalle de Producto** — con foto, descripción y botón de añadir al carrito
4. **Carrito** — con la lista de productos y el total
5. **Login y Registro** — con los formularios conectados al backend
6. **Checkout** — para confirmar la compra con la dirección
7. **Perfil** — con el historial de pedidos

También creé el sistema de Context API:
- `AuthContext` → recuerda si el usuario está conectado
- `CartContext` → guarda la cesta de la compra en el localStorage
- `LanguageContext` → para cambiar entre español e inglés

---

## ENTRADA 7

**Fecha:** Abril 2026  
**Qué hice:** Versión móvil, n8n y CI/CD

En esta fase hice el diseño responsive para móvil con Tailwind CSS, integré la automatización con n8n y configuré el pipeline de CI/CD.

**Diseño móvil:**
Rehice la interfaz con un enfoque Mobile-First usando Tailwind. Añadí una barra de navegación inferior fija (tipo app móvil) con iconos para las páginas principales.

**Automatización con n8n:**
Añadí n8n al Docker Compose. Lo que hace es: cuando alguien confirma un pedido en la tienda, Symfony envía automáticamente un mensaje con los datos del pedido al webhook de n8n. Desde ahí se podría hacer lo que quieras (enviar un email, un Whatsapp, actualizar un Excel...). En el código lo envolví en un try/catch con timeout de 2 segundos para que si n8n falla, la tienda siga funcionando.

**GitHub Actions:**
Configuré un pipeline de CI/CD que se lanza automáticamente con cada push:
- Comprueba que el esquema de la base de datos de Symfony es correcto
- Comprueba que el código de React compila sin errores

---

## ENTRADA 8

**Fecha:** Abril 2026  
**Qué hice:** JWT, facturas PDF y correo de verificación

Para terminar el backend, añadí tres cosas importantes:

**1. Autenticación con JWT:**  
Cambié el sistema de sesiones normales por tokens JWT. Ahora cuando el usuario hace login, el servidor le da un "token" que es como un identificador firmado. El navegador lo guarda en el localStorage y lo manda en cada petición privada. Generé las claves RSA con openssl y configuré el bundle LexikJWT.

**2. Facturas en PDF:**  
Instalé la librería DOMPDF. Desde el perfil del usuario hay un botón para descargar la factura de cada pedido. Symfony coge los datos del pedido, los mete en una plantilla Twig y los convierte a PDF que se descarga automáticamente.

**3. Verificación por correo:**  
Al registrarse, el backend manda un correo con un enlace de verificación. Para probarlo en local sin mandar emails reales, uso MailHog, que es un contenedor de Docker que captura todos los correos enviados y los muestra en `http://localhost:8025`.

**4. Preparación para despliegue:**  
Creé un archivo `render.yaml` que sirve para desplegar la app en Render (plataforma de hosting) de forma automática. También ya estaba el pipeline de GitHub Actions de la entrada anterior.

---

## ENTRADA 9

**Fecha:** Abril 2026  
**Qué hice:** Rediseño Desktop, corrección de bugs y cierre del proyecto

En la última fase mejoré el diseño de escritorio y corregí varios problemas que encontré al probarlo todo.

**Rediseño para escritorio:**  
La versión móvil estaba bien pero en un ordenador grande se veía sosa. Hice un diseño completamente distinto para pantallas grandes con estilo de editorial de moda:
- La portada tiene un grid asimétrico con una foto circular grande, tipografía gigante del logo y una galería animada a la derecha
- El detalle de cada producto ahora se ve en dos columnas (foto a la izquierda, info a la derecha) en vez de todo apilado
- La página de contacto tiene dos columnas también

**Traducción al inglés:**  
Los textos nuevos del diseño de escritorio los había escrito directamente en español. Los moví al diccionario de traducciones y también conecté los enlaces del menú al sistema de idiomas, así cuando pulsas en ENG/ESP el menú también cambia.

**Bugs corregidos:**

| Problema | Por qué pasaba | Cómo lo arreglé |
|---|---|---|
| Salían dos menús en Contacto | El `<Navbar />` estaba en el Layout Y también dentro de Contacto.jsx | Borré el que sobraba en Contacto.jsx |
| El buscador no funcionaba | El icono de la lupa bloqueaba los clics del input de texto | Añadí `pointer-events-none` al SVG |
| Accesorios no mostraba nada | La base de datos no tiene productos de esa categoría y el bucle fallaba | Añadí productos de ejemplo cuando la API devuelve vacío |
| Login decía siempre "Credenciales inválidas" | El frontend ponía ese mensaje fijo para cualquier error | Ahora muestra el mensaje real que devuelve el servidor |

Con esto el proyecto ya está completo y cubre todo lo que pedía la rúbrica.

---

## ENTRADA 10

**Fecha:** Abril 2026  
**Qué hice:** Lógica de inventario (Tallas, Límite Global), Múltiples Imágenes y Reorganización de Categorías

En esta última fase he aplicado un rediseño estructural fuerte sobre cómo funciona el catálogo visual y el núcleo del carrito de la compra:

**1. Categorías y Diseño Unificado:**
- Separemos estrictamente la tienda en dos secciones de menú: **Ropa** (`/coleccion`) y **Accesorios** (`/accesorios`). La API ahora filtra para que los collares o anillos nunca aparezcan en la sección de vestidos.
- Se eliminó el layout "fragmentado" o hardcodeado antiguo que había para sombreros y bolsos. Ahora todo usa el diseño premium, logrando que los anillos y joyas minimalistas recién añadidos se luzcan en el grid asimétrico.

**2. Sistema de Galería de Imágenes:**
- Añadí una columna JSON `imagenesExtra` a la entidad `Product`. 
- Modifiqué `ProductDetail.jsx` para que ya no use *placeholders*. Ahora lee el array de la API y renderiza un carrusel interactivo real con 3 vistas por producto (añadiendo duplicados temporalmente de las imágenes generadas por IA para simular los ángulos hasta la sesión fotográfica).

**3. Sistema de Tallas (UI / Base de Datos):**
- Incorporé la propiedad `tallasDisponibles` (JSON) en la base de datos para la Ropa.
- La página de detalle ahora pinta botones `XS, S, M, L, XL`. Utilicé un script en los *Fixtures* para que asigne tallas de manera aleatoria. Las tallas sin stock quedan grises y deshabilitadas.
- **Forzado UI:** No puedes añadir al carrito si no eliges talla, y la talla elegida se mostrará textualmente en el resumen de `Cart.jsx`.

**4. Blindaje del Carrito y Stock Global:**
- Modifiqué la clave primaria del carrito en React. Ahora un ítem no se guarda como `productId: 5`, sino como `cartId: "5-M"`. Así conviven la talla M y la L del mismo producto separadas.
- **Lógica de límite global:** Evité un bug grave. Aunque la M y la L sean filas separadas en el carrito, reducen el **mismo stock físico**. Programé un "filtro espía" en `CartContext.jsx` que suma dinámicamente todo lo que lleves de un modelo y lo resta del almacén. Si añades muchas M, el botón de añadir la L se desactivará automáticamente diciendo *"Límite de stock alcanzado"* porque superaste el stock global de esa prenda.

---

## ENTRADA 11

**Fecha:** Mayo 2026
**Qué hice:** Integración de imágenes reales de la tienda + correcciones visuales móvil

En esta fase pasé de usar imágenes genéricas de Internet a usar fotografías reales de la tienda física Gusmuss Diamond.

**Imágenes reales integradas:**
- `tienda1.jpeg` → foto circular en el Home de escritorio (portada editorial)
- `tienda2.jpeg` → banner "Colección Verano" en el Home de escritorio
- `tienda3.jpeg` → imagen de fondo de la página de Contacto

Las imágenes se colocan en `frontend/public/uploads/` para que estén disponibles tanto en local como en producción sin necesidad de subirlas a la base de datos.

**Correcciones de layout móvil:**

| Problema | Causa | Solución |
|---|---|---|
| Texto e iconos del carrito invisibles | `Layout.jsx` tenía `bg-gus-black` fijo en móvil | Se cambió a `bg-white` en móvil |
| Footer oculto bajo la barra de navegación inferior | No tenía padding-bottom | Añadido `pb-20` en móvil |
| Etiqueta "Destacados" cortada | `overflow-hidden` en el contenedor padre | Eliminado el overflow y añadido `z-40` |

**Mejoras de UX:**
- El botón "Comprar" ya no lleva al carrito automáticamente, sino que vuelve a la pantalla anterior (`navigate(-1)`) para que el usuario pueda seguir comprando
- Las tarjetas de producto ahora muestran el nombre del artículo encima del precio

**Commits realizados:**
- `feat(ui): integrar imágenes reales de la tienda física`
- `fix(ui): arreglar recorte de etiqueta en piezas destacadas`
- `feat(ux): volver a pantalla anterior al añadir al carrito + nombre en tarjeta`
- `fix(ui): correcciones de layout móvil en carrito, footer y home`

---

## ENTRADA 12

**Fecha:** Mayo 2026
**Qué hice:** Correcciones de seguridad JWT, bugs en producción y reestructuración del Home móvil

Esta entrada fue de resolución de bugs críticos en el entorno de producción (Render) y de mejoras de UX en la versión móvil.

**Bug crítico: "JWT Token not found" en el registro**

El problema: al intentar crear una cuenta, el servidor devolvía este error antes de llegar al controlador.

La causa: en Symfony los firewalls tienen prioridad absoluta sobre el `access_control`. El firewall `api` con `jwt: ~` interceptaba TODAS las rutas `/api/*` y exigía un token, incluso la ruta pública de registro.

La solución: añadir un firewall `public_api` antes del firewall `api` con `security: false` para las rutas de registro, verificación y setup:

```yaml
public_api:
    pattern: ^/api/(auth/registro|auth/verify|dev|productos|categorias)
    stateless: true
    security: false
```

**Bug: login automático fallaba después del registro**

La causa: `AuthContext.jsx` usaba una URL relativa `/api/auth/login` sin el prefijo `VITE_API_BASE_URL`. En producción apuntaba al servidor estático del frontend, no al backend de Render.

Solución: añadir `const baseUrl = import.meta.env.VITE_API_BASE_URL || ''` antes de la petición.

**Bug: claves JWT desaparecen al redesplegar en Render**

Render usa un sistema de archivos efímero: cada redespliegue vacía `config/jwt/`. El setup usaba `--skip-if-exists` y no regeneraba las claves aunque hubieran desaparecido.

Solución: cambiar el flag a `--overwrite` para regenerar las claves siempre al visitar el setup.

**Bug: descarga del PDF fallaba en producción**

Mismo patrón: URL relativa en `Profile.jsx`. Se corrigió con `VITE_API_BASE_URL`.

**Reestructuración completa del Home móvil:**

El diseño anterior tenía un degradado que creaba una zona de transparencia extraña en el centro de la pantalla.

- **Antes:** galería pequeña + logo flotando descolocado debajo
- **Ahora:** galería a pantalla completa (55vh) con overlay oscuro uniforme, logo centrado encima al estilo portada de revista, y zona de botones negra limpia debajo con acceso a Colección, Accesorios y Contacto

**Documentación actualizada:**
Se añadió al `GUIA_PRIVADA_DEFENSA.md` una sección completa de 6 partes con el paso a paso para demostrar n8n y MailHog durante la presentación, incluyendo el discurso exacto para el profesor de IA.

**Commits realizados:**
- `fix(security): añadir firewall público para /api/auth/registro sin exigir JWT`
- `fix(auth): usar VITE_API_BASE_URL en la llamada de login para producción`
- `fix(jwt): forzar regeneración de claves JWT en setup (filesystem efímero de Render)`
- `fix(pdf): usar VITE_API_BASE_URL para la descarga del PDF de factura`
- `fix(ui): reestructurar home móvil — hero pantalla completa con logo superpuesto`
- `docs: añadir guía paso a paso para demostrar n8n y MailHog en la defensa`
