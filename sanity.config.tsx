/* Section: Studio Configuration */
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

  /* Section: Theme Fix */
  // Usunięto nieznane właściwości --s-color-..., które wywoływały błędy TS.
  // Zostawiamy tylko obiekt myTheme wygenerowany przez buildLegacyTheme.
  theme: myTheme,

  studio: {
    components: {
      logo: () =>
        React.createElement(
          "div",
          {
            style: { display: "flex", alignItems: "center", gap: "10px" },
          },
          [
            /* Section: Global CSS Overrides */
            // Przenosimy style tekstów przycisków tutaj, aby uniknąć błędów w obiekcie theme
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
            /* Dodatkowe style dla przycisków, których brakowało w theme */
            button[data-appearance="default"][data-color="primary"] {
                --card-bg-color: ${props["--brand"]};
                --card-fg-color: ${props["--pure-white"]};
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

  /* Section: Global Component Registration */
  form: {
    components: {
      input: (props) => {
        // Jeśli chcesz, aby WebPCompressor działał AUTOMATYCZNIE dla każdego pola typu 'image'
        // we wszystkich Twoich schematach, odkomentuj poniższy kod:

        /*
        if (props.schemaType.name === 'image') {
          return props.renderDefault(props); // Lub Twój komponent, jeśli ma obsługiwać wszystkie zdjęcia
        }
        */

        return props.renderDefault(props);
      },
    },
  },

  schema,
});
