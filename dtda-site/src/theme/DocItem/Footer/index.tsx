import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import GiscusComments from '@site/src/components/GiscusComments';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const location = useLocation();

  // Only show comments on docs pages, not on homepage
  const showComments = location.pathname !== '/' && !location.pathname.includes('/blog');

  return (
    <>
      <Footer {...props} />
      {showComments && (
        <div style={{marginTop: '3rem'}}>
          <GiscusComments />
        </div>
      )}
    </>
  );
}
