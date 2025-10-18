#!/bin/bash
# Process PDFs into combined markdown buckets (1-20 files) for OpenAI GPT Assistant
# Usage: ./tools/process_pdfs.sh

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔧 DTDA Policy Documentation — PDF to Buckets"
echo "=============================================="
echo ""

# Check Python and dependencies
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 is required but not found"
    exit 1
fi

echo "Checking dependencies..."
if ! python3 -c "import pdfplumber, fitz, tiktoken" 2>/dev/null; then
    echo "❌ Missing dependencies. Install with:"
    echo "   pip install pdfplumber PyMuPDF tiktoken"
    exit 1
fi

echo "✓ Dependencies ready"
echo ""

# Process PDFs into buckets
cd "$PROJECT_ROOT"
python3 "$SCRIPT_DIR/pdf_to_buckets.py"

echo ""
echo "💡 Next steps:"
echo "   1. Review buckets in dtda-site/docs/sources/"
echo "   2. Upload bucket files (01_*.md through 20_*.md) to OpenAI GPT Assistant"
echo "   3. Link to sources in your policy docs"
echo ""
