import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig} from '@docusaurus/theme-common';

type FooterItem = {
  label?: string;
  to?: string;
  href?: string;
  html?: string;
};

function FooterLinkColumn({
  title,
  items,
}: {
  title: string;
  items: FooterItem[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-text-primary mb-4">
        {title}
      </h3>
      <ul className="list-none p-0 m-0 space-y-3">
        {items.map((item) => (
          <li key={item.label ?? item.html}>
            {item.html ? (
              <span
                className="text-sm text-text-secondary"
                dangerouslySetInnerHTML={{__html: item.html}}
              />
            ) : item.to ? (
              <Link
                to={item.to}
                className="text-sm text-text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors no-underline">
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors no-underline">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer(): React.ReactNode | null {
  const {siteConfig} = useDocusaurusContext();
  const {footer} = useThemeConfig();

  if (!footer) return null;

  const {links, copyright} = footer;

  return (
    <footer className="bg-surface-0 border-t border-surface-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/img/logo.png"
                alt="SyteOps Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="font-heading text-lg font-bold text-text-primary">
                {siteConfig.title.replace(' Documentation', '')}
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Link columns */}
          {links?.map((column) => (
            <FooterLinkColumn
              key={column.title}
              title={column.title ?? ''}
              items={column.items as FooterItem[]}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary m-0">{copyright}</p>
          <p className="text-xs text-text-tertiary m-0">
            Built with{' '}
            <a
              href="https://docusaurus.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-primary-600 dark:hover:text-primary-400 transition-colors no-underline">
              Docusaurus
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
