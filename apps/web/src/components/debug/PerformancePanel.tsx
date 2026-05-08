'use client';

import { useState, useEffect } from 'react';
import { performanceMonitor } from '@/lib/performance/profiler';

/**
 * Development-only performance monitoring panel
 * Shows real-time render and interaction metrics
 */
export const PerformancePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const report = {
        dashboard: performanceMonitor.getRenderStats('DashboardPage'),
        statsBar: performanceMonitor.getRenderStats('StatsBar'),
        energyCore: performanceMonitor.getRenderStats('EnergyCore'),
        taskList: performanceMonitor.getRenderStats('TaskList'),
        taskCompletion: performanceMonitor.getInteractionStats('task-completion'),
      };

      setMetrics(JSON.stringify(report, null, 2));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handlePrintReport = () => {
    performanceMonitor.printReport();
  };

  const handleClear = () => {
    performanceMonitor.clear();
    setMetrics('');
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-purple-700"
      >
        {isOpen ? 'Hide' : 'Show'} Performance
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-96 max-h-[600px] overflow-auto rounded-lg border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Performance Metrics</h3>
            <div className="flex gap-2">
              <button
                onClick={handlePrintReport}
                className="rounded bg-zinc-800 px-3 py-1 text-xs text-white hover:bg-zinc-700"
              >
                Print Console
              </button>
              <button
                onClick={handleClear}
                className="rounded bg-zinc-800 px-3 py-1 text-xs text-white hover:bg-zinc-700"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded bg-zinc-800 p-3">
              <p className="mb-2 text-xs font-medium text-zinc-400">
                Real-time Metrics (updates every 1s)
              </p>
              <pre className="overflow-auto text-xs text-zinc-300">
                {metrics || 'No data yet. Interact with the dashboard...'}
              </pre>
            </div>

            <div className="rounded bg-zinc-800 p-3">
              <p className="text-xs text-zinc-400">
                <strong>How to use:</strong>
                <br />
                1. Interact with dashboard (complete tasks, etc.)
                <br />
                2. Watch metrics update in real-time
                <br />
                3. Click "Print Console" for detailed report
                <br />
                4. Check browser console for warnings
              </p>
            </div>

            <div className="rounded bg-zinc-800 p-3">
              <p className="text-xs text-zinc-400">
                <strong>Performance Thresholds:</strong>
                <br />
                • Render: &gt;16ms = below 60fps (warning)
                <br />
                • Interaction: &gt;100ms = noticeable lag (warning)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
