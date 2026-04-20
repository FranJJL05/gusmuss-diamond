# DIARIO DE DESARROLLO — Gusmuss Diamond E-Commerce
## Proyecto Final de Grado Superior (2º DAW)
---

## ENTRADA 1

**Fase:** 4.3. Autorización y Control de Acceso basado en Roles (RBAC).
**Rama:** `feature/usuarios-seguridad`

**Acciones realizadas:**

1. Modificación en la base de datos (MySQL) para escalar privilegios de un usuario a `ROLE_ADMIN`.
2. Creación del controlador `AdminController` para gestionar el panel de administración del e-commerce.
3. Implementación de seguridad en rutas mediante el atributo `#[IsGranted('ROLE_ADMIN')]` a nivel de controlador.

**Justificación Técnica:**
Con esto se finaliza el cumplimiento del requisito de "Administración del sistema (Backend)". Se ha implementado un sistema de Autorización que verifica los roles del usuario en sesión antes de renderizar vistas restringidas. Cualquier intento de acceso no autorizado por parte de un `ROLE_USER` es interceptado por el firewall de Symfony lanzando una excepción `AccessDeniedException` (HTTP 403), garantizando la seguridad de los datos de gestión de la joyería.

---

## ENTRADA 2

**Fase:** 4.4. Panel de Administración con EasyAdmin — Entidades y CRUD completo.
**Rama:** `feature/easyadmin-crud`

**Acciones realizadas:**

1. **Creación de las entidades `Order` y `OrderItem`** directamente en PHP siguiendo las convenciones de Doctrine ORM. `Order` representa la cabecera de un pedido (fecha, estado, total) con relación `ManyToOne` al `User` que lo realizó. `OrderItem` representa cada línea del pedido con relación `ManyToOne` tanto a `Order` como a `Product`, almacenando el precio unitario en el momento de la compra.

2. **Creación de los repositorios** `OrderRepository` y `OrderItemRepository`, que extienden de `ServiceEntityRepository` de Doctrine, siguiendo el patrón Repository estándar del framework.

3. **Actualización de la entidad `User`** para añadir la relación inversa `OneToMany` con `Order` (colección de pedidos del usuario), inicialización en el constructor con `ArrayCollection` y método `__toString()` para su correcta representación en los formularios de EasyAdmin.

4. **Añadido `__toString()`** a las entidades `Category` y `Product`. Este método es obligatorio en EasyAdmin cuando una entidad aparece como campo de relación (`AssociationField`) en un formulario, ya que el bundle necesita representar el objeto como cadena de texto en los desplegables.

5. **Generación y ejecución de la migración** con `make:migration` y `doctrine:migrations:migrate`. Esto creó las tablas `order` y `order_item` en MySQL. La tabla `order` requiere comillas escapadas en la anotación `#[ORM\Table(name: '`order`')]` porque `ORDER` es una palabra reservada de SQL.

6. **Creación de los cuatro `CrudControllers` de EasyAdmin:**
   - `CategoryCrudController`: gestión de categorías con `TextField`.
   - `ProductCrudController`: gestión de productos con `MoneyField` (precio en €), `NumberField` (stock), `TextareaField` (descripción) y `AssociationField` (categoría).
   - `UserCrudController`: gestión de usuarios con `BooleanField` (verificación) y `ArrayField` (roles).
   - `OrderCrudController`: gestión de pedidos con `ChoiceField` (estados: pendiente, procesando, enviado, entregado, cancelado), `MoneyField` (total) y `AssociationField` (cliente).

7. **Configuración del `DashboardController`** de EasyAdmin con título personalizado "Gusmuss Diamond", menú organizado en secciones (Catálogo, Pedidos, Usuarios) y acceso directo a la tienda pública.

**Justificación Técnica:**
Esta sesión completa el requisito de la rúbrica *"La administración del sistema (gestión de entidades, configuración, etc) debe hacerse completamente con lenguaje de servidor"*. EasyAdmin es el bundle estándar del ecosistema Symfony para paneles de administración. El modelo de datos implementado (`User → Order → OrderItem ← Product ← Category`) es la estructura relacional estándar de cualquier e-commerce.

**Tecnologías/Comandos clave usados:**
```bash
php bin/console doctrine:schema:validate
php bin/console make:migration
php bin/console doctrine:migrations:migrate
php bin/console cache:clear
```

**Cumplimiento de la Rúbrica:**
- ✅ Administración del sistema con lenguaje de servidor (EasyAdmin + Symfony)
- ✅ Modelo Entidad-Relación completo (User, Category, Product, Order, OrderItem)
- ✅ Alcance del proyecto: e-commerce con carrito y pedidos modelado en BD

---

## ENTRADA 3

**Fase:** 4.5. Configuración del Entorno Docker y Corrección del Panel de Administración.
**Rama:** `feature/easyadmin-crud`

**Acciones realizadas:**

1. **Creación de un `Dockerfile` propio** para el servicio `web`. La imagen base `php:8.2-apache` no incluye `pdo_mysql` por defecto. La solución inicial (ejecutar `docker-php-ext-install` en el `command:` del `docker-compose.yml`) compilaba las extensiones PHP en cada arranque del contenedor, tardando entre 10 y 30 minutos y bloqueando completamente el servidor. La solución correcta es declarar la instalación en el `Dockerfile`, de modo que la compilación se produzca **una sola vez** durante el `docker-compose build` y quede grabada en la imagen resultante. Los reinicios posteriores del contenedor son instantáneos.

2. **Optimización de I/O con Docker named volume para `var/`.** En entornos Windows con Docker Desktop y WSL2, el acceso a ficheros a través de bind mounts provoca tiempos de carga altísimos. La solución fue declarar un volumen Docker nativo (`symfony_var`) para la carpeta `var/`, eliminando el cuello de botella de la capa de traducción WSL2↔Windows.

3. **Activación del `access_control` en `security.yaml`.** Se descomentaron las reglas de control de acceso para proteger la ruta `/admin` con `ROLE_ADMIN`. Con `access_control` activo, el firewall intercepta la petición **antes** del controlador y genera un único redirect limpio a `/login`.

4. **Simplificación del `DashboardController::index()`** sustituyendo un redirect personalizado por `parent::index()`. El redirect provocaba un bucle de redirecciones para usuarios no autenticados.

5. **Regeneración de caché** con `php bin/console cache:warmup` tras los cambios de configuración.

**Tecnologías/Comandos clave usados:**
```bash
docker-compose build web
docker-compose up -d
docker exec gusmuss_web php bin/console cache:warmup
docker logs gusmuss_web --tail 30
```

**Cumplimiento de la Rúbrica:**
- ✅ Uso de contenedores Docker con configuración personalizada (Dockerfile propio)
- ✅ Configuración correcta del servidor web Apache (DocumentRoot, mod_rewrite, AllowOverride All)
- ✅ Seguridad de rutas mediante `access_control` en el firewall de Symfony (ROLE_ADMIN)

---

## ENTRADA 4

**Fase:** 4.6. Subida de Archivos al Servidor e Integración con EasyAdmin 5.
**Rama:** `feature/file-upload`

**Acciones realizadas:**

1. **Renombrado del campo `imagen_url` a `imagenFilename`** en la entidad `Product`. El nombre original era semánticamente incorrecto: el campo no almacena una URL externa sino el nombre del fichero subido al servidor. Se actualizaron getter, setter y la anotación Doctrine, y se generó una nueva migración que ejecuta un `ALTER TABLE product CHANGE imagen_url imagen_filename` en MySQL.

2. **Integración de `ImageField` en `ProductCrudController`**. EasyAdmin incluye este tipo de campo especializado para la gestión de ficheros de imagen. Se configuró con:
   - `setBasePath('/uploads/products')`: ruta pública desde la que el navegador sirve las imágenes.
   - `setUploadDir('public/uploads/products')`: ruta física del servidor donde se almacenan.
   - `setUploadedFileNamePattern('[slug]-[timestamp].[extension]')`: patrón de nombre único para evitar colisiones entre ficheros.

3. **Creación del directorio `public/uploads/products/`** con un fichero `.gitkeep` para que Git rastree la carpeta. Las imágenes subidas se añadieron al `.gitignore` (no se versionan los ficheros de usuario).

4. **Resolución de incompatibilidad con EasyAdmin 5**. El proyecto tenía instalado EasyAdmin 5 (versión major nueva), cuya API rompe la compatibilidad con EasyAdmin 4. Los cambios necesarios fueron:
   - `MenuItem::linkToCrud()` → `MenuItem::linkTo(CrudController::class)`: en EasyAdmin 5 el método recibe directamente el CrudController, no la entidad.
   - `parent::index()` renderiza la página de bienvenida sin layout: se sustituyó por un redirect a `ProductCrudController` usando `AdminUrlGeneratorInterface` inyectado en el constructor.
   - Ejecución de `php bin/console assets:install --symlink` para instalar los assets del bundle (CSS/JS de EasyAdmin) en `public/bundles/`.

5. **Resolución del conflicto de credenciales de administrador**. Se detectó que Git Bash interpreta los `$` del hash bcrypt como variables de shell cuando están dentro de comillas dobles, corrompiendo el valor insertado en MySQL. La solución fue generar el hash y actualizar la BD con un script PHP ejecutado directamente dentro del contenedor, evitando cualquier interpretación del shell del host.

**Justificación Técnica:**
La subida de ficheros es un requisito explícito de la rúbrica. `ImageField` implementa el patrón estándar de gestión de ficheros en aplicaciones web: el servidor recibe el fichero mediante `multipart/form-data`, lo valida, lo mueve a una carpeta pública con un nombre único y almacena solo el nombre en la base de datos. La URL pública se construye concatenando el `basePath` con el nombre almacenado. Este enfoque desacopla el servidor de almacenamiento (actualmente local, pero podría migrarse a S3/Cloudflare R2 cambiando solo la configuración).

**Tecnologías/Comandos clave usados:**
```bash
# Migración para renombrar el campo en MySQL
docker exec gusmuss_web php bin/console make:migration
docker exec gusmuss_web php bin/console doctrine:migrations:migrate --no-interaction

# Marcar una migración previa como ejecutada cuando las tablas ya existen
docker exec gusmuss_web php bin/console doctrine:migrations:version "DoctrineMigrations\Version20260407171324" --add --no-interaction

# Instalar los assets de los bundles (CSS/JS de EasyAdmin en public/bundles/)
docker exec gusmuss_web php bin/console assets:install --symlink

# Reset de contraseña sin problemas de interpolación de shell
docker exec gusmuss_web php -r "
\$pdo = new PDO('mysql:host=db;dbname=gusmuss_db', 'gusmuss_user', 'secretpassword');
\$hash = password_hash('admin1234', PASSWORD_BCRYPT, ['cost' => 13]);
\$stmt = \$pdo->prepare('UPDATE user SET password = ? WHERE email = ?');
\$stmt->execute([\$hash, 'prueba@gusmuss.com']);
echo 'OK' . PHP_EOL;
"
```

**Cumplimiento de la Rúbrica:**
- ✅ Subida de archivos al servidor (ImageField con directorio configurable y nombre único)
- ✅ Panel de administración completamente funcional con EasyAdmin 5
- ✅ Gestión completa de Productos, Categorías, Pedidos y Usuarios desde el admin

---

## ENTRADA 5

**Fase:** 4.7. Mejora del Modelo de Datos y API REST completa del Backend.
**Rama:** `feature/db-mejoras`

**Acciones realizadas:**

### 5.1 Mejora del Esquema de la Base de Datos

Se identificaron carencias en el modelo de datos inicial y se ampliaron tres entidades:

**`Product`** — Nuevos campos: `slug` (URL SEO), `material` (Oro 18k, Platino…), `destacado` (boolean para portada), `createdAt`. El tipo de `precio` pasó de `DOUBLE` a `INT` (céntimos): 185000 = 1.850,00 €.

**`Category`** — Nuevos campos: `slug` (para rutas `/coleccion/anillos`), `descripcion` (texto de la página de categoría).

**`User`** — Nuevos campos: `telefono` y `direccion` (dirección de envío predeterminada para el checkout).

**Gestión de migración en dev:** `doctrine:schema:drop --force` + `doctrine:schema:create` + `doctrine:migrations:version --add --all`, al ser entorno de desarrollo donde los datos se recargan con fixtures.

### 5.2 Reescritura de los DataFixtures con joyas reales

Los fixtures originales tenían productos de ropa (incoherente con "Gusmuss Diamond"). Se reescribieron completamente con **12 joyas de alta joyería** en 5 categorías (Anillos, Collares, Pulseras, Pendientes, Alta Joyería), con precios entre 950 € y 12.500 €, materiales reales (Oro 18k, Platino 950) y 7 productos marcados como destacados.

### 5.3 API REST de Productos y Categorías

**`GET /api/productos`** — listado con JOIN eager a Category (evita N+1). Filtra por `?categoria=anillos`.
**`GET /api/productos/destacados`** — para la portada de React.
**`GET /api/productos/buscar?q=...`** — búsqueda por nombre, descripción o material.
**`GET /api/productos/{slug}`** — ficha completa con descripción.
**`GET /api/categorias`** — todas las categorías con recuento de productos.
**`GET /api/categorias/{slug}`** — categoría + sus productos.

Todos los endpoints llevan cabeceras CORS (`Access-Control-Allow-Origin: *`) para que React pueda consumirlos desde cualquier puerto.

### 5.4 API REST de Autenticación

**`POST /api/auth/registro`** — crea cuenta con validaciones (email único, formato, contraseña ≥ 6 caracteres).
**`POST /api/auth/login`** — gestionado por `json_login` nativo de Symfony. Acepta `{"email":"...","password":"..."}`, crea sesión PHP, retorna 200 o 401.
**`GET /api/auth/me`** — datos del usuario autenticado (requiere sesión).
**`PUT /api/auth/perfil`** — actualiza nombre, apellidos, teléfono, dirección.

### 5.5 API REST de Pedidos (Checkout)

**Decisión arquitectónica:** el carrito vive en el **cliente React** (localStorage + Context API), no en el servidor. Al hacer checkout, React envía los items en el body del POST.

**`POST /api/pedidos`** — recibe `{"items":[{"productId":1,"cantidad":2},...], "direccionEnvio":"..."}`. Valida stock de cada producto, crea `Order` + `OrderItem`, descuenta stock y devuelve el resumen. Requiere autenticación.
**`GET /api/pedidos`** — historial de pedidos del usuario autenticado.
**`GET /api/pedidos/{id}`** — detalle con líneas del pedido.

### 5.6 Control de acceso de la API

- Protegidos con `IS_AUTHENTICATED_FULLY`: `/api/pedidos`, `/api/auth/me`, `/api/auth/perfil`.
- Públicos (`PUBLIC_ACCESS`): productos, categorías, carrito, registro, login.

**Tecnologías/Comandos clave usados:**
```bash
docker exec gusmuss_web php bin/console doctrine:schema:drop --force
docker exec gusmuss_web php bin/console doctrine:schema:create
docker exec gusmuss_web php bin/console doctrine:migrations:version --add --all --no-interaction
docker exec gusmuss_web php bin/console doctrine:fixtures:load --no-interaction
```

**Cumplimiento de la Rúbrica:**
- ✅ API REST con múltiples recursos (productos, categorías, pedidos, usuarios)
- ✅ Validación de datos en el servidor (stock, email único, campos requeridos)
- ✅ Proceso de compra completo: carrito (React) → pedido (Symfony) → descuento de stock
- ✅ Autenticación JSON para SPA (json_login nativo de Symfony)
- ✅ Endpoints protegidos con control de acceso por roles

---

## ENTRADA 6

**Fase:** 5. Componentes e Interfaz del Cliente con React (Frontend)
**Rama:** `feature/react-frontend`

**Acciones realizadas:**

### 5.1 Configuración de Vite y React

Se inicializó un nuevo proyecto Vite con React en la carpeta `/frontend` del repositorio principal de Symfony.
**Configuración de Vite (`vite.config.js`)**: Se configuró el puerto `3000` para el servidor de desarrollo y se estableció un proxy (`/api -> http://localhost:8000`) para redirigir todas las peticiones a la API de Symfony y evitar bloqueos por políticas CORS durante el desarrollo.

### 5.2 Sistema de Diseño: Rediseño Prototipo "Gusmuss"

Tras recibir validación visual mediante prototipos (tipo Figma), se rediseñó desde cero el CSS (`index.css`) hacia un tema claro y asimétrico:
- **Paleta de Colores**: Fondo blanco puro (`#ffffff`), cabeceras compartimentadas en negro profundo y caqui (`#bda57b`), con acentos verdes (`#9abd4c`) para destacar elementos "Frame".
- **Cabecera Dual**: Barra negra principal con el logotipo y barra inferior caqui interactiva.
- **Tipografía**: Incorporación de la fuente cursiva `Great Vibes` (extraída de Google Fonts para el logotipo original "Gusmuss") junto con la lectura clara de `Playfair Display` serif.
- **Asimetría Constante (Dynamic Design)**: Cuadrículas de imagen cortadas, superposición de elementos florales, botón central de desborde y un pie de página en franjas anchas tipo "teclas de piano". Cajas imitando "marcos de cuadro 3D" con sombras CSS y efecto bisel para los productos («Unique Pieces»).

### 5.3 Arquitectura de Componentes y Páginas

Se implementó el enrutamiento utilizando `react-router-dom`:

#### Módulos Globales y Layout
- **Layout Base**: Un componente `Layout` con `Navbar` (fijo con fondo desenfocado) y `Footer` expansivo.
- **Context API (Estado Global)**: 
  - `AuthContext`: Gestiona la sesión a través del servidor (`/api/auth/me`), controlando inicio/cierre de sesión persistente.
  - `CartContext`: Mantiene y persiste la cesta de la compra en el `localStorage`.
  - `LanguageContext`: (Implementado para la Asignatura de Inglés) Permite alternar textos complejos de la app entre Español e Inglés de forma asíncrona usando `translations.js`.

---

## ENTRADA 7 - Primera Entrega (Mobile-First, Tailwind, IA y CI/CD)

**Fase:** 6. Adaptación Móvil e Integración Continua  
**Objetivos (Rúbrica DAW):** Desarrollo DiW (Responsive, Tailwind), IA (n8n Webhooks), Despliegue (Github Actions).

### 6.1 Rediseño con Tailwind CSS (Mobile-First)

Se ha refactorizado completamente la interfaz de la aplicación hacia un enfoque centrado en móvil.
- Se ha instalado y configurado **Tailwind CSS v3** en el ecosistema de Vite, prescindiendo de archivos `.css` manuales complejos en favor de clases utilitarias.
- **Layout y Bottom Navigation:** Implementación de una barra inferior de navegación fija con iconos (Inicio, Ropa, Accesorios, Perfil), que facilita el uso a una mano.
- **Componentes Reactivos:**
  - `ImageGallery`: Galería automática con transiciones CSS de fade-in y controles táctiles, usando `setInterval` y estilos condicionales (`opacity-100` vs `opacity-0`).
  - `ProductCard`: Se mantuvieron los marcos verdes biselados solicitados en el prototipo, pero adaptados con las clases dinámicas de grid móvil (2 columnas).
  
### 6.2 Integración IA / Automatización con n8n

Para satisfacer los requisitos de IA y flujos automáticos:
- Se ha incluido **n8n** dentro de la orquestación de Docker (`docker-compose.yml`) compartimentado en su propio contenedor (puerto 5688 debido a ocupación del 5678).
- **El flujo:** El `OrderController.php` del backend en Symfony inyecta ahora `HttpClientInterface`. En cuanto un cliente confirma un carrito y se ejecuta el `$em->flush()`, Symfony dispara de forma asíncrona un `POST` HTTP al webhook local de n8n, transfiriéndole el JSON íntegro del pedido recién creado.

### 6.3 Despliegue: CI/CD Pipeline

Para automatizar la integración continua (Asignatura de Despliegue):
- Configuración de Github Actions en `.github/workflows/ci.yml`.
- Se realizan dos _jobs_ principales paralelos que se lanzan a cada push/pull-request en `main` o `feature`:
  1. `test-backend`: Instala PHP 8.2, descarga dependencias de Composer, y lanza `doctrine:schema:validate` para prevenir un schema roto de BD.
  2. `test-frontend`: Instala Node.js v20, hace un clean install de NPM, y compila Vite (`npm run build`) cerciorándose de que no hay imports circulares ni CSS faltante en Tailwind.


#### Páginas Creadas Completamente Funcionales:
1. **Home (`/`)**: Hero section principal de alto impacto visual (imita un spotlight de luz sobre fondo oscuro), y una cuadrícula de las joyas marcadas como `destacadas` que carga dinámicamente de la API de Symfony.
2. **Collection (`/coleccion`)**: Vista general de todo el catálogo. Implementa filtrado dinámico mediante _query parameters_ (`?categoria=...`) consumiendo `/api/categorias` y `/api/productos`.
3. **ProductDetail (`/producto/:slug`)**: Ficha detallada con descripción, stock, control de `Añadir al Carrito`, disponibilidad y ventajas adicionales (garantía, certificado GIA). Si un producto no tiene stock, inhabilita los controles del botón.
4. **Cart (`/carrito`)**: Interfaz del carrito con previsualizaciones, actualización de cantidades en línea, prevención de rebaja a cantidades negativas (elimina el item), subtotalización y comprobador de sesión (invita al login si el usuario es anónimo).
5. **Login y Registro (`/login` y `/registro`)**: Formularios validados conectados en vivo con `AuthController` del Backend.
6. **Checkout (`/checkout`)**: Pantalla final guiada: recoge domicilio del perfil, detalla cobros blindados y genera un POST a `/api/pedidos` confirmando el pedido y vaciando el carrito en `success`.
7. **Profile (`/perfil`)**: Panel de control privado que carga el historial de compras directo del ORM de Doctrine. 

**Cumplimiento de la Rúbrica Frontend:**
- ✅ Implementación mediante React, integrando los endpoints construidos del Backend Symfony.
- ✅ Gestión de estado con React Context (`Auth`, `Cart`).
- ✅ Componentización completa (`Components`, `Pages`, `Layouts`).
- ✅ Sistema de Autenticación con `React Router Route protection` y API Fetch Helper.
- ✅ Funcionalidad avanzada visual completa sin depender de librerías de estilos externas, fomentando una calidad de CSS premium en línea con el nicho de negocio (joyería).

---
