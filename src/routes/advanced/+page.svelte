<!-- Advanced example demonstrating the chaining API -->
<script lang="ts">
	import { base } from '$app/paths';
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

	<a href="{base}/" class="back-link">← Back to Basic Demo</a>

	<footer>
		<a href="https://github.com/Mixxy3k/svelte-barcode-gen" target="_blank" rel="noopener noreferrer">
			📦 View on GitHub
		</a>
	</footer>
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
		color: var(--text-color);
	}

	h2 {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		color: var(--text-color);
	}

	p {
		text-align: center;
		color: var(--text-secondary);
		margin-bottom: 2rem;
	}

	section {
		margin-bottom: 3rem;
		padding: 1.5rem;
		background: var(--card-bg);
		border-radius: 8px;
		border: 1px solid var(--border-color);
	}

	section p {
		text-align: left;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	.barcode-display {
		padding: 2rem;
		background: var(--preview-bg);
		border: 2px solid var(--border-color);
		border-radius: 4px;
		text-align: center;
		overflow-x: auto;
	}

	pre {
		background: var(--code-bg);
		color: var(--code-text);
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.5;
		border: 1px solid var(--border-color);
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

	footer {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border-color);
		text-align: center;
	}

	footer a {
		color: #4a90e2;
		text-decoration: none;
		font-weight: 500;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: 1px solid #4a90e2;
		border-radius: 8px;
		transition: all 0.2s;
	}

	footer a:hover {
		background: #4a90e2;
		color: white;
		transform: translateY(-2px);
	}
</style>
