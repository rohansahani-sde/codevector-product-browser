import React, { useEffect } from "react";
import { X, ShoppingBag, Calendar, Tag, ShieldCheck, RefreshCw } from "lucide-react";

const getMockDetails = (product) => {
  const name = product.name || "";
  const cat = product.category || "";
  
  const specs = {
    Electronics: [
      { label: "Model", value: "EV-" + Math.floor(Math.random() * 900 + 100) },
      { label: "Connectivity", value: "Bluetooth 5.2 / Ultra Wireless" },
      { label: "Battery Life", value: "Up to 24 Hours Active" },
      { label: "Warranty", value: "2 Year Manufacturer Warranty" }
    ],
    Books: [
      { label: "Format", value: "Hardcover (Collector Edition)" },
      { label: "Publisher", value: "CodeVector Press" },
      { label: "Language", value: "English" },
      { label: "Pages", value: Math.floor(Math.random() * 450 + 150) + " Pages" }
    ],
    Fashion: [
      { label: "Material", value: "100% Premium Organic Cotton" },
      { label: "Fit Type", value: "Modern Regular / Comfort Fit" },
      { label: "Care", value: "Machine Wash Cold, Hang Dry" },
      { label: "Origin", value: "Ethically Sourced" }
    ],
    Home: [
      { label: "Dimensions", value: "45cm x 45cm x 30cm" },
      { label: "Material", value: "Eco-Friendly Biodegradable Composites" },
      { label: "Weight", value: "1.2 kg" },
      { label: "Assembly", value: "Zero Assembly Required" }
    ],
    Sports: [
      { label: "Durability", value: "Reinforced Impact Protection" },
      { label: "Weight", value: "Aero Lightweight (290g)" },
      { label: "Skill Level", value: "Intermediate to Professional" },
      { label: "Weather Resistance", value: "Water & Sweat Proof" }
    ]
  };

  const defaultSpecs = [
    { label: "SKU", value: "CV-" + Math.floor(Math.random() * 90000 + 10000) },
    { label: "Condition", value: "Brand New" },
    { label: "Availability", value: "In Stock" },
    { label: "Shipping", value: "Free Express Shipping" }
  ];

  return {
    description: `Experience the exceptional craftsmanship of the ${name}. Formulated to meet high professional standards, this ${cat.toLowerCase()} essential delivers unmatched reliability and sleek style. Perfect for everyday integration and specialized use alike.`,
    specifications: specs[cat] || defaultSpecs
  };
};

const ProductModal = ({ product, isOpen, onClose, onBuy }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const { description, specifications } = getMockDetails(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col transform scale-100 transition-all duration-300">
        
        {/* Header decoration banner */}
        <div className="h-32 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 flex items-end p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/20 backdrop-blur-md uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 drop-shadow-sm truncate max-w-md">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Info Row */}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Standard Price</p>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                ₹{Number(product.price).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={15} className="text-slate-400" />
                <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Description</h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>

          {/* Specs */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Key Details</h4>
            <div className="grid grid-cols-2 gap-3">
              {specifications.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights icons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center p-3 border border-slate-100 dark:border-slate-900 rounded-xl text-center">
              <ShieldCheck size={20} className="text-green-500 mb-1" />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Genuine Product</span>
            </div>
            <div className="flex flex-col items-center p-3 border border-slate-100 dark:border-slate-900 rounded-xl text-center">
              <RefreshCw size={20} className="text-blue-500 mb-1" />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">7-Day Replacement</span>
            </div>
            <div className="flex flex-col items-center p-3 border border-slate-100 dark:border-slate-900 rounded-xl text-center">
              <Tag size={20} className="text-indigo-500 mb-1" />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Special Promo Offer</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex gap-4">
          <button 
            onClick={onBuy}
            className="flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-200"
          >
            <ShoppingBag size={18} />
            <span>Place Order Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;
