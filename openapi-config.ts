import type { ConfigFile } from "@rtk-query/codegen-openapi";

// see https://redux-toolkit.js.org/rtk-query/usage/code-generation#usage
// pnpm add -D @rtk-query/codegen-openapi tsx
// npx tsx node_modules/@rtk-query/codegen-openapi/lib/bin/cli.js openapi-config.ts
// pnpm add -D ts-node
// npx @rtk-query/codegen-openapi openapi-config.ts
// Encountered a TypeScript configfile, but neither esbuild-runner nor ts-node are installed.
const config: ConfigFile = {
  schemaFile: "http://localhost:8080/v3/api-docs",
  apiFile: "./src/store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFiles: {
    "./src/store/routesApi.ts": {
      filterEndpoints: [/route/i],
    },
    "./src/store/sampleApi.ts": {
      filterEndpoints: [/sample/i],
    },
    "./src/store/tagApi.ts": {
      filterEndpoints: [/tag/i],
    },
    "./src/store/featureApi.ts": {
      filterEndpoints: [/feature/i],
    },
    "./src/store/appApi.ts": {
      filterEndpoints: [/app/i],
    },
    "./src/store/repositoryApi.ts": {
      filterEndpoints: [/repositor/i],
    },
  },
  hooks: true,
  tag: true,
};

export default config;
