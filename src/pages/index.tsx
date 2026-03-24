import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: 'User Management',
    description: 'Manage up to 20 users with 31+ fields, system roles, custom roles, and CRM integration across 15 platforms.',
    link: '/docs/features/user-management',
  },
  {
    title: 'Business Modules',
    description: 'Expandable module system for Notes, Estimates, Banners, and Notice Management. Install, activate, and manage independently.',
    link: '/docs/features/modules',
  },
  {
    title: 'FlowMattic Integration',
    description: 'Automatic two-way sync of all configuration data to FlowMattic variables for seamless workflow automation.',
    link: '/docs/integrations/flowmattic',
  },
  {
    title: 'Backup & Restore',
    description: 'Full and scoped backups with scheduled automation, cross-site restore, and a complete audit log.',
    link: '/docs/features/backup-and-restore',
  },
  {
    title: 'REST API Security',
    description: 'Default-deny security model with custom allowlists, built-in support for popular plugins, and request monitoring.',
    link: '/docs/features/rest-api-restriction',
  },
  {
    title: 'Variable Sets',
    description: 'Create custom admin tabs with Static, Dynamic, and Related Static variable collections that sync to FlowMattic.',
    link: '/docs/features/variable-sets',
  },
];

function Feature({title, description, link}: {title: string; description: string; link: string}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <Heading as="h3">
          <Link to={link} className={styles.featureLink}>{title}</Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
