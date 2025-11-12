import { format, isToday, isTomorrow, addDays, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date) => {
  if (isToday(date)) {
    return `Hoy, ${format(date, 'HH:mm')}`;
  } else if (isTomorrow(date)) {
    return `Mañana, ${format(date, 'HH:mm')}`;
  } else {
    return format(date, "d 'de' MMMM, HH:mm", { locale: es });
  }
};

export const formatDateOnly = (date) => {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
};

export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

export const isAppointmentToday = (date) => {
  return isToday(date);
};

export const getUpcomingDays = (days = 7) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(addDays(startOfDay(new Date()), i));
  }
  return dates;
};