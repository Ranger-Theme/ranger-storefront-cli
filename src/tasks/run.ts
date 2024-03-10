import inquirer from 'inquirer'
import type { QuestionCollection } from 'inquirer'

export const runTask = async (questions: QuestionCollection[]): Promise<void> => {
  const data: any = await inquirer.prompt(questions)

  return new Promise((resolve) => {
    resolve(data)
  })
}
