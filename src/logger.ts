import readline from 'node:readline'
import chalk from 'chalk'

// const dim = {
//   error: "❌",
//   warn: "⚠️",
// }

export const logInfos = (infos: string[] | undefined, dim?: string) => {
  if (!infos) return

  infos.forEach((msg: string) => {
    const str = dim ? chalk.cyan.dim(dim, msg) : chalk.cyan(msg)
    console.log(str)
  })
}

export const logWarnings = (warnings: string[] | undefined, dim?: string) => {
  if (!warnings) return

  warnings.forEach((msg) => {
    const str = dim ? chalk.yellow.dim(dim, msg) : chalk.yellow(msg)
    console.warn(str)
  })
}

export const logErrors = (errors: string[] | undefined, dim?: string) => {
  if (!errors) return

  errors.forEach((msg) => {
    const str = dim ? chalk.red.dim(dim, msg) : chalk.red(msg)
    console.error(str)
  })
}

export const clearConsole = (msg: string | undefined) => {
  const blank = '\n'.repeat(process.stdout.rows)
  console.log(blank)

  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
  if (msg) logInfos([msg])
}
