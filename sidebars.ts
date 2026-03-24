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
        'features/crm',
        'features/modules',
        'features/variable-sets',
        'features/backup-and-restore',
        'features/rest-api-restriction',
        'features/debug-tool',
        'features/server-connections',
        'features/licensing',
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
      ],
    },
    'troubleshooting',
  ],
};

export default sidebars;
