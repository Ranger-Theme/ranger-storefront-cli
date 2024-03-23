import type { QuestionCollection } from 'inquirer'

export const react: {
  [key: string]: QuestionCollection
} = {
  api: {
    type: 'input',
    name: 'api',
    message: 'What is api name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter api name.'
      }
      return true
    }
  },
  question: {
    type: 'input',
    name: 'api',
    message: 'What is api name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter api name.'
      }
      return true
    }
  },
  component: {
    type: 'input',
    name: 'component',
    message: 'What is component name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter component name.'
      }
      return true
    }
  },
  hooks: {
    type: 'input',
    name: 'name',
    message: 'What is hooks name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter hooks name.'
      }
      return true
    }
  },
  provider: {
    type: 'input',
    name: 'provider',
    message: 'What is provider name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter provider name.'
      }
      return true
    }
  },
  utils: {
    type: 'input',
    name: 'utils',
    message: 'What is utils name?',
    validate: (value: string) => {
      if (value.length === 0) {
        return 'Please enter utils name.'
      }
      return true
    }
  }
}
