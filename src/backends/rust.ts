import { parse } from 'toml'

import type { Manifest } from './types'

export const MANIFEST = 'Cargo.toml'

export const PM = 'cargo'

export function isManifest(filePath: string) {
  return filePath.endsWith(`/${MANIFEST}`)
}

export async function parseManifest(content: string) {
  const { name, version } = parse(content).package as Manifest
  return { name, version }
}
