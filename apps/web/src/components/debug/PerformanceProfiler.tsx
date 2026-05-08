'use client';

import { Profiler, ProfilerOnRenderCallback, ReactNode } from 'react';
import { performanceMonitor } from '@/lib/performance/profiler';

interface PerformanceProfilerProps {
  id: string;
  children: ReactNode;
}

/**
 * Wrapper component for React Profiler
 * Automatically logs render metrics in development
 */
export const PerformanceProfiler = ({
  id,
  children,
}: PerformanceProfilerProps) => {
  const onRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    performanceMonitor.onRender(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    );
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};
