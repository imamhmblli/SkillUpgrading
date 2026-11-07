import React from 'react';
import { Code, BarChart2, Palette, Briefcase, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const categories = [
    { id: 'Semua', label: 'Semua', icon: Layers },
    { id: 'Programming', label: 'Programming', icon: Code },
    { id: 'Data Science', label: 'Data Science', icon: BarChart2 },
    { id: 'Design', label: 'Design', icon: Palette },
    { id: 'Business', label: 'Business', icon: Briefcase },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-[#2D333F] text-white shadow-md shadow-black/20 font-bold'
                : 'bg-white dark:bg-[#101728] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#1E2940] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#162035]'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
