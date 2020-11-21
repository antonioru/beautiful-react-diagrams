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
  exampleMode: 'collapse',
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
      name: 'Diagram Component',
      content: '../../src/Diagram/README.md',
      sectionDepth: 1,
    },
    {
      name: 'Schema',
      content: '../schema.md',
      sectionDepth: 1,
    },
    {
      name: 'Linking nodes',
      content: '../links.md',
      sectionDepth: 1,
    },
    {
      name: 'Ports',
      content: '../ports.md',
      sectionDepth: 1,
    },
    {
      name: 'Customisation',
      content: '../customisation.md',
      sectionDepth: 1,
    },

    { divider: true },
    {
      name: 'Dynamic nodes',
      content: '../dynamic-nodes.md',
      sectionDepth: 1,
    },
    {
      name: 'Drag & Zoom',
      content: '../drag&zoom.md',
      sectionDepth: 1,
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
