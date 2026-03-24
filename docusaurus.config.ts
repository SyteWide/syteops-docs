import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SyteOps Documentation',
  tagline: 'Centralize operations. Automate workflows. Secure your WordPress.',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://docs.sytewide.com',
  baseUrl: '/',

  organizationName: 'sculpted-marketing',
  projectName: 'syteops-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/syteops-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'SyteOps',
      logo: {
        alt: 'SyteOps Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://sytewide.com',
          label: 'SyteWide.com',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started/installation'},
            {label: 'Features', to: '/docs/features/overview'},
            {label: 'Integrations', to: '/docs/integrations/overview'},
            {label: 'Troubleshooting', to: '/docs/troubleshooting'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'SyteWide.com', href: 'https://sytewide.com'},
            {label: 'FlowMattic', href: 'https://flowmattic.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SyteWide. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
