# Motion Budget Verification Guide

## Quick Verification Steps

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Dashboard
Navigate to: `http://localhost:3000/dashboard`

### 3. Open Performance Panel
Click "Show Performance" button in the UI

### 4. Test TaskList Performance

**Action:**
1. Click "Clear Metrics" in Performance Panel
2. Complete 1 task (click checkbox)
3. Check TaskList render time in panel

**Expected Result:**
- TaskList update: ≤ 16ms ✅
- Previous: 39.70ms ❌

**If Failed:**
- Check browser console for slow render warnings
- Verify no `layout` prop in TaskItem
- Verify no `AnimatePresence` in TaskList

### 5. Test DashboardPage Mount

**Action:**
1. Click "Clear Metrics" in Performance Panel
2. Refresh page (Cmd+R / Ctrl+R)
3. Check DashboardPage mount time in panel

**Expected Result:**
- DashboardPage mount: ≤ 16ms ✅
- Previous: 40.90ms ❌

### 6. Test Interaction Latency

**Action:**
1. Click "Clear Metrics"
2. Complete 1 task
3. Check "task-completion" interaction time

**Expected Result:**
- Interaction latency: < 1ms ✅
- Previous: 0.65ms ✅ (already good)

### 7. Visual Smoothness Check

**Action:**
1. Complete multiple tasks rapidly
2. Observe animations

**Expected:**
- ✅ Smooth opacity transitions
- ✅ No visual jank or stutter
- ✅ Immediate checkbox response
- ✅ Smooth task state changes

**Should NOT see:**
- ❌ Laggy animations
- ❌ Stuttering
- ❌ Delayed feedback

---

## Performance Panel Usage

### Metrics Displayed:
- **Render Metrics:** Component render times
- **Interaction Metrics:** User interaction latency
- **Slow Render Warnings:** Automatic alerts for > 16ms

### Actions:
- **Clear Metrics:** Reset all measurements
- **Print Report:** Log detailed stats to console

### Console Commands:
```javascript
// Manual profiler access
window.__performanceMonitor.printReport()
window.__performanceMonitor.clear()
```

---

## Success Criteria Checklist

### Performance (Measured):
- [ ] TaskList update ≤ 16ms
- [ ] DashboardPage mount ≤ 16ms
- [ ] Interaction latency < 1ms
- [ ] No slow render warnings in console

### UX (Observed):
- [ ] Task completion feels immediate
- [ ] No visual jank
- [ ] Smooth transitions
- [ ] Premium feel maintained

### Code (Verified):
- [ ] No `layout` prop in TaskItem
- [ ] No `AnimatePresence` in TaskList
- [ ] Build successful
- [ ] No TypeScript errors

---

## If Performance Target Not Met

### Diagnostic Steps:

1. **Check React DevTools Profiler:**
   - Open React DevTools
   - Go to Profiler tab
   - Record interaction
   - Identify slow components

2. **Check Browser Performance Tab:**
   - Open Chrome DevTools
   - Go to Performance tab
   - Record interaction
   - Look for long tasks

3. **Check Console:**
   - Look for slow render warnings
   - Check for unexpected re-renders

### Common Issues:

**Issue:** TaskList still > 16ms
**Possible Causes:**
- Layout animations not fully removed
- AnimatePresence still present
- Other expensive operations in render

**Issue:** DashboardPage still > 16ms
**Possible Causes:**
- Store subscriptions not granular
- Callbacks not memoized
- Child components causing re-renders

---

## Recording Results

### Template:
```
Date: [DATE]
Browser: [Chrome/Firefox/Safari]
Device: [Desktop/Laptop specs]

BEFORE:
- TaskList update: 39.70ms
- DashboardPage mount: 40.90ms
- Interaction latency: 0.65ms

AFTER:
- TaskList update: [MEASURED]ms
- DashboardPage mount: [MEASURED]ms
- Interaction latency: [MEASURED]ms

IMPROVEMENT:
- TaskList: [PERCENTAGE]% faster
- DashboardPage: [PERCENTAGE]% faster

VISUAL QUALITY:
- Smoothness: [1-10]
- Responsiveness: [1-10]
- Premium feel: [1-10]

NOTES:
[Any observations]
```

---

## Next Steps After Verification

### If Target Met (≤ 16ms):
1. ✅ Update PERFORMANCE_RESULTS_TEMPLATE.md with real data
2. ✅ Mark Phase 6 complete
3. ✅ Document final performance characteristics
4. ✅ Proceed to next development phase

### If Target Not Met:
1. 🔍 Run diagnostic steps above
2. 🔍 Identify remaining bottlenecks
3. 🔧 Apply additional targeted fixes
4. 🔄 Re-test

---

## Motion Budget Architecture Validation

### Critical Path Components:
- TaskItem: Simple opacity + transform only ✅
- TaskList: No AnimatePresence ✅
- DashboardPage: Granular selectors ✅

### Premium Path Components:
- EnergyCore: Complex animations allowed ✅
- CompletionCelebration: Complex animations allowed ✅

### Architecture Compliance:
- [ ] No `layout` prop in critical path
- [ ] No `AnimatePresence` for list items
- [ ] Complex animations only in premium path
- [ ] All components follow motion budget rules

---

## Summary

**Goal:** Verify Motion Budget Architecture achieves < 16ms target

**Method:** Real measurements with React Profiler

**Success:** All metrics ≤ 16ms + smooth UX

**Status:** Ready for verification
