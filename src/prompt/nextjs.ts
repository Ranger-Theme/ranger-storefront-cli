import type { QuestionCollection } from 'inquirer'

export const nextjs: QuestionCollection[] = [
  {
    name: 'type',
    type: 'list',
    message: 'Please choose the type of your project?',
    choices: [
      {
        name: 'Using App Router',
        value: 'app',
        short: 'Features available in /app'
      },
      {
        name: 'Using Pages Router',
        value: 'pages',
        short: 'Features available in /pages'
      }
    ]
  },
  {
    name: 'ui',
    type: 'list',
    message: 'Please choose the UI framework of your project?',
    choices: [
      {
        name: 'Using Material UI',
        value: 'mui',
        short:
          "Material UI is an open-source React component library that implements Google's Material Design."
      },
      {
        name: 'Using Ant Design',
        value: 'antd',
        short:
          'Following the Ant Design specification, we developed a React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.'
      }
    ]
  },
  {
    name: 'features',
    type: 'checkbox',
    message: 'Check the features needed for your project:',
    choices: [
      {
        name: 'TypeScript',
        value: 'typescript',
        checked: true
      },
      {
        name: 'Nextjs Middleware',
        value: 'middeware'
      },
      {
        name: 'Nextjs Api Http Proxy',
        value: 'proxy'
      },
      {
        name: 'Sentry Recording Support',
        value: 'sentry'
      },
      {
        name: 'Progressive Web App (PWA) Support',
        value: 'pwa'
      }
    ]
  }
]
