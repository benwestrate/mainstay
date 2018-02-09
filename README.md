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

| Object Property | Required | Default Value | Description |
|-----------------|--|---------------|-------------|
| reactComponentKey | no | 'react'     | reactComponentKey if present on the DOM element found by data-stoar mainstay will render a react component
| rootElementKey| yes | 'hook' | rootElementKey this is the data attribute that mainstay will use to find the element in the DOM. The default selector is `[data-${rootElementKey}="${data[rootElementKey]}"]` which could look like this `document.querySelectorAll([data-hook="123"])`
| libraryComponents| yes | [] | Every value in this array should be a javascript class definition
| reduxStore| no | null | reduxStore should be an instantiated redux store. If this value is passed mainstay will wrap all react components in the redux Provider component. For non react components mainstay will pass the store as the final argument when calling the class constructor.  
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

## Change Log
### v2.0.0 -- Breaking Changes
- BREAKING CHANGES to the api. Mainstay now exports as its default a class definition which needs to be instantiated with at least two arguments `rootElementKey` and `libraryComponents`. You also will need to call render once mainstay is instantiated.
