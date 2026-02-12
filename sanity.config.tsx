"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { plPLLocale } from "@sanity/locale-pl-pl";
import React from "react";
import Image from "next/image";
import { WebPCompressor } from "./sanity/components/WebPCompressor";

const props = {
  "--bg": "#121212",
  "--text": "#e0e0e0",
  "--brand": "#b32a2e",
  "--gold": "#efd075",
  "--pure-white": "#ffffff",
};

const myTheme = buildLegacyTheme({
  "--black": props["--bg"],
  "--white": props["--text"],
  "--component-bg": props["--bg"],
  "--component-text-color": props["--text"],
  "--brand-primary": props["--brand"],
  "--default-button-primary-color": props["--brand"],
  "--main-navigation-color": props["--bg"],
  "--main-navigation-color--inverted": props["--gold"],
  "--state-info-color": props["--pure-white"],
});

const StudioIcon = () => (
  <Image
    src="/LogoRedBG.png"
    alt="TC"
    height={70}
    width={70}
    className="rounded-full"
  />
);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Panel Teraz Chiny",

  icon: StudioIcon,

  theme: {
    ...myTheme,
    "--s-color-text-button-primary": props["--pure-white"],
    "--s-color-text-accent": props["--pure-white"],
    "--s-color-icon-accent": props["--pure-white"],
  },

  studio: {
    components: {
      logo: () =>
        React.createElement(
          "div",
          {
            style: { display: "flex", alignItems: "center", gap: "10px" },
          },
          [
            React.createElement(
              "style",
              { key: "v4-fix" },
              `
            [data-selected="true"] span, [data-selected="true"] svg {
              color: #ffffff !important;
              fill: #ffffff !important;
            }
            [data-selected="true"] {
              background-color: ${props["--brand"]} !important;
            }
          `,
            ),

            React.createElement("img", {
              key: "logo-img",
              src: "/logo.svg",
              alt: "Teraz Chiny",
              style: { height: "25px", objectFit: "contain" },
            }),
          ],
        ),
    },
  },

  plugins: [
    plPLLocale(),
    structureTool({
      structure,
      title: "Struktura",
    }),

    visionTool({
      defaultApiVersion: apiVersion,
      title: "Eksplorator API",
    }),
  ],
  form: {
    image: {
      assetSources: (previousAssetSources) => {
        // Dodajemy nasze źródło na początek listy
        return [
          {
            name: "webp-compressor",
            title: "Skompresuj (WebP)",
            component: WebPCompressor,
            icon: () => (
              <span style={{ fontWeight: "bold", color: "green" }}>WebP</span>
            ), // Lub jakaś ikona
          },
          ...previousAssetSources, // Zachowujemy standardowe "Upload" i "Unsplash"
        ];
      },
    },
  },
  schema,
});
