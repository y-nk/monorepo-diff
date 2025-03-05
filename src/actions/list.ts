import * as core from '@actions/core'

import { resolveBackends } from '../backends'
import { getWorkspaces } from '../lib/getWorkspaces'
import { action } from './utils'

action(async () => {
  const workspaces = await getWorkspaces(
    resolveBackends(core.getMultilineInput('backends')),
  )

  return { workspaces }
})
