import path from 'node:path'
import fs from 'fs-extra'
import handlebars from 'handlebars'
import isBinaryPath from 'is-binary-path'
import { execa } from 'execa'
import { globby } from 'globby'
import { execSync } from 'node:child_process'

import { logInfo } from './logger'

export const deleteFiles = (dir: string, files: any, preFiles: any): Promise<any> => {
  const filesToDelete = Object.keys(preFiles)
    .filter((filename: any) => !files[filename])
    .map((filename: any) => fs.unlink(path.resolve(dir, filename)))

  return Promise.all(filesToDelete)
}

export const writeFiles = async (dir: string, files: any, preFiles?: any): Promise<any> => {
  if (preFiles) {
    deleteFiles(dir, files, preFiles)
  }

  const streams = Object.keys(files).map(async (name: any) => {
    const filePath = path.resolve(dir, name)
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, files[name])
    await logInfo(`-- info: ${name}`)
  })

  return Promise.all(streams)
}

export const renderFile = async (filePath: string): Promise<any> => {
  if (isBinaryPath(filePath)) {
    const data = await fs.readFile(filePath)
    return data
  }

  const content = await fs.readFile(filePath, 'utf-8')
  const template = handlebars.compile(content)
  const result = template({})
  return result
}

export const getFilesFormDir = async (dir: string) => {
  const promises = []
  const cwd = path.resolve(process.cwd(), 'templates', dir)
  const files = await globby(['**/*'], { cwd })

  for (let i = 0, len = files.length; i < len; i += 1) {
    const file = files[i]
    const targetPath = path.resolve(cwd, file)
    promises.push(renderFile(targetPath))
  }

  return (await Promise.all(promises)).reduce((acc, cur, i) => {
    acc[files[i]] = cur
    return acc
  }, {})
}

export const hasGit = (): boolean => {
  try {
    execSync('git --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const runCommand = async (dir: string, command: string, ...args: any[]) =>
  execa(command, args, { cwd: dir })
