import { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
    // 1. Cargar la hoja de estilos CSS de n8n chat
    const styleId = 'n8n-chat-style';
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat@0/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Cargar el script de n8n chat dinámicamente y ejecutarlo
    const scriptId = 'n8n-chat-script';
    let script = document.getElementById(scriptId);

    const initChat = () => {
      // Obtenemos los hosts desde variables de entorno de Vite o usamos valores por defecto
      // Nota: En local, n8n corre en el puerto 5688 expuesto por docker-compose
      const n8nHost = import.meta.env.VITE_N8N_HOST || 'http://localhost:5688';
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || `${n8nHost}/webhook/18f5d720-302a-4a5c-bf93-112392292b6b/chat`;

      if (window.createChat) {
        window.createChat({
          host: n8nHost,
          webhookId: '18f5d720-302a-4a5c-bf93-112392292b6b', // UUID del nodo chat trigger de n8n
          webhookUrl: webhookUrl,
          options: {
            title: 'Gusmuss AI 💎',
            subtitle: 'Asesora de Joyería y Moda',
            primaryColor: '#171717', // Color oscuro elegante de la marca
            backgroundColor: '#ffffff',
            titleBackgroundColor: '#171717',
            titleTextColor: '#f59e0b', // Letras doradas/ámbar
            buttonColor: '#171717',
            placeholder: 'Pregúnteme sobre joyas, vestidos, materiales...',
            initialMessages: [
              '¡Bienvenido a Gusmuss Diamond! 💎',
              'Soy su asesora virtual autónoma configurada en n8n. ¿En qué tipo de piezas exclusivas o tallas está interesado hoy?'
            ]
          }
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat@0/dist/chat.bundle.es.js';
      script.onload = () => {
        // En navegadores modernos, los módulos importados añaden la función a window
        setTimeout(initChat, 300);
      };
      document.body.appendChild(script);
    } else {
      // Si el script ya está cargado, simplemente inicializamos de nuevo
      setTimeout(initChat, 100);
    }

    // Cleanup: eliminar los elementos añadidos o cerrar el chat al desmontar el componente si fuera necesario
    return () => {
      const chatWidget = document.querySelector('.n8n-chat-widget');
      if (chatWidget) {
        chatWidget.remove();
      }
    };
  }, []);

  // El script de n8n inyecta su propio botón flotante al final del DOM,
  // por lo que este componente no necesita renderizar ningún HTML propio.
  return null;
}
