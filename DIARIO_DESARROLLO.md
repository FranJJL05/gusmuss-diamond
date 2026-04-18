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
