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

const props = {
  "--bg": "#121212",
  "--text": "#e0e0e0",
  "--brand": "#b32a2e",
  "--gold": "#efd075",
  "--pure-white": "#ffffff",
};

// ... (Twoja konfiguracja myTheme bez zmian) ...
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

// 1. Definiujemy komponent dla małej IKONY (zamiast "PT")
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

  // 2. TUTAJ podmieniamy "PT" na Twoją ikonę
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
            // Styl globalny dla naprawy kolorów
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
            // Pełne logo w pasku nawigacji
            React.createElement("img", {
              key: "logo-img",
              src: "/logo.svg", // Upewnij się, że używasz tutaj tego samego pliku co w ikonie
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
      title: "Struktura", // Tutaj zmieniamy nazwę "Structure" na polską
    }),

    visionTool({
      defaultApiVersion: apiVersion,
      title: "Eksplorator API", // "Vision" to narzędzie dla deweloperów, "Eksplorator API" brzmi profesjonalnie
    }),
  ],

  schema,
});
