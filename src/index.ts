#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import figlet from 'figlet'
import { program } from 'commander'

import { createCommands } from './commands'
import { createOptions } from './options'

const readPkg = (): PkgType => {
  const pkgPath: string = path.join(__dirname, '../package.json')
  const pkg: PkgType = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  return pkg
}

const bootstrap = async () => {
  const pkg: PkgType = await readPkg()
  const pkgName: string = pkg.name
  const pkgVersion: string = pkg?.version ?? '0.1.0'
  const pkgDescription: string = pkg?.description ?? ''

  program.allowUnknownOption()

  program.name(pkgName).description(pkgDescription).usage('<command> [option]').version(pkgVersion)

  await createCommands(program)
  await createOptions(program)

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

  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }

  await program.parseAsync(process.argv)
}

bootstrap()
