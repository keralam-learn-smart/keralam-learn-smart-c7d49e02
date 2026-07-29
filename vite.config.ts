// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Use Vercel preset so `npm run build` outputs to .vercel/output (Vercel's expected structure).
  // This only applies during `vite build` — dev server is unaffected.
  nitro: {
    preset: "vercel",
  },
  vite: {
    resolve: {
      alias: {
        i18next: "/src/vendor/i18next.ts",
        "react-i18next": "/src/vendor/react-i18next.ts",
        "i18next-browser-languagedetector": "/src/vendor/i18next-browser-languagedetector.ts",
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5000,
      allowedHosts: true,
    },
  },
});
