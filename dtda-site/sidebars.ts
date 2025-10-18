import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * DTDA Policy Documentation Sidebar
 * Structure: Intro → Deel I (Doelbeeld) → Deel II (Transformatie) → Bijlagen
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Intro',
      collapsible: false,
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Deel I — Doelbeeld (JEF-geankerd)',
      collapsible: true,
      collapsed: false,
      items: [
        'deel-i/missie-principes',
        'deel-i/jef-baltics-routes',
        'deel-i/effects-tech-layer',
        'deel-i/surge-capacity',
        'deel-i/ecosysteem-slas',
        'deel-i/capacity-credits',
        'deel-i/kapitaalmarkt-zuidas',
      ],
    },
    {
      type: 'category',
      label: 'Deel II — Oud denken → Afbouwen',
      collapsible: true,
      collapsed: false,
      items: [
        'deel-ii/matrix-oud-nieuw',
        'deel-ii/duos-kritiek',
        'deel-ii/prestatie-modi',
        'deel-ii/l1-l4-prioritering',
        'deel-ii/tech-soevereiniteit',
      ],
    },
    {
      type: 'category',
      label: 'Bijlagen',
      collapsible: true,
      collapsed: true,
      items: [
        'bijlagen/definities',
        'bijlagen/jef-landen',
        'bijlagen/tech-specs',
        'bijlagen/verantwoording',
        'bijlagen/literatuur',
      ],
    },
  ],
};

export default sidebars;
