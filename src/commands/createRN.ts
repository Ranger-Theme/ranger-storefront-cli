import type { Command } from 'commander'

export const createRN = (program: Command) => {
  program
    .command('create-rn [project-name]')
    .description('Create a react native project.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-react-native-app', options) => {})
}
