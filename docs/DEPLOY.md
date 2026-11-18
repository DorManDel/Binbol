# Open GlyphForge on Android / publish via GitHub Pages

## Offline preview

- Open `GlyphForge-Mobile.html` in a browser (single-file interactive studio). It contains inline CSS and JavaScript, but not the detailed Binary Lab.
- For the complete multi-page version, use a small local HTTP server (`python -m http.server 8000` inside the project folder) and open `http://localhost:8000` on the same computer.
- Android file viewers vary; a hosted URL is the most reliable way to use the full project on a phone.

## GitHub Pages

1. Create an empty GitHub repository called `GlyphForge-Engine`.
2. Upload/copy the contents of the `GlyphForge-Engine` folder into the repository root so `index.html` appears at the root (not under another `GlyphForge-Engine/` directory).
3. In the repository, open **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Choose `main` and `/(root)`, then Save. Once published, the GitHub Pages link should be available in Settings → Pages.
5. Open that published link on your Android phone. From the homepage, choose **Open binary lab** to access the detailed codec, instruction VM and profiler.

This does not require a backend, database, NPM install or external CDN. Public GitHub Pages sites expose their published static source files; do not upload secrets.

Optional terminal setup:

```bash
git init
git add .
git commit -m "Initialize GlyphForge research studio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/GlyphForge-Engine.git
git push -u origin main
```

Create the empty remote repository first. Replace `YOUR_USERNAME` with your own GitHub account name. Do not use the above `remote add` if an `origin` already exists.