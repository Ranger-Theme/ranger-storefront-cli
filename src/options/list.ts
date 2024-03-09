import chalk from 'chalk'
import Table from 'cli-table3'
import type { Command } from 'commander'

import { logError } from '../utils'

const TEMPLATES: any = {
  'next-app-router': 'A Next.js project using App Router.',
  'next-page-router': 'A Next.js project using page router.',
  'vite-react': 'A React project using vite.'
}

export const list = (program: Command) => {
  program
    .option('-l, --list', 'Show all currently available templates.')
    .action((command: any, options: Command) => {
      if (Object.getOwnPropertyNames(command).length > 0) {
        const hasCommand: boolean = options.getOptionValue('list')

        if (hasCommand) {
          const table = new Table({
            head: [chalk.blue('Template name'), chalk.blue('Desc')],
            colWidths: [30, 60]
          })

          for (const key in TEMPLATES) {
            table.push([key, chalk.green(TEMPLATES[key] ?? '')])
          }
          console.info(table.toString())
        }
      } else {
        if (options.args.length > 0) {
          logError(`无效的命令: ${JSON.stringify(command)}`)
          logError('使用 --help 查看可用命令。\n')
          const availableCommands = program.commands.map((cmd) => cmd.name())
          console.log('可用命令：' + availableCommands.join(','))
          process.exit(1)
        }
      }
    })
}
