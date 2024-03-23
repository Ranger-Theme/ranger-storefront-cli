import { Command } from 'commander'

import { logError, logTable } from '../utils'
import { COMMANDS, TEMPLATES } from '../config'
import { commandOption } from './command'
import { listOption } from './list'

export const createOptions = (program: Command) => {
  const optionList: Array<CommandType> = [commandOption, listOption]

  optionList.forEach((option) => {
    option(program)
  })

  program.action((command: any, options: Command) => {
    delete command?.debug

    if (Object.getOwnPropertyNames(command).length > 0) {
      const hasOption: boolean = options.getOptionValue('list')
      const hasCommand: boolean = options.getOptionValue('command')

      if (hasCommand) logTable('Command name', COMMANDS)
      if (hasOption) logTable('Template name', TEMPLATES)
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
