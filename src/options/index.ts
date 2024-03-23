import type { Command } from 'commander'

import { listOption } from './list'

export const createOptions = (program: Command) => {
  const options: Array<CommandType> = [listOption]

  options.forEach((option) => {
    option(program)
  })
}
