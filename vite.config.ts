import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        https: false,
        proxy: {}
    },
    build:{
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    }

})
