#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import { program } from 'commander'
import type { QuestionCollection } from 'inquirer'

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

const runTask =  async () => {
  const question: QuestionCollection[] = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: (value: string) => {
        if (value.length === 0) {
          return 'Please enter your name'
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
    },
    {
      name: 'type',
      type: 'list',
      message: 'Please choose the type of your project?',
      choices: [
        {
          name: 'Using App Router',
          value: 'app',
          short: 'Features available in /app',
        },
        {
          name: 'Using Pages Router',
          value: 'pages',
          short: 'Features available in /pages'
        }
      ]
    },
    {
      name: 'ui',
      type: 'list',
      message: 'Please choose the UI framework of your project?',
      choices: [
        {
          name: 'Using Material UI',
          value: '@mui/material',
          short: 'Material UI is an open-source React component library that implements Google\'s Material Design.'
        },
        {
          name: 'Using Ant Design',
          value: 'antd',
          short: 'Following the Ant Design specification, we developed a React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.'
        }
      ]
    },
    {
      name: 'styled',
      type: 'list',
      message: 'Please choose the CSS-in-JS library of your project?',
      choices: [
        {
          name: 'Using Emotion',
          value: '@emotion/react',
          short: 'Emotion is a performant and flexible CSS-in-JS library, it allows you to style apps quickly with string or object styles.'
        },
        {
          name: 'Using Styled Components',
          value: 'styled-components',
          short: 'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress'
        }
      ]
    },
    {
      name: 'features',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [
        {
          name: 'TypeScript',
          value: 'typescript',
          checked: true,
        },
        {
          name: 'Nextjs Middleware',
          value: 'middeware'
        },
        {
          name: 'Nextjs Api Http Proxy',
          value: 'proxy'
        },
        {
          name: 'Sentry Recording Support',
          value: 'sentry'
        },
        {
          name: 'Progressive Web App (PWA) Support',
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
          short: 'npm is the most popular package manager',
        },
        {
          name: 'yarn',
          value: 'yarn',
          short: 'yarn is an awesome package manager',
        },
        {
          name: 'cnpm',
          value: 'cnpm',
          short: 'cnpm is quick install speed manager',
        },
        {
          name: 'pnpm',
          value: 'pnpm',
          short: 'pnpm is most used package manager',
        },
      ],
    },
    {
      name: 'install',
      type: 'confirm',
      message: 'Do you want to install dependencies now?',
    }
  ]
  
  await inquirer.prompt(question).then((data) => {
    console.log(data)
  })
}


runTask()
