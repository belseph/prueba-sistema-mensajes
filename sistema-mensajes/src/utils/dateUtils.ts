// ✅ VERSIÓN CORREGIDA CON ZONA HORARIA LOCAL

export const formatMessageTime = (dateString: string): string => {
  // ✅ CREAR FECHA ASUMIENDO QUE VIENE EN UTC Y CONVERTIR A LOCAL
  const date = new Date(dateString + (dateString.includes('Z') ? '' : 'Z')); // Asegurar que se trate como UTC
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    // Mismo día: muestra la hora LOCAL (ej: "14:30")
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // ✅ ZONA HORARIA LOCAL
    });
  } else if (days === 1) {
    // Ayer: muestra "Ayer"
    return 'Ayer';
  } else if (days < 7) {
    // Entre 2-6 días: muestra "2d", "3d", etc.
    return `${days}d`;
  } else {
    // Más de 7 días: muestra fecha completa LOCAL
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // ✅ ZONA HORARIA LOCAL
    });
  }
};

export const formatChatTime = (dateString: string): string => {
  // ✅ CREAR FECHA ASUMIENDO UTC Y MOSTRAR EN HORA LOCAL
  const date = new Date(dateString + (dateString.includes('Z') ? '' : 'Z'));
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // ✅ ZONA HORARIA LOCAL
  });
};

// ✅ NUEVA FUNCIÓN: Formatear fecha completa con zona horaria local
export const formatFullDateTime = (dateString: string): string => {
  const date = new Date(dateString + (dateString.includes('Z') ? '' : 'Z'));
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
};

// ✅ FUNCIÓN PARA DEBUGGING: Ver zona horaria actual
export const getCurrentTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// ✅ FUNCIÓN PARA MOSTRAR TIEMPO RELATIVO (ej: "hace 5 minutos")
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString + (dateString.includes('Z') ? '' : 'Z'));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return 'Ahora';
  } else if (diffMinutes < 60) {
    return `Hace ${diffMinutes} min`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours}h`;
  } else if (diffDays < 7) {
    return `Hace ${diffDays}d`;
  } else {
    return formatMessageTime(dateString);
  }
};