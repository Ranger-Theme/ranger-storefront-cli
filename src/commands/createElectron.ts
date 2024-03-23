import type { Command } from 'commander'

export const createElectron = (program: Command) => {
  program
    .command('create-electron [project-name]')
    .description('Create a electron project.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-electron-app', options) => {})
}
