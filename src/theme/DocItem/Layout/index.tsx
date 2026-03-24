import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): React.ReactNode {
  return (
    <div className="[&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_h4]:font-heading [&_h5]:font-heading [&_h6]:font-heading">
      <Layout {...props} />
    </div>
  );
}
