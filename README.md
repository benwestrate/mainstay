# Mainstay
The definition of Mainstay : a person or thing that acts as a chief support or part. ( [dictonary.com](http://dictionary.reference.com/browse/mainstay) )
This module is ment to be the middle piece that links a component that is in a client library built with [Iron(Fe)](https://github.com/jzeltman/iron) and your AEM authored componets.

### Install Mainstay
```node
npm install mainstay
```

### Usage

```js
var mainstay  = require('mainstay');
var DataStoar = require('data-stoar');

// Componets found by the data store
var pageComponents          = new DataStoar();
// Object of components that are included in client library
var clientlibraryComponents = { 'component-name' : require('component-name') };

mainstay( pageComponents , clientlibraryComponents );

```

### Usage with Redux

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

### Arguments explanation

#### PageComponents
This is an object of all of the components that are found on the page. The structure of which should follow the structure created by the DataStoar module.

#### ClientLibraryComponents
This is a object with keys that are exactly the same name of each component being found by the DataStoar module.

#### ReduxStore
This is the redux store.

#### Use Redux
This just needs to be a Bool when you want mainstay to wrap each react component in a Provider component.
