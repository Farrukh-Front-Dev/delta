# Performance Test Protocol

## CRITICAL: Manual Testing Required

**I cannot execute these tests.** This document provides the exact protocol for you to follow and record real measurements.

---

## Test Environment Setup

### Prerequisites
```bash
# 1. Clean environment
- Close all other browser tabs
- Disable browser extensions
- Clear browser cache
- Restart browser

# 2. Start development server
npm run dev

# 3. Open browser DevTools
- Performance tab
- React DevTools Profiler
- Memory tab
```

### System Information to Record
```
Browser: [Chrome/Firefox/Safari] [Version]
OS: [Windows/Mac/Linux] [Version]
CPU: [Model]
RAM: [Amount]
GPU: [Model]
Screen: [Resolution] [Refresh Rate]
```

---

## Test 1: Baseline Measurement

### Objective
Measure initial performance with NO assumptions about optimization.

### Steps

#### 1.1 Initial Dashboard Load
```
1. Open http://localhost:3000/dashboard
2. In DevTools Performance tab, click Record
3. Refresh page
4. Wait for page to fully load
5. Stop recording after 3 seconds
```

**Record:**
- [ ] Time to First Paint (FP): _____ ms
- [ ] Time to First Contentful Paint (FCP): _____ ms
- [ ] Time to Interactive (TTI): _____ ms
- [ ] Total JavaScript execution time: _____ ms
- [ ] Main thread blocking time: _____ ms

#### 1.2 Component Render Times
```
1. Open Performance Panel (bottom-right button)
2. Refresh dashboard
3. Wait 2 seconds
4. Click "Print Console"
5. Copy metrics from console
```

**Record from Console:**
```
DashboardPage:
  - Mount duration: _____ ms
  - Render count: _____

StatsBar:
  - Mount duration: _____ ms
  - Render count: _____

EnergyCore:
  - Mount duration: _____ ms
  - Render count: _____

TaskList:
  - Mount duration: _____ ms
  - Render count: _____
```

#### 1.3 Memory Baseline
```
1. Open DevTools Memory tab
2. Take heap snapshot (Snapshot 1)
3. Record: Heap size: _____ MB
```

---

## Test 2: Task Completion Interaction

### Objective
Measure interaction latency and render behavior.

### Steps

#### 2.1 Single Task Completion
```
1. Clear performance panel metrics
2. Click checkbox on first task
3. Wait for all animations to complete
4. Check performance panel
5. Click "Print Console"
```

**Record:**
```
task-completion interaction:
  - Duration: _____ ms
  - Count: _____

Component Renders (from console):
DashboardPage:
  - Update count: _____
  - Avg duration: _____ ms

StatsBar:
  - Update count: _____
  - Avg duration: _____ ms

EnergyCore:
  - Update count: _____
  - Avg duration: _____ ms

TaskList:
  - Update count: _____
  - Avg duration: _____ ms
```

**Warnings in Console:**
- [ ] Any slow render warnings? (Yes/No)
- [ ] If yes, which components: _____
- [ ] Any slow interaction warnings? (Yes/No)

#### 2.2 Rapid Task Completion (Stress Test)
```
1. Refresh dashboard
2. Clear performance panel
3. Start DevTools Performance recording
4. Complete 5 tasks rapidly (as fast as possible)
5. Stop recording
6. Check performance panel
```

**Record:**
```
Total time for 5 completions: _____ ms
Average per completion: _____ ms

Frame Rate Analysis (from Performance tab):
  - Minimum FPS: _____
  - Average FPS: _____
  - Frame drops detected: (Yes/No)
  - If yes, how many: _____

Render Counts (from performance panel):
DashboardPage updates: _____
StatsBar updates: _____
EnergyCore updates: _____
TaskList updates: _____
```

---

## Test 3: Animation Performance

### Objective
Verify 60fps during animations.

### Steps

#### 3.1 Task Completion Animation
```
1. Open DevTools Performance tab
2. Enable "Screenshots" option
3. Start recording
4. Complete ONE task
5. Wait for all animations to finish (2 seconds)
6. Stop recording
```

**Analyze Recording:**
```
1. Look at FPS meter in timeline
2. Check for frame drops (red bars)
3. Measure animation duration

Record:
  - Animation start time: _____ ms
  - Animation end time: _____ ms
  - Total duration: _____ ms
  - Minimum FPS during animation: _____
  - Frame drops: (Yes/No)
  - If yes, at which timestamps: _____
```

#### 3.2 Energy Core Animation
```
1. Refresh dashboard
2. Start Performance recording
3. Complete 3 tasks (to trigger significant progress change)
4. Stop recording after animations complete
```

**Record:**
```
Energy Core Progress Animation:
  - Duration: _____ ms
  - Minimum FPS: _____
  - Average FPS: _____
  - Frame drops: (Yes/No)
  - Smooth 60fps maintained: (Yes/No)
```

#### 3.3 XP Counter Animation
```
1. Focus on XP counter in StatsBar
2. Start Performance recording
3. Complete 1 task
4. Watch XP counter animate
5. Stop recording
```

**Record:**
```
XP Counter Animation:
  - Duration: _____ ms
  - Minimum FPS: _____
  - Smooth animation: (Yes/No)
```

---

## Test 4: Render Behavior Audit

### Objective
Understand when and why components re-render.

### Steps

#### 4.1 StatsBar Render Behavior
```
Test: Does StatsBar re-render when only XP changes?

1. Clear performance panel
2. Complete 1 task (XP changes)
3. Check performance panel

Record:
  - StatsBar render count: _____
  - StatCard render count (if visible): _____
  - Expected: 1 render
  - Actual: _____ renders
  - Unnecessary renders: (Yes/No)
```

#### 4.2 TaskList Render Behavior
```
Test: Does TaskList re-render when task completed?

1. Clear performance panel
2. Complete 1 task
3. Check performance panel

Record:
  - TaskList render count: _____
  - Expected: 1 render (for layout animation)
  - Actual: _____ renders
```

#### 4.3 EnergyCore Render Behavior
```
Test: Does EnergyCore re-render on progress change?

1. Clear performance panel
2. Complete 1 task
3. Check performance panel

Record:
  - EnergyCore render count: _____
  - Expected: 1 render
  - Actual: _____ renders
```

---

## Test 5: Memory Leak Detection

### Objective
Ensure no memory leaks during extended use.

### Steps

#### 5.1 Extended Session Test
```
1. Open DevTools Memory tab
2. Take heap snapshot (Baseline)
3. Complete 10 tasks
4. Take heap snapshot (After 10)
5. Complete 10 more tasks
6. Take heap snapshot (After 20)
7. Force garbage collection (trash icon)
8. Take heap snapshot (After GC)
```

**Record:**
```
Heap Snapshots:
  - Baseline: _____ MB
  - After 10 tasks: _____ MB
  - After 20 tasks: _____ MB
  - After GC: _____ MB

Memory Growth:
  - Total growth: _____ MB
  - Growth per task: _____ MB
  - Memory leak suspected: (Yes/No)

Detached DOM Nodes:
  - Count: _____
  - If > 0, investigate in snapshot
```

---

## Test 6: React DevTools Profiler

### Objective
Detailed component render analysis.

### Steps

#### 6.1 Profiler Recording
```
1. Open React DevTools
2. Go to Profiler tab
3. Click record (circle icon)
4. Complete 3 tasks
5. Stop recording
6. Review flame graph
```

**Record:**
```
Flame Graph Analysis:
  - Longest render: _____ ms (component: _____)
  - Most renders: _____ (component: _____)
  - Unnecessary renders identified: _____

Component Render Times:
  - DashboardPage: _____ ms
  - StatsBar: _____ ms
  - EnergyCore: _____ ms
  - TaskList: _____ ms
  - TaskItem: _____ ms
  - CompletionCelebration: _____ ms
```

---

## Test 7: Bundle Analysis

### Objective
Measure actual bundle size and dependencies.

### Steps

#### 7.1 Production Build Analysis
```bash
# In terminal
cd apps/web
npm run build

# Record output
```

**Record from Build Output:**
```
Route Sizes:
  - / : _____ kB
  - /dashboard : _____ kB

Total Bundle Size: _____ kB
First Load JS: _____ kB
```

#### 7.2 Dependency Analysis
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })

# Run analysis
ANALYZE=true npm run build
```

**Record from Analyzer:**
```
Largest Dependencies:
1. _____ : _____ kB
2. _____ : _____ kB
3. _____ : _____ kB
4. _____ : _____ kB
5. _____ : _____ kB

Framer Motion size: _____ kB
Zustand size: _____ kB
Lucide React size: _____ kB
```

---

## Results Template

### Copy this template and fill with your measurements:

```markdown
# Performance Test Results

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Browser/OS/Hardware]

## Test 1: Baseline
- FCP: _____ ms
- TTI: _____ ms
- Dashboard mount: _____ ms
- Initial heap: _____ MB

## Test 2: Task Completion
- Single task latency: _____ ms
- Rapid 5 tasks: _____ ms
- Average per task: _____ ms
- Frame drops: (Yes/No)

## Test 3: Animation Performance
- Task animation FPS: _____
- Energy core FPS: _____
- XP counter FPS: _____
- 60fps maintained: (Yes/No)

## Test 4: Render Behavior
- StatsBar renders on XP change: _____
- TaskList renders on completion: _____
- EnergyCore renders on progress: _____
- Unnecessary renders: (Yes/No)

## Test 5: Memory
- Baseline: _____ MB
- After 20 tasks: _____ MB
- After GC: _____ MB
- Memory leak: (Yes/No)

## Test 6: React Profiler
- Longest render: _____ ms
- Most renders: _____ (component)
- Bottlenecks identified: _____

## Test 7: Bundle
- Total bundle: _____ kB
- Dashboard route: _____ kB
- Largest dependency: _____

## Warnings/Issues
[List any console warnings, frame drops, or performance issues]

## Conclusion
[Based on measurements, is performance acceptable?]
[Are there actual bottlenecks that need optimization?]
```

---

## Performance Thresholds

### Good Performance ✅
- FCP: < 1000ms
- TTI: < 2000ms
- Task completion: < 100ms
- Animation FPS: 60fps (no drops)
- Render time: < 16ms per component
- Memory growth: < 1MB per 10 tasks

### Acceptable Performance ⚠️
- FCP: 1000-2000ms
- TTI: 2000-3000ms
- Task completion: 100-200ms
- Animation FPS: 45-60fps (occasional drops)
- Render time: 16-33ms per component
- Memory growth: 1-2MB per 10 tasks

### Poor Performance ❌
- FCP: > 2000ms
- TTI: > 3000ms
- Task completion: > 200ms
- Animation FPS: < 45fps (frequent drops)
- Render time: > 33ms per component
- Memory growth: > 2MB per 10 tasks

---

## IMPORTANT

**I CANNOT RUN THESE TESTS.**

You must:
1. Follow this protocol exactly
2. Record all measurements
3. Fill in the results template
4. Share results with me
5. Then we can analyze and optimize based on REAL DATA

**Until measurements are taken, all performance claims are INVALID.**
