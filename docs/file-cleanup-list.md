
# File Cleanup Checklist

## Files to Review and Potentially Remove

### Duplicate Components
- [ ] `src/components/ui/sidebar.tsx` (replaced by ModernSidebar)
- [ ] `src/components/layout/Sidebar.tsx` (replaced by ModernSidebar)
- [ ] `src/components/ui/theme-toggle.tsx` (replaced by unified-toggle)

### Unused Translation Files
- [ ] Review `src/translations/index.ts` for duplicates
- [ ] Check if `src/context/LanguageContext.tsx` can be simplified

### Legacy Components
- [ ] Check if `src/components/layout/DashboardLayout.tsx` is still used
- [ ] Review `src/components/layout/SidebarRail.tsx` usage

### Unused Sports Pages
- [ ] Review swimming sub-pages for actual usage
- [ ] Review football sub-pages for actual usage
- [ ] Clean up any empty or placeholder pages

## Recommended Actions

1. **Consolidate Sidebar Components**: Remove old sidebar implementations
2. **Merge Translation Systems**: Unify all translation logic
3. **Remove Unused Routes**: Clean up App.tsx routing
4. **Optimize Asset Loading**: Remove unused icons and images
5. **Simplify Theme System**: Keep only the unified theme system

## Files That Should Stay
- All files in `src/modules/` (new modular structure)
- `src/config/sports.ts` (sports configuration)
- Updated translation files with sports terminology
- New shared components for modularity
