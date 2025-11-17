<script lang="ts">
	import JsBarcode from 'jsbarcode';
	import type { JsBarcodeOptions, BarcodeProps } from './types.js';

	let barcode: HTMLImageElement | HTMLCanvasElement | SVGSVGElement | undefined = $state(undefined);
	let { value, elementTag = 'img', options = {} }: BarcodeProps = $props();

	const defaultOptions: JsBarcodeOptions = {
		format: 'CODE128',
		width: 2,
		height: 100,
		displayValue: true,
		fontOptions: '',
		font: 'monospace',
		textAlign: 'center',
		textPosition: 'bottom',
		textMargin: 2,
		fontSize: 20,
		background: '#ffffff',
		lineColor: '#000000',
		margin: 10
	};

	$effect(() => {
		if (barcode && value) {
			try {
				JsBarcode(barcode, value, { ...defaultOptions, ...options });
			} catch (error) {
				console.error('Barcode generation error:', error);
				if (options.valid) {
					options.valid(false);
				}
			}
		}
	});
</script>

{#if elementTag === 'img'}
	<img bind:this={barcode} alt="" />
{:else if elementTag === 'canvas'}
	<canvas bind:this={barcode}></canvas>
{:else}
	<svg bind:this={barcode}></svg>
{/if}
