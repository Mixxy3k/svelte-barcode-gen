/**
 * TypeScript definitions for JsBarcode wrapper
 */

/**
 * Supported barcode formats
 */
export type BarcodeFormat =
	| 'CODE128'
	| 'CODE128A'
	| 'CODE128B'
	| 'CODE128C'
	| 'EAN13'
	| 'EAN8'
	| 'EAN5'
	| 'EAN2'
	| 'UPC'
	| 'CODE39'
	| 'ITF'
	| 'ITF14'
	| 'MSI'
	| 'MSI10'
	| 'MSI11'
	| 'MSI1010'
	| 'MSI1110'
	| 'pharmacode'
	| 'codabar'
	| 'CODE93';

/**
 * HTML element types that can display barcodes
 */
export type ElementTag = 'img' | 'canvas' | 'svg';

/**
 * Text alignment options
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * Text position options
 */
export type TextPosition = 'top' | 'bottom';

/**
 * Font options for barcode text
 */
export type FontOptions = '' | 'bold' | 'italic' | 'bold italic';

/**
 * JsBarcode options interface
 */
export interface JsBarcodeOptions {
	/**
	 * The barcode format to use
	 * @default 'CODE128'
	 */
	format?: BarcodeFormat;

	/**
	 * Width of a single bar
	 * @default 2
	 */
	width?: number;

	/**
	 * Height of the barcode
	 * @default 100
	 */
	height?: number;

	/**
	 * Whether to display the value below/above the barcode
	 * @default true
	 */
	displayValue?: boolean;

	/**
	 * Override the text to display
	 */
	text?: string;

	/**
	 * Font styling options (bold, italic, etc.)
	 * @default ''
	 */
	fontOptions?: FontOptions | string;

	/**
	 * Font family for the text
	 * @default 'monospace'
	 */
	font?: string;

	/**
	 * Text alignment
	 * @default 'center'
	 */
	textAlign?: TextAlign;

	/**
	 * Text position relative to barcode
	 * @default 'bottom'
	 */
	textPosition?: TextPosition;

	/**
	 * Space between barcode and text
	 * @default 2
	 */
	textMargin?: number;

	/**
	 * Font size of the text
	 * @default 20
	 */
	fontSize?: number;

	/**
	 * Background color (CSS color)
	 * @default '#ffffff'
	 */
	background?: string;

	/**
	 * Color of the bars (CSS color)
	 * @default '#000000'
	 */
	lineColor?: string;

	/**
	 * Margin on all sides
	 * @default 10
	 */
	margin?: number;

	/**
	 * Top margin (overrides margin)
	 */
	marginTop?: number;

	/**
	 * Bottom margin (overrides margin)
	 */
	marginBottom?: number;

	/**
	 * Left margin (overrides margin)
	 */
	marginLeft?: number;

	/**
	 * Right margin (overrides margin)
	 */
	marginRight?: number;

	/**
	 * Callback function to check if the barcode is valid
	 */
	valid?: (valid: boolean) => void;

	/**
	 * Additional options not explicitly typed
	 */
	[key: string]: any;
}

/**
 * Props for the Barcode component
 */
export interface BarcodeProps {
	/**
	 * The value to encode as a barcode
	 */
	value: string;

	/**
	 * HTML element type to render the barcode in
	 * @default 'img'
	 */
	elementTag?: ElementTag;

	/**
	 * JsBarcode options
	 */
	options?: JsBarcodeOptions;
}

/**
 * Encoding data structure returned when using JsBarcode in data mode
 */
export interface BarcodeEncoding {
	data: string;
	text: string;
	options: JsBarcodeOptions;
}

/**
 * Data object structure for retrieving barcode encoding data
 */
export interface BarcodeData {
	encodings: BarcodeEncoding[];
}
