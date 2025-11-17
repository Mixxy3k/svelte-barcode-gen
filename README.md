# svelte-barcode-gen

A Svelte 5 wrapper for [JsBarcode](https://github.com/lindell/JsBarcode) - Generate barcodes in your Svelte applications with full TypeScript support.

## Features

- 🎯 Full TypeScript support with type definitions
- 🔧 Supports all JsBarcode formats (CODE128, EAN, UPC, CODE39, ITF, MSI, Pharmacode, Codabar, CODE93)
- 🎨 Customizable styling (colors, fonts, margins)
- 🖼️ Multiple rendering targets (SVG, Canvas, Image)
- ✅ Built-in validation with callbacks
- 🔗 Advanced chaining API support

## Installation

```bash
npm install svelte-barcode-gen
# or
pnpm add svelte-barcode-gen
```

## Basic Usage

```svelte
<script>
	import { Barcode } from 'svelte-barcode-gen';
</script>

<Barcode value="Hello World" />
```

## Advanced Usage

### With Custom Options

```svelte
<script>
	import { Barcode } from 'svelte-barcode-gen';
</script>

<Barcode
	value="1234567890128"
	elementTag="svg"
	options={{
		format: 'EAN13',
		width: 2,
		height: 100,
		displayValue: true,
		fontSize: 20,
		lineColor: '#000000',
		background: '#ffffff',
		margin: 10
	}}
/>
```

### With Validation

```svelte
<script>
	import { Barcode } from 'svelte-barcode-gen';

	let isValid = $state(true);

	function handleValidation(valid) {
		isValid = valid;
		if (!valid) {
			console.error('Invalid barcode value');
		}
	}
</script>

{#if !isValid}
	<p>Invalid barcode value for the selected format</p>
{/if}

<Barcode
	value="123"
	options={{
		format: 'EAN13',
		valid: handleValidation
	}}
/>
```

### Multiple Barcodes with Chaining (Advanced)

```svelte
<script>
	import { BarcodeAdvanced } from 'svelte-barcode-gen';

	const operations = [
		{
			type: 'options',
			options: { font: 'OCR-B' }
		},
		{
			type: 'barcode',
			format: 'EAN13',
			value: '1234567890128',
			options: { fontSize: 18, textMargin: 0 }
		},
		{
			type: 'blank',
			size: 20
		},
		{
			type: 'barcode',
			format: 'EAN5',
			value: '12345',
			options: { height: 85, textPosition: 'top' }
		}
	];
</script>

<BarcodeAdvanced {operations} elementTag="svg" />
```

## Supported Barcode Formats

- **CODE128** - CODE128 (auto mode), CODE128A, CODE128B, CODE128C
- **EAN/UPC** - EAN13, EAN8, EAN5, EAN2, UPC
- **CODE39**
- **ITF** - ITF, ITF14
- **MSI** - MSI, MSI10, MSI11, MSI1010, MSI1110
- **Pharmacode**
- **Codabar**
- **CODE93**

## API Reference

### `<Barcode>`

Main component for generating single barcodes.

#### Props

| Prop         | Type                         | Default  | Description                     |
| ------------ | ---------------------------- | -------- | ------------------------------- |
| `value`      | `string`                     | required | The value to encode             |
| `elementTag` | `'svg' \| 'canvas' \| 'img'` | `'img'`  | HTML element type for rendering |
| `options`    | `JsBarcodeOptions`           | `{}`     | Configuration options           |

### `<BarcodeAdvanced>`

Component for advanced use cases with method chaining.

#### Props

| Prop                | Type                         | Default | Description                  |
| ------------------- | ---------------------------- | ------- | ---------------------------- |
| `elementTag`        | `'svg' \| 'canvas' \| 'img'` | `'svg'` | HTML element type            |
| `chainedOperations` | `ChainedOperation[]`         | `[]`    | Array of operations to chain |

### `JsBarcodeOptions`

| Option         | Type                            | Default       | Description                      |
| -------------- | ------------------------------- | ------------- | -------------------------------- |
| `format`       | `BarcodeFormat`                 | `'CODE128'`   | Barcode format                   |
| `width`        | `number`                        | `2`           | Width of a single bar            |
| `height`       | `number`                        | `100`         | Height of the barcode            |
| `displayValue` | `boolean`                       | `true`        | Show text below/above barcode    |
| `text`         | `string`                        | `undefined`   | Override display text            |
| `fontOptions`  | `string`                        | `''`          | Font styling ('bold', 'italic')  |
| `font`         | `string`                        | `'monospace'` | Font family                      |
| `textAlign`    | `'left' \| 'center' \| 'right'` | `'center'`    | Text alignment                   |
| `textPosition` | `'top' \| 'bottom'`             | `'bottom'`    | Text position                    |
| `textMargin`   | `number`                        | `2`           | Space between barcode and text   |
| `fontSize`     | `number`                        | `20`          | Font size                        |
| `background`   | `string`                        | `'#ffffff'`   | Background color                 |
| `lineColor`    | `string`                        | `'#000000'`   | Bar color                        |
| `margin`       | `number`                        | `10`          | Margin on all sides              |
| `marginTop`    | `number`                        | `undefined`   | Top margin (overrides margin)    |
| `marginBottom` | `number`                        | `undefined`   | Bottom margin (overrides margin) |
| `marginLeft`   | `number`                        | `undefined`   | Left margin (overrides margin)   |
| `marginRight`  | `number`                        | `undefined`   | Right margin (overrides margin)  |
| `valid`        | `(valid: boolean) => void`      | `undefined`   | Validation callback              |

## TypeScript Support

This package includes full TypeScript definitions. Import types as needed:

```typescript
import type {
    BarcodeFormat,
    JsBarcodeOptions,
    BarcodeProps,
    ElementTag,
} from "svelte-barcode-gen";
```

## Examples

Check out the `/src/routes/+page.svelte` file in this repository for a complete interactive demo with all options.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build library
pnpm build

# Check types
pnpm check
```

## License

MIT

## Credits

Built on top of [JsBarcode](https://github.com/lindell/JsBarcode) by Johan Lindell.
