import type { QuestionCollection } from 'inquirer'

export const general: QuestionCollection[] = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter your name.'
      }
      return true
    }
  },
  {
    name: 'email',
    type: 'input',
    message: 'What is your email?',
    validate: (value: string) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{l}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
      const pass: boolean = regex.test(value)
      if (!pass) {
        return 'Please enter a valid email address.'
      }
      return true
    }
  },
  {
    name: 'description',
    type: 'input',
    message: 'What is your description?'
  }
]
