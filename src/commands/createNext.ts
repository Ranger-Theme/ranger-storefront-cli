import type { Command } from 'commander'

export const createNext = (program: Command) => {
  program
    .command('create-next [project-name]')
    .description('Create a next.js project.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .action(async (projectName = 'my-app', options) => {})
}
