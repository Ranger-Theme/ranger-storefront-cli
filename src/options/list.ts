import type { Command } from 'commander'

export const listOption = (program: Command) => {
  program.option('-l, --list', 'Show all currently available template.')
}
