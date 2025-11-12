import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail,
  Calendar,
  Heart,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockPatients } from '../mock/patients';
import { formatDateOnly } from '../utils/dateHelpers';
import AddPatientModal from './modals/AddPatientModal';

const Patients = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'todos', label: 'Todos', count: patients.length },
    { value: 'activo', label: 'Activos', count: patients.filter(p => p.status === 'activo').length },
    { value: 'tratamiento', label: 'En Tratamiento', count: patients.filter(p => p.status === 'tratamiento').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'tratamiento':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'activo':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'tratamiento':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAddPatient = (patientData) => {
    const newPatient = {
      id: Date.now().toString(),
      ...patientData,
      age: parseInt(patientData.age),
      registrationDate: new Date(),
      status: 'activo',
      nextAppointment: null,
      totalSessions: 0,
      completedSessions: 0
    };
    
    setPatients(prev => [newPatient, ...prev]);
    setShowAddModal(false);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pacientes</h1>
          <p className="text-gray-600">Administra la información de todos tus pacientes</p>
        </div>
        
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Nuevo Paciente
        </motion.button>
      </motion.div>

      <motion.div
        className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o condición..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="flex gap-2">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  selectedStatus === option.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
                <span className={`px-2 py-1 rounded-lg text-xs ${
                  selectedStatus === option.value
                    ? 'bg-white/20'
                    : 'bg-gray-200'
                }`}>
                  {option.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {patient.name.split(' ').map(n => n.charAt(0)).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.age} años</p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    {patient.status}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{patient.condition}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span>{patient.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="truncate">{patient.email}</span>
                  </div>

                  {patient.nextAppointment && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{formatDateOnly(patient.nextAppointment)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso</span>
                    <span className="text-sm text-gray-600">
                      {patient.completedSessions}/{patient.totalSessions}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: patient.totalSessions > 0 ? `${(patient.completedSessions / patient.totalSessions) * 100}%` : '0%'
                      }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPatients.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron pacientes</h3>
            <p className="text-gray-500">Intenta cambiar los filtros o agrega un nuevo paciente</p>
          </motion.div>
        )}
      </motion.div>

      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default Patients;