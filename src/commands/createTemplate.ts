import type { Command } from 'commander'
import type { QuestionCollection } from 'inquirer'

import { general, dependency, nextjs } from '../prompt'
import { create, runTask } from '../tasks'

export const createTemplate = (program: Command) => {
  program
    .command('create [project-name]')
    .description('Create a frontend project.')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-nextjs-app', options) => {
      const questions: QuestionCollection[] = [...general, ...nextjs, ...dependency]

      runTask(questions).then((params: any) => {
        create(projectName, options, params).catch((err) => {
          console.error(err)
          process.exit(1)
        })
      })
    })
}
