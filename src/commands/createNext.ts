import type { Command } from 'commander'
import type { QuestionCollection } from 'inquirer'

import { general, dependency, nextjs } from '../prompt'
import { create, runTask } from '../tasks'

export const createNext = (program: Command) => {
  program
    .command('create-next [project-name]')
    .description('Create a nextjs project.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-nextjs-app', options) => {
      const questions: QuestionCollection[] = [...general, ...nextjs, ...dependency]

      runTask(questions).then((values: any) => {
        const params: CommandParams = {
          ...values,
          platform: 'nextjs'
        }
        create(projectName, params, options).catch((err) => {
          console.error(err)
          process.exit(1)
        })
      })
    })
}
