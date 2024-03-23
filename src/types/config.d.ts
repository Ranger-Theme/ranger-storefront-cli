type PkgType = {
  name: string
  description?: string
  version?: string
}

type PlatFormType = 'nextjs' | 'vite' | 'umi' | 'webpack' | 'nestjs'

type Options = {
  templateName: string
}

type CommandParams = {
  install: boolean
  git: boolean
  platform: PlatFormType
  package: string
  type?: string
  ui?: string
  styled?: string
}

interface CommandType {
  (program: Command): void
}

interface Templates {
  [key: string]: string
}

interface Commands extends Templates {}
