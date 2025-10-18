# Source Materials — DTDA Policy Documentation

This directory contains source materials imported from the RAG project for use in the DTDA policy documentation.

## Overview

**Import Date:** 2025-10-18
**Source:** `../RAG` (Signal RAG Bot project)
**Total Documents:** 19 PDFs + converted markdown files

## Directory Structure

```
dtda-site/
├── source-pdfs/          # Original PDF files (gitignored)
└── source-markdown/      # Converted markdown + metadata
    ├── *.md              # 19 markdown files
    ├── pdf_metadata.json # Document metadata
    └── pdf_url_mapping.json # Original Google Drive URLs
```

## Content Inventory

### Dutch Defence & Industrial Policy

1. **Defensie Strategie voor Industrie en Innovatie 2025-2029**
   - File: `1c9YFRJG1-s3QXq_lPV8WYi0y_zpbKtBJ.md`
   - Pages: 55
   - Author: Ministerie van Defensie

2. **Nederlandse defensie- en veiligheid gerelateerde technologische industriële basis**
   - File: `1b1ma-5vsNOk2SNsATKP1XrE4aRq5_lFY.md`
   - Pages: 72
   - Date: April 2024

3. **STRAIIK-D 2025: Strategische Actieagenda Industrie, Innovatie en Kennis – Defensie**
   - File: `1LmQoShCF0_VlN3lp818z-puWhruAAtT-.md`
   - Pages: 5
   - Author: Fenna Leijten

4. **Vizier defensie-industrie gericht op Europa, rugdekking overheid noodzakelijk**
   - File: `1_sSrBiWhJiSwMJHE1HGyue12fk48-FDY.md`
   - Pages: 34
   - Source: Strategie Trendsonderzoek 2025

5. **Financieringsknelpunten defensie-industrie, oplossingen en actielijnen**
   - File: `1Fq6-jEZ90qe0S3Cb17QjfskuBJYymyPT.md`
   - Pages: 5
   - Date: 12 maart 2025

### Drone & Unmanned Systems Strategy

6. **Defence Drone Strategy — The UK's Approach to Defence Uncrewed Systems**
   - File: `1O7bnGFHIjWZcu-Z_3Q7UXcHbiSb8pnTF.md`
   - Pages: 12

7. **Actieplan – Programma Onbemane Luchtvaart 2023-2025**
   - File: `1Z3f-G8lp61LFyEzt6w7DKnAuU_58BnMr.md`
   - Pages: 32

8. **Drones: kansen voor de Nederlandse krijgsmacht**
   - File: `1Llek9uW1b1l-yXV1JnK_E9BE-UbnvhK4.md`
   - Pages: 14
   - Authors: Vleij, Levels en Schouwenaars

9. **D-SII announcement — Onbemenste systemen**
   - File: `1C7KWzAsjorcPV_49873ppZDkPzRzLGH9.md`
   - Pages: 2
   - Author: Fenna Leijten

### Defence Procurement & Legal Framework

10. **Sovereignty and Interdependence in EU Military Procurement Regulation**
    - File: `1UbwUG29zjUca6ppNsiXuXP0aItw7X5wL.md`
    - Pages: 300
    - Author: Nathan Meershoek

11. **Dutch Defence Procurement in Times of War and Reinvestment**
    - File: `1XCV95r_Ime2KZ0PB-KGzVLfl0ZGyAPNH.md`
    - Pages: 10
    - Author: Nathan Meershoek

12. **Juridische onderbouwing Ecosysteem DUOS — Artikel 346 VWEU**
    - File: `1oHA5UTnS8jrqlKe1HzDV-QSmfG6JLdx9.md`
    - Pages: 37
    - Authors: Prof. Mr. Dr. Elisabetta Manunza & Mr. Dr. Nathan Meershoek
    - Date: 18 juli 2024

13. **Nieuwe manier van werken — Munitie en defensiematerieel**
    - File: `1g5eS87y3nQmktsKx0uZl6pfLFbIDYvWM.md`
    - Pages: 19
    - Date: 7 juni 2024

14. **Future Procurement — We Need to Talk About Markets**
    - File: `1_pDCzyPhRVU5iS4YDKHLZY941vAMEhM_.md`
    - Pages: 46
    - Author: Prof. Dr. Louise Knight
    - Date: 23 March 2023 (Inaugural Lecture)

### Entrepreneurial Ecosystems

15. **Zo laat je ecosystemen voor ondernemerschap floreren**
    - File: `1AgrtfFY_JenMizoSEo9zhldQ-0twZkuG.md`
    - Pages: 66
    - Authors: Erik Stam en Joep Brouwers
    - Subtitle: Handleiding voor ecosysteemstrategie

16. **Entrepreneurial Ecosystem Index 2024**
    - File: `1B3S0LpmO1C0bnz9it-J_obtTqRXk-l99.md`
    - Pages: 25
    - Authors: Tom Hendricksen, Erik Stam, Jan Peter van den Toren
    - Date: 13 juni 2024

17. **The Battle for Survival Through the Valley of Death in Dutch Defense Ecosystems**
    - File: `1pzPVwZoKBT3GNiJHdNnjNlSG29wu7S1a.md`
    - Pages: 88
    - Author: Leon Doosje (EMBA-20 Thesis)
    - Institution: Nyenrode Business Universiteit
    - Date: 22-05-2024

### International Comparisons

18. **2024 Defence White Paper — Strong, Smart and Together**
    - File: `1j9o3uFezRLXgZerggOyfMtHpiukKsM9G.md`
    - Pages: 35

19. **[Untitled Document]**
    - File: `1sWqHg38pHDlV8EejsF84EnPu9qWhHKAA.md`
    - Pages: 11

## Content Categories

The documents cover the following thematic areas:

### 1. Industrial Policy & Strategy
- Dutch defence industry strategy (D-SII)
- Strategic action agenda (STRAIIK-D)
- Financing bottlenecks and solutions
- Industrial base analysis

### 2. Procurement & Legal Framework
- EU military procurement regulation
- Article 346 TFEU exemptions
- Procurement modernization
- Market-oriented approaches

### 3. Innovation & Ecosystems
- Entrepreneurial ecosystem strategies
- Valley of Death challenges
- Public-private platforms (Defport, SecFund)
- Knowledge institution collaboration

### 4. Unmanned Systems
- Drone strategies (UK & NL)
- Unmanned systems programs
- DUOS ecosystem
- Operational opportunities

### 5. International Context
- European defence trends
- Allied strategies
- Cross-border collaboration

## PDF to Markdown Conversion

The markdown files were generated using the RAG project's PDF extraction pipeline:

1. **Extraction:** `extract_structured.py` — Preserves structure (TOC, links, tables)
2. **Metadata:** `extract_pdf_metadata.py` — Extracts titles, authors, page counts
3. **Output:** Structured markdown with preserved formatting

### Conversion Features

- ✅ Table of contents preservation
- ✅ Hyperlink extraction
- ✅ Table structure maintained
- ✅ Metadata extraction (title, author, pages)
- ✅ First-page text capture

## Usage in DTDA Policy Site

These materials serve as:

1. **Source References** — Background research for policy documents
2. **Quotable Content** — Expert opinions and data points
3. **Context** — Understanding current Dutch & EU defence policy
4. **Comparisons** — International best practices (UK, EU)

## Integration Guidelines

When incorporating content from these sources:

1. **Attribution:** Always cite source document + page number
2. **Context:** Provide publication date and author credentials
3. **Updates:** Check for newer versions of policy documents
4. **Translation:** NL → EN where needed for international audiences
5. **Synthesis:** Connect insights across documents for comprehensive analysis

## Source URLs

Original PDFs are hosted on Google Drive. See `pdf_url_mapping.json` for complete URL mapping.

## Maintenance

- **Update Frequency:** As new policy documents are released
- **Version Control:** Track document versions and publication dates
- **Quality Checks:** Verify markdown conversion accuracy
- **Metadata Updates:** Keep metadata.json current

## Contact

For questions about source materials or to request additional documents:
- **Policy questions:** policy@deeptech-defence.org
- **Technical issues:** https://github.com/DeepTech-Defence-Alliance/policy/issues

---

**Last Updated:** 2025-10-18
**Maintained By:** DTDA Policy Team
