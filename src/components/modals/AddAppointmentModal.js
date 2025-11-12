import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Heart } from 'lucide-react';

const AddAppointmentModal = ({ isOpen, onClose, onSubmit, patients = [] }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    date: '',
    time: '',
    duration: 60,
    type: 'Fisioterapia Manual',
    notes: '',
    priority: 'normal'
  });

  const appointmentTypes = [
    'Fisioterapia Manual',
    'Electroterapia',
    'Rehabilitación',
    'Masoterapia',
    'Ejercicio Terapéutico',
    'Osteopatía',
    'Drenaje Linfático',
    'Punción Seca'
  ];

  const durations = [30, 45, 60, 90, 120];
  
  // Horarios cada 15 minutos
  const timeSlots = [
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'patientId') {
        const selectedPatient = patients.find(p => p.id === value);
        updated.patientName = selectedPatient ? selectedPatient.name : '';
      }
      
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentDateTime = new Date(`${formData.date}T${formData.time}:00`);
    
    const appointmentData = {
      ...formData,
      date: appointmentDateTime,
      status: 'pendiente'
    };
    
    onSubmit(appointmentData);
    setFormData({
      patientId: '',
      patientName: '',
      date: '',
      time: '',
      duration: 60,
      type: 'Fisioterapia Manual',
      notes: '',
      priority: 'normal'
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Nueva Cita</h2>
                  <p className="text-gray-600">Programa una cita con tu paciente</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Seleccionar Paciente *
                  </label>
                  <select
                    value={formData.patientId}
                    onChange={(e) => handleInputChange('patientId', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-base"
                    required
                  >
                    <option value="">Elige un paciente...</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.condition}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={getTomorrowDate()}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Hora *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                      required
                    >
                      <option value="">Seleccionar hora...</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipo de Tratamiento *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                      required
                    >
                      {appointmentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Duración (minutos) *
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                      required
                    >
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration} minutos
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Prioridad
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'baja', label: 'Baja', color: 'from-green-500 to-green-600' },
                      { value: 'normal', label: 'Normal', color: 'from-blue-500 to-blue-600' },
                      { value: 'alta', label: 'Alta', color: 'from-red-500 to-red-600' }
                    ].map((priority) => (
                      <motion.button
                        key={priority.value}
                        type="button"
                        onClick={() => handleInputChange('priority', priority.value)}
                        className={`flex-1 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                          formData.priority === priority.value
                            ? `bg-gradient-to-r ${priority.color} text-white shadow-md`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {priority.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Notas Adicionales
                  </label>
                  <textarea
                    rows="4"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 resize-none"
                    placeholder="Observaciones especiales, preparación previa, etc..."
                  />
                </motion.div>

                {formData.patientId && (
                  <motion.div
                    className="bg-purple-50 border border-purple-200 rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900">Información del Paciente</h4>
                    </div>
                    {(() => {
                      const patient = patients.find(p => p.id === formData.patientId);
                      return patient ? (
                        <div className="text-sm text-purple-700">
                          <p><span className="font-medium">Nombre:</span> {patient.name}</p>
                          <p><span className="font-medium">Edad:</span> {patient.age} años</p>
                          <p><span className="font-medium">Condición:</span> {patient.condition}</p>
                          <p><span className="font-medium">Teléfono:</span> {patient.phone}</p>
                        </div>
                      ) : null;
                    })()}
                  </motion.div>
                )}

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Crear Cita
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAppointmentModal;