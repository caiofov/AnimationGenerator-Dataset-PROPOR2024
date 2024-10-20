import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { updateDatasetFile } from "./scripts/readImages";

function runJsonScript() {
  return {
    name: "write-images",
    buildStart() {
      updateDatasetFile();
    },
  } as PluginOption;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), runJsonScript()],
});
