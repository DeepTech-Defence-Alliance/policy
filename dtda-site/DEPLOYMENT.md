# Deployment Guide — GitHub Pages

## ✅ Code Pushed Successfully

Your dtda-site is now in the repository:
https://github.com/DeepTech-Defence-Alliance/policy

## Next Step: Enable GitHub Pages

### Via GitHub Web Interface

1. **Go to repository settings:**
   https://github.com/DeepTech-Defence-Alliance/policy/settings/pages

2. **Configure GitHub Pages:**
   - **Source:** GitHub Actions (recommended for Docusaurus)
   - Click "Configure" on the suggested workflow if shown

   OR if you see "Source" dropdown:
   - Select: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Click Save

3. **Wait for deployment:**
   - Go to Actions tab: https://github.com/DeepTech-Defence-Alliance/policy/actions
   - You should see "Deploy to GitHub Pages" workflow running
   - First build takes ~2-3 minutes

4. **Access your site:**
   - Once deployed, visit: https://deeptech-defence-alliance.github.io/policy/
   - DNS propagation may take a few minutes

### Via GitHub CLI (Alternative)

```bash
# Enable GitHub Pages
gh api repos/DeepTech-Defence-Alliance/policy/pages \
  --method POST \
  -f source.branch=gh-pages \
  -f source.path=/
```

## Workflow Explanation

The `.github/workflows/deploy.yml` file:
- **Triggers:** On every push to `main` branch
- **Builds:** Runs `npm run build` in dtda-site/
- **Deploys:** Uploads to GitHub Pages

## Testing Locally

Before pushing changes, test locally:

```bash
cd dtda-site
npm start          # Development server at localhost:3000
npm run build      # Test production build
npm run serve      # Serve production build locally
```

## Branch Protection (Optional)

To prevent accidental changes to main:

1. Go to: https://github.com/DeepTech-Defence-Alliance/policy/settings/branches
2. Add branch protection rule for `main`:
   - ✅ Require pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require status checks to pass (after first deployment)

## Making Updates

### Direct to Main (Simple)

```bash
cd dtda-site
# ... make changes to docs/ or src/ ...
git add .
git commit -m "Update: description of changes"
git push origin main
# GitHub Actions will auto-deploy
```

### Via Pull Request (Recommended for collaboration)

```bash
# Create feature branch
git checkout -b update-deel-i
# ... make changes ...
git add .
git commit -m "Update: Deel I with new content"
git push origin update-deel-i

# Create PR via GitHub CLI
gh pr create --title "Update Deel I content" \
             --body "Description of changes"

# Or via web: https://github.com/DeepTech-Defence-Alliance/policy/compare
```

## Releases with PDF Export

Create tagged release:

```bash
# Tag current version
git tag -s v0.9.0 -m "Release v0.9.0 - Initial publication"
git push origin v0.9.0

# This triggers .github/workflows/release.yml
# which creates a PDF and GitHub Release
```

## Monitoring

- **Deployments:** https://github.com/DeepTech-Defence-Alliance/policy/deployments
- **Actions:** https://github.com/DeepTech-Defence-Alliance/policy/actions
- **Pages settings:** https://github.com/DeepTech-Defence-Alliance/policy/settings/pages

## Troubleshooting

### Build fails

1. Check Actions logs: https://github.com/DeepTech-Defence-Alliance/policy/actions
2. Test locally: `cd dtda-site && npm run build`
3. Common issues:
   - Missing dependencies (run `npm install`)
   - Broken links (check `onBrokenLinks` in docusaurus.config.ts)
   - MDX syntax errors (check error logs)

### Pages not updating

1. Check deployment status in Actions tab
2. Clear browser cache (Cmd+Shift+R)
3. Wait 2-3 minutes for CDN propagation

### Custom domain (optional)

1. Add CNAME file: `echo "docs.deeptech-defence.org" > dtda-site/static/CNAME`
2. Configure DNS: CNAME → deeptech-defence-alliance.github.io
3. Update in Pages settings

## Support

- **GitHub Pages docs:** https://docs.github.com/en/pages
- **Docusaurus deployment:** https://docusaurus.io/docs/deployment
- **Issues:** https://github.com/DeepTech-Defence-Alliance/policy/issues

---

## Quick Reference

| Action | Command |
|--------|---------|
| **Local dev** | `cd dtda-site && npm start` |
| **Build** | `npm run build` |
| **Deploy** | `git push origin main` (auto-deploys) |
| **Release** | `git tag -s v0.9.0 -m "Release"` |
| **Site URL** | https://deeptech-defence-alliance.github.io/policy/ |
| **Repo** | https://github.com/DeepTech-Defence-Alliance/policy |
