# Troubleshooting GitHub Pages Deployment

If you're seeing the "Loading application..." message indefinitely on your GitHub Pages deployment, follow these steps to diagnose and fix the issue.

## Quick Checklist

- [ ] Verify you're accessing the correct URL
- [ ] Clear browser cache and try again
- [ ] Check GitHub Actions deployment status
- [ ] Verify GitHub Pages is enabled in repository settings
- [ ] Check browser console for JavaScript errors

## Step 1: Verify the Correct URL

Your GitHub Pages site should be accessible at:
```
https://tiogars.github.io/starter-react-vite/
```

**Important:** Make sure you include the trailing slash `/` and that you're accessing the site with the repository name in the path.

❌ **Wrong:** `https://tiogars.github.io/`  
✅ **Correct:** `https://tiogars.github.io/starter-react-vite/`

## Step 2: Clear Browser Cache

The "Loading application..." message might be from cached old files. Try:

1. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Cache:**
   - Windows/Linux: `Ctrl + Shift + Delete`
   - Mac: `Cmd + Shift + Delete`
   - Select "Cached images and files" and clear

3. **Incognito/Private Mode:**
   - Open the site in an incognito/private browsing window to bypass cache

## Step 3: Check GitHub Actions Deployment Status

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Look for the "Deploy to GitHub Pages" workflow
4. Verify the latest run shows a ✅ green checkmark (success)

If the workflow failed:
- Click on the failed run to see error details
- Check the "Build for GitHub Pages" step
- Verify the build completed successfully
- Look for any error messages in the logs

## Step 4: Verify GitHub Pages Configuration

1. Go to your repository **Settings**
2. Navigate to **Pages** in the left sidebar
3. Under "Build and deployment", verify:
   - **Source:** GitHub Actions (NOT "Deploy from a branch")
   - If you see "Your site is live at...", the deployment is active

If GitHub Pages is not enabled or configured incorrectly:
1. Set **Source** to "GitHub Actions"
2. Save the settings
3. Wait for the next deployment or manually trigger one

## Step 5: Check Browser Console

1. Open your browser's Developer Tools:
   - Windows/Linux: `F12` or `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`
2. Click on the "Console" tab
3. Refresh the page
4. Look for error messages (shown in red)

Common errors and solutions:

### Error: "Failed to load module script"
**Cause:** JavaScript files are not loading correctly  
**Solution:**
- Verify the build was done with `GITHUB_PAGES=true` environment variable
- Check that the workflow in `.github/workflows/deploy.yml` sets this variable
- Re-run the deployment workflow

### Error: "404 Not Found" for `/starter-react-vite/assets/...`
**Cause:** Files were not deployed correctly  
**Solution:**
- Verify the "Upload artifact" step in the workflow includes `path: ./dist`
- Check that the build step completed successfully
- Manually trigger a new deployment

### Error: Network errors or CORS issues
**Cause:** Browser security restrictions  
**Solution:**
- This shouldn't happen with GitHub Pages
- Try a different browser
- Check if you have browser extensions blocking scripts

## Step 6: Verify the Build Configuration

The application is configured to build for GitHub Pages with the correct base path.

Check `vite.config.ts`:
```typescript
const basePath = process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/'
```

Check `.github/workflows/deploy.yml`:
```yaml
- name: Build for GitHub Pages
  run: pnpm run build
  env:
    GITHUB_PAGES: 'true'  # This MUST be set
```

## Step 7: Manual Deployment Trigger

If the automatic deployment isn't working:

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select "Deploy to GitHub Pages" workflow
4. Click "Run workflow" button (you may need to select the `main` branch)
5. Click the green "Run workflow" button
6. Wait for the workflow to complete
7. Check your site again

## Step 8: Local Testing

To test the production build locally before deploying:

```bash
# Build for GitHub Pages
GITHUB_PAGES=true pnpm run build

# Serve the build locally
# Note: Local preview won't perfectly match GitHub Pages
# but can help identify obvious issues
pnpm preview
```

The preview server serves from `/` instead of `/starter-react-vite/`, so some routing might not work exactly as on GitHub Pages. This is expected.

## Still Having Issues?

If you've tried all the above steps and the issue persists:

1. **Check the deployed files:**
   - The latest successful deployment was from commit: `8b806cb`
   - Deployment time: 2026-02-16T15:26:01Z

2. **Open a browser console when visiting the site:**
   - Take a screenshot of any errors
   - Note the exact error messages

3. **Verify the HTML source:**
   - Right-click on the page → "View Page Source"
   - Check that the script tag includes the correct path:
     ```html
     <script type="module" crossorigin src="/starter-react-vite/assets/index-[hash].js"></script>
     ```

4. **Check the JavaScript file loads:**
   - Open Developer Tools → Network tab
   - Refresh the page
   - Look for the `index-[hash].js` file
   - Verify it returns status `200` (not `404`)
   - Verify the Content-Type is `text/javascript` or `application/javascript`

## Common Solutions Summary

| Symptom | Most Likely Cause | Solution |
|---------|------------------|----------|
| Loading never stops | Cached old files | Clear cache, hard refresh |
| 404 errors in console | Build not for GitHub Pages | Re-run workflow, verify GITHUB_PAGES=true |
| No errors but app doesn't load | Wrong URL | Use `https://tiogars.github.io/starter-react-vite/` |
| Page not found (404) | GitHub Pages not enabled | Enable in Settings → Pages |
| Old version showing | Cache | Clear cache or use incognito mode |

## Development vs Production

Remember:
- **Development** (`pnpm dev`): Runs on `http://localhost:5173/` with no base path
- **Production** (GitHub Pages): Runs on `https://tiogars.github.io/starter-react-vite/` with base path

The application is configured differently for each environment, which is why it works in dev but might have issues in production if not built correctly.

## Need More Help?

If none of these steps resolve the issue, please provide:
1. Screenshot of browser console errors
2. Screenshot of the page source (view source)
3. Link to the failed workflow run (if any)
4. Exact URL you're trying to access
