import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/overview',
        'features/user-management',
        'features/roles-and-automation',
        'features/crm',
        {
          type: 'category',
          label: 'Modules',
          link: { type: 'doc', id: 'features/modules/index' },
          items: [
            'features/modules/module-guides',
            'features/modules/packages',
            'features/modules/auto-updates',
          ],
        },
        'features/white-label',
        'features/variable-sets',
        'features/backup-and-restore',
        'features/rest-api-restriction',
        'features/content-pipelines',
        'features/server-connections',
        'features/debug-tool',
        'features/licensing',
        'features/workflow-templates',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/overview',
        'integrations/flowmattic',
        'integrations/cloudflare',
        'integrations/contentpen',
        'integrations/linkcentral',
        'integrations/squirrly-seo',
      ],
    },
    'troubleshooting',
  ],
};

export default sidebars;
