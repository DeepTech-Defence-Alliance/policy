# PDF Processing Tools

Convert PDFs into combined markdown buckets (1-20 files) for OpenAI GPT Assistant.

## Quick Start

```bash
# Add PDFs to the repository
cp your-document.pdf dtda-site/source-pdfs/

# Run the processing pipeline
./tools/process_pdfs.sh
```

Output: `dtda-site/docs/sources/` with 1-20 bucket files ready for GPT upload.

## Files

- **`pdf_to_buckets.py`** — Main script (extracts PDFs → creates buckets)
- **`process_pdfs.sh`** — Shell wrapper (checks deps, runs script)
- **`requirements.txt`** — Python dependencies
- **`extract_structured.py`** — Legacy: Individual PDF extraction
- **`create_buckets.py`** — Legacy: Separate bucketing step

## Dependencies

```bash
pip install pdfplumber PyMuPDF tiktoken
```

## Features

✅ Automatic categorization by content
✅ Token-aware packing (< 20MB per file)
✅ Structure preservation (TOC, tables, pages)
✅ 1-20 buckets maximum
✅ Linked in documentation sidebar

## Documentation

See [PDF_WORKFLOW.md](../PDF_WORKFLOW.md) for full documentation.
