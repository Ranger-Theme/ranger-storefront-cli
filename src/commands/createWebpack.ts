import type { Command } from 'commander'

export const createWebpack = (program: Command) => {
  program
    .command('create-webpack [project-name]')
    .description('Create a react project by webpack')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .action(async (projectName = 'my-app', options) => {})
}
