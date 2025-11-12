import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Heart, 
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatTime, isAppointmentToday, getUpcomingDays } from '../utils/dateHelpers';
import { format, isSameDay, addDays, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

const Dashboard = ({ appointments = [], patients = [] }) => {
  const [appointmentView, setAppointmentView] = useState('today'); // 'today' or 'week'
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayAppointments = appointments.filter(apt => 
    isAppointmentToday(apt.date)
  );

  const weekDays = getUpcomingDays(7);
  const weekAppointments = appointments.filter(apt => 
    weekDays.some(day => isSameDay(apt.date, day))
  );

  const activePatients = patients.filter(p => p.status === 'activo').length;
  const todayTreatments = todayAppointments.length;
  const completedToday = todayAppointments.filter(apt => apt.status === 'confirmada').length;
  const pendingToday = todayAppointments.filter(apt => apt.status === 'pendiente').length;

  const stats = [
    {
      title: 'Pacientes Activos',
      value: activePatients,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Citas Hoy',
      value: todayTreatments,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bg: 'from-green-50 to-green-100'
    },
    {
      title: 'Completadas',
      value: completedToday,
      icon: CheckCircle2,
      color: 'from-purple-500 to-purple-600',
      bg: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Pendientes',
      value: pendingToday,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bg: 'from-amber-50 to-amber-100'
    }
  ];

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => isSameDay(apt.date, date));
  };

  const renderTodayView = () => (
    <div className="space-y-4">
      {todayAppointments.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hay citas programadas para hoy</p>
        </div>
      ) : (
        todayAppointments
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((appointment, index) => (
            <motion.div
              key={appointment.id}
              className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-xl border border-gray-200/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {formatTime(appointment.date)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                <p className="text-gray-600 text-sm">{appointment.type}</p>
              </div>
              <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                appointment.status === 'confirmada'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {appointment.status === 'confirmada' ? 'Confirmada' : 'Pendiente'}
              </div>
            </motion.div>
          ))
      )}
    </div>
  );

  const renderWeekView = () => (
    <div className="space-y-3">
      {weekDays.map((date, dayIndex) => {
        const dayAppointments = getAppointmentsForDate(date).sort((a, b) => new Date(a.date) - new Date(b.date));
        const isToday = isSameDay(date, new Date());
        
        return (
          <motion.div
            key={date.toISOString()}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              isToday 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50/80 border-gray-200/50'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + dayIndex * 0.05 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className={`font-semibold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                  {format(date, 'EEEE', { locale: es })}
                </h4>
                <p className={`text-sm ${isToday ? 'text-blue-700' : 'text-gray-600'}`}>
                  {format(date, 'd MMM', { locale: es })}
                  {isToday && ' (Hoy)'}
                </p>
              </div>
              
              {dayAppointments.length > 0 && (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  isToday 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {dayAppointments.length} {dayAppointments.length === 1 ? 'cita' : 'citas'}
                </span>
              )}
            </div>

            {dayAppointments.length > 0 ? (
              <div className="space-y-2">
                {dayAppointments.slice(0, 2).map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      isToday ? 'bg-white/80' : 'bg-white/60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isToday 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-400 text-white'
                    }`}>
                      {formatTime(appointment.date)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{appointment.patientName}</p>
                      <p className="text-gray-600 text-xs">{appointment.type}</p>
                    </div>
                  </div>
                ))}
                
                {dayAppointments.length > 2 && (
                  <div className={`text-center py-2 text-xs ${
                    isToday ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    +{dayAppointments.length - 2} más
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">Sin citas programadas</p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel Principal</h1>
        <p className="text-gray-600">Resumen de actividad de tu clínica</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className={`bg-gradient-to-br ${stat.bg} border border-gray-200/50 rounded-2xl p-6 shadow-sm`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">
                {appointmentView === 'today' ? 'Citas de Hoy' : 'Citas de la Semana'}
              </h2>
            </div>
            
            <div className="flex bg-gray-100 rounded-xl p-1">
              <motion.button
                onClick={() => setAppointmentView('today')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  appointmentView === 'today'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hoy
              </motion.button>
              <motion.button
                onClick={() => setAppointmentView('week')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  appointmentView === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Semana
              </motion.button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {appointmentView === 'today' ? renderTodayView() : renderWeekView()}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">Pacientes Activos</h2>
          </div>

          <div className="space-y-4">
            {patients.slice(0, 5).map((patient, index) => (
              <motion.div
                key={patient.id}
                className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-xl border border-gray-200/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {patient.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-gray-600 text-sm">{patient.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {patient.completedSessions || 0}/{patient.totalSessions || 0}
                  </p>
                  <p className="text-xs text-gray-500">sesiones</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;