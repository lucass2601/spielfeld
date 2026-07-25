# Changelog

## [Unreleased]

### Added

- Add single-elimination format
- Add jump-to-round scrolling in `Matches` tab via `RoundSelector`, using measured row/section-header heights so `SectionList.scrollToLocation` works even for not-yet-mounted rounds

### Changed

- Change `Manage` tab to use granular Zustand selectors instead of subscribing to the whole tournament, so it no longer re-renders on unrelated score updates
- Change match list in `Matches` tab from `ScrollView` to `SectionList` for virtualization, and memoize `MatchItem` rows so unrelated score updates don't re-render the whole list
- Change team lookups in `MatchItem` to use a `Map` instead of a linear search

### Fixed

- Fix Round Robin standings
- Fix score inputs to be numeric instead of text
- Fix Round Robin standings being recomputed on every render and redundantly recalculated (and discarded) on every score update
- Fix missing gap between format options in `manage/format`

### Removed

## [1.1.0] - 2026-03-08

### Added

- Add `@gorhom/bottom-sheet` package
- Add AppStore review prompt after finishing all tournament matches
- Add `expo-keep-awake` to keep screen on during live matches
- Add `RoundSelector` component & add auto-centering on selection
- Add option for taking photos directly using device camera
- Add screen for match details

### Changed

- Change setup from javascript to typescript (file changes still need to happen over time)
- Replace native modal with `@gorhom/bottom-sheet` in `DateTimePickerInput.tsx`
- Change option "Rate Us" from using `StoreReview` to opening AppStore URL in web
- Change live match timer logic to keep the timer running when app is on open

### Removed

- Remove time option from `DateTimePickerInput.tsx` (it caused a bug & had no use either)

## [1.0.1] - 2026-02-25

### Fixed

- Fix animation bug by updating `@react-native-keyboard-controller` package

## [1.0.0] - 2026-02-25

### Added

- First release

[1.1.0]: https://github.com/lucass2601/spielfeld/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/lucass2601/spielfeld/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/lucass2601/spielfeld/releases/tag/v1.0.0
