import { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
    // 1. Cargar la hoja de estilos CSS de n8n chat
    const styleId = 'n8n-chat-style';
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Importar dinámicamente el módulo ES del widget de n8n
    let active = true;
    
    // Detectar automáticamente el dominio para que funcione en local y en AWS
    const currentHost = window.location.hostname;
    const defaultN8nHost = currentHost === 'localhost' || currentHost === '127.0.0.1' 
      ? 'http://localhost:5688' 
      : `http://${currentHost}:5688`;
      
    const n8nHost = import.meta.env.VITE_N8N_HOST || defaultN8nHost;
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || `${n8nHost}/webhook/95f2bf7a-4010-4379-8a23-c228c2039ea4/chat`;

    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(({ createChat }) => {
        if (!active) return;
        
        createChat({
          host: n8nHost,
          webhookId: '95f2bf7a-4010-4379-8a23-c228c2039ea4',
          webhookUrl: webhookUrl,
          // Textos configurables en la raíz del objeto, no dentro de "options"
          initialMessages: [
            'Bienvenido a mi tienda, ¿en qué le puedo ayudar?'
          ],
          i18n: {
            en: {
              title: 'Gusmuss AI 💎',
              subtitle: 'Asesora de Joyería y Moda',
              footer: '',
              getStarted: 'Nueva conversación',
              inputPlaceholder: 'Escriba aquí su mensaje...',
            }
          }
        });
      })
      .catch((err) => {
        console.error('Error al cargar el widget de chat de n8n:', err);
      });

    // Añadir estilos personalizados para colores y botón
    const customStyle = document.createElement('style');
    customStyle.id = 'n8n-custom-chat-style';
    customStyle.innerHTML = `
      /* Variables CSS nativas de n8n chat para forzar el tema oscuro y dorado */
      :root {
        --chat--color-primary: #171717 !important;
        --chat--color-secondary: #d4af37 !important;
        --chat--color-background: #ffffff !important;
        --chat--toggle--background: #171717 !important; /* Fuerza el color de fondo del botón flotante */
      }
      
      /* Asegurar que la cabecera es negra y texto dorado */
      .chat-layout .chat-header {
        background-color: #171717 !important;
        color: #d4af37 !important;
      }

      /* Efecto de brillo y animación en el botón principal */
      .chat-window-toggle, button[class*="toggle"] {
        background-color: #171717 !important;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4) !important;
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        border: 2px solid #d4af37 !important;
      }
      .chat-window-toggle:hover, button[class*="toggle"]:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 6px 25px rgba(212, 175, 55, 0.7) !important;
      }
      /* Hacer que el icono del SVG sea dorado */
      .chat-window-toggle svg, button[class*="toggle"] svg {
        color: #d4af37 !important;
        stroke: #d4af37 !important;
        fill: #d4af37 !important;
      }
      .chat-window-toggle svg path, button[class*="toggle"] svg path {
        fill: #d4af37 !important;
        stroke: #d4af37 !important;
      }
    `;
    document.head.appendChild(customStyle);

    // Limpieza al desmontar el componente
    return () => {
      active = false;
      const chatWidget = document.querySelector('.n8n-chat-widget');
      if (chatWidget) {
        chatWidget.remove();
      }
    };
  }, []);

  return null;
}
