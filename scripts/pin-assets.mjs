/* CLI wrapper — logic lives in vite.config.js so dev never depends on this
   file being hydrated from iCloud before the first run. */
import { pinAssets } from '../vite.config.js'

pinAssets().catch((err) => {
  console.error(`pin-assets failed: ${err.message}`)
  process.exit(1)
})
