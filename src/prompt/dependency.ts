import type { QuestionCollection } from 'inquirer'

export const dependency: QuestionCollection[] = [
  {
    name: 'styled',
    type: 'list',
    message: 'Please choose the CSS-in-JS library of your project?',
    choices: [
      {
        name: 'Using Emotion',
        value: 'emotion',
        short:
          'Emotion is a performant and flexible CSS-in-JS library, it allows you to style apps quickly with string or object styles.'
      },
      {
        name: 'Using Styled Components',
        value: 'styled',
        short:
          'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress'
      }
    ]
  },
  {
    name: 'linter',
    type: 'checkbox',
    message: 'Check the rules linter needed for your project:',
    choices: [
      {
        name: 'Eslint',
        value: 'eslint'
      },
      {
        name: 'Stylelint',
        value: 'stylelint'
      },
      {
        name: 'Commitlint',
        value: 'commitlint'
      },
      {
        name: 'Prettier',
        value: 'prettierrc'
      },
      {
        name: 'Lint Stage + Husky',
        value: 'pwa'
      }
    ]
  },
  {
    name: 'package',
    type: 'list',
    message: 'Select a package manager',
    choices: [
      {
        name: 'npm',
        value: 'npm',
        short: 'npm is the most popular package manager'
      },
      {
        name: 'yarn',
        value: 'yarn',
        short: 'yarn is an awesome package manager'
      },
      {
        name: 'cnpm',
        value: 'cnpm',
        short: 'cnpm is quick install speed manager'
      },
      {
        name: 'pnpm',
        value: 'pnpm',
        short: 'pnpm is most used package manager'
      }
    ]
  },
  {
    name: 'git',
    type: 'confirm',
    message: 'Do you want to git init for this folder?'
  },
  {
    name: 'install',
    type: 'confirm',
    message: 'Do you want to install dependencies now?'
  }
]
