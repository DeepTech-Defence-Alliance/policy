import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DTDA — Effects & Surge',
  tagline: 'Military Industrial Policy — Effects Tech Layer & Surge Capacity',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://deeptech-defence-alliance.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/policy/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DeepTech-Defence-Alliance',
  projectName: 'policy',

  onBrokenLinks: 'warn',

  // Bilingual support: Dutch (default) and English
  // Enables JEF partners and international audience to access policy templates
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-IE',
        calendar: 'gregory',
      },
      nl: {
        label: 'Nederlands',
        direction: 'ltr',
        htmlLang: 'nl-NL',
        calendar: 'gregory',
      },
    },
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/DeepTech-Defence-Alliance/policy/edit/main/dtda-site/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card for link previews (LinkedIn, Twitter, etc.)
    image: 'img/dtda-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'defence, defense, industrial policy, DTDA, DeepTech, military, JEF, surge capacity, effects tech layer'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {property: 'og:type', content: 'website'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DTDA — Effects & Surge',
      logo: {
        alt: 'DTDA Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Policy',
        },
        {
          href: 'https://github.com/DeepTech-Defence-Alliance/policy',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Policy',
          items: [
            {
              label: 'Deel I — Doelbeeld',
              to: '/deel-i/missie-principes',
            },
            {
              label: 'Deel II — Transformatie',
              to: '/deel-ii/matrix-oud-nieuw',
            },
          ],
        },
        {
          title: 'DeepTech Defence Alliance',
          items: [
            {
              label: 'GitHub Organisation',
              href: 'https://github.com/DeepTech-Defence-Alliance',
            },
          ],
        },
      ],
      copyright: `TLP:WHITE — DeepTech Defence Alliance — ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
