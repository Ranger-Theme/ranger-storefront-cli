import type { Command } from 'commander'

export const createTaro = (program: Command) => {
  program
    .command('create-taro [project-name]')
    .description('Create a taro mini program.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-taro-app', options) => {})
}
