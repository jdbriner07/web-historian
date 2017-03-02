// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// require archive helpers

//readlist of urls
  //download them
    // clear them

// readListOfUrls(function(array))

var CronJob = require('cron').CronJob;
var archive = require('../helpers/archive-helpers');


var job = new CronJob('* */1 * * * *', function() {
  archive.readListOfUrls(archive.downloadUrls);
}, //archive helper funciton to clear sites.txt
  true, 'America/Los_Angeles'
);
