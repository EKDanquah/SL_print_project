import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePluginFonts(
    {   // Custom fonts.
      custom: {
        families: [{
          name: 'Public Sans',
          local: 'PublicSans',
          src: './src/assets/fonts/*.woff2',
        }],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }
  )]
})
