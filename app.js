var express = require('express'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  middleware = require('./middleware'),
  app = express();

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/crud', function (err) {
  if (err) throw err;
  
  middleware(app);

  routes(app);

  app.listen(app.get('port'), function () {
    console.log('server has started on port ' + app.get('port'));
  });
});

module.exports = app;
