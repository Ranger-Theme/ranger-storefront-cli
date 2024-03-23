import chalk from 'chalk'
import Table from 'cli-table3'

export const logTable = (key: string, data: any) => {
  const table = new Table({
    head: [chalk.blue(key), chalk.blue('Desc')],
    colWidths: [30, 60]
  })

  for (const key in data) {
    table.push([key, chalk.green(data[key] ?? '')])
  }
  console.info(table.toString())
}
