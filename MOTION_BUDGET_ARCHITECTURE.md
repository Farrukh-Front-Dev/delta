# Motion Budget Architecture

## Decision: Hybrid Animation Strategy

**Goal:** Achieve < 16ms render times while maintaining premium feel

**Principle:** "Perceived smoothness > visual complexity"

---

## Performance Budget

### Critical Path (High-Frequency)
**Target:** ≤ 16ms per render (60fps)

Components:
- TaskList
- TaskItem
- DashboardPage

**Rules:**
- ❌ NO `layout` prop
- ❌ NO `AnimatePresence` for list items
- ❌ NO layout recalculations
- ✅ Simple opacity + transform only
- ✅ Fast easing curves

### Premium Path (Low-Frequency)
**Target:** ≤ 100ms per interaction

Components:
- EnergyCore
- CompletionCelebration
- Modal transitions
- Dashboard ambient effects

**Allowed:**
- ✅ Complex Framer Motion animations
- ✅ Layout animations
- ✅ Spring physics
- ✅ Particle effects

---

## Implementation Details

### TaskItem Optimization

**BEFORE (40ms):**
```tsx
<motion.div
  layout  // ❌ Expensive layout recalculation
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{
    opacity: 0,
    scale: 0.92,
    y: -8,
    filter: 'blur(4px)',  // ❌ Expensive filter
    transition: { duration: 0.4 }
  }}
>
```

**AFTER (< 16ms target):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}  // ✅ Reduced distance
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.2,  // ✅ Faster
    ease: [0.16, 1, 0.3, 1],  // ✅ Optimized easing
  }}
>
```

**Changes:**
- Removed `layout` prop (eliminates layout recalculation)
- Removed `exit` animation (no AnimatePresence overhead)
- Reduced animation distance (20px → 8px)
- Faster duration (0.4s → 0.2s)
- Removed expensive `filter: blur()`

### TaskList Optimization

**BEFORE:**
```tsx
<AnimatePresence mode="popLayout">  // ❌ Layout recalculation
  {tasks.map(task => <TaskItem key={task.id} />)}
</AnimatePresence>
```

**AFTER:**
```tsx
<div className="space-y-3">  // ✅ Simple container
  {tasks.map(task => <TaskItem key={task.id} />)}
</div>
```

**Changes:**
- Removed `AnimatePresence` wrapper
- Removed `mode="popLayout"` (expensive)
- Simple div container with Tailwind spacing

---

## Animation Hierarchy

### Tier 1: Critical Path (< 16ms)
**Components:** TaskItem, TaskList, DashboardPage

**Allowed Animations:**
- Opacity transitions
- Simple transforms (translate, scale)
- Fast durations (< 300ms)
- Linear/ease-out curves

**Forbidden:**
- Layout animations
- Filter effects
- Complex spring physics
- AnimatePresence in lists

### Tier 2: Premium Path (< 100ms)
**Components:** EnergyCore, Modals, Celebrations

**Allowed Animations:**
- Complex spring physics
- Layout animations
- Particle effects
- Filter effects
- Long durations

---

## Perceived Smoothness Strategy

### What Users Actually Notice:
1. **Immediate feedback** (< 100ms)
2. **Smooth opacity transitions**
3. **Consistent timing**
4. **No jank or stutter**

### What Users Don't Notice:
1. Exact animation complexity
2. Layout vs transform animations
3. Spring physics vs easing curves
4. Animation distance (8px vs 20px)

**Result:** Simpler animations feel just as premium when executed smoothly.

---

## Performance Targets

### Before Optimization:
- TaskList update: 39.70ms ❌
- DashboardPage mount: 40.90ms ❌
- Interaction latency: 0.65ms ✅

### After Optimization (Target):
- TaskList update: ≤ 16ms ✅
- DashboardPage mount: ≤ 16ms ✅
- Interaction latency: < 1ms ✅

---

## Testing Protocol

### 1. Render Performance
```bash
npm run dev
```
- Open Performance Panel
- Complete 1 task
- Verify TaskList ≤ 16ms
- Verify DashboardPage ≤ 16ms

### 2. Perceived Smoothness
- Complete multiple tasks rapidly
- Verify no visual jank
- Verify smooth transitions
- Verify immediate feedback

### 3. Interaction Latency
- Click task checkbox
- Verify < 1ms latency
- Verify immediate visual response

---

## Architecture Rules

### DO:
- ✅ Use simple opacity + transform for high-frequency components
- ✅ Use complex animations for low-frequency components
- ✅ Measure performance with React Profiler
- ✅ Optimize for perceived smoothness
- ✅ Maintain consistent timing

### DON'T:
- ❌ Use `layout` prop in high-frequency paths
- ❌ Use `AnimatePresence` for list items
- ❌ Use expensive filters in critical path
- ❌ Sacrifice performance for visual complexity
- ❌ Add animations without measuring impact

---

## Success Criteria

### Performance:
- [ ] TaskList ≤ 16ms (verify with profiler)
- [ ] DashboardPage ≤ 16ms (verify with profiler)
- [ ] Interaction latency < 1ms (verify with profiler)
- [ ] No console warnings for slow renders

### UX:
- [ ] Task completion feels immediate
- [ ] No visual jank or stutter
- [ ] Smooth transitions maintained
- [ ] Premium feel preserved

### Code Quality:
- [ ] No layout animations in critical path
- [ ] Clean component structure maintained
- [ ] Design system compliance
- [ ] TypeScript strict mode

---

## Summary

**Trade-off Made:**
- Removed: Layout animations in TaskList/TaskItem
- Kept: Premium animations in EnergyCore and celebrations
- Result: 60fps performance + premium feel

**Philosophy:**
"Perceived smoothness > visual complexity"

Users care about responsiveness and smoothness, not animation complexity.

**Status:** ✅ Motion Budget Architecture implemented, awaiting verification
