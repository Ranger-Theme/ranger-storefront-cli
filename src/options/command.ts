import type { Command } from 'commander'

export const commandOption = (program: Command) => {
  program.option('-c, --command', 'Show all currently available command.')
}
