
import React from 'react';
import { WaterLog } from '../types';
import { Plus, Trash2, Droplet, Clock, Info } from 'lucide-react';

interface WaterTrackerProps {
  waterLogs: WaterLog[];
  onAddWater: (amount: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ waterLogs, onAddWater }) => {
  const totalWater = waterLogs.reduce((sum, log) => sum + log.amount, 0);
  const goal = 2500;

  const urineColors = [
    { color: '#ffffff', label: 'Hidratado', desc: 'Sua urina está clara e límpida. Continue assim!', border: '#e2e8f0' },
    { color: '#fef3c7', label: 'Bom', desc: 'Pequena concentração, beba um pouco mais de água.', border: '#fbbf24' },
    { color: '#fde68a', label: 'Atenção', desc: 'Sinal de desidratação leve. Beba água agora.', border: '#f59e0b' },
    { color: '#f59e0b', label: 'Desidratado', desc: 'Urina muito concentrada. Perigo para cálculos.', border: '#d97706' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <div className="inline-flex flex-col items-center justify-center w-48 h-48 rounded-full border-8 border-slate-50 relative">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-full transition-all duration-1000"
            style={{ height: `${Math.min((totalWater / goal) * 100, 100)}%` }}
          ></div>
          <div className="relative z-10">
            <p className="text-4xl font-black text-slate-800">{(totalWater / 1000).toFixed(1)}L</p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest mt-1">Total Hoje</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {[200, 300, 500, 1000].map(amt => (
            <button
              key={amt}
              onClick={() => onAddWater(amt)}
              className="py-4 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-2xl font-bold text-slate-600 transition-all flex flex-col items-center gap-1"
            >
              <Plus size={18} />
              {amt}ml
            </button>
          ))}
        </div>
      </div>

      {/* Urine Guide */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          Guia de Cor da Urina
        </h3>
        <p className="text-sm text-slate-500 mb-6">A cor da sua urina é o melhor indicador da sua hidratação.</p>
        <div className="grid grid-cols-2 gap-4">
          {urineColors.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2">
              <div 
                className="w-12 h-12 rounded-full border-2" 
                style={{ backgroundColor: item.color, borderColor: item.border }}
              ></div>
              <span className="text-xs font-bold text-slate-700 uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-slate-400" />
            Histórico de Hoje
          </h3>
          <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-full text-slate-500">{waterLogs.length} registros</span>
        </div>
        <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
          {waterLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-400">Nenhum registro hoje.</div>
          ) : (
            waterLogs.slice().reverse().map(log => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Droplet size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">{log.amount}ml</p>
                    <p className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
