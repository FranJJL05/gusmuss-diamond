# Gusmuss Diamond 💎

Gusmuss Diamond es una plataforma e-commerce de alta joyería y moda, que integra un asistente de Inteligencia Artificial capaz de recomendar productos en tiempo real y comunicarse con los clientes.

## 🚀 Arquitectura y Despliegue (AWS & Docker)

Este proyecto ha sido desplegado siguiendo las mejores prácticas de DevOps y Cloud Computing, cumpliendo con los requisitos del módulo de despliegue:

*   **Entorno Cloud (AWS):** El proyecto está alojado en una instancia EC2 de Amazon Web Services, garantizando alta disponibilidad. Se ha asignado una **IP Elástica (Elastic IP)** para mantener una dirección estática.
*   **Contenedores y Orquestación:** Toda la infraestructura está contenerizada. Se utiliza **Docker** y **Docker Compose** como orquestador de contenedores. *(Nota técnica: Se ha optado por Docker Compose en lugar de Kubernetes para optimizar el consumo de recursos en la instancia EC2 t2.micro, logrando un despliegue eficiente y escalable sin saturar la memoria RAM).*
*   **Nombres de Dominio:** El proyecto no se accede por IP, sino a través del dominio personalizado configurado mediante registros DNS en IONOS: [http://www.frandaw.com](http://www.frandaw.com).
*   **Control de Versiones:** Se utiliza Git y GitHub como repositorio central de código.
*   **CI/CD (Integración y Despliegue Continuo):** Se ha implementado un pipeline automático utilizando **GitHub Actions** (`.github/workflows/ci.yml`) que ejecuta pruebas automáticas y verifica la compilación tanto del Frontend como del Backend en cada push.
*   **Documentación Automática:** La API REST del backend (Symfony) está documentada automáticamente utilizando Swagger/OpenAPI, accesible en la ruta `/api/doc`.

## 🤖 Módulo de Agentes IA

El proyecto incorpora un **Agente Inteligente conversacional** integrado en la tienda online:

*   **Motor de IA Local:** Se utiliza el modelo **Mistral** a través de **Ollama**.
*   **Orquestación de flujos:** Se utiliza **n8n** (desplegado en un contenedor Docker en AWS) para orquestar la comunicación entre el Frontend, el modelo de IA y la base de datos de productos.
*   **Arquitectura Híbrida Seguro:** Para maximizar el rendimiento y no sobrecargar la capa gratuita de AWS, el procesamiento pesado del modelo Mistral se realiza mediante un túnel seguro (**Ngrok**) que conecta la nube con la GPU local, demostrando flexibilidad arquitectónica.
*   **Herramientas dinámicas:** La IA tiene acceso a la herramienta `buscarProductos`, permitiéndole consultar la base de datos en tiempo real y recomendar vestidos o joyas exactas del catálogo con sus precios actualizados.

## 🎨 Diseño y Frontend

*   **Tecnologías:** React, Vite y TailwindCSS.
*   **Estética:** Interfaz "Glassmorphism", diseño oscuro de alta gama, y componentes interactivos diseñados para transmitir la exclusividad de una marca de diamantes.

## 🛠️ Instrucciones de Arranque (Entorno AWS)

```bash
# 1. Iniciar los servicios del Backend y Base de datos (Docker)
cd /home/ubuntu/gusmuss-diamond
sudo docker compose up -d

# 2. Iniciar el Frontend web
cd /home/ubuntu/gusmuss-diamond/frontend
sudo npm run dev -- --host 0.0.0.0 --port 80
```
