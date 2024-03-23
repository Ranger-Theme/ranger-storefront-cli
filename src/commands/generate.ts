import type { Command } from 'commander'

import { schematics } from '../config'
import { logListAsTable } from '../utils'

const buildDescription = async (collection: any[]): Promise<string> => {
  return (
    'Generate a Nest element.\n' +
    `  Schematics available on collection:\n` +
    logListAsTable(collection)
  )
}

export const generate = async (program: Command) => {
  program
    .command('generate')
    .argument('<schematic>', 'the schema to be generated')
    .argument('[name]', 'the name of the generated component')
    .argument('[path]', 'generate path dir')
    .alias('g')
    .description(await buildDescription(schematics))
    .action(async (schematic: string, name: string, path: string, command: Command) => {
      console.info(schematic)
    })
}
