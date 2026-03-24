import React from 'react';
import Link from '@docusaurus/Link';

interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
}

export function Card({title, description, icon, href, children}: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 mb-4 text-xl">
          {icon}
        </div>
      )}
      <h3 className="font-heading font-semibold text-lg text-text-primary m-0 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-text-secondary mt-2 mb-0 leading-relaxed">
          {description}
        </p>
      )}
      {children && (
        <div className="text-sm text-text-secondary mt-2">{children}</div>
      )}
    </>
  );

  const classes =
    'group block rounded-xl border border-surface-200 bg-surface-0 p-6 transition-all duration-200 hover:shadow-card-hover hover:border-primary-300 dark:hover:border-primary-700 no-underline';

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}

interface CardGridProps {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
}

const colClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function CardGrid({cols = 3, children}: CardGridProps) {
  return (
    <div className={`grid gap-6 my-6 ${colClasses[cols]}`}>{children}</div>
  );
}
