import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/CalendarList/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options,
}));