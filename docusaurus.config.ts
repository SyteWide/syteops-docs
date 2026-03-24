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

  url: 'https://opsdocs.sytewide.com',
  baseUrl: '/',

  organizationName: 'sculpted-marketing',
  projectName: 'syteops-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  markdown: {
    mermaid: true,
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

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  plugins: [
    'docusaurus-plugin-image-zoom',
    // Suppress known upstream warning from vscode-languageserver-types
    // bundled transitively by @docusaurus/theme-mermaid. Not actionable.
    function suppressVSCodeLsWarning() {
      return {
        name: 'suppress-vscode-ls-warning',
        configureWebpack() {
          return {
            ignoreWarnings: [{module: /vscode-languageserver-types/}],
          };
        },
      };
    },
  ],

  themeConfig: {
    image: 'img/syteops-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'new_docs_2025',
      content:
        'Welcome to the redesigned SyteOps documentation! <a href="/docs/getting-started/installation">Get started here</a>.',
      backgroundColor: '#2563eb',
      textColor: '#ffffff',
      isCloseable: true,
    },
    navbar: {
      title: 'SyteOps',
      logo: {
        alt: 'SyteOps Logo',
        src: 'img/logo.png',
        width: 40,
        height: 40,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://sytewide.com/buy-syteops',
          label: 'Buy SyteOps',
          position: 'right',
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
            {label: 'Buy SyteOps', href: 'https://sytewide.com/buy-syteops'},
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
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgba(255, 255, 255, 0.9)',
        dark: 'rgba(15, 23, 42, 0.9)',
      },
      config: {
        margin: 40,
        scrollOffset: 0,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
