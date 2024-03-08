#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import { program } from 'commander'
import type { QuestionCollection } from 'inquirer'

import { create } from './create'
import { list } from './options'

const readPkg = (): PkgType => {
  const pkgPath: string = path.join(__dirname, '../package.json')
  const pkg: PkgType = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  return pkg
}

const runTask = async (): Promise<void> => {
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
    }
    // {
    //   name: 'email',
    //   type: 'input',
    //   message: 'What is your email?',
    //   validate: (value: string) => {
    //     const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{l}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    //     const pass: boolean = regex.test(value)

    //     if (!pass) {
    //       return 'Please enter a valid email address.'
    //     }
    //     return true
    //   }
    // },
    // {
    //   name: 'description',
    //   type: 'input',
    //   message: 'What is your description?'
    // },
    // {
    //   name: 'type',
    //   type: 'list',
    //   message: 'Please choose the type of your project?',
    //   choices: [
    //     {
    //       name: 'Using App Router',
    //       value: 'app',
    //       short: 'Features available in /app'
    //     },
    //     {
    //       name: 'Using Pages Router',
    //       value: 'pages',
    //       short: 'Features available in /pages'
    //     }
    //   ]
    // },
    // {
    //   name: 'ui',
    //   type: 'list',
    //   message: 'Please choose the UI framework of your project?',
    //   choices: [
    //     {
    //       name: 'Using Material UI',
    //       value: '@mui/material',
    //       short:
    //         "Material UI is an open-source React component library that implements Google's Material Design."
    //     },
    //     {
    //       name: 'Using Ant Design',
    //       value: 'antd',
    //       short:
    //         'Following the Ant Design specification, we developed a React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.'
    //     }
    //   ]
    // },
    // {
    //   name: 'styled',
    //   type: 'list',
    //   message: 'Please choose the CSS-in-JS library of your project?',
    //   choices: [
    //     {
    //       name: 'Using Emotion',
    //       value: '@emotion/react',
    //       short:
    //         'Emotion is a performant and flexible CSS-in-JS library, it allows you to style apps quickly with string or object styles.'
    //     },
    //     {
    //       name: 'Using Styled Components',
    //       value: 'styled-components',
    //       short:
    //         'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress'
    //     }
    //   ]
    // },
    // {
    //   name: 'features',
    //   type: 'checkbox',
    //   message: 'Check the features needed for your project:',
    //   choices: [
    //     {
    //       name: 'TypeScript',
    //       value: 'typescript',
    //       checked: true
    //     },
    //     {
    //       name: 'Nextjs Middleware',
    //       value: 'middeware'
    //     },
    //     {
    //       name: 'Nextjs Api Http Proxy',
    //       value: 'proxy'
    //     },
    //     {
    //       name: 'Sentry Recording Support',
    //       value: 'sentry'
    //     },
    //     {
    //       name: 'Progressive Web App (PWA) Support',
    //       value: 'pwa'
    //     }
    //   ]
    // },
    // {
    //   name: 'linter',
    //   type: 'checkbox',
    //   message: 'Check the rules linter needed for your project:',
    //   choices: [
    //     {
    //       name: 'Eslint',
    //       value: 'eslint'
    //     },
    //     {
    //       name: 'Stylelint',
    //       value: 'stylelint'
    //     },
    //     {
    //       name: 'Commitlint',
    //       value: 'commitlint'
    //     },
    //     {
    //       name: 'Prettier',
    //       value: 'prettierrc'
    //     },
    //     {
    //       name: 'Lint Stage + Husky',
    //       value: 'pwa'
    //     }
    //   ]
    // },
    // {
    //   name: 'package',
    //   type: 'list',
    //   message: 'Select a package manager',
    //   choices: [
    //     {
    //       name: 'npm',
    //       value: 'npm',
    //       short: 'npm is the most popular package manager'
    //     },
    //     {
    //       name: 'yarn',
    //       value: 'yarn',
    //       short: 'yarn is an awesome package manager'
    //     },
    //     {
    //       name: 'cnpm',
    //       value: 'cnpm',
    //       short: 'cnpm is quick install speed manager'
    //     },
    //     {
    //       name: 'pnpm',
    //       value: 'pnpm',
    //       short: 'pnpm is most used package manager'
    //     }
    //   ]
    // },
    // {
    //   name: 'install',
    //   type: 'confirm',
    //   message: 'Do you want to install dependencies now?'
    // }
  ]

  const data: any = await inquirer.prompt(question)

  return new Promise((resolve) => {
    resolve(data)
  })
}

const initTask = () => {
  const pkg: PkgType = readPkg()
  const pkgName: string = pkg.name
  const pkgVersion: string = pkg?.version ?? '0.1.0'
  const pkgDescription: string = pkg?.description ?? ''

  program.name(pkgName).description(pkgDescription).usage('<command> [option]').version(pkgVersion)

  program
    .command('create [project-name]')
    .description('Create a new project')
    .option('-t, --template <template-name>', 'Please enter template name.')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .alias('c')
    .action((name: string = 'my-app', options: any) => {
      runTask().then((params: any) => {
        console.info(params)
        create(name, options).catch((err) => {
          console.error(err)
          process.exit(1)
        })
      })
    })

  program.on('--help', () => {
    console.log()
    console.log(
      `Run ${chalk.cyan('ranger-cli <command> --help')} for detailed usage of given command.
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

  list(program)

  program.parse(process.argv)

  if (
    Object.getOwnPropertyNames(program.opts()).length === 0 &&
    program.args &&
    program.args.length < 1
  ) {
    program.outputHelp()
  }
}

initTask()
