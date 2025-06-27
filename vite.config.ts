import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Allows the app to be accessed by any device on the local network
    port: 7000, // The port for the local development server
  },

  // Set base path depending on build mode so GitHub Pages serves assets correctly
base:  '/chico-wahtsapp/' ,


  plugins: [
    react(), // Vite plugin to handle React with SWC (a faster alternative to Babel)
    mode === 'development' && componentTagger(), // Used for development only, to add tagging for components
  ].filter(Boolean), // Ensures that `componentTagger()` is only added in development mode

  resolve: {
    alias: {
      // This resolves '@' to 'src' so you can use '@' as a shortcut for importing from the src folder
      '@': path.resolve(__dirname, 'src'),
      // Resolve the React packages manually in case there are issues
      'react': path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules', 'react', 'jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules', 'react', 'jsx-dev-runtime'),
    },
  },

  build: {
    // Custom build options for Vite
    rollupOptions: {
      // Handle external node modules that are not necessary in the browser
      external: [
        'stream', 'http', 'https', 'url', 'zlib',
      ],
    },
    // Chunk size warning limit; set to 1000KB to warn about large chunks
    chunkSizeWarningLimit: 1000,
    // Directory for output files after build
    outDir: 'dist',
    // Use esbuild to minify the code for better performance
    minify: 'esbuild',
    // Generate source maps for debugging purposes
    sourcemap: true,
  },

  // CSS preprocessor options
  css: {
    preprocessorOptions: {
      scss: {
        // Automatically import common SCSS files across all SCSS files
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
}));
