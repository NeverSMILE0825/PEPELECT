# PEPELECTION / $PEPELECT — Website source

A responsive, **static** (no build step) single-page meme-token website based on the approved 2026 U.S. midterm-election oil-painting mockup. All 38 asset slots are packaged as optimized WebP files. The design is an independent fictional satire, not an official election, candidate, party, or news website.

## Preview locally

Windows 10: unzip the package, open a terminal in `PEPELECTION_website`, and run:

```powershell
py -m http.server 8080
```

Visit `http://localhost:8080` in Chrome or another modern browser. You can also open `index.html` directly, but the local-server method is recommended for more realistic testing.

The site can be deployed to GitHub Pages, Netlify, or AWS Amplify as a static site. **Do not configure a Node/npm build command**: the site is already built. Upload the files in this directory as the site root. If using Netlify, choose this folder as the publish directory and leave the build command blank.

## Project files

- `index.html` — every page section, editable text, metadata, and navigation
- `styles.css` — responsive styling, natural section overlaps, mobile reflow, effects
- `script.js` — interactive chapter/gallery viewer, mobile navigation, contract copy, countdown
- `config.js` — editable contract, X URL, Telegram URL, countdown target
- `assets/` — 38 numbered optimized images, including mobile artwork and section dividers
- `asset-manifest.json` — image inventory, provenance mapping, provisional flags
- `approved-master-mockup.png` — user-approved visual design for comparison

## Required setup before launch

Open `config.js` and replace the empty `xUrl` and `telegramUrl` fields with your **actual official project links**. The social controls are intentionally disabled until real links are provided.

Replace `contractAddress: 'Coming Soon..'` with the final, verified Ethereum token address when the contract exists. **Do not replace it with a guessed or sample contract.** The Copy button works even in prelaunch mode and currently copies the status text.

The tokenomics content displays **1,000,000,000 supply**, **0% tax**, **Uniswap V4**, and **LP Lock** as requested. **LP Lock** describes the intended liquidity approach; the site does not provide proof that liquidity is already locked. Do not announce an executed lock until a verifiable locker transaction and link are available.

The Election Night section is a **fictional illustration**, not a real election-results feed. There are no invented numbers or results. The link goes to Associated Press election coverage. The countdown targets the first polling-place closings on November 3, 2026 at 6:00 p.m. Eastern Time (UTC-5). It changes to a verified-reporting message after that time.

## Art direction / QA observations

- Golden-hour vintage oil painting; old Pepe with tweed cap, white hair, brown coat and patriotic scarf.
- Six overlapping, irregular paper/wood/scrapbook transition images—*not* straight section dividers.
- Five interactive story chapters, six interactive gallery pictures, and a mobile composition.
- Mobile uses a horizontal-swipe chapter row, stacked tokenomics/how-to sections, two-column gallery, and separate hero/election-night/footer art.
- Some original asset generations diverged from the approved reference, especially numbered slots **05, 06, 09, 14, 16, 19, and 35**. They are marked `provisional` in the manifest. This is a high-fidelity recreation, not a guaranteed pixel-exact reproduction. Swapping artwork requires replacing the corresponding numbered WebP without changing the HTML layout.
- The Story panel and natural transitions use generated transparent PNG source artwork converted to WebP. Some oversized decorative images may still benefit from further alpha-edge cleanup in a full design QA pass.

## Design assets / optimization

These files are **optimized WebP** versions of the previously created art, not separate new artwork. Source PNG names are preserved as metadata in `asset-manifest.json`; PNG originals are not bundled to keep download size manageable. To substitute original-quality PNGs, change the file references in `index.html`, `styles.css`, or `script.js` and include them in `assets/`.

## Tested behavior

Automated viewport QA at **1440 × 900** and **390 × 844** found no horizontal overflow or JavaScript page exceptions. Tested: chapter modal opens and closes with Escape, contract/status copy button, and mobile navigation toggle. The full-page screenshots are provided as separate downloads alongside this ZIP.

This package contains no wallet-connection flow, private key handling, automatic trading functionality, or fabricated election results.
