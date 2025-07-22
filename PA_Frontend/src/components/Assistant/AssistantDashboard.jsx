import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Heart, Users, Clock, TrendingUp, Settings, Bell,
  Activity, Bot, Calendar, Download, RefreshCw, Search,
  ChevronRight, AlertCircle, CheckCircle, XCircle, Phone,
  Shield, Home, Pill, UserCheck, Stethoscope, MapPin
} from 'lucide-react';

const ElderlyAssistantDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState([
    { id: 1, type: 'urgent', message: 'Mrs. Johnson missed medication reminder', time: '15 minutes ago', severity: 'high' },
    { id: 2, type: 'info', message: 'Daily wellness check completed for 12 clients', time: '2 hours ago', severity: 'low' },
    { id: 3, type: 'warning', message: 'Mr. Smith requires appointment reminder', time: '4 hours ago', severity: 'medium' }
  ]);

  // Sample data focused on elderly care
  const assistanceData = [
    { name: 'Mon', medication: 15, appointments: 8, wellness: 12, emergency: 2 },
    { name: 'Tue', medication: 18, appointments: 12, wellness: 14, emergency: 1 },
    { name: 'Wed', medication: 16, appointments: 6, wellness: 11, emergency: 0 },
    { name: 'Thu', medication: 20, appointments: 15, wellness: 16, emergency: 3 },
    { name: 'Fri', medication: 17, appointments: 9, wellness: 13, emergency: 1 },
    { name: 'Sat', medication: 14, appointments: 4, wellness: 10, emergency: 1 },
    { name: 'Sun', medication: 13, appointments: 3, wellness: 9, emergency: 0 }
  ];

  const dailyActivityData = [
    { hour: '06:00', activities: 5 },
    { hour: '09:00', activities: 25 },
    { hour: '12:00', activities: 40 },
    { hour: '15:00', activities: 35 },
    { hour: '18:00', activities: 30 },
    { hour: '21:00', activities: 15 }
  ];

  const serviceCategories = [
    { name: 'Medication Reminders', value: 32, color: '#ef4444' },
    { name: 'Appointment Scheduling', value: 24, color: '#3b82f6' },
    { name: 'Wellness Checks', value: 22, color: '#10b981' },
    { name: 'Emergency Alerts', value: 12, color: '#f59e0b' },
    { name: 'Family Updates', value: 10, color: '#8b5cf6' }
  ];

  const recentAssistanceRequests = [
    { id: 1, client: 'Margaret Wilson', age: 78, service: 'Medication Reminder', status: 'completed', priority: 'high', time: '2m ago' },
    { id: 2, client: 'Robert Chen', age: 82, service: 'Doctor Appointment', status: 'in_progress', priority: 'medium', time: '15m ago' },
    { id: 3, client: 'Dorothy Smith', age: 75, service: 'Wellness Check', status: 'completed', priority: 'low', time: '1h ago' },
    { id: 4, client: 'Frank Johnson', age: 86, service: 'Emergency Alert', status: 'resolved', priority: 'urgent', time: '2h ago' }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ElderCare Assistant</h1>
                  <p className="text-sm text-gray-600">Personal assistance for seniors</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                24/7 Active
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients or services..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Emergency</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">147</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5 new this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Assistance</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from yesterday
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency Response</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">47s</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                  -8s improvement
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">98.2%</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +1.4% this month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Service Overview</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assistanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="medication" fill="#ef4444" name="Medication" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="appointments" fill="#3b82f6" name="Appointments" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="wellness" fill="#10b981" name="Wellness Checks" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="emergency" fill="#f59e0b" name="Emergency" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Activity Pattern */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Daily Activity Patterns</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Export Report <Download className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activities" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Assistance Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Assistance Requests</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All Clients <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAssistanceRequests.map((req) => (
                      <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{req.client}</div>
                          <div className="text-sm text-gray-500">Age {req.age}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {req.service.includes('Medication') && <Pill className="w-4 h-4 text-red-500" />}
                            {req.service.includes('Appointment') && <Calendar className="w-4 h-4 text-blue-500" />}
                            {req.service.includes('Wellness') && <Stethoscope className="w-4 h-4 text-green-500" />}
                            {req.service.includes('Emergency') && <AlertCircle className="w-4 h-4 text-orange-500" />}
                            <span className="text-gray-600">{req.service}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(req.priority)}`}>
                            {req.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{req.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Emergency Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                    {alert.severity === 'high' && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                        Urgent
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Service Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Distribution</h2>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {serviceCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm text-gray-600">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <Pill className="w-6 h-6 text-red-600 mb-2" />
                  <span className="text-sm font-medium text-red-700">Med Reminder</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-700">Schedule</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Stethoscope className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-700">Wellness</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Home className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-700">Home Care</span>
                </button>
              </div>
            </div>

            {/* Family Contact */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Family Connect</h3>
              <p className="text-blue-100 text-sm mb-4">Stay connected with family members and caregivers</p>
              <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Send Family Update
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElderlyAssistantDashboard;