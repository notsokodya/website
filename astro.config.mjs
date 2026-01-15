import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
    devToolbar: {
        enabled: false
    },

    integrations: [react()],

    adapter: node({
        mode: 'standalone'
    })
});