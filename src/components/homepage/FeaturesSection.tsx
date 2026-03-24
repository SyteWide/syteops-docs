import React from 'react';
import Link from '@docusaurus/Link';
import {
  UsersIcon,
  PuzzleIcon,
  PlugIcon,
  ShieldIcon,
  LockIcon,
  DatabaseIcon,
} from '@site/src/components/icons';

const features = [
  {
    title: 'User Management',
    description:
      'Manage users with 31+ fields, system roles, custom roles, and CRM integration across 15 platforms.',
    href: '/docs/features/user-management',
    Icon: UsersIcon,
  },
  {
    title: 'Modules',
    description:
      'Expandable module system — like plugins for the plugin. Install, activate, and manage modules independently.',
    href: '/docs/features/modules',
    Icon: PuzzleIcon,
  },
  {
    title: 'Integrations',
    description:
      '17+ integrations including FlowMattic, Cloudflare, Slack, ContentPen, OpenAI, and more.',
    href: '/docs/integrations/overview',
    Icon: PlugIcon,
  },
  {
    title: 'Backup & Restore',
    description:
      'Full and scoped backups with scheduled automation, cross-site restore, and a complete audit log.',
    href: '/docs/features/backup-and-restore',
    Icon: ShieldIcon,
  },
  {
    title: 'REST API Security',
    description:
      'Default-deny security model with custom allowlists, built-in support for popular plugins, and request monitoring.',
    href: '/docs/features/rest-api-restriction',
    Icon: LockIcon,
  },
  {
    title: 'Variable Sets',
    description:
      'Create custom admin tabs with Static, Dynamic, and Related Static variable collections that sync to FlowMattic.',
    href: '/docs/features/variable-sets',
    Icon: DatabaseIcon,
  },
];

function FeatureCard({
  title,
  description,
  href,
  Icon,
}: (typeof features)[number]) {
  return (
    <Link
      to={href}
      className="group block rounded-xl border border-surface-200 bg-surface-0 p-6 transition-all duration-200 hover:shadow-card-hover hover:border-primary-300 dark:hover:border-primary-700 no-underline">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-text-primary m-0 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-text-secondary mt-2 mb-0 leading-relaxed">
        {description}
      </p>
      <span className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more
        <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-surface-50 dark:bg-surface-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-text-primary">
            Powerful Features
          </h2>
          <p className="text-text-secondary mt-3 text-lg max-w-xl mx-auto">
            Everything you need to manage WordPress at scale
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
