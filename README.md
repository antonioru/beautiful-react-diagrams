[![Build Status](https://travis-ci.org/beautifulinteractions/beautiful-react-ui.svg?branch=master)](https://travis-ci.org/beautifulinteractions/beautiful-react-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![npm](https://img.shields.io/npm/v/beautiful-react-ui)
![GitHub stars](https://img.shields.io/github/stars/beautifulinteractions/beautiful-react-ui?style=social)

<div align="center">
  <p align="center">
    <img src="./logo.png" alt="beautiful-react-ui" width="750px" />
  </p>
</div>
<br />
<div>
  <p align="center">
    A collection of lightweight and easy-to-customise controlled React components
  </p>
</div>

<div>
  <p align="center">
    <a href="https://beautifulinteractions.github.io/beautiful-react-ui/" target="_blank">
    🌟 Live playground here 🌟
    </a>
  </p>
</div>

## 💡 Why?

In the last few year we've had a chance to test a good number of UI libraries, each with its own strengths and 
weaknesses, but none that matched our expectations in terms of ease of customization.

In fact, our attempt at customizing the style and behavior of the libraries we've tested would generally result in 
one or more of the following:
- an inordinate growth in the number of dependencies of our projects, often in the form of language transpilers / compilers causing our build process to grow in complexity beyond reason;
- a struggle with components carelessly implemented as stateful components where a stateless approach would have resulted in a much better, more performant, more reusable product.

As a result, we've decided to develop a library putting ease of customization as our top priority, focusing on a solid, props-driven API and pure CSS. 

## 🎓 Principles

- **Driven by grace**: instead of customising the padding/margin/color/whatever of a single component, 
customise the value of padding/margin/color/whatever trough a [configuration file](./docs/customising.md), the library 
will then generate a tailored style keeping grace between components.
- **Render behaviour**: the majority of the exported components accept a `render` prop to possibly customise 
their behaviour
- **Controlled components**: exports [controlled](https://reactjs.org/docs/forms.html#controlled-components) components only
- **Lightweights**: import nothing but lightweight javascript components.

## ☕️ Features

* Concise API
* Small and lightweight
* Easy to use
* Easy to customise
* Fully written in old-school JS (although TS types are supported)
* Based on [Tailwindcss](https://tailwindcss.com/)

<div>
  <p align="center">
    <a href="https://beautifulinteractions.github.io/beautiful-react-ui/" target="_blank">
    🌟 Live playground here 🌟
    </a>
  </p>
</div>

## Contributing

Contributions are very welcome and wanted. 

To submit your custom pull request, please make sure your read our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

**Before submitting** a new pull request, please make sure:

1. You have updated the package.json version and reported your changes into the [CHANGELOG](./CHANGELOG.md) file
3. make sure you run `npm test` and `npm build` before submitting your merge request.
4. make sure you've added the documentation of your changes.
5. if you've changed the signature of a component, please make sure you've updated the `index.d.ts` file.

### Credits

This library is provided and sponsored by: 

<div>
  <p>
    <a href="https://beautifulinteractions.com/">
      <img src="https://beautifulinteractions.com/img/logo-colorful.svg" alt="Beautiful interactions" width="140px" />
    </a>
  </p>
</div>

As part of our commitment to support and contribute to the open source community.

---

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/free-icon/hook_1081812)
