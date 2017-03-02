var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //if request get
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return; 
      }

      res.writeHead(200);
      res.end(data);
      return;
    });
  } else {
    res.end(archive.paths.list);
  }

};

//callback = isUrlInList(url, function(exists) {
//  if exists ? serve the file, otherwise addUrltoList(url, serve loading.html)
//})

//empty out file after performing download urls
