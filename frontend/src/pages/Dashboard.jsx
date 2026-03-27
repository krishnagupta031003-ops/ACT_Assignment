import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(response.data.data);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please log in again.');
        if (err.response?.status === 401) {
          handleLogout();
        }
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'new') return 'bg-blue-100 text-blue-700 border border-blue-200';
    if (s === 'contacted') return 'bg-amber-100 text-amber-700 border border-amber-200';
    if (s === 'qualified') return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    return 'bg-slate-100 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 transition-shadow hover:shadow-md">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          MyApp Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 hidden sm:inline-block">
            Welcome, <span className="text-indigo-600 font-semibold">{user?.name || 'User'}</span>!
          </span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 border border-red-100 hover:border-transparent active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex-1 w-full max-w-7xl mx-auto p-6 lg:p-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 mb-8 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        {!dashboardData && !error ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Loading dashboard data...</p>
            </div>
          </div>
        ) : dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Leads Column */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                Recent Leads
                <span className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-full font-bold">{dashboardData.leads?.length || 0}</span>
              </h3>
              <ul className="space-y-1">
                {dashboardData.leads?.map(lead => (
                  <li key={lead.id} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 group-hover:border-slate-100 transition-colors">
                    <span className="font-medium text-slate-700">{lead.name}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tasks Column */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                Your Tasks
                <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-bold">
                  {dashboardData.tasks?.filter(t => t.completed).length || 0}/{dashboardData.tasks?.length || 0}
                </span>
              </h3>
              <ul className="space-y-1">
                {dashboardData.tasks?.map(task => (
                  <li key={task.id} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 group-hover:border-slate-100 transition-colors">
                    <span className={`${task.completed ? 'text-slate-400 line-through' : 'font-medium text-slate-700'}`}>
                      {task.title}
                    </span>
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full border ${task.completed ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-300 text-transparent'}`}>
                      {task.completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Users Column */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                Active Users
                <span className="bg-violet-50 text-violet-600 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
                  {dashboardData.users?.length || 0}
                </span>
              </h3>
              <ul className="space-y-3 pt-1">
                {dashboardData.users?.map(u => (
                  <li key={u.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200/50">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{u.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {u.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
