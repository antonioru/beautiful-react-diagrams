[![Build Status](https://travis-ci.org/antonioru/beautiful-react-diagrams.svg?branch=master)](https://travis-ci.org/antonioru/beautiful-react-diagrams)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![npm](https://img.shields.io/npm/v/beautiful-react-diagrams)
![GitHub stars](https://img.shields.io/github/stars/antonioru/beautiful-react-diagrams?style=social)

<img src="https://raw.githubusercontent.com/antonioru/beautiful-react-diagrams/master/logo.png" alt="beautiful-react-diagrams" width="750px" style="max-width:760px; margin: 25px auto; display: block">
<img src="https://raw.githubusercontent.com/antonioru/beautiful-react-diagrams/master/beautiful-react-diagrams.png" alt="Beautiful React Diagrams" style="max-width:540px; margin: 25px auto; display: block" />

## 💡 Why?

Javascript diagramming libraries are often difficult to integrate in React projects. <br />
Different patterns not always fit the React nature and having a component's state in in sync with an external
diagramming library might be quite difficult especially when the latter had been built in a different paradigm (such as MVC, for example).

For this reason we created `beautiful-react-diagrams` an easy-to-customise functional diagramming library to build 
diagrams with ease.

<hr />

## Easy to customise

We developed `beautiful-react-diagrams` having in mind that each diagram is different from the other, so we tried to sum
up our experience in React components customisation introducing a number of `renderers` for each component involved and
 styling by using `css vars`.

<hr />

## Controlled

 `beautiful-react-diagrams` exports a [controlled React component](https://reactjs.org/docs/forms.html#controlled-components) called `Diagram`. <br />
It accepts a `schema` prop defining the current state of the diagram and emits its possible changes through the 
`onChange` prop, allowing the developer to have the best possible control over the diagram and its interactions 
with the user. <br />
The`schema` prop is considered the *“single source of truth”* of a diagram.
