import { execa } from 'execa'

import { createTemplate, hasGit, runCommand, writeFiles, logInfo } from '../utils'

const getPackageJson = (name: string) => {
  return {
    name,
    version: '1.0.0',
    private: true,
    dependencies: {},
    devDependencies: {}
  }
}

const startLogger = (name: string, targetDir: string) => {
  logInfo(`Creating project: ${name} in ${targetDir}`)
}

const writePackageJson = async (pkg: any, targetDir: string) => {
  const values = JSON.stringify(pkg, null, 2)
  await writeFiles(targetDir, { 'package.json': values })
}

const initGitRepository = async (targetDir: string) => {
  if (hasGit()) {
    logInfo('Initializing the git repository...')
    await runCommand(targetDir, 'git', ['init'])
  }
}

const installDependencies = (targetDir: string): Promise<string> => {
  const command = 'pnpm'
  const args = ['install']

  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd: targetDir,
      stdio: ['inherit', 'inherit', 'inherit']
    })

    child.on('close', (code) => {
      const msg = `${command} ${args.join(' ')}`
      if (code !== 0) reject(new Error(`Command failed: ${msg}`))
      resolve(`Command success: ${msg}`)
    })
  })
}

const getTemplateName = (params: CommandParams): string => {
  const templateName: string = `nextjs-${params?.ui}-${params?.styled}-${params?.type}`
  return templateName
}

export const cloneProject = async (name: string, targetDir: string, params: CommandParams) => {
  const pkg = getPackageJson(name)
  const templateName: string = await getTemplateName(params)
  await startLogger(name, targetDir)
  await writePackageJson(pkg, targetDir)
  if (params.git) await initGitRepository(targetDir)
  await createTemplate(targetDir, { templateName })
  if (params.install) await installDependencies(targetDir)
}
