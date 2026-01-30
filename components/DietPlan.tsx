
import React, { useState } from 'react';
import { WEEKLY_DIET_PLAN } from '../constants';
import { Clock, Info, CheckCircle2, Coffee, Utensils, Moon, Sun, Calendar, AlertCircle } from 'lucide-react';

const DietPlan: React.FC = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const [selectedDay, setSelectedDay] = useState(days[0]);

  const getIcon = (meal: string) => {
    if (meal.includes('Café')) return <Coffee size={20} />;
    if (meal.includes('Almoço') || meal.includes('Jantar')) return <Utensils size={20} />;
    if (meal.includes('Ceia')) return <Moon size={20} />;
    return <Sun size={20} />;
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Plano Semanal Ajustado</h2>
        </div>
        <p className="text-slate-500 text-sm">Este plano segue rigorosamente as diretrizes de prevenção: baixo sódio, 3 laticínios/dia e 3-4 frutas cítricas.</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
            <CheckCircle2 size={12} /> SEM CAFÉ / CHÁ PRETO
          </span>
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
            <CheckCircle2 size={12} /> SEM EMBUTIDOS
          </span>
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
            <CheckCircle2 size={12} /> SEM ESPINAFRE
          </span>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              selectedDay === day 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Daily Content */}
      <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500" key={selectedDay}>
        {WEEKLY_DIET_PLAN[selectedDay].map((item, idx) => (
          <div key={idx} className="relative pl-8">
            {/* Timeline connector */}
            {idx !== WEEKLY_DIET_PLAN[selectedDay].length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-blue-100 z-0"></div>
            )}
            
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center z-10 text-blue-600">
              {getIcon(item.meal)}
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 ml-4 hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.meal}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium uppercase tracking-wider">
                    <Clock size={12} />
                    {item.time}
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {item.items.map((food, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-slate-600 text-sm">
                    <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={16} />
                    {food}
                  </li>
                ))}
              </ul>

              {item.tip && (
                <div className="bg-blue-50/50 p-3 rounded-2xl flex items-start gap-3 border border-blue-50">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-blue-700 italic">{item.tip}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Warning Box */}
      <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
        <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
          <AlertCircle size={20} className="text-red-600" />
          Atenção com o Sal
        </h3>
        <p className="text-sm text-red-800 leading-relaxed">
          O excesso de sal é um dos maiores vilões. Evite temperos prontos (caldos de galinha/carne, shoyu, ketchup). Use temperos naturais como limão, alho, cebola e ervas finas.
        </p>
      </div>
    </div>
  );
};

export default DietPlan;
