/**
 * Cache-bust token for every public image URL.
 *
 * After assets were briefly missing on Vercel, Safari (especially on iOS) kept
 * serving cached 404s for the original paths. Bumping this forces a new URL
 * everywhere at once. Increment when replacing a widely cached image set.
 */
export const IMG_V = '4'

/** Appends the shared cache-bust query to a public image path. */
export function img(path) {
  const bare = path.split('?')[0]
  return `${bare}?v=${IMG_V}`
}

/**
 * Build a srcSet string. Pass pairs [path, descriptor], e.g.
 * path '/img/photo-800.jpg' with descriptor '800w'.
 */
export function imgSrcSet(entries) {
  return entries.map(([path, descriptor]) => `${img(path)} ${descriptor}`).join(', ')
}
