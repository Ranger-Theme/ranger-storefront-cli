import path from 'node:path'
import fs from 'fs-extra'
import gracefulFs from 'graceful-fs'
import handlebars from 'handlebars'
import isBinaryPath from 'is-binary-path'
import { execa } from 'execa'
import { globby } from 'globby'
import { execSync } from 'node:child_process'

import { logInfo } from './logger'

gracefulFs.gracefulify(fs)

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
    await fs.writeFileSync(filePath, files[name])
    await fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err)
      } else {
        logInfo(`-- info: ${name} (${(stats.size / 1024).toFixed(2)}kb)`)
      }
    })
  })

  return Promise.all(streams)
}

export const renderFile = async (filePath: string): Promise<any> => {
  if (isBinaryPath(filePath)) {
    const data = await fs.readFileSync(filePath)
    return data
  }

  const content = await fs.readFileSync(filePath, 'utf-8')
  if (filePath.indexOf('package.json') > -1) {
    const template = handlebars.compile(content)
    const result = template({})
    return result
  } else {
    return content
  }
}

export const getFilesFormDir = async (dir: string) => {
  const promises = []
  const cwd = path.resolve(__dirname, '../templates', dir)
  const files = await globby(['**/*'], { cwd, dot: true })

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
