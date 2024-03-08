import chalk from 'chalk'
import Table from 'cli-table3'
import type { Command } from 'commander'

const TEMPLATES: any = {
  'next-app-router': 'A Next.js project using App Router.',
  'next-page-router': 'A Next.js project using page router.',
  'vite-react': 'A React project using vite.'
}

export const list = (program: Command) => {
  program
    .option('-l, --list', 'Show all currently available templates.')
    .action((_, options: Command) => {
      const hasCommand: boolean = options.getOptionValue('list')

      if (hasCommand) {
        const table = new Table({
          head: [chalk.blue('Template name'), chalk.blue('Desc')],
          colWidths: [30, 60]
        })

        for (const key in TEMPLATES) {
          table.push([key, chalk.green(TEMPLATES[key] ?? '')])
        }
        // 显示表格
        console.info(table.toString())
      }
    })
}
