import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/wadaaz-task-management-web/', // Change this to the actual base path you need
    plugins: [
        tailwindcss(),
        react()
    ],
})
