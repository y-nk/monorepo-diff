import { join } from 'node:path'
import type { Backend } from '../backends'
import { findWorkspaceBackend } from './findWorkspaceBackend'
import { getWorkspaceFiles } from './getWorkspaceFiles'
import { getWorkspaces } from './getWorkspaces'
import { readManifest } from './readManifest'

export async function getWorkspaceByName(name: string, backends: Backend[]) {
  const workspaces = await getWorkspaces(backends)

  for (const workspace of workspaces) {
    const workspaceFiles = await getWorkspaceFiles(workspace)
    const backend = findWorkspaceBackend(workspaceFiles, backends)

    if (!backend) {
      console.warn(`unidentified workspace: ${workspace}`)
      continue
    }

    const manifestPath = join(workspace, backend.MANIFEST)
    const manifest = await readManifest(manifestPath, backend)

    if (manifest.name === name) {
      return {
        ...manifest,
        path: workspace,
        pm: backend.PM,
      }
    }
  }

  return undefined
}
