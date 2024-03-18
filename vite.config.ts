import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePluginRadar } from 'vite-plugin-radar';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePluginRadar({
            // enableDev: true,
            analytics: [
                {
                    id: 'G-M4Y0L6E458',
                },
            ],
        }),
        VitePWA({ registerType: 'autoUpdate' }),
    ],
});
