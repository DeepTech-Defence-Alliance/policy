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
            to="/">
            Lees het beleid →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>Effects Tech Layer</h3>
              <p>
                Cross-domein technologie architectuur: comms, sensing, power, en mechatronics.
                Herbruikbaar over lucht, grond, zee en ruimte.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>Surge Capacity</h3>
              <p>
                Opschaalvermogen binnen ≤ 6 weken. Capacity credits, availability fees,
                en ecosysteem-SLA's voor rapid deployment.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>JEF + Baltic Focus</h3>
              <p>
                Joint Expeditionary Force, Baltic defensie, en Drone Wall.
                Strategische autonomie via open architectures.
              </p>
            </div>
          </div>
        </div>

        <div className="row" style={{marginTop: '3rem'}}>
          <div className="col col--12">
            <div className="text--center">
              <h2>Transformatie Framework</h2>
              <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto'}}>
                Van platform-gebaseerd denken naar <strong>effects-first</strong>.
                Van BVLOS/VLOS naar <strong>prestatie-gebaseerde modi</strong>.
                Van vendor lock-in naar <strong>open ecosystems</strong>.
              </p>
              <div style={{marginTop: '2rem'}}>
                <Link
                  className="button button--primary button--lg"
                  to="/"
                  style={{marginRight: '1rem'}}>
                  Deel I — Doelbeeld
                </Link>
                <Link
                  className="button button--outline button--lg"
                  to="/">
                  Deel II — Transformatie
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-color-emphasis-300)'}}>
          <div className="col col--12">
            <div className="text--center">
              <p style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>
                <strong>Classificatie:</strong> TLP:WHITE — Vrij te delen<br/>
                <strong>Organisatie:</strong> DeepTech Defence Alliance<br/>
                <strong>Repository:</strong> <a href="https://github.com/DeepTech-Defence-Alliance/policy" target="_blank" rel="noopener noreferrer">
                  github.com/DeepTech-Defence-Alliance/policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="DTDA Policy — Effects & Surge"
      description="Military Industrial Policy focusing on Effects Tech Layer, Surge Capacity, and JEF + Baltic strategic autonomy">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
