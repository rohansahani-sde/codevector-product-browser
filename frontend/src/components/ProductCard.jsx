import React from "react";
import { Smartphone, BookOpen, Shirt, Home as HomeIcon, Trophy, Compass } from "lucide-react";

const getCategoryDetails = (category) => {
  const mappings = {
    Electronics: {
      gradient: "from-blue-500 to-indigo-600",
      icon: Smartphone,
      accent: "text-blue-500 bg-blue-500/10",
      badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/30"
    },
    Books: {
      gradient: "from-amber-400 to-orange-500",
      icon: BookOpen,
      accent: "text-amber-500 bg-amber-500/10",
      badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/30"
    },
    Fashion: {
      gradient: "from-rose-400 to-pink-500",
      icon: Shirt,
      accent: "text-rose-500 bg-rose-500/10",
      badge: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-100 dark:border-rose-900/30"
    },
    Home: {
      gradient: "from-emerald-400 to-teal-500",
      icon: HomeIcon,
      accent: "text-emerald-500 bg-emerald-500/10",
      badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30"
    },
    Sports: {
      gradient: "from-indigo-400 to-violet-500",
      icon: Trophy,
      accent: "text-indigo-500 bg-indigo-500/10",
      badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30"
    }
  };

  return mappings[category] || {
    gradient: "from-slate-400 to-slate-600",
    icon: Compass,
    accent: "text-slate-500 bg-slate-500/10",
    badge: "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border-slate-100 dark:border-slate-800"
  };
};

const ProductCard = ({ product }) => {
  const { gradient, icon: CategoryIcon, badge } = getCategoryDetails(product.category);

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Category Gradient Header */}
      <div className={`h-24 bg-gradient-to-r ${gradient} relative flex items-center justify-center`}>
        {/* Abstract Category Icon in Center */}
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform duration-300">
          <CategoryIcon size={22} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Badge & Price Row */}
          <div className="flex justify-between items-center mb-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${badge}`}>
              {product.category}
            </span>
            <p className="font-extrabold text-lg text-slate-900 dark:text-white">
              ₹{Number(product.price).toLocaleString()}
            </p>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="block text-[9px] text-slate-400 uppercase tracking-wider">Created</span>
            <span className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;