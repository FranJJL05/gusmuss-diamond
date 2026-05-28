# Gusmuss Diamond 💎

Gusmuss Diamond es una plataforma e-commerce de alta joyería y moda, que integra un asistente de Inteligencia Artificial capaz de recomendar productos en tiempo real y comunicarse con los clientes.

## 🚀 Arquitectura y Despliegue (AWS & Docker)

Este proyecto ha sido desplegado siguiendo las mejores prácticas de DevOps y Cloud Computing, cumpliendo con los requisitos del módulo de despliegue:

*   **Contenedores y Orquestación:** Toda la infraestructura está contenerizada. El orquestador principal en producción es **Kubernetes (K3s)**. Se han definido manifiestos declarativos (Deployments, Services, ConfigMaps y PVCs) para todos los componentes del sistema, garantizando alta disponibilidad y auto-recuperación de los pods. La arquitectura de K8s se encuentra documentada en la carpeta `k8s/` del repositorio.

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

Al utilizar **Kubernetes (K3s)**, los contenedores del Backend, Base de Datos, Mailer y n8n se inician **automáticamente** al arrancar la instancia EC2, garantizando que el sistema esté siempre disponible sin intervención manual.

Para arrancar el Frontend web:

```bash
cd /home/ubuntu/gusmuss-diamond/frontend
sudo npm run dev -- --host 0.0.0.0 --port 80
```
