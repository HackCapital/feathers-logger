var feathers = require('feathers');
var logger = require('../lib');
var app = feathers();

app.configure(logger({
  name: 'my-app'
}));

app.listen(3030);
app.info('App listening on 127.0.0.1:3030');
app.log('log');
app.warn('warn');
app.error('error');
app.debug('debug');

const namespaceDebug = app.createDebug('namespace');
namespaceDebug('Hello namespace');
