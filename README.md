# 💎 Gusmuss Diamond

Gusmuss Diamond es una plataforma e-commerce B2C de lujo desarrollada como Proyecto Integrado para el ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

El sistema está diseñado para la digitalización de una joyería multimarca en Puerto Banús, ofreciendo una experiencia de compra exclusiva, multilingüe y altamente automatizada.

## 🚀 Arquitectura Tecnológica (Full-Stack)

El proyecto sigue una arquitectura desacoplada y orientada a servicios:

### 🖥️ Frontend (Single Page Application)
- **Framework:** React.js + Vite.
- **Estilos:** Tailwind CSS con diseño "Mobile First" y estética de lujo (minimalista B&W).
- **Gestión de Estado:** Context API para el carrito, la autenticación y el idioma.
- **Navegación:** React Router DOM (sin recargas de página).

### ⚙️ Backend (API REST)
- **Framework:** Symfony 6.4 (PHP 8.2).
- **Base de Datos:** MySQL 8.0 gestionado mediante Doctrine ORM.
- **Seguridad:** LexikJWTAuthenticationBundle para la autenticación basada en tokens JWT.
- **Administración:** EasyAdmin 4 para la gestión completa del catálogo y los pedidos por parte del administrador.

### 🤖 Automatización y DevOps
- **Contenedores:** Entorno local virtualizado completamente con **Docker** (`docker-compose`).
- **Integración Continua (CI/CD):** Workflows de **GitHub Actions** para el despliegue automatizado.
- **Cloud Hosting:** Servidores de producción en **Render**.
- **Notificaciones IA:** Integración de Webhooks con **n8n** y **MailHog** para el envío automático de correos y notificaciones de pedidos.

## 📦 Instalación Local (Docker)

1. Clona este repositorio:
   ```bash
   git clone https://github.com/FranJJL05/gusmuss-diamond.git
   cd gusmuss-diamond
   ```
2. Levanta los contenedores de Docker (Backend, Base de Datos, n8n, MailHog):
   ```bash
   docker-compose up -d
   ```
3. Instala las dependencias y arranca el servidor de desarrollo Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Inicializa la base de datos navegando a la ruta de configuración inicial:
   👉 `http://localhost:8000/api/dev/setup`

---
*Desarrollado por Francisco José Jiménez López - IES Iliberis*
