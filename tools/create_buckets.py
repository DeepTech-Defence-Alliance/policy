#!/usr/bin/env python3
"""Create semantic buckets from markdown documents with token counting
Combines multiple documents into files suitable for OpenAI GPT Assistant upload (max 20MB per file)
Adapted for DTDA Policy Documentation project"""

import json
from pathlib import Path
from collections import defaultdict
import tiktoken

def count_tokens(text, model="gpt-4"):
    """Count tokens accurately"""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

def categorize_defence_doc(filename, content):
    """Categorize defence/policy documents based on content"""
    content_lower = content.lower()

    # Defence & policy specific categories
    categories = {
        "Industrial Strategy & Policy": [
            "industriebeleid", "industrial policy", "d-sii", "straiik",
            "defensie-industrie", "defence industry", "strategie",
            "ecosysteem", "ecosystem", "innovatie", "innovation"
        ],
        "Procurement & Legal": [
            "aanbesteding", "procurement", "artikel 346", "article 346",
            "vweu", "tfeu", "contract", "tender", "juridisch", "legal",
            "uitzondering", "exemption", "europees recht", "eu law"
        ],
        "Unmanned Systems & Drones": [
            "drone", "onbemand", "unmanned", "uav", "uas", "duos",
            "onbemenste systemen", "uncrewed", "autonomous"
        ],
        "Entrepreneurship & Ecosystems": [
            "ondernemerschap", "entrepreneurship", "startup", "scale-up",
            "valley of death", "financiering", "venture", "kapitaalmarkt",
            "capital market", "investment"
        ],
        "Defence Doctrine & Operations": [
            "krijgsmacht", "armed forces", "operatie", "operation",
            "gevechtskracht", "combat", "militair", "military",
            "defensie white paper", "defence doctrine"
        ],
        "Technology & Innovation": [
            "technologie", "technology", "deeptech", "research",
            "ontwikkeling", "development", "r&d", "kennis", "knowledge"
        ],
        "Financing & Investment": [
            "financiering", "financing", "secfund", "investering",
            "investment", "kapitaal", "capital", "funding"
        ],
    }

    scores = {}
    for category, keywords in categories.items():
        score = sum(content_lower.count(keyword) for keyword in keywords)
        if score > 0:
            scores[category] = score

    if scores:
        return max(scores, key=scores.get)
    return "General Defence Documentation"

def create_semantic_buckets(input_dir="dtda-site/source-markdown", output_dir="dtda-site/buckets", max_tokens=2000000):
    """Create semantic buckets with token-aware packing

    Args:
        input_dir: Directory containing individual markdown files
        output_dir: Directory to save combined bucket files
        max_tokens: Maximum tokens per bucket (default 2M, well under 20MB limit)
    """
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Load all documents
    md_files = [f for f in Path(input_dir).glob("*.md") if f.is_file()]
    print(f"Creating semantic buckets from {len(md_files)} documents...")
    print(f"Target: Max {max_tokens:,} tokens per bucket (~20MB file limit)\n")

    # Categorize and load documents
    docs_by_category = defaultdict(list)

    for md_path in md_files:
        # Skip metadata files
        if md_path.name in ["categories.json", "bucket_metadata.json"]:
            continue

        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()

        tokens = count_tokens(content)
        category = categorize_defence_doc(md_path.stem, content)

        docs_by_category[category].append({
            "filename": md_path.name,
            "content": content,
            "tokens": tokens
        })

        print(f"  {md_path.name}: {category} ({tokens:,} tokens)")

    print(f"\n✓ Categorized into {len(docs_by_category)} categories")

    # Create buckets
    buckets = []
    bucket_num = 1

    for category, docs in docs_by_category.items():
        print(f"\nCategory: {category} ({len(docs)} documents)")

        # Sort by tokens (largest first for better packing)
        docs.sort(key=lambda x: x['tokens'], reverse=True)

        current_bucket = {
            "name": f"bucket_{bucket_num:02d}_{category.replace(' & ', '_').replace(' ', '_').lower()}.md",
            "category": category,
            "tokens": 0,
            "documents": []
        }

        for doc in docs:
            if current_bucket["tokens"] + doc["tokens"] <= max_tokens:
                # Fits in current bucket
                current_bucket["documents"].append(doc)
                current_bucket["tokens"] += doc["tokens"]
            else:
                # Save current bucket and start new one
                if current_bucket["documents"]:
                    buckets.append(current_bucket)
                    bucket_num += 1

                current_bucket = {
                    "name": f"bucket_{bucket_num:02d}_{category.replace(' & ', '_').replace(' ', '_').lower()}.md",
                    "category": category,
                    "tokens": doc["tokens"],
                    "documents": [doc]
                }

        # Save last bucket for category
        if current_bucket["documents"]:
            buckets.append(current_bucket)
            bucket_num += 1

    # Write bucket files
    print(f"\n✓ Created {len(buckets)} buckets\n")

    for bucket in buckets:
        output_path = Path(output_dir) / bucket["name"]

        with open(output_path, 'w', encoding='utf-8') as f:
            # Bucket header
            f.write(f"# {bucket['category']}\n\n")
            f.write(f"**Bucket:** {bucket['name']}\n")
            f.write(f"**Token Count:** {bucket['tokens']:,} / {max_tokens:,}\n")
            f.write(f"**Documents:** {len(bucket['documents'])}\n")
            f.write(f"**Utilization:** {(bucket['tokens'] / max_tokens * 100):.1f}%\n\n")
            f.write("---\n\n")

            # Document contents
            for doc in bucket["documents"]:
                f.write(f"## Source: {doc['filename']}\n\n")
                f.write(doc["content"])
                f.write("\n\n---\n\n")

        file_size = output_path.stat().st_size / (1024 * 1024)  # MB
        print(f"  {bucket['name']}: {bucket['tokens']:,} tokens, {file_size:.2f} MB ({len(bucket['documents'])} docs)")

    # Save bucket metadata
    metadata = {
        "total_buckets": len(buckets),
        "total_tokens": sum(b["tokens"] for b in buckets),
        "max_tokens_per_bucket": max_tokens,
        "buckets": [
            {
                "name": b["name"],
                "category": b["category"],
                "tokens": b["tokens"],
                "document_count": len(b["documents"]),
                "documents": [d["filename"] for d in b["documents"]],
                "utilization": f"{(b['tokens'] / max_tokens * 100):.1f}%"
            }
            for b in buckets
        ]
    }

    metadata_path = Path(output_dir) / "bucket_metadata.json"
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)

    print(f"\n✅ Summary:")
    print(f"   Total tokens across all buckets: {metadata['total_tokens']:,}")
    print(f"   Average bucket utilization: {(metadata['total_tokens'] / (len(buckets) * max_tokens) * 100):.1f}%")
    print(f"   Metadata saved to: {metadata_path}")
    print(f"\n💡 Ready for OpenAI GPT Assistant upload (each bucket < 20MB)")

if __name__ == "__main__":
    create_semantic_buckets()
