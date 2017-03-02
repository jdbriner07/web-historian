var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //if request get

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, helpers.headers);
      helpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    } else { 
      archive.isUrlArchived(req.url.slice(1), function(exists) {
        if (exists) {
          res.writeHead(200, helpers.headers);
          helpers.serveAssets(res, archive.paths.archivedSites + req.url);
        } else {
          res.writeHead(404);
          res.end('Invalid GET Request');
        }
      });
    }
  } else if (req.method === 'POST') {
    var body = [];
    req.on('data', function (data) {
      body.push(data);
    });
    req.on('end', function() {
      var post = body.toString().slice(4);
      archive.isUrlArchived(post, function(archived) {
        if (archived) {
          res.writeHead(302, helpers.headers);
          helpers.serveAssets(res, archive.paths.archivedSites + '/' + post);
        } else {
          archive.isUrlInList(post, function(inlist) {
            if (!inlist) { 
              archive.addUrlToList(post);
            }
            res.writeHead(302, helpers.headers);
            helpers.serveAssets(res, archive.paths.siteAssets + '/loading.html');
          });
        }
      });
    });
  }

};

//callback = isUrlInList(url, function(exists) {
//  if exists ? serve the file, otherwise addUrltoList(url, serve loading.html)
//})

//empty out file after performing download urls
