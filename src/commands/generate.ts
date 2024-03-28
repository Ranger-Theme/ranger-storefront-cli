import type { Command } from 'commander'

import { schematics } from '../config'
import { react } from '../prompt'
import { generateTask, runTask } from '../tasks'
import { logError, logListAsTable } from '../utils'

const buildDescription = async (collection: any[]): Promise<string> => {
  return (
    'Generate a React element.\n' +
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
      const match: Schematic | undefined = schematics.find((item: Schematic) =>
        [item.alias, item.name].includes(schematic)
      )

      if (match) {
        if (name) {
          generateTask(match, name, path)
        } else {
          const question: any[] = [react[match.name]]
          await runTask(question).then((values: any) => {
            console.log(values)
            // generateTask(match, name, path)
          })
        }
      } else {
        logError(`无效的命令: ${JSON.stringify(command)}`)
        logError('使用 ranger-cli g --help 查看可用命令。\n')
      }
    })
}
