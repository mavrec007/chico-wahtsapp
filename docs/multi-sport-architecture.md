# Multi-Sport Architecture Plan

This document outlines the updated structure for supporting multiple sports in **Sports Hub**. Each sport is isolated in its own module to make future expansion straightforward.

## Goals

- **Modularity** – add new sports without touching existing ones.
- **Translation** – all user facing strings use `react-i18next` with Arabic support and RTL layouts.
- **Reporting** – provide per-sport reports and global financial summaries.
- **Cleanup** – remove unused translation context and JSON files.

## Directory Layout

```
src/
  modules/
    sports/
      sportsConfig.ts    # metadata for each sport
  pages/
    football/
    swimming/
```

Additional sports can be added by creating new pages and updating `sportsConfig.ts`.

## Reporting

A new reporting service will aggregate booking and payment data per sport using the tables defined in `sportsConfig.ts`. A global dashboard can then combine these figures for an overall financial summary.

## Translation

All components now use `react-i18next`. Arabic translations live in `src/lib/i18n.ts`. The application stores the current language in `useAppStore`; RTL handling is derived from this value.

