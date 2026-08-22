# Fonts

## Montserrat — self-hosted, already working

`montserrat-500-*` (Medium, body/nav) and `montserrat-700-*` (Bold, headings/CTA),
latin + latin-ext subsets, wired up in `montserrat.css`. No third-party requests.

## Athena Bold — MISSING

The slogan `MORE THAN A CLUB` is meant to be set in **Athena Bold**. No Athena
file was found anywhere in the project, so it is not installed.

To add it:

1. Put the licensed file here as **`AthenaBold.woff2`**
   (`.woff`, `.otf` or `.ttf` also work).
2. Open `src/styles/tokens.css` and **uncomment the `@font-face { font-family: 'Athena' }`
   block** near the top.

That's it — `--font-display` already lists `'Athena'` first, so the slogan
switches over on the next reload.

Until then the slogan falls back to `Didot` → `Bodoni 72` → `Playfair Display`
→ `Georgia`. These are high-contrast Didone serifs chosen to sit close to the
QUARTIER wordmark; on macOS and iOS the result is Didot, which is a genuinely
good stand-in rather than a default.

> Tip: `.otf`/`.ttf` files are much heavier than `.woff2`. If you only have an
> OTF, convert it first (e.g. `fonttools`, or any woff2 converter) — a display
> face used for six words should be well under 50 KB.
