import type { Command } from 'commander'

import { createElectron } from './createElectron'
import { createNest } from './createNest'
import { createNext } from './createNext'
import { createRN } from './createRN'
import { createTaro } from './createTaro'
import { createTemplate } from './createTemplate'
import { createUmi } from './createUmi'
import { createVite } from './createVite'
import { createWebpack } from './createWebpack'

export const createCommands = (program: Command) => {
  const commands: Array<CommandType> = [
    createElectron,
    createNest,
    createNext,
    createRN,
    createTaro,
    createTemplate,
    createUmi,
    createVite,
    createWebpack
  ]

  commands.forEach((command) => {
    command(program)
  })
}
