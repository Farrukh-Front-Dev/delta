'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, LogOut } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EnergyCore } from '@/components/features/dashboard/EnergyCore';
import { TaskList } from '@/components/features/dashboard/TaskList';
import { StatsBar } from '@/components/features/dashboard/StatsBar';
import { CompletionCelebration } from '@/components/features/dashboard/CompletionCelebration';
import { PerformanceProfiler } from '@/components/debug/PerformanceProfiler';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TelegramVerification } from '@/components/auth/TelegramVerification';
import { useTaskStore } from '@/stores/useTaskStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAuth } from '@/hooks/useAuth';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import { performanceMonitor } from '@/lib/performance/profiler';
import { TIMING } from '@/lib/animations/constants';

function DashboardContent() {
  const { logout, verificationLink } = useAuth();
  
  // Granular Zustand selectors to prevent unnecessary re-renders
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const lastCompletedXp = useTaskStore((state) => state.lastCompletedXp);
  
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const dailyProgress = useDailyProgress(tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Stable callback references
  const handleAddTask = useCallback(async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await addTask(newTaskTitle.trim(), 25);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }, [newTaskTitle, addTask]);

  const handleTaskComplete = useCallback(async (taskId: string) => {
    // Measure interaction latency
    const endMeasure = performanceMonitor.startInteraction('task-completion');

    try {
      const result = await toggleTask(taskId);
      
      // Update user XP and level
      if (user && result.xpGained > 0) {
        setUser({
          ...user,
          xp: result.newXp,
          level: result.newLevel,
        });

        // Show celebration
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), TIMING.xpCounterStart);
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }

    endMeasure();
  }, [toggleTask, user, setUser]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTask();
  }, [handleAddTask]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Memoize user stats to prevent StatsBar re-renders
  const userStats = useMemo(() => {
    if (!user) return null;
    return {
      xp: user.xp,
      level: user.level,
      streak: user.streak,
    };
  }, [user?.xp, user?.level, user?.streak]);

  if (!user || !userStats) return null;

  return (
    <PerformanceProfiler id="DashboardPage">
      <div className="min-h-screen bg-black py-8">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white">
                  {user.name ? `Welcome back, ${user.name}` : 'Daily Dashboard'}
                </h1>
                <p className="text-zinc-500">
                  Complete tasks to fill your energy core
                </p>
              </div>
              <Button
                variant="ghost"
                size="md"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>

            {/* Stats Bar */}
            <PerformanceProfiler id="StatsBar">
              <StatsBar {...userStats} />
            </PerformanceProfiler>

            {/* Telegram Verification */}
            {verificationLink && !user.telegramVerified && (
              <TelegramVerification verificationLink={verificationLink} />
            )}
            {user.telegramVerified && (
              <TelegramVerification 
                verificationLink="" 
                isVerified={true}
              />
            )}

            {/* Main Content Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column - Energy Core */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
                <PerformanceProfiler id="EnergyCore">
                  <EnergyCore progress={dailyProgress.percentage} />
                </PerformanceProfiler>
                <div className="mt-6 text-center">
                  <p className="text-sm text-zinc-500">
                    {dailyProgress.completedTasks} of {dailyProgress.totalTasks}{' '}
                    tasks completed
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">
                    {dailyProgress.xpEarned} / {dailyProgress.xpGoal} XP earned
                    today
                  </p>
                </div>
              </div>

              {/* Right Column - Tasks */}
              <div className="space-y-4">
                {/* Add Task Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new task..."
                    value={newTaskTitle}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleAddTask} size="md">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                {/* Task List */}
                <PerformanceProfiler id="TaskList">
                  <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} />
                </PerformanceProfiler>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Completion Celebration */}
        <CompletionCelebration
          show={showCelebration}
          xpGained={lastCompletedXp}
        />
      </div>
    </PerformanceProfiler>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
