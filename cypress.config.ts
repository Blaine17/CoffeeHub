import { defineConfig } from "cypress";
import testVar from "./backend/utils/testdotenv";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8100",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {};
    },
  },
  env: {
    ...testVar,
  
  },
});
