<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state<'light' | 'dark' | 'auto'>('auto');

	onMount(() => {
		const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
		theme = stored || 'auto';
		applyTheme(theme);
	});

	function applyTheme(newTheme: 'light' | 'dark' | 'auto') {
		theme = newTheme;
		localStorage.setItem('theme', newTheme);

		if (newTheme === 'auto') {
			document.documentElement.removeAttribute('data-theme');
		} else {
			document.documentElement.setAttribute('data-theme', newTheme);
		}
	}

	function toggleTheme() {
		const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
		applyTheme(next);
	}

	const icons = {
		light: '☀️',
		dark: '🌙',
		auto: '💻'
	};
</script>

<button onclick={toggleTheme} class="theme-toggle" aria-label="Toggle theme" title={`Theme: ${theme}`}>
	<span class="icon">{icons[theme]}</span>
	<span class="label">{theme}</span>
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		color: var(--text-color);
		cursor: pointer;
		font-size: 0.9rem;
		font-family: inherit;
		transition: all 0.2s;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.theme-toggle:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.theme-toggle:active {
		transform: translateY(0);
	}

	.icon {
		font-size: 1.2rem;
		line-height: 1;
	}

	.label {
		text-transform: capitalize;
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.theme-toggle {
			top: 0.5rem;
			right: 0.5rem;
			padding: 0.4rem 0.8rem;
			font-size: 0.85rem;
		}

		.label {
			display: none;
		}
	}
</style>
