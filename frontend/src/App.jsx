import { useEffect, useMemo, useState } from "react";
import api from "./services/api";

import ProductGrid from "./components/ProductGrid";
import CategoryFilter from "./components/CategoryFilter";
import Sidebar from "./components/Sidebar";
import DiagnosticsPanel from "./components/DiagnosticsPanel";

import {
  Sparkles,
  Flame,
  Cpu,
  AlertCircle,
  Grid,
  List
} from "lucide-react";

function App() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom states for premium UI
  const [viewMode, setViewMode] = useState("grid");

  // Developer diagnostics states
  const [latency, setLatency] = useState(null);
  const [requestHistory, setRequestHistory] = useState([]);

  // Custom toast notification system
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const hasMore = useMemo(() => !!cursor, [cursor]);

  // Fetch products from cursor pagination API
  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      let url = "/products?limit=20";

      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }

      if (!reset && cursor) {
        url += `&createdAt=${encodeURIComponent(cursor.createdAt || cursor.created_at)}`;
        url += `&id=${encodeURIComponent(cursor.id)}`;
      }

      const startTime = performance.now();
      const { data } = await api.get(url);
      const endTime = performance.now();
      const fetchTime = Math.round(endTime - startTime);

      setLatency(fetchTime);

      const fetchedList = data.products || [];

      if (reset) {
        setProducts(fetchedList);
      } else {
        setProducts((prev) => [...prev, ...fetchedList]);
      }

      setCursor(data.nextCursor);

      // Log the paginated chunk in the diagnostics tracker
      setRequestHistory((prev) => [
        {
          category: category || "All Categories",
          cursorVal: !reset && cursor ? cursor : null,
          added: fetchedList.length,
          duration: fetchTime
        },
        ...prev
      ]);
    } catch (error) {
      console.error("API error fetching products:", error);
      showToast("Failed to fetch products from api server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCursor(null);
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-955 text-slate-800 dark:text-slate-150 transition-colors duration-300">

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold">
          {toast.type === "success" && <Sparkles className="text-emerald-500" size={18} />}
          {toast.type === "error" && <AlertCircle className="text-rose-500" size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-955/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-600/20">
              <Flame size={20} className="animate-pulse" />
            </span>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
              CodeVector
            </span>
            <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-mono">
              v1.2
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Banner Section */}
        <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-slate-800 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-4 uppercase tracking-wider">
              <Cpu size={12} />
              <span>Cursor Pagination Engine</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              High Performance Product Browser
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              Demonstrating Keyset Pagination traversing 200,000+ mock elements using real-time API cursor responses. Redesigned with custom themes, filtering systems, and developer logs.
            </p>
          </div>
        </div>

        {/* Global Statistics Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-850 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Loaded Products</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{products.length}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-850 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Filter View</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate block mt-1.5">
              {category || "All Categories"}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-850 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Latency</span>
            <span className="text-2xl font-black text-emerald-500 font-mono">
              {latency ? `${latency} ms` : "--"}
            </span>
          </div>
        </div>

        {/* Workspace Layout Columns */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-10">

          {/* Left Column: Sidebar Controls */}
          <Sidebar
            activeCategory={category}
            setCategory={setCategory}
          />

          {/* Right Column: Grid and Filter Panel */}
          <div className="flex-1 w-full space-y-6">

            {/* Mobile Pill Filters (Shown only on small viewports) */}
            <div className="block lg:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
              <CategoryFilter category={category} setCategory={setCategory} />
            </div>

            {/* Products Grid / Feed */}
            <ProductGrid
              products={products}
              loading={loading}
              viewMode={viewMode}
            />

            {/* Pagination Controls */}
            {hasMore && (
              <div className="flex justify-center pt-6">
                <button
                  onClick={() => fetchProducts()}
                  disabled={loading}
                  className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{loading ? "Loading chunk..." : "Load More Products"}</span>
                </button>
              </div>
            )}

            {!hasMore && products.length > 0 && (
              <div className="text-center text-xs text-slate-400 font-bold py-6 uppercase tracking-widest">
                All mock database items loaded. End of pagination stream.
              </div>
            )}

          </div>

        </div>

        {/* Developer Diagnostics Dashboard Section */}
        <DiagnosticsPanel
          cursor={cursor}
          nextCursor={cursor} // The active paginator coordinate
          totalCount={products.length}
          latency={latency}
          requestHistory={requestHistory}
        />

      </main>

    </div>
  );
}

export default App;