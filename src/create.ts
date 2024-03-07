import fs from 'fs-extra'
import path from 'node:path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import validateNpmPackageName from 'validate-npm-package-name'

import { logError, logInfo, logWarning, clearConsole } from './logger'

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
  // 强制创建
  if (force && !inCurrent) {
    await fs.remove(targetDir) //清除当前文件和文件夹
    return true
  }

  // 在当前文件夹下创建
  clearConsole()
  if (inCurrent) {
    return createInCurrentDir()
  }

  // 不是在当前文件夹下创建
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

export const create = async (projectName: string, options?: Options) => {
  const cwd = options?.cwd || process.cwd() // process.cwd(): 返回是当前执行node命令时候的文件夹地址
  const inCurrent = projectName === '.' // 如果项目名称为 '.' 表示要在当前目录下直接创建项目
  const name = inCurrent ? path.relative('../', projectName) : projectName
  const targetDir = path.resolve(cwd, projectName) // 获取创建项目的地址
  const result = validateNpmPackageName(name) // 检查项目名称是否符合npm 包的命名规范

  // 不符合npm 包的命名规范
  if (!result.validForNewPackages) {
    return handleInvalidName(result, name)
  }

  // 当要存在和要创建的项目相同的文件夹时
  if (fs.existsSync(targetDir)) {
    const isCreate = await createInExistTargetDir(targetDir, {
      ...options,
      inCurrent
    })

    if (!isCreate) return
  }

  console.log(`Creating project: ${name}`)
}
