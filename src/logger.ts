import readline from 'node:readline'
import chalk from 'chalk'

export const logInfo = (info: string, dim?: string) => {
  if (!info) return

  const str = dim ? chalk.cyan.dim(dim, info) : chalk.cyan(info)
  console.log(str)
  return str
}

export const logWarning = (warning: string, dim?: string) => {
  if (!warning) return

  const str = dim ? chalk.yellow.dim(dim, warning) : chalk.yellow(warning)
  console.warn(str)
  return str
}

export const logError = (error: string, dim?: string) => {
  if (!error) return

  const str = dim ? chalk.red.dim(dim, error) : chalk.red(error)
  console.error(str)
  return str
}

export const clearConsole = (msg?: string | undefined) => {
  const blank: string = '\n'.repeat(process.stdout.rows)
  console.log(blank)

  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
  if (msg) logInfo(msg)
}
