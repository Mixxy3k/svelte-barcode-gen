import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				// Suppress "default is imported from external module but never used" for jsbarcode
				if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.id?.includes('jsbarcode')) {
					return;
				}
				warn(warning);
			}
		}
	}
});
