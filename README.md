# Mainstay
The definition of Mainstay : a person or thing that acts as a chief support or part. ( [dictonary.com](http://dictionary.reference.com/browse/mainstay) )
This module is meant to be the middle piece that links a component that is in a client library and your AEM authored components.

### Install Mainstay
```node
npm install mainstay
```
### Usage
```js
import Mainstay from 'mainstay';
import {
    MyComponentClass,
    MyNewComponentClass } from './components';


let libComponentsList = [
    MyComponentClass,
    MyNewComponentClass
]

let mainstay = new Mainstay( {
    // reactComponentKey if present on the DOM element found by data-stoar mainstay will render a react component
    reactComponentKey : 'react',
    // rootElementKey this is the data attribute that mainstay will use for the react-dom root element. The default is data-hook.
    rootElementKey    : 'hook',
    // Array of component class definitions
    libraryComponents : libComponentsList
} )


mainstay.render()
```
### Options Definition

| Object Property | Required | Default Value | Description |
|-----------------|--|---------------|-------------|
| reactComponentKey | no | 'react'     | reactComponentKey if present on the DOM element found by data-stoar mainstay will render a react component
| rootElementKey| no | 'hook' | rootElementKey this is the data attribute that mainstay will use to find the element in the DOM. The default selector is `[data-${rootElementKey}="${data[rootElementKey]}"]` which could look like this `document.querySelectorAll([data-hook="123"])`. This is not required if you are using the data-stoar with data-attributes instead of script tags. If you are using data-attributes the data-stoar will return the element it found the `data-component` on.
| libraryComponents| yes | [] | Every value in this array should be a javascript class definition
| reduxStore| no | null | reduxStore should be an instantiated redux store. If this value is passed mainstay will wrap all react components in the redux Provider component. For non react components mainstay will pass the store as the final argument when calling the class constructor.  

#### How are props passed to my react component?

Each attribute that is gathered by the [data-stoar](https://github.com/jzeltman/data-stoar) will be passed as individual props on your react component.

#### What gets passed to my javascript class constructor?
There are 2 or 3 arguments passed to your class constructor. The first is and object of the data found by the [data-stoar](https://github.com/jzeltman/data-stoar). The second is the DOM element that was found either by finding the element with the rootElementKey or the element passed by the data-stoar. The third argument passed to the constructor is the redux store. This is only passed if a redux store is passed into the options object with instantiating mainstay.

### Re-Render
```javascript
import Mainstay from 'mainstay';

let mainstay = new Mainstay( {
    // reactComponentKey if present on the DOM element found by data-stoar mainstay will render a react component
    reactComponentKey : 'react',
    // rootElementKey this is the data attribute that mainstay will use for the react-dom root element. The default is data-hook.
    rootElementKey    : 'hook',
    // Array of component class definitions
    libraryComponents : libComponentsList
} )

/// Later in your code

mainstay.rerender()

```

## Change Log
### v2.1.0 -- Feature Re-Render
- Added the ability to re-render all rendered components
### v2.0.1 -- Bug Fixes
- fixed a bug where mainstay incorrectly named a component wrapped in a react-redux connect higher order function
### v2.0.0 -- Breaking Changes
- BREAKING CHANGES to the api. Mainstay now exports as its default a class definition which needs to be instantiated with at least one argument `libraryComponents`. You also will need to call render once mainstay is instantiated.

--------
### Pre v2 Usage
*BELOW IS ONLY FOR VERSION 1.X*
```js
var mainstay  = require('mainstay');
var DataStoar = require('data-stoar');

// Componets found by the data store
var pageComponents          = new DataStoar();
// Object of components that are included in client library
var clientlibraryComponents = { 'component-name' : require('component-name') };

mainstay( pageComponents , clientlibraryComponents );

```

### Pre v2 Usage with Redux
*BELOW IS ONLY FOR VERSION 1.X*
```js
var mainstay  = require('mainstay');
var DataStoar = require('data-stoar');

// Componets found by the data store
var pageComponents          = new DataStoar();
// Object of components that are included in client library
var clientlibraryComponents = { 'component-name' : require('component-name') };

var reduxStore = /* redux init function */

mainstay( pageComponents , clientlibraryComponents, reduxStore, true );

```
