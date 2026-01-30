
import React from 'react';
import { WaterLog } from '../types';
import { Droplet, Info, ChevronRight, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface DashboardProps {
  waterLogs: WaterLog[];
  onAddWater: (amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ waterLogs, onAddWater }) => {
  const totalWater = waterLogs.reduce((sum, log) => sum + log.amount, 0);
  const dailyGoal = 2500; // Average of 2-3L recommended
  const progressPercent = Math.min((totalWater / dailyGoal) * 100, 100);

  // Group water by hour for the chart
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    amount: waterLogs
      .filter(log => new Date(log.timestamp).getHours() === i)
      .reduce((sum, log) => sum + log.amount, 0)
  })).filter(d => d.amount > 0 || (new Date().getHours() >= parseInt(d.hour)));

  return (
    <div className="space-y-6 pb-8">
      {/* Daily Progress Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Progresso de Hoje</h2>
              <p className="text-3xl font-bold text-slate-800">{(totalWater / 1000).toFixed(1)}L <span className="text-lg font-normal text-slate-400">/ {(dailyGoal / 1000).toFixed(1)}L</span></p>
            </div>
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <Droplet className="text-white w-6 h-6" />
            </div>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full mb-6">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => onAddWater(250)}
              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              +250ml
            </button>
            <button 
              onClick={() => onAddWater(500)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-100"
            >
              +500ml
            </button>
          </div>
        </div>
      </div>

      {/* Grid for Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Oxalate Warning */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
          <div className="p-3 bg-amber-50 rounded-2xl">
            <AlertTriangle className="text-amber-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Cuidado com Oxalatos</h3>
            <p className="text-sm text-slate-500 mt-1">Evite café, chocolate e espinafre em excesso.</p>
          </div>
        </div>

        {/* Citric Acid Tip */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
          <div className="p-3 bg-green-50 rounded-2xl">
            <CheckCircle2 className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Suco Amigo</h3>
            <p className="text-sm text-slate-500 mt-1">Limonada natural ajuda a prevenir a formação de cálculos.</p>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          Consumo por Hora
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {hourlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.amount > 0 ? '#2563eb' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Informational Sections */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-1">Saiba Mais</h3>
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-100">
          <div className="flex justify-between items-start mb-4">
            <Scale className="w-8 h-8 opacity-80" />
            <span className="text-xs font-bold uppercase bg-white/20 px-2 py-1 rounded-full">Dica Médica</span>
          </div>
          <h4 className="text-xl font-bold mb-2">Reduza o Sal!</h4>
          <p className="text-blue-100 text-sm leading-relaxed mb-4">
            O excesso de sal aumenta a excreção de cálcio na urina, favorecendo a formação de pedras. Use ervas naturais como orégano e salsinha.
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold cursor-pointer group">
            Ver guia alimentar <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
