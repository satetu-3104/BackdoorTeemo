import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/BackdoorTeemo/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Backdoor Teemo',
        short_name: 'Teemo',
        start_url: '/BackdoorTeemo/',
        display: 'standalone',
        background_color: '#3498db',
        theme_color: '#3498db',
        icons: [
          {
            src: '/BackdoorTeemo/images/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/BackdoorTeemo/images/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
