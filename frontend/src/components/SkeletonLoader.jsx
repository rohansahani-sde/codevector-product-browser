import React from "react";

const SkeletonLoader = ({ count = 6, viewMode = "grid" }) => {
  const skeletons = Array.from({ length: count });

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl animate-pulse"
          >
            <div className="flex items-center gap-4">
              {/* Category circle */}
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-shimmer" />
              <div>
                {/* Title */}
                <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer mb-2" />
                {/* Category badge */}
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
              </div>
            </div>
            
            {/* Price & Date */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer mb-2" />
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
              </div>
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between h-48 animate-pulse"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              {/* Category badge */}
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full animate-shimmer" />
              {/* Price placeholder */}
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
            </div>
            {/* Product Name */}
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer mb-2" />
            <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            {/* Date */}
            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
            {/* Quick View Button */}
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
