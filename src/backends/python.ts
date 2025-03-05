import { parse } from 'toml'

import type { Manifest } from './types'

export const MANIFEST = 'pyproject.toml'

export const PM = 'pip'

export function isManifest(filePath: string) {
  return filePath.endsWith(`/${MANIFEST}`)
}

export async function parseManifest(content: string) {
  const { name, version } = parse(content).metadata as Manifest
  return { name, version }
}
