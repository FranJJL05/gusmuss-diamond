# Gusmuss Diamond 💎

Gusmuss Diamond es una plataforma e-commerce de alta joyería y moda, que integra un asistente de Inteligencia Artificial capaz de recomendar productos en tiempo real y comunicarse con los clientes.

## 🚀 Arquitectura y Despliegue (AWS & Docker)

Este proyecto ha sido desplegado siguiendo las mejores prácticas de DevOps y Cloud Computing, cumpliendo con los requisitos del módulo de despliegue:

*   **Contenedores y Orquestación:** Toda la infraestructura está contenerizada. El orquestador principal en producción es **Docker Compose**. 
    *   *Nota Técnica sobre Kubernetes:* Se desarrolló íntegramente la infraestructura en Kubernetes (ver carpeta `k8s/` del repositorio con todos los manifests: Deployments, Services, PVCs). Sin embargo, durante el despliegue físico en la instancia EC2 `t2.micro` (capa gratuita de 1GB de RAM), el clúster de Kubernetes (K3s) sufría de *OOM Kills* (Out of Memory) y el API Server colapsaba al intentar levantar simultáneamente MySQL, Node.js y Symfony. Por este motivo, como decisión arquitectónica de ingeniería para garantizar la estabilidad del servicio y no incurrir en costes adicionales, se aplicó un *rollback* hacia Docker Compose, el cual gestiona los mismos contenedores de forma mucho más eficiente en entornos de bajos recursos.

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
