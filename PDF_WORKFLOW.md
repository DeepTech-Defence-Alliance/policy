# PDF to Buckets Workflow

Simplified workflow for processing PDFs into combined markdown files (1-20 buckets) suitable for OpenAI GPT Assistant upload.

## Overview

When you add PDFs to the repository, they are automatically processed into 1-20 combined markdown files ("buckets"), each under 20MB, ready for GPT Assistant knowledge base upload.

## Quick Start

### 1. Add PDFs to the repository

```bash
cp your-policy-document.pdf dtda-site/source-pdfs/
```

### 2. Run the processing script

```bash
./tools/process_pdfs.sh
```

### 3. Review output

Buckets are created in `dtda-site/docs/sources/`:

```
dtda-site/docs/sources/
├── index.mdx                    # Auto-generated index page
├── sources_metadata.json        # Bucket metadata
├── 01_Industrial_Strategy.md   # Bucket 1
├── 02_Procurement_Legal.md     # Bucket 2
├── 03_Unmanned_Systems.md      # Bucket 3
└── ...                         # Up to 20 buckets
```

### 4. Upload to OpenAI GPT Assistant

Upload the numbered bucket files (`01_*.md` through `20_*.md`) directly to your GPT Assistant knowledge base.

## How It Works

### Automatic Categorization

PDFs are automatically categorized based on content keywords:

- **Industrial_Strategy** — D-SII, STRAIIK, defence industry, ecosystems
- **Procurement_Legal** — Tenders, Article 346 TFEU, procurement law
- **Unmanned_Systems** — Drones, UAVs, DUOS ecosystem
- **Entrepreneurship** — Startups, Valley of Death, financing
- **Operations_Doctrine** — Military operations, armed forces
- **Technology** — DeepTech, R&D, innovation
- **Financing** — SecFund, investment, capital markets

### Token Limits

- **Max per bucket:** 1,800,000 tokens (~18MB)
- **Safety margin:** Stays well under OpenAI's 20MB limit
- **Max buckets:** 20 (for manageable GPT Assistant upload)

### Structure Preservation

Each PDF is extracted with:

- ✅ Table of contents (if available)
- ✅ Page-by-page content
- ✅ Tables preserved
- ✅ Source attribution

## Integration with Documentation

Buckets are automatically linked in the documentation site under "Source Materials" in the sidebar.

### Linking to Sources

Reference source materials in your policy documents:

```markdown
For detailed analysis, see [Industrial Strategy sources](/sources/index#industrial-strategy).
```

Or link directly to a specific bucket:

```markdown
See [D-SII Strategy analysis](../sources/01_Industrial_Strategy.md).
```

## Dependencies

Install required Python packages:

```bash
pip install pdfplumber PyMuPDF tiktoken
```

Or use the requirements file:

```bash
pip install -r tools/requirements.txt
```

## File Structure

```
industriebeleid/
├── dtda-site/
│   ├── source-pdfs/           # Input: Raw PDF files (gitignored)
│   └── docs/
│       └── sources/           # Output: Combined bucket files
│           ├── index.mdx      # Auto-generated index
│           ├── 01_*.md        # Bucket files (1-20)
│           └── sources_metadata.json
└── tools/
    ├── pdf_to_buckets.py      # Main processing script
    ├── process_pdfs.sh        # Shell wrapper
    └── requirements.txt       # Python dependencies
```

## Customization

### Adjust Token Limits

Edit `tools/pdf_to_buckets.py`:

```python
create_buckets_from_pdfs(
    max_tokens=1800000,  # Adjust as needed
    max_buckets=20       # Increase if needed
)
```

### Add Custom Categories

Edit the `categorize_document()` function in `tools/pdf_to_buckets.py`:

```python
categories = {
    "Your_Category": ["keyword1", "keyword2", "keyword3"],
    # ... existing categories
}
```

## Troubleshooting

### "Missing dependencies" error

```bash
pip install pdfplumber PyMuPDF tiktoken
```

### PDFs not found

Ensure PDFs are in `dtda-site/source-pdfs/`:

```bash
ls -lh dtda-site/source-pdfs/
```

### Bucket exceeds 20MB

This is rare, but if a single PDF is > 18MB:

1. Split the PDF into smaller files
2. Or reduce `max_tokens` in the script

### Too many buckets created

If > 20 buckets are created:

1. Increase `max_tokens` to combine more docs
2. Or review/consolidate source PDFs

## Best Practices

1. **Name PDFs descriptively** — Helps with categorization
2. **Keep PDFs updated** — Re-run script when adding new documents
3. **Review metadata** — Check `sources_metadata.json` for bucket distribution
4. **Git ignore PDFs** — Large PDFs are already in `.gitignore`
5. **Track buckets in git** — Markdown buckets are version controlled

## OpenAI GPT Assistant Upload

Once buckets are created:

1. Go to your GPT Assistant configuration
2. Navigate to "Knowledge" section
3. Upload all bucket files (`01_*.md` through `20_*.md`)
4. Each file is < 20MB and optimized for context

The GPT Assistant can now answer questions using all your policy documents as source material.

## Example Workflow

```bash
# 1. Add new policy document
cp ~/Downloads/nieuwe-defensie-strategie-2025.pdf dtda-site/source-pdfs/

# 2. Process all PDFs
./tools/process_pdfs.sh

# Output:
# 📄 Processing 20 PDFs into buckets...
#   Processing: nieuwe-defensie-strategie-2025.pdf
#     → Industrial_Strategy (45,234 tokens)
#
# ✓ Categorized into 7 categories
#
# 📦 Writing 8 bucket files...
#   ✓ 01_Industrial_Strategy.md: 15.2MB, 1,234,567 tokens, 5 docs
#   ...
#
# ✅ Complete!

# 3. Review and upload
ls -lh dtda-site/docs/sources/*.md
```

## Maintenance

### Re-processing All PDFs

```bash
# Clear old buckets (optional)
rm -f dtda-site/docs/sources/*.md dtda-site/docs/sources/*.json

# Re-process
./tools/process_pdfs.sh
```

### Updating Single Document

Just replace the PDF and re-run the script. The entire bucket set is regenerated.

---

**Questions?** Open an issue at https://github.com/DeepTech-Defence-Alliance/policy/issues
