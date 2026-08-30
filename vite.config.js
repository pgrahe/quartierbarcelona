import { execFile } from 'node:child_process'
import { copyFile, mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const execFileAsync = promisify(execFile)
const root = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(root, 'public')
const distDir = path.join(root, 'dist')
const distSsrDir = path.join(root, 'dist-ssr')
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

/** macOS iCloud stubs report a size but block forever on read. */
async function listDataless() {
  if (process.platform !== 'darwin') return []
  try {
    const { stdout } = await execFileAsync('find', [
      publicDir,
      '-type',
      'f',
      '-flags',
      '+dataless',
    ])
    return stdout
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

async function isDataless(absPath) {
  if (process.platform !== 'darwin') return false
  try {
    const { stdout } = await execFileAsync('ls', ['-lO', absPath])
    return stdout.includes('dataless')
  } catch {
    return false
  }
}

/**
 * iCloud Desktop evicts public/ assets. Prefer a local dist/ copy; fall back to
 * git's object store. Always unlink the stub first — overwriting a dataless
 * file blocks on hydrate.
 */
async function restoreLocal(relFromRoot) {
  const dest = path.join(root, relFromRoot)
  const underPublic = relFromRoot.replace(/^public\//, '')
  const candidates = [
    path.join(distDir, underPublic),
    path.join(distSsrDir, underPublic),
  ]

  for (const src of candidates) {
    try {
      await stat(src)
      if (await isDataless(src)) continue
      await unlink(dest).catch(() => {})
      await mkdir(path.dirname(dest), { recursive: true })
      await copyFile(src, dest)
      if (await isDataless(dest)) continue
      return 'dist'
    } catch {
      /* try next */
    }
  }

  try {
    await unlink(dest).catch(() => {})
    await execFileAsync('git', ['checkout', 'HEAD', '--', relFromRoot], {
      cwd: root,
    })
    if (await isDataless(dest)) return null
    return 'git'
  } catch {
    return null
  }
}

/** Force-download / repair iCloud placeholders in public/ before Vite touches them. */
export async function pinAssets() {
  const started = Date.now()
  const files = await walk(publicDir)
  const prev = await loadManifest()
  const next = {}
  let bytes = 0
  let pinned = 0
  let skipped = 0
  let restored = 0
  const missing = []

  const datalessAbs = await listDataless()
  for (const abs of datalessAbs) {
    const rel = path.relative(root, abs)
    const how = await restoreLocal(rel)
    if (how) {
      restored += 1
      console.log(`  restored ${rel} from ${how}`)
    } else {
      missing.push(rel)
    }
  }

  const freshFiles = await walk(publicDir)

  for (const file of freshFiles) {
    const rel = path.relative(root, file)
    if (missing.includes(rel)) continue

    const info = await stat(file)
    next[rel] = { size: info.size, mtimeMs: info.mtimeMs }

    if (info.size === 0) {
      const how = await restoreLocal(rel)
      if (how) {
        restored += 1
        console.log(`  restored ${rel} from ${how}`)
        const again = await stat(file)
        next[rel] = { size: again.size, mtimeMs: again.mtimeMs }
        bytes += again.size
        pinned += 1
        continue
      }
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
  const parts = []
  if (pinned) parts.push(`${pinned} read`)
  if (skipped) parts.push(`${skipped} cached`)
  if (restored) parts.push(`${restored} restored`)
  const detail = parts.length ? parts.join(', ') : `all ${freshFiles.length} assets already local`
  console.log(`  pinned public assets: ${detail} (${mb} MB) in ${ms}ms`)

  if (missing.length) {
    console.error('\n  ⚠️  These files are empty / iCloud dataless — not local:')
    ;[...new Set(missing)].forEach((f) => console.error(`     · ${f}`))
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
