/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var path = require('path');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    dotEnv: {
      clientAllowedKeys: ['TWITCH_CLIENT_ID']
    },

    svgstore: {
      excludeSourceFiles: true, // exclude all processed source files (https://github.com/salsify/ember-cli-svgstore#usage)
      files: {
        sourceDirs: [ 'tests/dummy/public/assets/icons' ],
        outputFile: '/assets/icons.svg',
        excludeSourceFiles: true // exclude source files only for this master SVG
      }
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
