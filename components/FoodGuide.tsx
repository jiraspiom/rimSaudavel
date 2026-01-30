
import React, { useState, useMemo } from 'react';
import { FOOD_GUIDE } from '../constants';
import { Search, CheckCircle2, XCircle, Info, ThumbsUp, ThumbsDown } from 'lucide-react';

const FoodGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'always' | 'avoid'>('all');

  const filteredFoods = useMemo(() => {
    return FOOD_GUIDE.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || food.recommendation === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          Guia de Consulta Rápida
        </h2>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="O que você quer comer agora?"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
          }`}
        >
          Todos
        </button>
        <button 
          onClick={() => setActiveTab('always')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'always' ? 'bg-green-600 text-white shadow-md' : 'text-slate-500'
          }`}
        >
          <ThumbsUp size={16} /> Pode Comer
        </button>
        <button 
          onClick={() => setActiveTab('avoid')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'avoid' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500'
          }`}
        >
          <ThumbsDown size={16} /> Evitar
        </button>
      </div>

      {/* Categorized View or List View */}
      <div className="space-y-3">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, idx) => (
            <div 
              key={idx}
              className={`bg-white p-5 rounded-3xl shadow-sm border flex items-center justify-between gap-4 transition-all ${
                food.recommendation === 'always' ? 'border-green-100' : 'border-red-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${
                  food.recommendation === 'always' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {food.recommendation === 'always' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{food.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{food.category}</p>
                </div>
              </div>
              
              {food.reason && (
                <div className="hidden md:block max-w-[200px] text-right">
                  <p className="text-xs text-slate-400 italic leading-tight">{food.reason}</p>
                </div>
              )}

              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                food.recommendation === 'always' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {food.recommendation === 'always' ? 'Liberado' : 'Perigo'}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-slate-300">
            <p className="text-lg">Nenhum resultado para sua busca.</p>
          </div>
        )}
      </div>

      <div className="bg-slate-800 p-6 rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-xl">
            <Info size={20} />
          </div>
          <h3 className="font-bold">Dica de Ouro</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          Sempre que comer algo da lista de <span className="text-red-400 font-bold">"Evitar"</span>, tente compensar bebendo o dobro de água e consumindo laticínios na mesma refeição para neutralizar o oxalato.
        </p>
      </div>
    </div>
  );
};

export default FoodGuide;
