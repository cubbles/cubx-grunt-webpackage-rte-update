'use strict';

var inquirer = require('inquirer');
var RteUpdater = require('cubx-webpackage-rte-update');

module.exports = function (grunt) {
  grunt.registerTask('_webpackage-updateRte', 'Update rte references in manifest file and in artifact files of a webpackage', function () {
    var webpackagePath = grunt.config.get('param.src') || grunt.config.get('webpackagepath');
    if (!webpackagePath) {
      throw new Error('webpackagePath missed. Please define \'webpackagePath\' option .');
    }
    var rteUpdater = new RteUpdater(webpackagePath);

    var options = {
      questions: [
        {
          name: 'rteVersion',
          type: 'input',
          message: 'Provide the rte version to be used (e.g. 2.3.0, 3.0.0-SNAPHOT)',
          validate: function (input) {
            var versionRegExp = new RegExp('^(\\d+)(\\.[\\d]+)*(-SNAPSHOT)?$');
            if (!versionRegExp.test(input)) {
              throw new Error('Invalid Rte version (' + input + '). Please provide a valid value like 2.3.0 or 3.0.0-SNAPSHOT');
            }
            return true;
          }
        }
      ]
    };

    var done = this.async();
    inquirer.prompt(options.questions).then(function (result) {
      rteUpdater.updateRteInWebpackage(result.rteVersion);
      done();
    });
  });
};
