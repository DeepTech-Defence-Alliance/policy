# Giscus Setup Guide

## Current Status
✅ GitHub Discussions enabled on repository
✅ Giscus React component installed and configured in code
✅ Discussion categories created (General, Q&A, etc.)
❌ **Giscus GitHub App needs to be installed**

## Installation Steps

### 1. Install Giscus App

Visit the Giscus app installation page:
**https://github.com/apps/giscus**

Click the green "Install" button and select:
- **Repository**: `DeepTech-Defence-Alliance/policy`

Grant the following permissions:
- Read access to discussions
- Read access to metadata

### 2. Configure Discussion Category (Optional)

You can optionally create a dedicated category for comments:

1. Go to: https://github.com/DeepTech-Defence-Alliance/policy/discussions/categories
2. Click "New category"
3. Name: "Documentation Comments"
4. Description: "Comments from documentation pages via Giscus"
5. Discussion format: "Open-ended discussion"

Then update `dtda-site/src/components/GiscusComments.tsx` line 11:
```typescript
category="Documentation Comments"  // Change from "General"
```

### 3. Verify Installation

Once installed, the Giscus comments will appear at the bottom of all documentation pages:
- Light/dark theme switching will work automatically
- Comments are mapped by pathname
- Users can comment with their GitHub accounts

Test by visiting any doc page:
- https://deeptech-defence-alliance.github.io/policy/docs/intro
- https://deeptech-defence-alliance.github.io/policy/docs/deel-i/missie-principes

## Configuration

Current Giscus configuration in `dtda-site/src/components/GiscusComments.tsx`:

```typescript
<Giscus
  repo="DeepTech-Defence-Alliance/policy"
  repoId="R_kgDOQE0VwQ"  // Auto-detected
  category="General"      // Uses default category
  categoryId="DIC_kwDOQE0Vwc4CwzGG"  // Auto-detected
  mapping="pathname"      // Maps comments to page URLs
  strict="0"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={colorMode === 'dark' ? 'dark' : 'light'}
  lang="en"
  loading="lazy"
/>
```

## Features

- **Theme-aware**: Automatically switches between light/dark themes
- **Bilingual**: Works with both English and Dutch pages
- **Path-based**: Each page has its own comment thread
- **GitHub integration**: Uses GitHub Discussions backend
- **No database needed**: All comments stored in GitHub Discussions

## Troubleshooting

If you see "giscus is not installed on this repository":
1. Verify Giscus app is installed: https://github.com/settings/installations
2. Check repository permissions include "Discussions: Read"
3. Wait 1-2 minutes after installation for propagation

If comments don't appear:
1. Check browser console for errors
2. Verify repository is public
3. Confirm discussions are enabled: `gh repo view DeepTech-Defence-Alliance/policy --json hasDiscussionsEnabled`

## Links

- Giscus App: https://github.com/apps/giscus
- Giscus Documentation: https://giscus.app
- Repository Discussions: https://github.com/DeepTech-Defence-Alliance/policy/discussions
