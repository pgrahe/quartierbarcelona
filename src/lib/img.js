/**
 * Cache-bust token for every /img/ URL.
 *
 * After assets were briefly missing on Vercel, Safari (especially on iOS) kept
 * serving cached 404s for the original paths. Bumping this forces a new URL
 * everywhere at once. Increment when replacing a widely cached image set.
 */
export const IMG_V = '4'

/** `/img/foo.jpg` → `/img/foo.jpg?v=4` (replaces any prior ?v=). */
export function img(path) {
  const bare = path.split('?')[0]
  return `${bare}?v=${IMG_V}`
}

/**
 * Build a srcSet string. Pass pairs [path, descriptor], e.g.
 * [['/img/a-800.jpg', '800w'], ['/img/a-1200.jpg', '1200w']]
 */
export function imgSrcSet(entries) {
  return entries.map(([path, descriptor]) => `${img(path)} ${descriptor}`).join(', ')
}
