const path = require('path');
const theme = require('./styleguidist.theme');

module.exports = {
  title: 'beautiful-react-diagrams | A tiny collection of lightweight React components for building diagrams with ease',
  /* eslint-disable global-require */
  webpackConfig: require('./styleguidist.webpack'),
  /* eslint-enable global-require */
  ignore: ['tests/**/*.spec.{js,jsx}', 'node_modules', 'docs', 'test'],
  ribbon: {
    url: 'https://github.com/antonioru/beautiful-react-diagrams',
    text: 'Fork me on GitHub',
  },
  styleguideDir: '../../dist-ghpages',
  exampleMode: 'expand',
  usageMode: 'collapse',
  pagePerSection: true,
  sortProps: props => props,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Concepts',
      content: '../concepts.md',
      sectionDepth: 1,
    },
    {
      name: 'Getting started',
      content: '../getting-started.md',
      sectionDepth: 1,
    },
    {
      name: 'Basic Usage',
      content: '../Basic-usage.md',
      sectionDepth: 1,
    },
    {
      name: 'Links and Ports',
      content: '../Links-Ports.md',
      sectionDepth: 1,
    },
    {
      name: 'Canvas Controls',
      content: '../CanvasControls.md',
      sectionDepth: 1,
    },
    {
      name: 'Customisation',
      content: '../customisation.md',
      sectionDepth: 1,
    },
    {
      name: 'Dynamic nodes',
      content: '../dynamic-nodes.md',
      sectionDepth: 1,
    },
    {
      name: 'Schema utilities',
      content: '../Schema-utils.md',
      sectionDepth: 1,
    },
    {
      name: 'useSchema',
      content: '../useSchema.md',
      sectionDepth: 1,
    },
    {
      name: 'useCanvasState',
      content: '../useCanvasState.md',
      sectionDepth: 1,
    },
    {
      name: 'Other libraries',
      content: '../other-libraries.md',
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
