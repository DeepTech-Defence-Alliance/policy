import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComments(): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="comments"
      repo="DeepTech-Defence-Alliance/policy"
      repoId="R_kgDOQE0VwQ"
      category="General"
      categoryId="DIC_kwDOQE0Vwc4CwzGG"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode === 'dark' ? 'dark' : 'light'}
      lang="en"
      loading="lazy"
    />
  );
}
