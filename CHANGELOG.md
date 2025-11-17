# Changelog

## [Unreleased] - 2025-11-17

### Added

- **Full TypeScript support** with comprehensive type definitions (`types.ts`)
  - `BarcodeFormat` type with all 18+ supported formats
  - `JsBarcodeOptions` interface with all configuration options
  - `BarcodeProps`, `ChainedOperation`, and other utility types
- **BarcodeAdvanced component** for method chaining API
  - Support for multiple barcodes in one render
  - Blank space insertion between barcodes
  - Global options application
- **Enhanced demo page** (`/src/routes/+page.svelte`)
  - All 18+ barcode format options
  - Color pickers for line color and background
  - Font size, text margin, and margin controls
  - Real-time validation feedback
  - Error message display
  - TypeScript support
- **Advanced examples page** (`/src/routes/advanced/+page.svelte`)
  - Product label with add-on codes example
  - Multi-barcode label example
  - Code snippets for developers
- **Comprehensive documentation**
  - Updated README with full API reference
  - Usage examples (basic and advanced)
  - TypeScript integration guide
  - Complete options table
- **Implementation guide** (`IMPLEMENTATION.md`)
  - Detailed summary of all changes
  - Feature checklist
  - Usage patterns

### Changed

- **Barcode component** improvements
  - Added error handling with try-catch
  - Improved validation callback support
  - Imported types from separate file
  - Removed non-existent `flat` option
- **Export structure** enhanced
  - Export both `Barcode` and `BarcodeAdvanced` components
  - Export all TypeScript types for consumers

### Fixed

- TypeScript errors in demo page
- Missing type annotations
- Proper type constraints for component props

### Supported Barcode Formats

- CODE128 (including A, B, C variants)
- EAN-13, EAN-8, EAN-5, EAN-2
- UPC (A)
- CODE39
- ITF, ITF-14
- MSI, MSI10, MSI11, MSI1010, MSI1110
- Pharmacode
- Codabar
- CODE93

### API Surface

All JsBarcode options now supported:

- Format, width, height
- Display value control
- Text customization (content, font, size, alignment, position, margins)
- Colors (line color, background)
- Margins (all sides)
- Validation callbacks

## [0.0.1] - Initial Release

- Basic Barcode component
- Limited format support
- Basic options
