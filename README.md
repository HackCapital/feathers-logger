# feathers-logger

Modified to support namespaced debug to bunyan.

<img width="647" src="./example/screenshot.jpg?raw=true">

## Getting Started

Install the module with: `yarn add https://github.com/HackCapital/feathers-logger`

```js
var feathers = require('feathers');
var logger = require('feathers-logger');

var app = feathers()
  .configure(logger({ name: 'cto-ai' }));
```

## Documentation

`Feathers-logger` enables the following methods:

* `app.log()`
* `app.info()`
* `app.warn()`
* `app.error()`
* `app.debug()`
* `app.createDebug()`

#### Usage

```js
var feathers = require('feathers');
var logger = require('feathers-logger');

var app = feathers()
    .configure(logger({name: 'cto-ai'}));

app.log('Some log happened');
app.info('Some info happened');
app.warn('Some warn happened');
app.error('Some error happened');

// The following debug will only appear if app is started with: DEBUG=cto-ai
app.debug('Some debug happened');

// The following debug will only appear if app is started with: DEBUG=cto-ai:some-namespace
const namespacedDebug = app.createDebug('some-namespace');
namespacedDebug('Some debug happened');
```

#### CLI Usage

Start the app with a debug level. Ie. `DEBUG=*`, `DEBUG=cto-ai*`, `DEBUG=cto-ai:my-namespace*`
to filter the debug messages that appear.

More info: [Node Debug](https://github.com/visionmedia/debug)

## Examples
See [example directory](https://github.com/feathersjs/feathers-logger/tree/master/example).

## License
Copyright (c) 2014 [Eric Kryski](https://github.com/ekryski)
Licensed under the [MIT license](https://github.com/feathersjs/feathers-logger/blob/master/LICENSE-MIT).
