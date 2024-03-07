#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import { program } from 'commander'

type PkgType = {
  name: string
  description?: string
  version?: string
}

const pkg: PkgType = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../package.json'),
    'utf-8'
  )
)

program
  .name(pkg.name)
  .description(pkg?.description ?? '')
  .usage('<command> [option]')
  .version(pkg?.version ?? '0.1.0')

program
  .command('create <project-name>')
  .description('Create a new project')
  .option(
    '-f, --force',
    'Overwrite target directory if it exists'
  )
  .action((name: string, cmd) => {
    console.log(name, cmd)
  })

program.on('--help', () => {
  console.log()
  console.log(
    `Run ${chalk.cyan(
      'ranger-cli <command> --help'
    )} for detailed usage of given command.
    `
  )
  console.log(
    '\r\n' +
      figlet.textSync('ranger-cli', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
      })
  )
})

program.parse(process.argv)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    validate: (input: string) => {
      if (input.length === 0) {
        return 'Please enter your name'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?'
  },
  {
    name: 'vue',
    type: 'checkbox',
    message: 'Check the features needed for your project:',
    choices: [
      {
        name: 'Babel',
        checked: true
      },
      {
        name: 'TypeScript'
      },
      {
        name: 'Progressive Web App (PWA) Support'
      },
      {
        name: 'Router'
      }
    ]
  }
]

inquirer.prompt(question).then((data) => {
  console.log(data)
})
