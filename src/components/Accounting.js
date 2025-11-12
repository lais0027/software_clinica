import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Calendar,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  TrendingUp,
  Euro,
  Filter,
  Download,
  Eye,
  Edit,
  X
} from 'lucide-react';

const Accounting = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Datos de ejemplo de pagos
  const [payments, setPayments] = useState([
    {
      id: '1',
      patientName: 'María González',
      amount: 45,
      method: 'tarjeta',
      date: new Date('2025-01-20'),
      concept: 'Fisioterapia Manual',
      sessionId: '1'
    },
    {
      id: '2',
      patientName: 'Carlos Ruiz',
      amount: 35,
      method: 'efectivo',
      date: new Date('2025-01-20'),
      concept: 'Electroterapia',
      sessionId: '2'
    },
    {
      id: '3',
      patientName: 'Ana Martín',
      amount: 50,
      method: 'bizum',
      date: new Date('2025-01-19'),
      concept: 'Rehabilitación',
      sessionId: '3'
    },
    {
      id: '4',
      patientName: 'María González',
      amount: 45,
      method: 'transferencia',
      date: new Date('2025-01-18'),
      concept: 'Fisioterapia Manual',
      sessionId: '4'
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    patientName: '',
    amount: '',
    method: 'efectivo',
    concept: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });

  const paymentMethods = [
    { value: 'efectivo', label: 'Efectivo', icon: Banknote, color: 'from-green-500 to-green-600' },
    { value: 'tarjeta', label: 'Tarjeta', icon: CreditCard, color: 'from-blue-500 to-blue-600' },
    { value: 'bizum', label: 'Bizum', icon: Smartphone, color: 'from-purple-500 to-purple-600' },
    { value: 'transferencia', label: 'Transferencia', icon: TrendingUp, color: 'from-amber-500 to-amber-600' }
  ];

  const handleInputChange = (field, value) => {
    setNewPayment(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const payment = {
      id: Date.now().toString(),
      ...newPayment,
      amount: parseFloat(newPayment.amount),
      date: new Date(newPayment.date)
    };
    
    setPayments(prev => [payment, ...prev]);
    setNewPayment({
      patientName: '',
      amount: '',
      method: 'efectivo',
      concept: '',
      date: new Date().toISOString().split('T')[0],
      receipt: null
    });
    setShowPaymentModal(false);
  };

  // Estadísticas
  const totalToday = payments
    .filter(p => new Date(p.date).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalMonth = payments.reduce((sum, p) => sum + p.amount, 0);
  
  const methodStats = paymentMethods.map(method => ({
    ...method,
    count: payments.filter(p => p.method === method.value).length,
    total: payments.filter(p => p.method === method.value).reduce((sum, p) => sum + p.amount, 0)
  }));

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.concept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contabilidad</h1>
            <p className="text-gray-600">Gestión de pagos y finanzas de la clínica</p>
          </div>
          <motion.button
            onClick={() => setShowPaymentModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Registrar Pago
          </motion.button>
        </div>
      </motion.div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <Euro className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalToday}€</h3>
          <p className="text-gray-600 font-medium">Ingresos Hoy</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalMonth}€</h3>
          <p className="text-gray-600 font-medium">Total Mes</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-purple-50 border border-purple-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{payments.length}</h3>
          <p className="text-gray-600 font-medium">Transacciones</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-amber-50 to-amber-50 border border-amber-200/50 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{Math.round(totalMonth / payments.length)}€</h3>
          <p className="text-gray-600 font-medium">Promedio</p>
        </motion.div>
      </div>

      {/* Métodos de pago */}
      <motion.div
        className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Métodos de Pago</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {methodStats.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.value}
                className="bg-gray-50/80 border border-gray-200/50 rounded-xl p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 bg-gradient-to-br ${method.color} rounded-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">{method.label}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-gray-900">{method.total}€</p>
                  <p className="text-sm text-gray-600">{method.count} transacciones</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Lista de pagos con filtros */}
      <motion.div
        className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por paciente o concepto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>
          </div>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option value="all">Todos los métodos</option>
            {paymentMethods.map(method => (
              <option key={method.value} value={method.value}>{method.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredPayments.map((payment, index) => {
            const method = paymentMethods.find(m => m.value === payment.method);
            const Icon = method?.icon || Banknote;
            
            return (
              <motion.div
                key={payment.id}
                className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <div className={`p-3 bg-gradient-to-br ${method?.color || 'from-gray-500 to-gray-600'} rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{payment.patientName}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                      {method?.label}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{payment.concept}</p>
                  <p className="text-gray-500 text-xs">
                    {payment.date.toLocaleDateString('es-ES')}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{payment.amount}€</p>
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal de nuevo pago */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPaymentModal(false)}
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Euro className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Registrar Pago</h2>
                    <p className="text-gray-600">Añadir un nuevo pago al sistema</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[70vh]">
                <form onSubmit={handleAddPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Paciente *
                      </label>
                      <input
                        type="text"
                        value={newPayment.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Nombre del paciente"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Cantidad (€) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={newPayment.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="0.00"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Método de Pago *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        const isSelected = newPayment.method === method.value;
                        
                        return (
                          <motion.button
                            key={method.value}
                            type="button"
                            onClick={() => handleInputChange('method', method.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? `border-blue-500 bg-gradient-to-br ${method.color} text-white`
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                            <span className="text-sm font-medium">{method.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Concepto *
                      </label>
                      <input
                        type="text"
                        value={newPayment.concept}
                        onChange={(e) => handleInputChange('concept', e.target.value)}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Ej: Fisioterapia Manual"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Fecha *
                      </label>
                      <input
                        type="date"
                        value={newPayment.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        required
                      />
                    </motion.div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <motion.button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Registrar Pago
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accounting;