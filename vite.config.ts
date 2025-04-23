// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/webflowcustompopup.ts'),
      name: 'WFCustomPopup',
      // the proper extensions will be added
      fileName: 'webflowcustompopup',
    },
  },
})