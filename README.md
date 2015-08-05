# Mainstay
Mainstay : a person or thing that acts as a chief support or part. ( [dictonary.com](http://dictionary.reference.com/browse/mainstay) )
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
