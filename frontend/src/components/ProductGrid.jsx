import React from "react";
import ProductCard from "./ProductCard";
import SkeletonLoader from "./SkeletonLoader";
import { PackageOpen } from "lucide-react";

const ProductGrid = ({ 
  products, 
  loading, 
  viewMode = "grid" 
}) => {
  // If loading and there are no products yet, show skeletons
  if (loading && (!products || products.length === 0)) {
    return <SkeletonLoader count={9} viewMode={viewMode} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400">
          <PackageOpen size={36} />
        </div>
        <div className="text-slate-800 dark:text-slate-200 font-bold text-lg">No products found</div>
        <p className="text-sm text-slate-500 max-w-sm">
          There are no products in this selection. Try changing the filters or category parameters.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => {
          return (
            <div 
              key={product.id || product._id}
              className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-md hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <PackageOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right mr-4">
                  <span className="block text-[9px] text-slate-400 uppercase tracking-wider">Price</span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        return (
          <ProductCard 
            key={product.id || product._id} 
            product={product} 
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
