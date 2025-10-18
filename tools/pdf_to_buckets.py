#!/usr/bin/env python3
"""
Process PDFs directly into combined markdown buckets (1-20 files max)
For DTDA Policy Documentation - OpenAI GPT Assistant compatible

Usage: python3 tools/pdf_to_buckets.py
"""

import json
from pathlib import Path
from collections import defaultdict

try:
    import pdfplumber
    import fitz  # PyMuPDF
    import tiktoken
except ImportError:
    print("❌ Missing dependencies. Install with:")
    print("   pip install pdfplumber PyMuPDF tiktoken")
    exit(1)


def count_tokens(text, model="gpt-4"):
    """Count tokens accurately"""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))


def extract_pdf_content(pdf_path):
    """Extract content from PDF with basic structure"""
    try:
        content = f"# {pdf_path.stem}\n\n"
        content += f"**Source:** {pdf_path.name}\n\n"

        # Extract TOC if available
        doc = fitz.open(pdf_path)
        toc = doc.get_toc()
        if toc:
            content += "## Table of Contents\n\n"
            for level, title, page in toc:
                indent = "  " * (level - 1)
                content += f"{indent}- {title} (Page {page})\n"
            content += "\n"
        doc.close()

        # Extract text content
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                content += f"\n## Page {page_num + 1}\n\n"
                text = page.extract_text()
                if text:
                    content += text

        return content
    except Exception as e:
        print(f"  ✗ Failed to extract {pdf_path.name}: {e}")
        return None


def categorize_document(filename, content):
    """Categorize defence/policy documents"""
    content_lower = content.lower()

    categories = {
        "Industrial_Strategy": ["industriebeleid", "industrial policy", "d-sii", "straiik", "defensie-industrie", "ecosysteem"],
        "Procurement_Legal": ["aanbesteding", "procurement", "artikel 346", "vweu", "tfeu", "juridisch", "legal"],
        "Unmanned_Systems": ["drone", "onbemand", "unmanned", "uav", "duos"],
        "Entrepreneurship": ["ondernemerschap", "entrepreneurship", "startup", "valley of death", "financiering"],
        "Operations_Doctrine": ["krijgsmacht", "armed forces", "operatie", "militair", "defence doctrine"],
        "Technology": ["technologie", "technology", "deeptech", "innovatie", "r&d"],
        "Financing": ["financiering", "financing", "secfund", "investering", "kapitaal"],
    }

    scores = {}
    for category, keywords in categories.items():
        score = sum(content_lower.count(kw) for kw in keywords)
        if score > 0:
            scores[category] = score

    return max(scores, key=scores.get) if scores else "General"


def create_buckets_from_pdfs(
    pdf_dir="dtda-site/source-pdfs",
    output_dir="dtda-site/docs/sources",
    max_tokens=1800000,  # ~18MB to stay well under 20MB
    max_buckets=20
):
    """Process PDFs directly into combined bucket files"""

    pdf_dir = Path(pdf_dir)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    pdf_files = list(pdf_dir.glob("*.pdf"))

    if not pdf_files:
        print(f"❌ No PDFs found in {pdf_dir}")
        return

    print(f"📄 Processing {len(pdf_files)} PDFs into buckets...")
    print(f"   Target: Max {max_buckets} buckets, {max_tokens:,} tokens each\n")

    # Extract and categorize
    docs_by_category = defaultdict(list)

    for pdf_path in pdf_files:
        print(f"  Processing: {pdf_path.name}")
        content = extract_pdf_content(pdf_path)

        if content:
            tokens = count_tokens(content)
            category = categorize_document(pdf_path.stem, content)

            docs_by_category[category].append({
                "filename": pdf_path.name,
                "content": content,
                "tokens": tokens
            })

            print(f"    → {category} ({tokens:,} tokens)")

    print(f"\n✓ Categorized into {len(docs_by_category)} categories\n")

    # Create buckets
    buckets = []
    bucket_num = 1

    for category, docs in sorted(docs_by_category.items()):
        # Sort by size (largest first for better packing)
        docs.sort(key=lambda x: x['tokens'], reverse=True)

        current_bucket = {
            "name": f"{bucket_num:02d}_{category}.md",
            "category": category,
            "tokens": 0,
            "documents": []
        }

        for doc in docs:
            if current_bucket["tokens"] + doc["tokens"] <= max_tokens:
                current_bucket["documents"].append(doc)
                current_bucket["tokens"] += doc["tokens"]
            else:
                # Save current bucket
                if current_bucket["documents"]:
                    buckets.append(current_bucket)
                    bucket_num += 1

                # Start new bucket
                current_bucket = {
                    "name": f"{bucket_num:02d}_{category}.md",
                    "category": category,
                    "tokens": doc["tokens"],
                    "documents": [doc]
                }

        # Save last bucket
        if current_bucket["documents"]:
            buckets.append(current_bucket)
            bucket_num += 1

    if len(buckets) > max_buckets:
        print(f"⚠️  Warning: Created {len(buckets)} buckets (max {max_buckets})")
        print(f"   Consider increasing max_tokens or reducing PDFs\n")

    # Write bucket files
    print(f"📦 Writing {len(buckets)} bucket files...\n")

    for bucket in buckets:
        output_path = output_dir / bucket["name"]

        with open(output_path, 'w', encoding='utf-8') as f:
            # Header
            f.write(f"# {bucket['category'].replace('_', ' ')}\n\n")
            f.write(f"**Documents:** {len(bucket['documents'])}\n")
            f.write(f"**Tokens:** {bucket['tokens']:,}\n\n")
            f.write("---\n\n")

            # Contents
            for doc in bucket["documents"]:
                f.write(doc["content"])
                f.write("\n\n---\n\n")

        file_size_mb = output_path.stat().st_size / (1024 * 1024)
        print(f"  ✓ {bucket['name']}: {file_size_mb:.1f}MB, {bucket['tokens']:,} tokens, {len(bucket['documents'])} docs")

    # Save metadata
    metadata = {
        "total_buckets": len(buckets),
        "total_pdfs": len(pdf_files),
        "total_tokens": sum(b["tokens"] for b in buckets),
        "buckets": [
            {
                "file": b["name"],
                "category": b["category"],
                "tokens": b["tokens"],
                "documents": [d["filename"] for d in b["documents"]]
            }
            for b in buckets
        ]
    }

    metadata_path = output_dir / "sources_metadata.json"
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)

    # Create index page
    index_path = output_dir / "index.mdx"
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write("# Source Materials\n\n")
        f.write("Policy documents and research papers processed for GPT Assistant.\n\n")
        f.write(f"**Total:** {len(pdf_files)} PDFs → {len(buckets)} buckets\n\n")
        f.write("## Buckets\n\n")

        for bucket in buckets:
            f.write(f"### [{bucket['category'].replace('_', ' ')}](./{bucket['name']})\n\n")
            f.write(f"- **Size:** {bucket['tokens']:,} tokens\n")
            f.write(f"- **Documents:** {len(bucket['documents'])}\n")
            f.write("  - " + "\n  - ".join(d["filename"] for d in bucket["documents"]) + "\n\n")

    print(f"\n✅ Complete!")
    print(f"   📁 Buckets: {output_dir}/")
    print(f"   📊 Metadata: {metadata_path}")
    print(f"   📄 Index: {index_path}")
    print(f"\n💡 Ready for OpenAI GPT Assistant upload (each < 20MB)")


if __name__ == "__main__":
    create_buckets_from_pdfs()
