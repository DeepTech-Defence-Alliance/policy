# DTDA Policy — Effects & Surge

**DeepTech Defence Alliance — Military Industrial Policy Documentation**

[![Deploy](https://github.com/DeepTech-Defence-Alliance/policy/actions/workflows/deploy.yml/badge.svg)](https://github.com/DeepTech-Defence-Alliance/policy/actions/workflows/deploy.yml)
[![TLP:WHITE](https://img.shields.io/badge/TLP-WHITE-brightgreen)]()

## Overview

Dit repository bevat het **militair industriebeleid** voor de **DeepTech Defence Alliance (DTDA)**, gericht op:

- **Effects Tech Layer** — Cross-domein technologie (comms, sensing, power, mechatronics)
- **Surge Capacity** — Opschaalvermogen binnen ≤ 6 weken
- **JEF + Baltic focus** — Joint Expeditionary Force & Baltic defensie
- **Ecosysteem-SLA's** — Outcome-based contracten (availability, MTTR, time-to-surge)
- **Kapitaalmarkt (Zuidas)** — Financiering voor dual-use tech

## Structure

```
dtda-site/
├── docs/
│   ├── intro.mdx                    # Introductie & overzicht
│   ├── deel-i/                      # Doelbeeld (JEF-geankerd)
│   │   ├── missie-principes.mdx
│   │   ├── jef-baltics-routes.mdx
│   │   ├── effects-tech-layer.mdx
│   │   ├── surge-capacity.mdx
│   │   ├── ecosysteem-slas.mdx
│   │   ├── capacity-credits.mdx
│   │   └── kapitaalmarkt-zuidas.mdx
│   ├── deel-ii/                     # Oud denken → Afbouwen
│   │   ├── matrix-oud-nieuw.mdx
│   │   ├── duos-kritiek.mdx
│   │   ├── prestatie-modi.mdx
│   │   ├── l1-l4-prioritering.mdx
│   │   └── tech-soevereiniteit.mdx
│   └── bijlagen/                    # Ondersteunende documentatie
│       ├── definities.mdx
│       ├── jef-landen.mdx
│       ├── tech-specs.mdx
│       ├── verantwoording.mdx
│       └── literatuur.mdx
├── src/
│   ├── components/                  # React componenten
│   │   ├── StatusBanner.tsx         # Concept/Vastgesteld/Verouderd
│   │   ├── KpiBadge.tsx             # KPI badges (ok/warn/bad)
│   │   └── Matrix.tsx               # Oud→Nieuw comparison tables
│   └── css/custom.css               # Typography & styling
├── .github/workflows/
│   ├── deploy.yml                   # Auto-deploy to GitHub Pages
│   └── release.yml                  # PDF export on tag
└── CODEOWNERS                       # Governance — required reviews
```

## Quick Start

### Installation

```bash
cd dtda-site
npm install
```

### Development

```bash
npm start
```

Opens http://localhost:3000 with live reload.

### Build

```bash
npm run build
```

Generates static site in `build/`.

### Deployment

**Automatic:** Push to `main` triggers GitHub Pages deployment.

**Manual:**
```bash
npm run deploy
```

## Features

### React Components

#### StatusBanner
```tsx
import StatusBanner from '@site/src/components/StatusBanner';

<StatusBanner status="concept" versie="0.9" datum="2025-10" />
```

#### KpiBadge
```tsx
import KpiBadge from '@site/src/components/KpiBadge';

<KpiBadge label="Time-to-surge" value="≤ 6 weken" variant="ok" />
```

#### Matrix
```tsx
import Matrix from '@site/src/components/Matrix';

<Matrix rows={[
  ['Domein', 'Oud frame', 'Nieuw frame'],
  ['Procurement', 'Koop platforms', 'Ecosysteem-SLA's'],
]} />
```

### Mermaid Diagrams

```markdown
\```mermaid
graph TB
    A[Effects Tech Layer] --> B[Comms]
    A --> C[Sensing]
    A --> D[Power]
    A --> E[Mechatronics]
\```
```

## Governance

### CODEOWNERS

All changes require review from designated owners. See [CODEOWNERS](./CODEOWNERS).

### Protected Branches

- `main` — requires PR + approved review
- No direct commits
- Status checks must pass (build, deploy)

### Releases

Create signed tag for formal releases:

```bash
git tag -s v0.9.0 -m "Release v0.9.0"
git push origin v0.9.0
```

Triggers PDF export via GitHub Actions.

## Classification

**TLP:WHITE** — Information may be shared freely.

## Contributing

1. Fork repo
2. Create feature branch
3. Make changes
4. Submit PR
5. Await review from CODEOWNERS

## License

**Crown Copyright** — DeepTech Defence Alliance

## Contact

- **Policy questions:** policy@deeptech-defence.org
- **Technical issues:** https://github.com/DeepTech-Defence-Alliance/policy/issues
- **Website:** https://deeptech-defence-alliance.github.io/policy/

---

**Built with:** [Docusaurus](https://docusaurus.io/) | **Hosted:** GitHub Pages | **CI/CD:** GitHub Actions
