import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Plus, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatDate, formatTime, getUpcomingDays } from '../utils/dateHelpers';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths, getYear, setYear } from 'date-fns';
import { es } from 'date-fns/locale';
import AddAppointmentModal from './modals/AddAppointmentModal';

const Appointments = ({ appointments = [], setAppointments, patients = [], onAddAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('day'); // day, week, month, year
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const upcomingDays = getUpcomingDays(7);
  
  const selectedDateAppointments = appointments.filter(apt => 
    isSameDay(apt.date, selectedDate)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pendiente':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelada':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmada':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pendiente':
        return <Clock className="w-4 h-4" />;
      case 'cancelada':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleAddAppointment = (appointmentData) => {
    onAddAppointment(appointmentData);
    setShowAddModal(false);
  };

  const getDaysInMonth = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => isSameDay(apt.date, date));
  };

  const viewModeOptions = [
    { value: 'day', label: 'Día' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mes' },
    { value: 'year', label: 'Año' }
  ];

  const renderYearView = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(currentYear, i, 1));
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setCurrentYear(currentYear - 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <h2 className="text-3xl font-bold text-gray-900">{currentYear}</h2>
            
            <motion.button
              onClick={() => setCurrentYear(currentYear + 1)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Con citas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Sin citas</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {months.map((month, monthIndex) => {
            const days = getDaysInMonth(month);
            const monthName = format(month, 'MMMM', { locale: es });
            
            return (
              <motion.div
                key={monthIndex}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: monthIndex * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 capitalize">{monthName}</h3>
                  <p className="text-sm text-gray-500">{currentYear}</p>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                    <div key={index} className="text-center text-xs font-medium text-gray-500 p-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: (days[0].getDay() + 6) % 7 }, (_, index) => (
                    <div key={`empty-${index}`} className="p-1"></div>
                  ))}
                  
                  {days.map((day, dayIndex) => {
                    const dayAppointments = getAppointmentsForDate(day);
                    const hasAppointments = dayAppointments.length > 0;
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <motion.button
                        key={dayIndex}
                        onClick={() => {
                          setSelectedDate(day);
                          setViewMode('day');
                        }}
                        className={`relative p-1 text-xs rounded-lg transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : isToday
                            ? 'bg-blue-100 text-blue-700 font-bold'
                            : hasAppointments
                            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {format(day, 'd')}
                        {hasAppointments && (
                          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-blue-500'
                          }`}>
                            <div className="absolute inset-0 rounded-full bg-current opacity-75 animate-pulse"></div>
                          </div>
                        )}
                        {dayAppointments.length > 3 && (
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full text-white text-xs flex items-center justify-center ${
                            isSelected ? 'bg-white text-blue-500' : 'bg-red-500'
                          }`} style={{ fontSize: '8px' }}>
                            {dayAppointments.length}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {appointments.filter(apt => isSameMonth(apt.date, month)).length}
                      </p>
                      <p className="text-gray-500">Citas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-green-700">
                        {appointments.filter(apt => isSameMonth(apt.date, month) && apt.status === 'confirmada').length}
                      </p>
                      <p className="text-gray-500">Confirmadas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-amber-700">
                        {appointments.filter(apt => isSameMonth(apt.date, month) && apt.status === 'pendiente').length}
                      </p>
                      <p className="text-gray-500">Pendientes</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentMonth);
    const monthName = format(currentMonth, 'MMMM yyyy', { locale: es });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{monthName}</h2>
            
            <motion.button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
              <div key={index} className="text-center font-semibold text-gray-700 p-3">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: (days[0].getDay() + 6) % 7 }, (_, index) => (
              <div key={`empty-${index}`} className="p-4"></div>
            ))}
            
            {days.map((day, dayIndex) => {
              const dayAppointments = getAppointmentsForDate(day);
              const hasAppointments = dayAppointments.length > 0;
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              
              return (
                <motion.div
                  key={dayIndex}
                  className={`min-h-[100px] p-3 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : isToday
                      ? 'border-purple-300 bg-purple-50'
                      : hasAppointments
                      ? 'border-gray-300 bg-gray-50 hover:border-gray-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <motion.button
                      onClick={() => setSelectedDate(day)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : isToday
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {format(day, 'd')}
                    </motion.button>
                    
                    {hasAppointments && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {dayAppointments.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        className="text-xs p-2 rounded bg-blue-100 text-blue-800 truncate cursor-pointer"
                        onClick={() => setSelectedDate(day)}
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="font-medium">{formatTime(appointment.date)}</div>
                        <div className="truncate">{appointment.patientName}</div>
                      </motion.div>
                    ))}
                    
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 text-center py-1">
                        +{dayAppointments.length - 2} más
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="space-y-2">
        {upcomingDays.map((date, index) => {
          const dayAppointments = appointments.filter(apt => isSameDay(apt.date, date));
          const isSelected = isSameDay(date, selectedDate);
          
          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {format(date, 'EEEE', { locale: es })}
                  </p>
                  <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                    {format(date, 'd MMM', { locale: es })}
                  </p>
                </div>
                
                {dayAppointments.length > 0 && (
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {dayAppointments.length}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agenda de Citas</h1>
          <p className="text-gray-600">Administra las citas de todos tus pacientes</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {viewModeOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setViewMode(option.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  viewMode === option.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
          
          <motion.button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Nueva Cita
          </motion.button>
        </div>
      </motion.div>

      {viewMode === 'year' ? (
        <motion.div
          key="year-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderYearView()}
        </motion.div>
      ) : viewMode === 'month' ? (
        <motion.div
          key="month-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderMonthView()}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            className="lg:col-span-1 bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">
                {viewMode === 'day' ? 'Calendario' : 'Esta Semana'}
              </h2>
            </div>

            {viewMode === 'week' ? renderWeekView() : (
              <div className="space-y-2">
                {upcomingDays.map((date, index) => {
                  const dayAppointments = appointments.filter(apt => isSameDay(apt.date, date));
                  const isSelected = isSameDay(date, selectedDate);
                  
                  return (
                    <motion.button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {format(date, 'EEEE', { locale: es })}
                          </p>
                          <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                            {format(date, 'd MMM', { locale: es })}
                          </p>
                        </div>
                        
                        {dayAppointments.length > 0 && (
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {dayAppointments.length}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-3 bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  Citas del {format(selectedDate, "d 'de' MMMM", { locale: es })}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{selectedDateAppointments.length} citas programadas</span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedDateAppointments.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No hay citas programadas
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Este día está libre para nuevas citas
                  </p>
                  <motion.button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Agendar Cita
                  </motion.button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {selectedDateAppointments
                    .sort((a, b) => a.date - b.date)
                    .map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="bg-gradient-to-r from-gray-50 to-white border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {formatTime(appointment.date)}
                            </span>
                            <span className="text-white/80 text-xs">
                              {appointment.duration}min
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {appointment.patientName}
                            </h3>
                            <p className="text-gray-600 font-medium">
                              {appointment.type}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-2">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status === 'confirmada' ? 'Confirmada' : 
                           appointment.status === 'pendiente' ? 'Pendiente' : 'Cancelada'}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>Duración: {appointment.duration} minutos</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <motion.button
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-300 text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Confirmar
                          </motion.button>
                          <motion.button
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-300 text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Cancelar
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddAppointment}
        patients={patients}
      />
    </div>
  );
};

export default Appointments;