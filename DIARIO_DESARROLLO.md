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
Esta sesión completa el requisito de la rúbrica *"La administración del sistema (gestión de entidades, configuración, etc) debe hacerse completamente con lenguaje de servidor"*. EasyAdmin es el bundle estándar del ecosistema Symfony para paneles de administración. En lugar de programar un CRUD manual para cada entidad, EasyAdmin genera automáticamente las vistas de listado, creación, edición y borrado a partir de los `CrudControllers`. El modelo de datos implementado (`User → Order → OrderItem ← Product ← Category`) es la estructura relacional estándar de cualquier e-commerce.

**Tecnologías/Comandos clave usados:**
```bash
# Validar que los mappings de Doctrine son correctos
php bin/console doctrine:schema:validate

# Generar el archivo de migración comparando entidades vs BD real
php bin/console make:migration

# Aplicar la migración a la base de datos
php bin/console doctrine:migrations:migrate

# Limpiar caché al añadir nuevos controladores
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

2. **Optimización de I/O con Docker named volume para `var/`.** En entornos Windows con Docker Desktop y WSL2, el acceso a ficheros a través de bind mounts (la carpeta del proyecto montada dentro del contenedor) es notablemente más lento que el filesystem nativo de Linux. Symfony genera miles de ficheros en `var/cache/` al arrancar, lo que provocaba tiempos de carga de página de 60+ segundos. La solución fue declarar un volumen Docker nativo (`symfony_var`) que almacena `var/` directamente en el filesystem Linux del contenedor, eliminando el cuello de botella de la capa de traducción WSL2↔Windows.

3. **Activación del `access_control` en `security.yaml`.** Se descomentaron las reglas de control de acceso para proteger la ruta `/admin` con el rol `ROLE_ADMIN`. Sin esta configuración, el firewall de Symfony no interceptaba las peticiones a `/admin` antes de que llegaran al controlador, y EasyAdmin gestionaba la autenticación internamente. Esto generaba una cadena de redirecciones HTTP 302 que el navegador no podía resolver correctamente (bucle de redirects). Con `access_control` activo, el firewall intercepta la petición **antes** del controlador y genera un único redirect limpio a `/login`.

4. **Simplificación del `DashboardController::index()`** sustituyendo un redirect personalizado al `ProductCrudController` por `parent::index()`. El redirect personalizado añadía un salto adicional antes de que el sistema de autenticación pudiera intervenir, agravando el problema del bucle de redirecciones para usuarios no autenticados.

5. **Regeneración de caché** con `php bin/console cache:warmup` tras los cambios de configuración para que Symfony compile los contenedores de servicio, rutas y plantillas Twig sin esperar a la primera petición HTTP.

**Justificación Técnica:**
La creación de un `Dockerfile` propio es la práctica estándar en proyectos profesionales con Docker: permite reproducir el entorno de forma idéntica en cualquier máquina con un simple `docker-compose build`, sin pasos manuales de configuración. Esto también cubre el requisito de la rúbrica de *"Configura de manera adecuada parámetros del servidor web"*. El uso de named volumes para directorios de alto I/O es una optimización habitual en entornos de desarrollo con Docker sobre Windows. La configuración del `access_control` en Symfony implementa el principio de *defense in depth*: la seguridad se aplica en la capa de infraestructura antes de llegar a la capa de aplicación, lo que es más robusto, eficiente y explícito para cualquier auditoría de seguridad.

**Tecnologías/Comandos clave usados:**
```bash
# Construir la imagen Docker desde el Dockerfile (solo la primera vez o tras modificarlo)
docker-compose build web

# Arrancar todos los contenedores en segundo plano
docker-compose up -d

# Pre-generar la caché de Symfony dentro del contenedor
docker exec gusmuss_web php bin/console cache:warmup

# Ver logs de Apache en tiempo real para depuración HTTP
docker logs gusmuss_web --tail 30
```

**Cumplimiento de la Rúbrica:**
- ✅ Uso de contenedores Docker con configuración personalizada (Dockerfile propio)
- ✅ Configuración correcta del servidor web Apache (DocumentRoot, mod_rewrite, AllowOverride All)
- ✅ Seguridad de rutas mediante `access_control` en el firewall de Symfony (ROLE_ADMIN)

---
