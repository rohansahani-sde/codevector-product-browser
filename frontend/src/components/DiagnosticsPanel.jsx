import React, { useState } from "react";
import { Terminal, Cpu, Database, RefreshCw, ChevronDown, ChevronUp, History } from "lucide-react";

const DiagnosticsPanel = ({ cursor, nextCursor, totalCount, latency, requestHistory }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-3xl overflow-hidden shadow-xl transition-all duration-300">
      {/* Panel Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-slate-955/80 hover:bg-slate-955 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Terminal size={18} className="text-violet-400" />
          <span className="font-semibold text-sm tracking-wide">PAGINATION DIAGNOSTICS</span>
        </div>
        <div className="flex items-center gap-3">
          {latency !== null && (
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Latency: {latency}ms
            </span>
          )}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-5 space-y-5">
          {/* Key Indicators */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block mb-1 font-medium uppercase tracking-wider">Loaded Count</span>
              <span className="text-lg font-bold text-slate-100 font-mono">{totalCount}</span>
            </div>
            
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block mb-1 font-medium uppercase tracking-wider">Cursor Mode</span>
              <span className="text-xs font-bold text-violet-400 flex items-center gap-1 mt-1 font-mono">
                <Database size={12} />
                <span>Keyset</span>
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block mb-1 font-medium uppercase tracking-wider">Next Available</span>
              <span className={`text-xs font-bold ${nextCursor ? "text-indigo-400" : "text-amber-500"} flex items-center gap-1 mt-1 font-mono`}>
                <RefreshCw size={12} className={nextCursor ? "animate-spin-slow" : ""} />
                <span>{nextCursor ? "Yes" : "Done"}</span>
              </span>
            </div>
          </div>

          {/* Cursor Code Blocks */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                <Cpu size={12} className="text-indigo-400" />
                <span>Current Active Cursor</span>
              </h4>
              <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 font-mono text-[10px] text-slate-300 min-h-[90px] overflow-x-auto whitespace-pre">
                {cursor ? JSON.stringify(cursor, null, 2) : "// Initial Page Request\n// (No cursor parameters sent)"}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                <RefreshCw size={12} className="text-violet-400" />
                <span>Next Pointer Token</span>
              </h4>
              <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 font-mono text-[10px] text-indigo-300 min-h-[90px] overflow-x-auto whitespace-pre">
                {nextCursor ? JSON.stringify(nextCursor, null, 2) : "// End of pagination reached\n// (No more cursors returned)"}
              </div>
            </div>
          </div>

          {/* Fetch History timeline */}
          {requestHistory && requestHistory.length > 0 && (
            <div>
              <h4 className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                <History size={12} className="text-slate-400" />
                <span>Request Logs (Timeline)</span>
              </h4>
              <div className="bg-slate-950/50 rounded-2xl border border-slate-800 p-3 max-h-[140px] overflow-y-auto space-y-2">
                {requestHistory.map((item, index) => (
                  <div key={index} className="flex items-start justify-between text-[10px] font-mono border-b border-slate-800 pb-1.5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">#{requestHistory.length - index}</span>
                      <span className="text-violet-400 font-semibold">{item.category || "All Categories"}</span>
                      {item.cursorVal ? (
                        <span className="text-slate-400 text-[9px] truncate max-w-[140px] md:max-w-[280px]">
                          ({item.cursorVal.createdAt?.slice(5, 16) || item.cursorVal.created_at?.slice(5, 16)})
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[9px]">(Start Chunk)</span>
                      )}
                    </div>
                    <div className="flex gap-3 text-slate-400">
                      <span>+{item.added} items</span>
                      <span className="text-emerald-500 font-medium">{item.duration}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default DiagnosticsPanel;
