import type { Command } from 'commander'

export const createUmi = (program: Command) => {
  program
    .command('create-umi [project-name]')
    .description('Create a react project by umi')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .action(async (projectName = 'my-app', options) => {})
}
