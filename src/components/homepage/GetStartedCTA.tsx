import React from 'react';
import Link from '@docusaurus/Link';

export default function GetStartedCTA() {
  return (
    <section className="py-20 bg-surface-50 dark:bg-surface-0">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-2xl p-10 md:p-14 text-center shadow-xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white m-0">
            Ready to simplify your WordPress operations?
          </h2>
          <p className="text-primary-100 text-base md:text-lg mt-4 mb-0 max-w-lg mx-auto">
            Get SyteOps installed in under 5 minutes and start managing your
            sites from a single dashboard.
          </p>
          <Link
            to="/docs/getting-started/installation"
            className="inline-flex items-center mt-8 px-8 py-3 rounded-lg bg-white hover:bg-primary-50 text-primary-700 font-semibold text-base transition-all no-underline hover:no-underline hover:text-primary-700 shadow-md hover:shadow-lg">
            Start the Setup Guide
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
