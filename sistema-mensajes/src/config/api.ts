// ✅ CONFIGURACIÓN PARA PRODUCCIÓN CON VARIABLES DE ENTORNO
export const API_CONFIG = {
  // ✅ USAR VARIABLE DE ENTORNO O DETECTAR AUTOMÁTICAMENTE
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.PROD 
      ? 'https://skill-link-emprendedor-pjof.onrender.com'  // ✅ FALLBACK PARA PRODUCCIÓN
      : 'http://localhost:8080'),  // ✅ DESARROLLO LOCAL
    
  ENDPOINTS: {
    // Conversaciones
    CONVERSACIONES: '/api/conversaciones',
    CONVERSACIONES_USUARIO: (idUsuario: number) => `/api/conversaciones/usuario/${idUsuario}`,
    CONVERSACIONES_RESUMEN: (idUsuario: number) => `/api/conversaciones/resumen/${idUsuario}`,
    
    // Mensajes
    MENSAJES: '/api/mensajes',
    MENSAJES_CONVERSACION: (idConversacion: number) => `/api/mensajes/conversacion/${idConversacion}`,
    MENSAJES_PAGINADO: (idConversacion: number) => `/api/mensajes/conversacion/${idConversacion}/paginado`,
    MENSAJES_LEER: '/api/mensajes/leer',
  },
  WEBSOCKET: {
    // ✅ WEBSOCKET URL DINÁMICA BASADA EN BASE_URL
    URL: (() => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 
        (import.meta.env.PROD 
          ? 'https://skill-link-emprendedor-pjof.onrender.com'
          : 'http://localhost:8080');
      
      // Convertir HTTP/HTTPS a WS/WSS
      return baseUrl.replace(/^https?:/, baseUrl.startsWith('https:') ? 'wss:' : 'ws:') + '/ws';
    })(),
      
    ENDPOINTS: {
      ENVIAR_MENSAJE: '/app/chat.enviarMensaje',
      TYPING: '/app/chat.typing',
      LEER_MENSAJES: '/app/chat.leerMensajes',
    },
    TOPICS: {
      CONVERSACION: (idConversacion: number) => `/topic/conversacion/${idConversacion}`,
      TYPING: (idConversacion: number) => `/topic/conversacion/${idConversacion}/typing`,
      LEIDO: (idConversacion: number) => `/topic/conversacion/${idConversacion}/leido`,
    }
  }
};

// ✅ FUNCIÓN HELPER PARA DEBUGGING
export const getApiInfo = () => {
  console.log('🔧 Configuración API:', {
    environment: import.meta.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT',
    envVariable: import.meta.env.VITE_API_BASE_URL,
    baseUrl: API_CONFIG.BASE_URL,
    websocketUrl: API_CONFIG.WEBSOCKET.URL,
    mode: import.meta.env.MODE
  });
};