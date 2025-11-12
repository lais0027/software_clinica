import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  User, 
  Clock, 
  Plus,
  Search,
  TrendingUp,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { mockTreatments } from '../mock/treatments';
import { mockPatients } from '../mock/patients';
import { formatDate, formatDateOnly } from '../utils/dateHelpers';

const Treatments = () => {
  const [treatments, setTreatments] = useState(mockTreatments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [showAddForm, setShowAddForm] = useState(false);

  const treatmentTypes = [
    'Fisioterapia Manual',
    'Electroterapia',
    'Rehabilitación',
    'Masoterapia',
    'Ejercicio Terapéutico'
  ];

  const filteredTreatments = treatments.filter(treatment => {
    const patient = mockPatients.find(p => p.id === treatment.patientId);
    const matchesSearch = patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'todos' || treatment.type === selectedType;
    return matchesSearch && matchesType;
  });

  const typeOptions = [
    { value: 'todos', label: 'Todos los Tipos', count: treatments.length },
    ...treatmentTypes.map(type => ({
      value: type,
      label: type,
      count: treatments.filter(t => t.type === type).length
    }))
  ];

  const totalRevenue = treatments.reduce((sum, treatment) => sum + treatment.cost, 0);
  const averageSessionTime = treatments.reduce((sum, treatment) => sum + treatment.duration, 0) / treatments.length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial de Tratamientos</h1>
          <p className="text-gray-600">Registro completo de sesiones y evolución de pacientes</p>
        </div>
        
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Nueva Sesión
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{treatments.length}</h3>
          <p className="text-green-700 font-medium">Tratamientos Realizados</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{Math.round(averageSessionTime)}</h3>
          <p className="text-blue-700 font-medium">Minutos Promedio</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">€{totalRevenue}</h3>
          <p className="text-purple-700 font-medium">Ingresos Generados</p>
        </motion.div>
      </div>

      <motion.div
        className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por paciente, tipo de tratamiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.count})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment, index) => {
              const patient = mockPatients.find(p => p.id === treatment.patientId);
              
              return (
                <motion.div
                  key={treatment.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-gradient-to-r from-gray-50 to-white border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {patient?.name.split(' ').map(n => n.charAt(0)).join('') || 'P'}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {patient?.name || 'Paciente Desconocido'}
                          </h3>
                          <p className="text-sm text-gray-600">{treatment.type}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{formatDateOnly(treatment.date)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span>{treatment.duration} minutos</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {treatment.description}
                        </p>
                      </div>

                      {treatment.observations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Observaciones</h4>
                          <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                            {treatment.observations}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                          <p className="text-2xl font-bold text-green-700">€{treatment.cost}</p>
                          <p className="text-sm text-green-600">Coste de Sesión</p>
                        </div>

                        {treatment.nextSession && (
                          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                            <p className="text-sm font-semibold text-blue-700">Próxima Sesión</p>
                            <p className="text-sm text-blue-600">
                              {formatDate(treatment.nextSession)}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <motion.button
                          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FileText className="w-4 h-4" />
                          Ver
                        </motion.button>
                        <motion.button
                          className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Completar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredTreatments.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron tratamientos</h3>
              <p className="text-gray-500">Intenta cambiar los filtros o agrega un nuevo tratamiento</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Treatments;