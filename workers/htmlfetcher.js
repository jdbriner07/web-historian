// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// require archive helpers

//readlist of urls
  //download them
    // clear them

// readListOfUrls(function(array))

var CronJob = require('cron').CronJob;
var archive = require('../helpers/archive-helpers');


module.exports = new CronJob('*/10 * * * * *', function() {
  archive.readListOfUrls(archive.downloadUrls);
  // setTimeout(archive.clearList, 0);
}, function() {
},
  false, 'America/Los_Angeles'
);

