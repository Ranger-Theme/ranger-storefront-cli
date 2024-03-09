type PkgType = {
  name: string
  description?: string
  version?: string
}

type Options = {
  templateName: string
}

type CommandParams = {
  install: boolean
  git: boolean
  type?: string
  ui?: string
  styled?: string
}
