var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var $ = require('jquery');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */


exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};


// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('readList', err);
      return;
    }
    callback(data.split('\n'));
  });  
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    callback(data.indexOf(url) > -1);
  });

};

exports.addUrlToList = function(url, callback) {
  //(isUrlInList)
    //if so , return
    //if isnt  append it to the file
  exports.isUrlInList(url, function(exists) {
    if (exists) {
      cb && callback();
      return;
    } else {
      fs.appendFile(exports.paths.list, url + '\n', 'utf8', callback);
      return;
    }
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.readdir(exports.paths.archivedSites, function(err, urlArray) {
    //make a check for err
    cb(urlArray.indexOf(url) > -1);
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(url => {
    // $.ajax({
    //   type: 'GET',
    //   url: url,
    //   contentType: 'text/html',
    //   success: function(data) {
    //     fs.writeFile(exports.paths.archivedSites + '/' + url, data, 'utf8');
    fs.writeFile(exports.paths.archivedSites + '/' + url, '', 'utf8');
    //   },
    //   error: function(err) {
    //     console.log(err);
    //   }
    // });
  });
  //overwrite sites.txt
};

