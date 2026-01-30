
import React, { useState, useEffect } from 'react';
import { WEEKLY_DIET_PLAN } from '../constants';
import { Clock, Info, CheckCircle2, Coffee, Utensils, Moon, Sun, Calendar, AlertCircle } from 'lucide-react';

const DietPlan: React.FC = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  
  // Mapeia o dia da semana do JS (0-Dom a 6-Sab) para o índice do nosso array
  // JS: 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab
  // Nosso: 0=Seg, 1=Ter, 2=Qua, 3=Qui, 4=Sex, 5=Sab, 6=Dom
  const getCurrentDayIndex = () => {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  };

  const [selectedDay, setSelectedDay] = useState(days[getCurrentDayIndex()]);

  // Garante que ao montar o componente, o dia atual seja selecionado
  useEffect(() => {
    setSelectedDay(days[getCurrentDayIndex()]);
  }, []);

  const getIcon = (meal: string) => {
    if (meal.includes('Café')) return <Coffee size={20} />;
    if (meal.includes('Almoço') || meal.includes('Jantar')) return <Utensils size={20} />;
    if (meal.includes('Ceia')) return <Moon size={20} />;
    return <Sun size={20} />;
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Plano Diário</h2>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">
          Nutrição estratégica para prevenir cálculos. Consuma 3 laticínios e 3-4 porções de frutas cítricas hoje.
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1">
            <CheckCircle2 size={12} /> HOJE É {selectedDay.toUpperCase()}
          </span>
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
            <CheckCircle2 size={12} /> DIRETRIZES ATIVAS
          </span>
        </div>
      </div>

      {/* Day Selector - Melhorado para Mobile */}
      <div className="sticky top-[72px] z-30 bg-slate-50/80 backdrop-blur-md py-2 -mx-4 px-4 overflow-x-auto scrollbar-hide flex gap-2">
        {days.map((day) => {
          const isToday = days[getCurrentDayIndex()] === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 min-w-[100px] flex flex-col items-center gap-0.5 ${
                selectedDay === day 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                  : 'bg-white text-slate-500 border border-slate-100 active:bg-slate-100'
              }`}
            >
              <span>{day}</span>
              {isToday && <span className={`text-[8px] uppercase ${selectedDay === day ? 'text-blue-100' : 'text-blue-500'}`}>Hoje</span>}
            </button>
          );
        })}
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

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 ml-4 active:scale-[0.98] transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.meal}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium uppercase tracking-wider">
                    <Clock size={12} />
                    {item.time}
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-4">
                {item.items.map((food, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-slate-600 text-[15px] leading-tight">
                    <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                    {food}
                  </li>
                ))}
              </ul>

              {item.tip && (
                <div className="bg-blue-50/50 p-3 rounded-2xl flex items-start gap-3 border border-blue-50">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-[13px] text-blue-700 italic leading-snug">{item.tip}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Alert */}
      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 mb-8">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <AlertCircle size={20} className="text-amber-600" />
          Dica de Preparo
        </h3>
        <p className="text-[14px] text-amber-800 leading-relaxed">
          Evite temperos industrializados mesmo no fim de semana. O sódio "escondido" em caldos prontos é um grande gatilho para cálculos.
        </p>
      </div>
    </div>
  );
};

export default DietPlan;
