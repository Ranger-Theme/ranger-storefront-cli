export const schematics: Schematic[] = [
  {
    name: 'application',
    alias: 'application',
    description: 'Generate a new application workspace'
  },
  {
    name: 'angular-app',
    alias: 'ng-app',
    description: ''
  },
  {
    name: 'class',
    alias: 'cl',
    description: 'Generate a new class'
  },
  {
    name: 'configuration',
    alias: 'config',
    description: 'Generate a CLI configuration file'
  },
  {
    name: 'controller',
    alias: 'co',
    description: 'Generate a controller declaration'
  },
  {
    name: 'decorator',
    alias: 'd',
    description: 'Generate a custom decorator'
  },
  {
    name: 'filter',
    alias: 'f',
    description: 'Generate a filter declaration'
  },
  {
    name: 'gateway',
    alias: 'ga',
    description: 'Generate a gateway declaration'
  },
  {
    name: 'guard',
    alias: 'gu',
    description: 'Generate a guard declaration'
  },
  {
    name: 'interceptor',
    alias: 'itc',
    description: 'Generate an interceptor declaration'
  },
  {
    name: 'interface',
    alias: 'itf',
    description: 'Generate an interface'
  },
  {
    name: 'library',
    alias: 'lib',
    description: 'Generate a new library within a monorepo'
  },
  {
    name: 'middleware',
    alias: 'mi',
    description: 'Generate a middleware declaration'
  },
  {
    name: 'module',
    alias: 'mo',
    description: 'Generate a module declaration'
  },
  {
    name: 'pipe',
    alias: 'pi',
    description: 'Generate a pipe declaration'
  },
  {
    name: 'provider',
    alias: 'pr',
    description: 'Generate a provider declaration'
  },
  {
    name: 'resolver',
    alias: 'r',
    description: 'Generate a GraphQL resolver declaration'
  },
  {
    name: 'resource',
    alias: 'res',
    description: 'Generate a new CRUD resource'
  },
  {
    name: 'service',
    alias: 's',
    description: 'Generate a service declaration'
  },
  {
    name: 'sub-app',
    alias: 'app',
    description: 'Generate a new application within a monorepo'
  }
]

export const COMMANDS: Commands = {
  'create-electron': 'Create a new electron project.',
  'create-nest': 'Create a new nestjs node project.',
  'create-next': 'Create a new nextjs ssr project.',
  'create-rn': 'Create a new react native app.',
  'create-taro': 'Create a new taro mini project.',
  'create-template': 'Create a new template project.',
  'create-umi': 'Create a new react umi project.',
  'create-vite': 'Create a new react vite project.',
  'create-webpack': 'Create a new create-react-app project.'
}

export const TEMPLATES: Templates = {
  'next-app-router': 'A Next.js project using App Router.',
  'next-page-router': 'A Next.js project using page router.',
  'vite-react': 'A React project using vite.'
}
