<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { base } from '$app/paths';
	import { Barcode } from '$lib/index.ts';
	import type { BarcodeFormat } from '$lib/index.ts';

	let value = $state('Svelte5');
	let format = $state<BarcodeFormat>('CODE128');
	let tag = $state<'svg' | 'img' | 'canvas'>('svg');
	let width = $state(2);
	let height = $state(100);
	let displayValue = $state(true);
	let lineColor = $state('#000000');
	let background = $state('#ffffff');
	let fontSize = $state(20);
	let textMargin = $state(2);
	let margin = $state(10);
	let valid = $state(true);
	let errorMessage = $state('');

	function handleValid(isValid: boolean) {
		valid = isValid;
		if (!isValid) {
			errorMessage = 'Invalid barcode value for the selected format';
		} else {
			errorMessage = '';
		}
	}

	// Generate code snippet for copy-paste
	let codeSnippet = $derived.by(() => {
		const options = [];
		if (format !== 'CODE128') options.push(`format: '${format}'`);
		if (width !== 2) options.push(`width: ${width}`);
		if (height !== 100) options.push(`height: ${height}`);
		if (!displayValue) options.push(`displayValue: ${displayValue}`);
		if (lineColor !== '#000000') options.push(`lineColor: '${lineColor}'`);
		if (background !== '#ffffff') options.push(`background: '${background}'`);
		if (fontSize !== 20) options.push(`fontSize: ${fontSize}`);
		if (textMargin !== 2) options.push(`textMargin: ${textMargin}`);
		if (margin !== 10) options.push(`margin: ${margin}`);

		const optionsStr =
			options.length > 0 ? `\n\toptions={{\n\t\t${options.join(',\n\t\t')}\n\t}}` : '';

		return `<script>
	import { Barcode } from 'svelte-barcode-gen';
<\/script>

<Barcode${tag !== 'img' ? `\n\telementTag="${tag}"` : ''}${value !== 'Svelte5' ? `\n\tvalue="${value}"` : ''}${optionsStr}
/>`;
	});

	let copyButtonText = $state('Copy');

	function copyToClipboard() {
		navigator.clipboard.writeText(codeSnippet).then(() => {
			copyButtonText = 'Copied!';
			setTimeout(() => {
				copyButtonText = 'Copy';
			}, 2000);
		});
	}
</script>

<div class="container">
	<h1>Barcode Preview</h1>
	<p class="subtitle">Interactive demo of svelte-barcode-gen</p>

	<div class="nav-links">
		<a href="{base}/advanced">View Advanced Examples →</a>
	</div>

	<div class="controls">
		<label>
			Value
			<input type="text" bind:value placeholder="Enter barcode value" maxlength="50" />
		</label>

		<div class="grid">
			<label>
				Format
				<select bind:value={format}>
					<option value="CODE128">CODE128</option>
					<option value="CODE128A">CODE128 A</option>
					<option value="CODE128B">CODE128 B</option>
					<option value="CODE128C">CODE128 C</option>
					<option value="EAN13">EAN-13</option>
					<option value="EAN8">EAN-8</option>
					<option value="EAN5">EAN-5</option>
					<option value="EAN2">EAN-2</option>
					<option value="UPC">UPC (A)</option>
					<option value="CODE39">CODE39</option>
					<option value="ITF14">ITF-14</option>
					<option value="MSI">MSI</option>
					<option value="MSI10">MSI10</option>
					<option value="MSI11">MSI11</option>
					<option value="MSI1010">MSI1010</option>
					<option value="MSI1110">MSI1110</option>
					<option value="pharmacode">Pharmacode</option>
					<option value="codabar">Codabar</option>
					<option value="CODE93">CODE93</option>
				</select>
			</label>

			<label>
				Tag
				<select bind:value={tag}>
					<option value="svg">SVG</option>
					<option value="img">Image</option>
					<option value="canvas">Canvas</option>
				</select>
			</label>
		</div>

		<div class="grid">
			<label>
				Width
				<input type="number" bind:value={width} min="1" max="10" />
			</label>

			<label>
				Height
				<input type="number" bind:value={height} min="20" max="200" />
			</label>
		</div>

		<label>
			<input type="checkbox" bind:checked={displayValue} />
			Display value
		</label>

		<div class="grid">
			<label>
				Line Color
				<input type="color" bind:value={lineColor} />
			</label>

			<label>
				Background
				<input type="color" bind:value={background} />
			</label>
		</div>

		<div class="grid">
			<label>
				Font Size
				<input type="number" bind:value={fontSize} min="8" max="40" />
			</label>

			<label>
				Text Margin
				<input type="number" bind:value={textMargin} min="0" max="20" />
			</label>
		</div>

		<label>
			Margin
			<input type="number" bind:value={margin} min="0" max="30" />
		</label>

		{#if !valid && errorMessage}
			<div class="error">{errorMessage}</div>
		{/if}
	</div>

	<div class="preview">
		<Barcode
			{value}
			elementTag={tag}
			options={{
				format,
				width,
				height,
				displayValue,
				lineColor,
				background,
				fontSize,
				textMargin,
				margin,
				valid: handleValid
			}}
		/>
	</div>

	<div class="code-section">
		<div class="code-header">
			<h2>Code</h2>
			<button class="copy-btn" onclick={copyToClipboard}>
				{copyButtonText}
			</button>
		</div>
		<pre><code>{codeSnippet}</code></pre>
	</div>

	<footer>
		<a href="https://github.com/Mixxy3k/svelte-barcode-gen" target="_blank" rel="noopener noreferrer">
			📦 View on GitHub
		</a>
	</footer>
</div>

<style>
	.container {
		max-width: 640px;
		margin: 2rem auto;
		padding: 1.5rem;
		font-family: sans-serif;
	}

	h1 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: var(--text-color);
	}

	.subtitle {
		text-align: center;
		color: var(--text-secondary);
		margin-bottom: 1rem;
		font-size: 0.95rem;
	}

	.nav-links {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.nav-links a {
		color: #4a90e2;
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border: 1px solid #4a90e2;
		border-radius: 4px;
		display: inline-block;
		transition: all 0.2s;
	}

	.nav-links a:hover {
		background: #4a90e2;
		color: white;
	}

	input[type='text'],
	select,
	input[type='number'] {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.25rem;
		box-sizing: border-box;
		background: var(--input-bg);
		color: var(--text-color);
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}

	input[type='color'] {
		width: 100%;
		height: 2.5rem;
		margin-top: 0.25rem;
		padding: 0.25rem;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		cursor: pointer;
		background: var(--input-bg);
	}

	label {
		display: block;
		margin-bottom: 1rem;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.preview {
		margin-top: 2rem;
		padding: 1rem;
		border: 1px solid var(--border-color);
		background: var(--preview-bg);
		text-align: center;
		overflow-x: auto;
		max-width: 100%;
	}

	.error {
		padding: 0.75rem;
		background: var(--error-bg);
		border: 1px solid var(--error-border);
		border-radius: 4px;
		color: var(--error-text);
		margin-top: 0.5rem;
	}

	.code-section {
		margin-top: 2rem;
		background: var(--card-bg);
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--border-color);
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		background: var(--card-header-bg);
		border-bottom: 1px solid var(--border-color);
	}

	.code-header h2 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-color);
	}

	.copy-btn {
		padding: 0.5rem 1rem;
		background: #4a90e2;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		transition: background 0.2s;
	}

	.copy-btn:hover {
		background: #357abd;
	}

	.copy-btn:active {
		transform: scale(0.98);
	}

	.code-section pre {
		margin: 0;
		padding: 1.5rem;
		overflow-x: auto;
		background: var(--code-bg);
		color: var(--code-text);
	}

	.code-section code {
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 0.9rem;
		line-height: 1.6;
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
