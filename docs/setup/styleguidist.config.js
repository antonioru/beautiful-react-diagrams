const path = require('path');
const theme = require('./styleguidist.theme');

module.exports = {
  title: 'beautiful-react-diagrams | A tiny collection of lightweight React components for building diagrams with ease',
  /* eslint-disable global-require */
  webpackConfig: require('./styleguidist.webpack'),
  /* eslint-enable global-require */
  ignore: ['test/**/*.spec.{js,jsx}', 'node_modules', 'docs', 'test'],
  ribbon: {
    url: 'https://github.com/antonioru/beautiful-react-diagrams',
    text: 'Fork me on GitHub',
  },
  styleguideDir: '../../dist-ghpages',
  exampleMode: 'collapse',
  usageMode: 'collapse',
  pagePerSection: true,
  sortProps: props => props,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Getting started',
      content: '../getting-started.md',
      sectionDepth: 1,
    },
    {
      name: 'Components',
      pagePerSection: true,
      components: () => [
        '../../src/Diagram/Diagram.js',
      ],
    },
    {
      name: 'Hooks',
      content: '../hooks.md',
      sectionDepth: 1,
    },
  ],
  require: [path.join(__dirname, 'custom.css')],
  // Override styleguidist standard components
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'EmptyComponent'),
    PathlineRenderer: path.join(__dirname, 'EmptyComponent'),
    ToolbarButtonRenderer: path.join(__dirname, 'EmptyComponent'),
    TabButtonRenderer: path.join(__dirname, 'CustomTabButton'),
    TableOfContentsRenderer: path.join(__dirname, 'CustomSidebar'),
    ComponentsListRenderer: path.join(__dirname, 'CustomComponentListRenderer'),
  },
  ...theme,
};
