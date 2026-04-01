import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const fbAppId = env.VITE_FB_APP_ID?.trim() ?? ''

  return {
    plugins: [
      base44({
        // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
        // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
        legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true'
      }),
      react(),
      {
        name: 'inject-fb-app-id',
        transformIndexHtml(html) {
          if (!fbAppId || !/^\d+$/.test(fbAppId)) return html
          return html.replace(
            '<meta property="og:locale" content="en_US" />',
            `<meta property="og:locale" content="en_US" />\n    <meta property="fb:app_id" content="${fbAppId}" />`
          )
        },
      },
    ],
  }
})