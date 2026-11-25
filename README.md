# Ismail Ihthisham, portfolio (Pro)

The polished version of the portfolio. The original ("Classic") lives one folder up, in `D:\portfolio-projects`.

Built with Next.js, TypeScript and Three.js (React Three Fiber).

## Run it on your computer

Open a terminal in this folder and run:

```bash
npm run dev
```

Then open http://localhost:3458 in your browser.

## Change your details

Open `content/site.ts`. All the website's text comes from this one file, based on the resume in `D:\resume`.

The "Resume" buttons download `public/Ismail-Ihthisham-Resume.pdf`, a copy of your real resume. When your resume
changes, replace that file with the new PDF (keep the same file name).

- Anything in `[square brackets]` still needs filling in. Search the file for `[` to find them.
- While running locally, unfilled details show with a dashed amber outline so you can find them.
- In the published build they are hidden automatically, so the live site never looks unfinished.
- Add more projects to the `projects` list; the page adjusts automatically.

## Publish it

```bash
npm run build
```

This creates the `out` folder: the finished site and resume PDF. Drag it onto https://app.netlify.com/drop,
or into your Netlify site's Deploys page to update an existing site.

## Dependencies

`node_modules` is a link to `C:\Users\hp\dev-deps\portfolio-pro\node_modules`, on the fast SSD.
Don't run `npm install` in this folder: it would replace the link with a copy on D:.
To reinstall, copy `package.json` and `package-lock.json` to `C:\Users\hp\dev-deps\portfolio-pro`, then run:

```bash
npm ci --prefix C:\Users\hp\dev-deps\portfolio-pro
```
