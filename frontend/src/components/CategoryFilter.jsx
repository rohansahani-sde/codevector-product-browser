import React from "react";

const categories = ["All", "Electronics", "Books", "Fashion", "Home", "Sports"];

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
        Category Filter
      </span>
      
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        {categories.map((cat) => {
          const val = cat === "All" ? "" : cat;
          const isActive = (category === "" && cat === "All") || (category === cat);

          return (
            <button
              key={cat}
              onClick={() => setCategory(val)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 shrink-0 select-none ${
                isActive
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;