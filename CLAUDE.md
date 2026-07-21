# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**spielfeld** — "Run your tournament, not your spreadsheet." A mobile-first tournament management app (React Native / Expo) that lets organizers create, schedule, and run tournaments (teams, rosters, matches, live scoring, standings/brackets) without a spreadsheet.

## Commands

```bash
npx expo start          # start the dev server (press i/a/w for iOS/Android/web)
npx expo start -c       # start the dev server + clearing cache
npm run ios             # run:android / run:ios build + launch
npm run android
npm run web
npm run lint            # expo lint
npm test                # jest --watchAll (jest-expo preset)
npx tsc --noEmit        # type-check the whole project (no build script wraps this)
```

There is currently no test suite (`jest`/`jest-expo` are configured but no `*.test.*` files exist yet). If asked to add tests, prioritize the pure algorithm utilities in `utils/` (round-robin/knockout generation, standings) since they have no UI dependencies and are the highest-risk logic in the app.

EAS builds (`eas.json`) define `development`, `preview`, and `production` profiles — only relevant if explicitly asked to build/submit via EAS.

## Architecture

**Stack**: Expo + Expo Router (file-based routing, typed routes enabled) · Zustand (with `persist` to AsyncStorage) · TypeScript · custom StyleSheet-based theming (no Tailwind/NativeWind).

### Routing (`app/`)

File-based via `expo-router`. The core nested structure is:

```
app/index.tsx                                  tournament list
app/wizard/...                                  multi-step "create tournament" flow (sport → format → info → summary)
app/tournament/[tournament_id]/
  matches/...        manage/...        standings/...        (three top-level tabs per tournament)
    manage/format, manage/settings, manage/teams/[team_id]/roster/[player_id]
    matches/[match_id]/index.jsx, matches/[match_id]/live.jsx   (pre-match details vs. live scoring screen)
```

Route params are read via `useGlobalSearchParams()`/`useLocalSearchParams()` and named `tournament_id`, `team_id`, `match_id`, `player_id` — matching the store's snake_case ID parameters (see Naming below).

### State (`store/useTournamentStore.ts`)

All tournament data currently lives in a **single** Zustand store, persisted whole (`partialize` keeps only `tournaments`). There is no normalization — a `Tournament` embeds its `teams` (with nested `roster`) and `matchdays` (with nested `matches`) directly, and every mutation does an immutable `map`/`filter` walk down that tree to find the right nested record. `getTournament`/`getTeam`/`getMatch`/`getPlayer` are the read helpers; everything else is a `set()` mutation keyed by `tournament_id` (+ nested ids).

**Selector convention**: always select the narrowest slice you need, e.g. `useTournamentStore((state) => state.getTournament(id)?.name)`, not the whole tournament — subscribing broadly re-renders on unrelated updates (this caused real perf bugs fixed in the `manage/` tab and the `matches` list; see `CHANGELOG.md`). Follow this pattern for any new screen that reads from the store.

A store split into `TournamentStore` / `MatchStore` / `TeamStore` is the intended direction but hasn't happened — don't assume it exists.

### Tournament engine (`utils/`)

Match generation and progression are pure functions operating on `Matchday[]`/`Match[]`, called from the store:

- `generateRoundRobinMatches` — circle method round-robin scheduling (byes for odd team counts via a `null` "phantom" team).
- `generateKnockoutMatches` — seeds teams into a power-of-two bracket (padding with `null` byes) and calls `advanceKnockoutWinners` once to auto-resolve bye matches.
- `advanceKnockoutWinners` — propagates a finished match's winner into the next round's slot.
- `cascadeKnockoutReset` — when a knockout match result is reset, undoes any downstream advancement that depended on it.
- `buildRoundRobinStandings` — derives the standings table from `matchdays`; must stay a pure derivation (recomputing this on every render/keystroke was a fixed perf bug — memoize at the call site, don't cache inside the util).

`store.updateTournamentMatches` picks the right generator based on `tournament.format`; `store.updateTournamentMatchWinner` calls `advanceKnockoutWinners` for knockout tournaments after recording a result.

### Components (`components/`)

Directories are still named `atoms/` / `molcecules/` (typo, not `molecules/`) / `layouts/`, but **Atomic Design is explicitly not the target pattern** — it's considered too rigid for this codebase going forward. For new components, prefer composable, reusable components without forcing them into an atom/molecule tier, and don't wrap an existing component just to re-skin it — extend the original with props/style overrides (DRY).

### Theming (`theme/theme.js`)

Colors and typography (Manrope font family, size/weight scale) live in `theme/theme.js` and are imported directly (`import { colors } from "@/theme/theme"`) — no theme context/provider. `@/*` resolves to the project root (see `tsconfig.json`).

## Conventions & known inconsistencies

- **TypeScript migration is in progress, not complete.** Some `app/` routes and most of `components/molcecules/` are still `.jsx`; new files should be `.ts`/`.tsx` with explicit input/output types. Don't be surprised by mixed extensions in the same directory.
- **Naming is inconsistent by design-in-progress**: the long-term convention is camelCase everywhere, but store methods, route params, and IDs (`tournament_id`, `team_id`, `match_id`, `player_id`) currently use snake_case throughout the data layer. Match the existing style locally (snake_case for these ids) rather than mixing conventions within a file; don't do a drive-by rename unless the task is specifically about this cleanup.
- **Avoid inline style objects** — many older components still have them, but new/edited code should go through `StyleSheet.create()`.
- **Modal components are duplicated** — several components wrap `@gorhom/bottom-sheet` with repeated boilerplate; if you're touching modals, check for an existing pattern to reuse before adding another wrapper.
- `CHANGELOG.md` follows Keep a Changelog format with an `[Unreleased]` section grouped by Added/Changed/Fixed/Removed — update it when making user-facing or notable changes, matching the existing entry style (backtick-quoted identifiers, one line per change).
