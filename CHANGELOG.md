# Changelog

## [Unreleased]

### Added

### Changed

### Fixed

- Fix score inputs to be numeric instead of text

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
