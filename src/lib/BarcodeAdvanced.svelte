<script lang="ts">
	import JsBarcode from 'jsbarcode';
	import type { JsBarcodeOptions, ElementTag } from './types.js';

	interface AdvancedBarcodeProps {
		elementTag?: ElementTag;
		chainedOperations?: ChainedOperation[];
	}

	export interface ChainedOperation {
		type: 'barcode' | 'blank' | 'options';
		format?: string;
		value?: string;
		options?: JsBarcodeOptions;
		size?: number;
	}

	let barcode: HTMLImageElement | HTMLCanvasElement | SVGSVGElement | undefined = $state(undefined);
	let { elementTag = 'svg', chainedOperations = [] }: AdvancedBarcodeProps = $props();

	$effect(() => {
		if (barcode && chainedOperations.length > 0) {
			try {
				let chain: any = JsBarcode(barcode);

				for (const operation of chainedOperations) {
					if (operation.type === 'options' && operation.options) {
						chain = chain.options(operation.options);
					} else if (operation.type === 'blank' && operation.size !== undefined) {
						chain = chain.blank(operation.size);
					} else if (operation.type === 'barcode' && operation.format && operation.value) {
						// Call the format-specific method (e.g., EAN13, CODE128, etc.)
						const formatMethod = operation.format;
						if (typeof chain[formatMethod] === 'function') {
							chain = chain[formatMethod](operation.value, operation.options || {});
						}
					}
				}

				chain.render();
			} catch (error) {
				console.error('Advanced barcode generation error:', error);
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
