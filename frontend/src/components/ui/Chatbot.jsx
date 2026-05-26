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
    
    const n8nHost = import.meta.env.VITE_N8N_HOST || 'http://localhost:5688';
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || `${n8nHost}/webhook/5e1e9e3a-2410-4d12-a29d-cda4862221b7/chat`;

    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(({ createChat }) => {
        if (!active) return;
        
        createChat({
          host: n8nHost,
          webhookId: '5e1e9e3a-2410-4d12-a29d-cda4862221b7',
          webhookUrl: webhookUrl,
          options: {
            title: 'Gusmuss AI 💎',
            subtitle: 'Asesora de Joyería y Moda',
            primaryColor: '#171717', // Color oscuro elegante
            backgroundColor: '#ffffff',
            titleBackgroundColor: '#171717',
            titleTextColor: '#f59e0b', // Letras doradas
            buttonColor: '#171717',
            placeholder: 'Pregúnteme sobre joyas, vestidos, materiales...',
            initialMessages: [
              '¡Bienvenido a Gusmuss Diamond! 💎',
              'Soy su asesora virtual autónoma configurada en n8n. ¿En qué tipo de piezas exclusivas o tallas está interesado hoy?'
            ]
          }
        });
      })
      .catch((err) => {
        console.error('Error al cargar el widget de chat de n8n:', err);
      });

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
