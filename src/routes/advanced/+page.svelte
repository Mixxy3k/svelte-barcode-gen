<!-- Advanced example demonstrating the chaining API -->
<script lang="ts">
	import { BarcodeAdvanced } from '$lib/index.ts';
	import type { ChainedOperation } from '$lib/BarcodeAdvanced.svelte';

	const multipleBarcodesExample: ChainedOperation[] = [
		{
			type: 'options',
			options: { font: 'monospace', background: '#ffffff' }
		},
		{
			type: 'barcode',
			format: 'EAN13',
			value: '5901234123457',
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
			options: { height: 85, textPosition: 'top', fontSize: 16, marginTop: 15 }
		}
	];

	const productLabelExample: ChainedOperation[] = [
		{
			type: 'options',
			options: { font: 'OCR-B', background: '#f5f5f5' }
		},
		{
			type: 'barcode',
			format: 'CODE128',
			value: 'PRODUCT-2024',
			options: { fontSize: 14, height: 50 }
		},
		{
			type: 'blank',
			size: 15
		},
		{
			type: 'barcode',
			format: 'CODE39',
			value: 'LOT-A123',
			options: { fontSize: 12, height: 40, displayValue: true }
		}
	];
</script>

<div class="container">
	<h1>Advanced Barcode Examples</h1>
	<p>Demonstrating JsBarcode's method chaining API with multiple barcodes</p>

	<section>
		<h2>Product with Add-On Code</h2>
		<p>EAN-13 barcode with EAN-5 add-on (common in retail)</p>
		<div class="barcode-display">
			<BarcodeAdvanced chainedOperations={multipleBarcodesExample} elementTag="svg" />
		</div>
	</section>

	<section>
		<h2>Product Label with Multiple Codes</h2>
		<p>Multiple barcodes for product identification and lot tracking</p>
		<div class="barcode-display">
			<BarcodeAdvanced chainedOperations={productLabelExample} elementTag="svg" />
		</div>
	</section>

	<section>
		<h2>Code Example</h2>
		<pre><code
				>{`import { BarcodeAdvanced } from 'svelte-barcode-gen';

const operations = [
  {
    type: 'options',
    options: { font: 'OCR-B' }
  },
  {
    type: 'barcode',
    format: 'EAN13',
    value: '5901234123457',
    options: { fontSize: 18 }
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

<BarcodeAdvanced {operations} />`}</code
			></pre>
	</section>

	<a href="/" class="back-link">← Back to Basic Demo</a>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1.5rem;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	h1 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #333;
	}

	h2 {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		color: #555;
	}

	p {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	section {
		margin-bottom: 3rem;
		padding: 1.5rem;
		background: #f9f9f9;
		border-radius: 8px;
	}

	section p {
		text-align: left;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	.barcode-display {
		padding: 2rem;
		background: white;
		border: 2px solid #e0e0e0;
		border-radius: 4px;
		text-align: center;
		overflow-x: auto;
	}

	pre {
		background: #2d2d2d;
		color: #f8f8f2;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.5;
	}

	code {
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
	}

	.back-link {
		display: inline-block;
		margin-top: 2rem;
		padding: 0.75rem 1.5rem;
		background: #4a90e2;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		font-weight: 500;
		transition: background 0.2s;
	}

	.back-link:hover {
		background: #357abd;
	}
</style>
