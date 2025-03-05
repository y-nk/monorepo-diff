import * as core from '@actions/core'

import { resolveBackends } from '../backends'
import { getWorkspaceByName } from '../lib/getWorkspaceByName'
import { action } from './utils'

action(async () => {
  const workspace = await getWorkspaceByName(
    core.getInput('name'),
    resolveBackends(core.getMultilineInput('backends')),
  )

  return workspace
})
