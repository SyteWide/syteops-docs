import React from 'react';
import Link from '@docusaurus/Link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50/30 dark:from-surface-0 dark:via-surface-50 dark:to-primary-950/20 py-24 md:py-32">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight animate-fade-in-up">
          Centralize. Automate.{' '}
          <span className="text-primary-600 dark:text-primary-400">Secure.</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up [animation-delay:0.1s]">
          The all-in-one WordPress management platform. Manage users, automate
          workflows, and lock down your REST API from one dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up [animation-delay:0.2s]">
          <Link
            to="/docs/getting-started/installation"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all no-underline hover:no-underline hover:text-white">
            Get Started
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/docs/features/overview"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-surface-0 dark:bg-surface-100 border border-surface-200 hover:border-primary-300 dark:hover:border-primary-700 text-text-primary font-semibold text-base transition-all no-underline hover:no-underline hover:text-text-primary">
            Explore Features
          </Link>
          <Link
            href="https://sytewide.com/buy-syteops"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all no-underline hover:no-underline hover:text-white">
            Buy SyteOps
          </Link>
        </div>
      </div>
    </section>
  );
}
