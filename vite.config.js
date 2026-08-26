import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(root, 'public')
const manifestPath = path.join(root, '.cache', 'pinned-assets.json')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (entry.isFile()) files.push(full)
  }
  return files
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, 'utf8'))
  } catch {
    return {}
  }
}

/** Force-download iCloud placeholders in public/ before Vite touches them. */
export async function pinAssets() {
  const started = Date.now()
  const files = await walk(publicDir)
  const prev = await loadManifest()
  const next = {}
  let bytes = 0
  let pinned = 0
  let skipped = 0
  const missing = []

  for (const file of files) {
    const rel = path.relative(root, file)
    const info = await stat(file)
    next[rel] = { size: info.size, mtimeMs: info.mtimeMs }

    if (info.size === 0) {
      missing.push(rel)
      continue
    }

    const cached = prev[rel]
    if (cached && cached.size === info.size && cached.mtimeMs === info.mtimeMs) {
      skipped += 1
      bytes += info.size
      continue
    }

    const buf = await readFile(file)
    bytes += buf.length
    pinned += 1
  }

  await mkdir(path.dirname(manifestPath), { recursive: true })
  await writeFile(manifestPath, JSON.stringify(next, null, 2))

  const mb = (bytes / (1024 * 1024)).toFixed(1)
  const ms = Date.now() - started
  const detail =
    pinned === 0
      ? `all ${files.length} assets already local`
      : `${pinned} downloaded, ${skipped} cached`
  console.log(`  pinned public assets: ${detail} (${mb} MB) in ${ms}ms`)

  if (missing.length) {
    console.error('\n  ⚠️  These files are empty — still in iCloud or missing:')
    missing.forEach((f) => console.error(`     · ${f}`))
    console.error(
      '\n  Open Finder → right-click the project folder → "Download Now",',
    )
    console.error('  or move the repo outside iCloud Desktop.\n')
    throw new Error(`${missing.length} public asset(s) not available locally`)
  }
}

function pinAssetsPlugin() {
  return {
    name: 'pin-assets',
    async buildStart() {
      await pinAssets()
    },
  }
}

export default defineConfig({
  plugins: [pinAssetsPlugin(), react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'leaflet'],
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Original photos / hero video live on iCloud Desktop; stat/read on those
    // paths blocks the dev server until macOS hydrates the file from the cloud.
    watch: {
      ignored: [
        '**/Fotos and assets/**',
        '**/public/**',
        '**/dist/**',
        '**/dist-ssr/**',
      ],
    },
  },
  build: { assetsInlineLimit: 2048 },
})
