# Guía de Despliegue y Conexión con Dominio IONOS

Dado que en tu rúbrica exigen **Despliegue en la nube, uso de contenedores y dominio sin usar IPs**, la mejor opción gratuita y profesional para tu proyecto es usar **Render.com**. Render soporta contenedores Docker nativamente, gestiona los certificados HTTPS automáticamente y permite conectar dominios de IONOS muy fácil.

Tu proyecto ya tiene el archivo `render.yaml` pre-configurado para que todo se automatice. Sigue estos pasos exactos:

---

## FASE 1: Despliegue Automático en Render

1. **Sube todo a GitHub:** Asegúrate de que el código más reciente de tu proyecto esté en un repositorio público o privado en tu cuenta de GitHub.
2. **Crea cuenta en Render:** Entra en [Render.com](https://render.com) y regístrate usando tu cuenta de GitHub.
3. **Lanza el Blueprint:**
   - En el panel de Render, haz clic en el botón **"New +"** arriba a la derecha.
   - Selecciona **"Blueprint"**.
   - Conecta tu repositorio de GitHub de *Gusmuss Diamond*.
   - Render detectará instantáneamente tu archivo `render.yaml`.
   - Haz clic en **Apply / Create**.

4. **¿Qué está pasando ahora?** 
   Render está leyendo el `.yaml` y creando **dos servicios** por ti:
   - **gusmuss-backend**: Leerá tu `Dockerfile`, instalará PHP/Symfony, conectará la base de datos MySQL (Render PostgreSQL) y generará una URL tipo `https://gusmuss-backend.onrender.com`.
   - **gusmuss-frontend**: Renderizará tu React con Vite y lo conectará automáticamente al backend. Te dará una URL tipo `https://gusmuss-frontend.onrender.com`.

*Nota: La primera vez tarda unos 5-10 minutos en compilarlo todo.*

---

## FASE 2: Conectar tu dominio de IONOS al Frontend

Tu web principal (la que verán los clientes) es el **Frontend**. Es a esa web a la que le vamos a poner tu dominio personalizado (ej: `tudominio.com`).

### 1. Configurar en Render
1. En Render, ve al servicio **gusmuss-frontend**.
2. En el menú de la izquierda, baja hasta **Settings** y busca la sección **"Custom Domains"**.
3. Añade tu dominio de IONOS (por ejemplo: `www.tudominio.com` y `tudominio.com`).
4. Render te mostrará unas instrucciones DNS (te dará una dirección **CNAME** y/o un par de **A Records** con IPs). No cierres esta pestaña.

### 2. Configurar en IONOS
1. Inicia sesión en tu panel de control de [IONOS](https://login.ionos.es).
2. Ve a la sección de **Dominios y SSL**.
3. Haz clic en el icono del engranaje (Ajustes) al lado de tu dominio y selecciona **DNS**.
4. Haz clic en **Añadir registro** y crea los registros que te pidió Render:
   - Si Render te dio un **CNAME**: Crea un registro tipo `CNAME`, en Hostname pon `www` y en Apunta a (Points to) pega la dirección que te dio Render (suele ser `gusmuss-frontend.onrender.com`).
   - Si Render te dio **A Records (IPs)**: Crea un registro tipo `A`, en Hostname pon `@` (o déjalo en blanco según pida IONOS) y pega la IP.
5. Guarda los cambios.

### 3. Esperar la Propagación
- Los cambios DNS en IONOS pueden tardar entre 5 minutos y unas cuantas horas en propagarse por internet.
- Vuelve a Render y dale al botón de **Verify**. Cuando salga en verde, Render te generará gratis el certificado de seguridad HTTPS.

---

## FASE 3: Detalles Finales para el 10

Con estos pasos habrás cumplido exactamente con lo que te pide el tribunal:
1. **Nube y Contenedores:** Render usa contenedores cloud por debajo basándose en tu Dockerfile.
2. **Dominio sin IPs:** Has enlazado el CNAME de IONOS.
3. **Protocolos Seguros:** Render inyecta el candado SSL/HTTPS automáticamente.
4. **CI/CD:** Como lo has conectado a GitHub, a partir de ahora, cada vez que hagas `git push` a tu repositorio, Render lo detectará automáticamente y actualizará la web en IONOS sin que tú toques nada (Despliegue Continuo).
