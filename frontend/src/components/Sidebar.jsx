import React from "react";
import { Compass, Smartphone, BookOpen, Shirt, Home as HomeIcon, Trophy } from "lucide-react";

const categoryList = [
  { id: "", label: "All Products", icon: Compass, color: "text-violet-500 bg-violet-500/10" },
  { id: "Electronics", label: "Electronics", icon: Smartphone, color: "text-blue-500 bg-blue-500/10" },
  { id: "Books", label: "Books", icon: BookOpen, color: "text-amber-500 bg-amber-500/10" },
  { id: "Fashion", label: "Fashion", icon: Shirt, color: "text-rose-500 bg-rose-500/10" },
  { id: "Home", label: "Home", icon: HomeIcon, color: "text-emerald-500 bg-emerald-500/10" },
  { id: "Sports", label: "Sports", icon: Trophy, color: "text-indigo-500 bg-indigo-500/10" },
];

const Sidebar = ({ activeCategory, setCategory }) => {
  return (
    <aside className="w-full lg:w-64 flex flex-col gap-6 lg:shrink-0">
      {/* Category selector panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 tracking-wider uppercase">
          Browse Categories
        </h3>
        
        {/* Responsive flex on mobile, column on desktop */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 scroll-smooth">
          {categoryList.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${isActive ? "bg-white/20 text-white dark:bg-slate-900 dark:text-white" : cat.color}`}>
                  <Icon size={16} />
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
