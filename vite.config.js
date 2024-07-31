import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
			},
		})
	],
	build: {
		outDir: '../Instabite-backend/public',
		emptyOutDir: true,
	},
	server: {
		host: '0.0.0.0', // Listen on all network interfaces
		port: 5173, // Use the specified port
	},
})