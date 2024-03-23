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

export const logListAsTable = (schematics: any[]) => {
  const leftMargin = '    '
  const tableConfig = {
    head: ['name', 'alias', 'description'],
    chars: {
      left: leftMargin.concat('│'),
      'top-left': leftMargin.concat('┌'),
      'bottom-left': leftMargin.concat('└'),
      mid: '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    }
  }
  const table: any = new Table(tableConfig)
  for (const schematic of schematics) {
    table.push([chalk.green(schematic.name), chalk.cyan(schematic.alias), schematic.description])
  }
  return table.toString()
}
