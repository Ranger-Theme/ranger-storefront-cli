import chalk from 'chalk'

import { getFilesFormDir, writeFiles } from './file'

const loadTemplates = async (templateName: string) => {
  const files = await getFilesFormDir(templateName)
  return files
}

const getFilesAndPkg = async (options: Options) => {
  const { templateName } = options
  const files = await loadTemplates(templateName)

  return {
    files
  }
}

export const createTemplate = async (targetDir: string, options: Options) => {
  const { files } = await getFilesAndPkg(options)
  await writeFiles(targetDir, files)
  await console.log()
  await console.log(chalk.green(`Template created successfully in ${targetDir}`))
}
