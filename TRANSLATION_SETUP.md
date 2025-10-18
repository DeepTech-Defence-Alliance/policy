# Auto-Translation Setup

The DTDA policy site now has automatic Dutch → English translation via GitHub Actions.

## How It Works

1. **Push Dutch content** to `dtda-site/docs/` (any `.mdx` or `.md` file)
2. **GitHub Actions triggers** the translation workflow
3. **Step 1: Improve Dutch** — GPT-4 removes anglicisms, uses proper Nederlands
4. **Step 2: Translate to English** — GPT-4 translates improved Dutch to English
5. **Auto-commits** both improved Dutch and English back to repository

**Result:** Both languages are high-quality, proper terminology (no Denglisch!)

## Setup Requirements

### 1. Add OpenAI API Key to GitHub Secrets

Go to: https://github.com/DeepTech-Defence-Alliance/policy/settings/secrets/actions

Add a new secret:
- **Name:** `OPENAI_API_KEY`
- **Value:** Your OpenAI API key (starts with `sk-proj-...`)

### 2. Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it to GitHub secrets (above)

**Cost estimate:** ~$0.01-0.05 per document (GPT-4 pricing)

## Translation Quality

### Step 1: Dutch Improvement

The workflow **first improves Dutch** by removing anglicisms:

- ❌ "dual-use" → ✅ "tweeledig gebruik" (or remove, it's an export category)
- ❌ "surge capacity" → ✅ "opschaalvermogen"
- ❌ "vendor lock-in" → ✅ "leveranciersbinding"
- ❌ "outcome-based" → ✅ "resultaatgericht"
- ❌ "strategic autonomy" → ✅ "strategische autonomie"

**Behouden:** JEF, DUOS, SLOS-DAA (technical acronyms), Zuidas, Amsterdam (proper nouns)

### Step 2: English Translation

The workflow **then translates** improved Dutch to English:

- ✅ Maintain all markdown formatting (headers, lists, tables, code blocks)
- ✅ Preserve MDX imports and React components
- ✅ Keep technical terms: JEF, DUOS, SLOS-DAA, ELOS-COOP, etc.
- ✅ Use British English (defence not defense, colour not color)
- ✅ Translate "Deel I" → "Part I", "Deel II" → "Part II"
- ✅ Keep YAML frontmatter but translate title/sidebar_label
- ✅ Preserve proper nouns (Zuidas, Amsterdam, etc.)

## Workflow Triggers

The translation runs automatically on:

- **Push to main** — When Dutch docs are updated
- **Manual trigger** — Via GitHub Actions UI

## Workflow File

Location: `.github/workflows/translate.yml`

## Testing

To test the translation manually:

```bash
# 1. Set your OpenAI API key
export OPENAI_API_KEY="sk-..."

# 2. Run the translation script
python translate.py

# 3. Check the generated files
ls -la dtda-site/i18n/en/docusaurus-plugin-content-docs/current/
```

## Skipping Translation

If you don't want a file translated, the workflow will skip it if:

- English version is newer than Dutch version (already up-to-date)
- File is very short (< 50 characters)
- File is code-only (starts with ` ``` `)

## Fallback

If OpenAI API key is not set, the workflow will:

- Skip translation gracefully (no errors)
- Log a warning
- Continue deployment with Dutch-only content

## Cost Control

To control costs:

1. **Rate limiting:** Workflow processes files sequentially
2. **Smart caching:** Only translates changed files
3. **Skip logic:** Doesn't re-translate up-to-date English files

**Estimated monthly cost:** €5-10 for typical update frequency (5-10 docs/month)

## Alternative: Manual Translation

If you prefer manual translation:

1. Disable the workflow (comment out the workflow file)
2. Manually create English files in `dtda-site/i18n/en/...`
3. Use the language switcher to preview

## Language Switcher

Once translations exist, users will see a language dropdown in the navbar:

- **English** (default, en-IE)
- **Nederlands** (nl-NL)

## Support

If translation fails:
1. Check GitHub Actions logs
2. Verify OPENAI_API_KEY is set correctly
3. Check OpenAI API quota/billing

---

**Questions?** Open an issue at https://github.com/DeepTech-Defence-Alliance/policy/issues
