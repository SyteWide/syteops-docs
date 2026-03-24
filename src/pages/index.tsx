import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HeroSection from '@site/src/components/homepage/HeroSection';
import FeaturesSection from '@site/src/components/homepage/FeaturesSection';
import IntegrationsSection from '@site/src/components/homepage/IntegrationsSection';
import GetStartedCTA from '@site/src/components/homepage/GetStartedCTA';

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <main>
        <HeroSection />
        <FeaturesSection />
        <IntegrationsSection />
        <GetStartedCTA />
      </main>
    </Layout>
  );
}
