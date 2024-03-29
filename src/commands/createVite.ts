import type { Command } from 'commander'
import type { QuestionCollection } from 'inquirer'

import { general, dependency, vite } from '../prompt'
import { create, runTask } from '../tasks'

export const createVite = (program: Command) => {
  program
    .command('create-vite [project-name]')
    .description('Create a react project by vite.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(async (projectName = 'my-vite-app', options) => {
      const questions: QuestionCollection[] = [...general, ...vite, ...dependency]

      runTask(questions).then((values: any) => {
        const params: CommandParams = {
          ...values,
          platform: 'vite'
        }
        create(projectName, params, options).catch((err) => {
          console.error(err)
          process.exit(1)
        })
      })
    })
}
