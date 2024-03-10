#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import { program } from 'commander'
import type { QuestionCollection } from 'inquirer'

import { createNest, createNext, createUmi, createVite, createWebpack } from './commands'
import { list } from './options'

const readPkg = (): PkgType => {
  const pkgPath: string = path.join(__dirname, '../package.json')
  const pkg: PkgType = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  return pkg
}

const initTask = () => {
  const pkg: PkgType = readPkg()
  const pkgName: string = pkg.name
  const pkgVersion: string = pkg?.version ?? '0.1.0'
  const pkgDescription: string = pkg?.description ?? ''

  program.allowUnknownOption()

  program.name(pkgName).description(pkgDescription).usage('<command> [option]').version(pkgVersion)

  // program
  //   .command('create [project-name]')
  //   .description('Create a new project')
  //   .option('-t, --template <template-name>', 'Please enter template name.')
  //   .option('-f, --force', 'Overwrite target directory if it exists')
  //   .alias('c')
  //   .action((name: string = 'my-app', options: any) => {
  //     runTask().then((params: any) => {
  //       create(name, options, params).catch((err) => {
  //         console.error(err)
  //         process.exit(1)
  //       })
  //     })
  //   })

  createNest(program)

  createNext(program)

  createUmi(program)

  createVite(program)

  createWebpack(program)

  list(program)

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

  if (
    process.argv.length < 3 &&
    Object.getOwnPropertyNames(program.opts()).length === 0 &&
    program.args &&
    program.args.length < 1
  ) {
    program.outputHelp()
  }
  program.parse(process.argv)
}

initTask()
