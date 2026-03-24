import React from 'react';
import Link from '@docusaurus/Link';

const integrations = [
  'FlowMattic',
  'Cloudflare',
  'ContentPen',
  'Slack',
  'Monday.com',
  'OpenAI',
  'AWS SES',
  'Fluent Forms',
  'WPVivid',
  'Sendy',
  'Documentero',
  'Frill',
  'Pulsetic',
  'Squirrly SEO',
  'UpdraftPlus',
  'Fluent Booking',
  'Trustily',
];

export default function IntegrationsSection() {
  return (
    <section className="py-20 bg-surface-0 dark:bg-surface-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-text-primary">
            Integrates With Your Stack
          </h2>
          <p className="text-text-secondary mt-3 text-lg max-w-xl mx-auto">
            Connect SyteOps with the tools you already use
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {integrations.map((name) => (
            <span
              key={name}
              className="inline-flex items-center px-4 py-2 rounded-full bg-surface-50 dark:bg-surface-100 border border-surface-200 text-sm text-text-secondary font-medium transition-colors hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400">
              {name}
            </span>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/docs/integrations/overview"
            className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors no-underline">
            See all integrations
            <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
