var exec = require('child_process').exec,
    child;

/*
 * On git post event
 */

exports.POST = function(req, res){
  var data = req.body;

  // Git pull, npm install, bower install, build project, restart server
  child = exec('git pull && npm install && bower install --allow-root && gulp build && forever restart app.js',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });

  return {status: true};
};
