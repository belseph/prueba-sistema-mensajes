import React from 'react';

interface DateSeparatorProps {
  date: Date;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    
    // ✅ CONVERTIR FECHA A ZONA HORARIA LOCAL
    const localDate = new Date(date.toLocaleString());
    const messageDate = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
    
    // ✅ LÓGICA COMO WHATSAPP PERO CON HORA LOCAL
    if (messageDate.getTime() === today.getTime()) {
      return 'Hoy';
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return 'Ayer';
    } else {
      const diffTime = today.getTime() - messageDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) {
        // ✅ Días de la semana para la última semana EN ZONA LOCAL
        return localDate.toLocaleDateString('es-ES', { 
          weekday: 'long',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      } else if (diffDays <= 365) {
        // ✅ Fecha sin año para el año actual EN ZONA LOCAL
        return localDate.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'long',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      } else {
        // ✅ Fecha completa para años anteriores EN ZONA LOCAL
        return localDate.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center my-6">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm">
        <span className="text-sm font-medium text-gray-600">
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
};