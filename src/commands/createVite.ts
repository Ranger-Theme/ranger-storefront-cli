import type { Command } from 'commander'

export const createVite = (program: Command) => {
  program
    .command('create-vite [project-name]')
    .description('Create a react project by vite.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-app', options) => {})
}
