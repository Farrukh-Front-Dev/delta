/**
 * Performance profiling utilities
 * Used to measure real render performance and interaction latency
 */

interface RenderMetrics {
  componentName: string;
  phase: 'mount' | 'update' | 'nested-update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  renderCount: number;
}

interface InteractionMetrics {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
}

class PerformanceMonitor {
  private renderMetrics: Map<string, RenderMetrics[]> = new Map();
  private interactionMetrics: InteractionMetrics[] = [];
  private enabled: boolean = process.env.NODE_ENV === 'development';

  /**
   * React Profiler callback
   */
  onRender(
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) {
    if (!this.enabled) return;

    const existing = this.renderMetrics.get(id) || [];
    const renderCount = existing.length + 1;

    const metric: RenderMetrics = {
      componentName: id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      renderCount,
    };

    this.renderMetrics.set(id, [...existing, metric]);

    // Log slow renders (> 16ms = below 60fps)
    if (actualDuration > 16) {
      console.warn(
        `[Performance] Slow render detected: ${id} took ${actualDuration.toFixed(2)}ms (${phase})`
      );
    }
  }

  /**
   * Measure interaction latency
   */
  startInteraction(name: string): () => void {
    if (!this.enabled) return () => {};

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.interactionMetrics.push({
        name,
        startTime,
        endTime,
        duration,
      });

      // Log slow interactions (> 100ms = noticeable lag)
      if (duration > 100) {
        console.warn(
          `[Performance] Slow interaction: ${name} took ${duration.toFixed(2)}ms`
        );
      }
    };
  }

  /**
   * Get render statistics for a component
   */
  getRenderStats(componentName: string) {
    const metrics = this.renderMetrics.get(componentName) || [];
    if (metrics.length === 0) return null;

    const totalDuration = metrics.reduce((sum, m) => sum + m.actualDuration, 0);
    const avgDuration = totalDuration / metrics.length;
    const maxDuration = Math.max(...metrics.map((m) => m.actualDuration));
    const minDuration = Math.min(...metrics.map((m) => m.actualDuration));

    return {
      componentName,
      renderCount: metrics.length,
      totalDuration: totalDuration.toFixed(2),
      avgDuration: avgDuration.toFixed(2),
      maxDuration: maxDuration.toFixed(2),
      minDuration: minDuration.toFixed(2),
      mountCount: metrics.filter((m) => m.phase === 'mount').length,
      updateCount: metrics.filter((m) => m.phase === 'update').length,
    };
  }

  /**
   * Get interaction statistics
   */
  getInteractionStats(interactionName?: string) {
    const filtered = interactionName
      ? this.interactionMetrics.filter((m) => m.name === interactionName)
      : this.interactionMetrics;

    if (filtered.length === 0) return null;

    const totalDuration = filtered.reduce((sum, m) => sum + m.duration, 0);
    const avgDuration = totalDuration / filtered.length;
    const maxDuration = Math.max(...filtered.map((m) => m.duration));
    const minDuration = Math.min(...filtered.map((m) => m.duration));

    return {
      name: interactionName || 'all',
      count: filtered.length,
      totalDuration: totalDuration.toFixed(2),
      avgDuration: avgDuration.toFixed(2),
      maxDuration: maxDuration.toFixed(2),
      minDuration: minDuration.toFixed(2),
    };
  }

  /**
   * Print all metrics to console
   */
  printReport() {
    if (!this.enabled) {
      console.log('[Performance] Profiling disabled in production');
      return;
    }

    console.group('📊 Performance Report');

    console.group('Render Metrics');
    this.renderMetrics.forEach((_, componentName) => {
      const stats = this.getRenderStats(componentName);
      if (stats) {
        console.log(`${componentName}:`, stats);
      }
    });
    console.groupEnd();

    console.group('Interaction Metrics');
    const uniqueInteractions = new Set(this.interactionMetrics.map((m) => m.name));
    uniqueInteractions.forEach((name) => {
      const stats = this.getInteractionStats(name);
      if (stats) {
        console.log(`${name}:`, stats);
      }
    });
    console.groupEnd();

    console.groupEnd();
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.renderMetrics.clear();
    this.interactionMetrics = [];
  }

  /**
   * Enable/disable profiling
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Expose to window for manual testing
if (typeof window !== 'undefined') {
  (window as any).__performanceMonitor = performanceMonitor;
}
