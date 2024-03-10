import type { QuestionCollection } from 'inquirer'

export const vite: QuestionCollection[] = [
  {
    name: 'type',
    type: 'list',
    message: 'Please choose the query api of your project?',
    choices: [
      {
        name: 'Using Axios',
        value: 'axios'
      },
      {
        name: 'Using Fetch',
        value: 'fetch'
      },
      {
        name: 'Using Use Http',
        value: 'http'
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
    name: 'hooks',
    type: 'list',
    message: 'Please choose the common hooks api of your project?',
    choices: [
      {
        name: 'Using Ahooks',
        value: 'ahooks'
      },
      {
        name: 'Using React Use',
        value: 'use'
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
        name: 'React Router',
        value: 'router'
      },
      {
        name: 'Redux Toolkit',
        value: 'reduxjs'
      },
      {
        name: 'Vite Http Proxy',
        value: 'proxy'
      },
      {
        name: 'Vite Visualizer',
        value: 'visualizer'
      },
      {
        name: 'Sentry Recording Support',
        value: 'sentry'
      }
    ]
  }
]
