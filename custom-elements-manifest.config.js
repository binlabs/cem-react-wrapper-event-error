import { cemInheritancePlugin } from "@wc-toolkit/cem-inheritance";
import { reactWrapperPlugin } from "@wc-toolkit/react-wrappers";
import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";
import { expandTypesPlugin, getTsProgram } from "cem-plugin-expanded-types";
import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";
import { customElementJsxPlugin } from "custom-element-jsx-integration";
import { customElementLazyLoaderPlugin } from "custom-element-lazy-loader";
import { customElementSolidJsPlugin } from "custom-element-solidjs-integration";
import { customElementSveltePlugin } from "custom-element-svelte-integration";
import { customElementVuejsPlugin } from "custom-element-vuejs-integration";
import { cemDeprecatorPlugin } from "custom-elements-manifest-deprecator";

export default {
  /** Globs to analyze */
  globs: ["src/components/**/*.ts"],
  /** Globs to exclude */
  exclude: ["src/**/*.test.ts", "src/**/*.stories.ts", "src/**/*.styles.ts"],
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */
  plugins: [
    expandTypesPlugin(),
    cemInheritancePlugin(),
    cemDeprecatorPlugin(),
    customElementJetBrainsPlugin(),
    reactWrapperPlugin({
      outdir: "react",
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace("my-", "")}/${tagName.replace(
          "my-",
          ""
        )}.js`,
    }),
    customElementSolidJsPlugin({
      outdir: "types",
      fileName: "custom-element-solidjs.d.ts",
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace("my-", "")}/${tagName.replace(
          "my-",
          ""
        )}.js`,
    }),
    customElementJsxPlugin({
      outdir: "types",
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace("my-", "")}/${tagName.replace(
          "my-",
          ""
        )}.js`,
    }),
    customElementVuejsPlugin({
      outdir: "types",
      fileName: "custom-element-vuejs.d.ts",
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace("my-", "")}/${tagName.replace(
          "my-",
          ""
        )}.js`,
    }),
    customElementSveltePlugin({
      outdir: "types",
      fileName: "custom-element-svelte.d.ts",
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace("my-", "")}/${tagName.replace(
          "my-",
          ""
        )}.js`,
    }),
    customElementLazyLoaderPlugin({
      outdir: "cdn",
      importPathTemplate: (_, tagName) =>
        `../dist/components/${tagName.replace("my-", "")}/${tagName.replace(
          "my-",
          ""
        )}.js`,
    }),
    customJSDocTagsPlugin({
      tags: {
        status: {},
        since: {},
        dependency: { mappedName: "dependencies", isArray: true },
      },
    }),
  ],

  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
};
