import type { Command } from 'commander'

export const createUmi = (program: Command) => {
  program
    .command('create-umi [project-name]')
    .description('Create a react project by umi.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-app', options) => {})
}
