
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  Droplet, 
  Search, 
  MessageCircle, 
  Menu, 
  X,
  Calendar
} from 'lucide-react';
import { AppTab, WaterLog } from './types';
import Dashboard from './components/Dashboard';
import WaterTracker from './components/WaterTracker';
import FoodGuide from './components/FoodGuide';
import ChatAssistant from './components/ChatAssistant';
import DietPlan from './components/DietPlan';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('rimsaudavel_water');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const today = new Date().setHours(0, 0, 0, 0);
        const filtered = parsed.filter((log: WaterLog) => log.timestamp >= today);
        setWaterLogs(filtered);
      } catch (e) {
        console.error("Error loading water logs", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rimsaudavel_water', JSON.stringify(waterLogs));
  }, [waterLogs]);

  const addWater = useCallback((amount: number) => {
    const newLog: WaterLog = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      timestamp: Date.now(),
    };
    setWaterLogs(prev => [...prev, newLog]);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard waterLogs={waterLogs} onAddWater={addWater} />;
      case AppTab.WATER:
        return <WaterTracker waterLogs={waterLogs} onAddWater={addWater} />;
      case AppTab.DIET_PLAN:
        return <DietPlan />;
      case AppTab.GUIDE:
        return <FoodGuide />;
      case AppTab.ASSISTANT:
        return <ChatAssistant />;
      default:
        return <Dashboard waterLogs={waterLogs} onAddWater={addWater} />;
    }
  };

  const navItems = [
    { id: AppTab.DASHBOARD, label: 'Início', icon: Home },
    { id: AppTab.WATER, label: 'Água', icon: Droplet },
    { id: AppTab.DIET_PLAN, label: 'Plano Diário', icon: Calendar },
    { id: AppTab.GUIDE, label: 'Pode/Não Pode', icon: Search },
    { id: AppTab.ASSISTANT, label: 'Assistente', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Droplet className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">RimSaudável</h1>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <nav className="md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 pb-safe">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors flex-1 ${
              activeTab === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[9px] font-bold uppercase truncate w-full text-center">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
