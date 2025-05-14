// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/wadaaz-task-management-web/', // Add this line
    plugins: [
        tailwindcss(),
        react()
    ],
})
