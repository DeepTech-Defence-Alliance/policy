# Dual Repository Setup Guide

**For GitHub Free Tier (No Enterprise Account)**

## Quick Decision Guide

**Option 1: Personal Private + Org Public** ✅ RECOMMENDED
- Private drafts on your personal account (free)
- Public site on organization account
- Automated sync via GitHub Actions
- True privacy for drafts

**Option 2: Single Public Repo with Branches**
- Everything in one repo (simpler)
- Use branch protection to control merges
- ⚠️ All branches visible to public (GitHub limitation)
- Good for: mostly public content

---

## Option 1: Personal Private + Org Public Setup

### Prerequisites

- Personal GitHub account (ynse or BramAlkema)
- Access to DeepTech-Defence-Alliance organization
- `gh` CLI installed

### Step 1: Create Private Repo on Personal Account

```bash
# Login to your PERSONAL account
gh auth login

# Create private repo
gh repo create dtda-docs-private \
  --private \
  --description "DTDA Policy - Private drafts and confidential content" \
  --clone

cd dtda-docs-private
```

### Step 2: Set Up Structure

```bash
# Create directory structure
mkdir -p drafts confidential public .github/workflows

# Create README
cat > README.md << 'EOF'
# DTDA Policy — Private Drafts

**Classification:** TLP:AMBER / TLP:RED
**Visibility:** Private (personal account)

## Workflow

1. **Draft** in `drafts/` folder (TLP:AMBER)
2. **Review** confidential content in `confidential/` (TLP:RED)
3. **Approve** by moving to `public/dtda-site/` (TLP:WHITE)
4. **Auto-sync** to public org repo via GitHub Actions

## Structure

```
dtda-docs-private/
├── drafts/              # Work in progress (TLP:AMBER)
├── confidential/        # Sensitive analysis (TLP:RED)
├── public/              # Approved for publication (TLP:WHITE)
│   └── dtda-site/       # Syncs to DeepTech-Defence-Alliance/policy
└── .github/workflows/
    └── sync-to-public.yml
```

## Publishing

Content in `public/dtda-site/` automatically syncs to:
- **Repo:** https://github.com/DeepTech-Defence-Alliance/policy
- **Site:** https://deeptech-defence-alliance.github.io/policy/
EOF

# Copy current dtda-site to public folder
cp -r /Users/ynse/projects/industriebeleid/dtda-site public/

# Initial commit
git add .
git commit -m "Initial setup: private drafts repository"
git push origin main
```

### Step 3: Create GitHub Personal Access Token (PAT)

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token (classic)"
3. **Name:** `DTDA Private to Public Sync`
4. **Expiration:** 90 days (or longer)
5. **Scopes:** Select `repo` (full control of private repositories)
6. **Generate token**
7. **COPY TOKEN** (you won't see it again!)

### Step 4: Add Token as Secret to Private Repo

```bash
# Via GitHub CLI (easiest)
cd dtda-docs-private
gh secret set PUBLIC_REPO_TOKEN
# Paste your token when prompted

# Or via web interface:
# 1. Go to: https://github.com/YOUR_USERNAME/dtda-docs-private/settings/secrets/actions
# 2. Click "New repository secret"
# 3. Name: PUBLIC_REPO_TOKEN
# 4. Value: (paste your PAT)
# 5. Add secret
```

### Step 5: Add Sync Workflow

```bash
# Copy the sync workflow (already created in dtda-site)
cp /Users/ynse/projects/industriebeleid/dtda-site/.github/workflows/sync-to-public.yml \
   .github/workflows/

git add .github/workflows/sync-to-public.yml
git commit -m "Add sync workflow to public repo"
git push origin main
```

### Step 6: Test the Sync

```bash
# Make a small change to test
echo "Test sync" > public/dtda-site/TEST.txt

git add public/dtda-site/TEST.txt
git commit -m "Test sync to public repo"
git push origin main

# Check GitHub Actions:
gh run list
# or visit: https://github.com/YOUR_USERNAME/dtda-docs-private/actions
```

### Step 7: Verify Public Repo Updated

```bash
# Check the public org repo
gh repo view DeepTech-Defence-Alliance/policy

# The TEST.txt file should appear in dtda-site/ folder
# If successful, remove the test file:
rm public/dtda-site/TEST.txt
git add public/dtda-site/TEST.txt
git commit -m "Remove test file"
git push
```

---

## Option 2: Single Repo with Branches

### Setup

```bash
cd /Users/ynse/projects/industriebeleid
cd dtda-site

# Create drafts branch
git checkout -b drafts
git push origin drafts

# Set main as default for deployment
git checkout main

# Update .github/workflows/deploy.yml to only deploy from main
```

### Workflow

```bash
# Work on drafts branch
git checkout drafts
# ... make changes ...
git add .
git commit -m "Draft: new policy section"
git push origin drafts

# When ready for publication
git checkout main
git merge drafts
git push origin main
# This triggers GitHub Pages deployment
```

**Limitation:** Drafts branch is visible to public (GitHub free tier doesn't support hiding branches).

---

## Recommendation

**For Free Tier:** Use **Option 1** (Personal Private + Org Public)

**Why?**
- ✅ True privacy for drafts
- ✅ Clear separation (private = WIP, public = approved)
- ✅ Automated sync (set and forget)
- ✅ No cost

**Trade-offs:**
- Two repos to manage
- Requires PAT renewal every 90 days (or set longer expiration)

**For Paid Tier:** Upgrade to GitHub Team ($4/user/month) to get:
- Private repos in organization
- Better collaboration features
- No need for personal/org split

---

## Current State

Your `dtda-site/` is currently in:
```
/Users/ynse/projects/industriebeleid/dtda-site/
```

**Next Steps:**

1. **Decide:** Option 1 (Private+Public) or Option 2 (Single Repo)
2. **If Option 1:** Follow steps above to create private repo
3. **If Option 2:** Push current `dtda-site/` to `DeepTech-Defence-Alliance/policy`

---

## Questions?

- **PAT Security:** Store securely, rotate every 90 days
- **Collaboration:** Add collaborators to private repo (free tier: unlimited)
- **Backup:** Private repo is backed up to your local machine + GitHub
- **Migration:** Easy to move to org private repo later if you upgrade

## Support

- GitHub Docs: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- DTDA Contact: policy@deeptech-defence.org
