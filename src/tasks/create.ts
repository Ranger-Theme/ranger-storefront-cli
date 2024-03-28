import fs from 'fs-extra'
import path from 'node:path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import validateNpmPackageName from 'validate-npm-package-name'

import { cloneTemplate } from './clone'
import { logError, logInfo, logWarning, clearConsole } from '../utils'

type Options = {
  [key: string]: string
}

const ActionEnum = {
  Overwrite: 2,
  Merge: 1,
  Cancel: 0
}

const handleInvalidName = (result: any, name: string) => {
  logError(`Invalid project name ${name}`)
  logError(result.errors)
  logWarning(result.warnings)
  process.exit(1)
}

const createInExistTargetDir = async (targetDir: string, options?: any): Promise<boolean> => {
  const { force, inCurrent } = options

  if (force && !inCurrent) {
    await fs.remove(targetDir)
    return true
  }

  clearConsole()
  if (inCurrent) {
    return createInCurrentDir()
  }

  return createInSubDir(targetDir)
}

const createInCurrentDir = async (): Promise<boolean> => {
  const { ok } = await inquirer.prompt([
    {
      name: 'ok',
      type: 'confirm',
      message: chalk.cyan('Create project in current directory?')
    }
  ])

  return ok
}

const createInSubDir = async (targetDir: string): Promise<boolean> => {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: chalk.cyan(`Target directory ${targetDir} exists. Choose an action`),
      choices: [
        { name: 'Overwrite', value: 2 },
        { name: 'Merge', value: 1 },
        { name: 'Cancel', value: 0 }
      ]
    }
  ])

  if (!action || action === ActionEnum.Cancel) return false

  if (action === ActionEnum.Overwrite) {
    logInfo(`Removing ${targetDir}`)
    await fs.remove(targetDir)
  }

  return true
}

export const create = async (projectName: string, params: CommandParams, options?: Options) => {
  const cwd = options?.cwd || process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', projectName) : projectName
  const targetDir = path.resolve(cwd, projectName)
  const result = validateNpmPackageName(name)

  if (!result.validForNewPackages) {
    return handleInvalidName(result, name)
  }

  if (fs.existsSync(targetDir)) {
    const isCreate = await createInExistTargetDir(targetDir, {
      ...options,
      inCurrent
    })
    if (!isCreate) return false
  }

  return cloneTemplate(name, targetDir, params)
}
