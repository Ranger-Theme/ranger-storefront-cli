import type { Command } from 'commander'

export const createNest = (program: Command) => {
  program
    .command('create-nest [project-name]')
    .description('Create a nestjs node project.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-app', options) => {})
}
