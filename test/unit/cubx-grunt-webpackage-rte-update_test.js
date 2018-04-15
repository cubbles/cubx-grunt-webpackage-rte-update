/* globals describe, before, beforeEach, afterEach, it, expect */
(function () {
  'use strict';

  var grunt;
  var fs;
  var path;
  var stdin;
  var wpBackupPath;
  var wpPath;
  var wpManifestPath;
  var expectedManifestPath;

  var validRteVersion;
  var invalidRteVersion;

  describe('cubx-grunt-webpackage-rte-update', function () {
    before(function () {
      fs = require('fs-extra');
      path = require('path');

      wpBackupPath = path.resolve(__dirname, '../resources/wp-backup');
      wpPath = path.resolve(__dirname, '../resources/wp');
      wpManifestPath = path.join(wpPath, 'manifest.webpackage');
      expectedManifestPath = path.join(wpPath, 'refactored-files', 'manifest.webpackage');

      validRteVersion = '3.0.0';
      invalidRteVersion = 'v3.0.0';

      fs.copySync(wpBackupPath, wpPath);
    });
    beforeEach(function () {
      stdin = require('mock-stdin').stdin();
      grunt = require('grunt');
      grunt.task.init = function () {};
      var taskPath = path.resolve(process.cwd(), 'tasks');
      grunt.task.loadTasks(taskPath);

      fs.emptyDirSync(wpPath);
      fs.copySync(wpBackupPath, wpPath);
    });

    describe('run grunt task "_webpackage-updateRte", webpackage path configured in webpackagepath', function () {
      beforeEach(function () {
        // Init config
        grunt.initConfig({
          webpackagepath: wpPath
        });
      });
      afterEach(function () {
        grunt.initConfig({});
      });
      it('should rename an artifact', function (done) {
        process.nextTick(function () { stdin.send(validRteVersion + '\n'); });
        grunt.tasks([ '_webpackage-updateRte' ], {}, function () {
          var refactoredManifest = JSON.parse(fs.readFileSync(wpManifestPath, 'utf8'));
          var expectedManifest = JSON.parse(fs.readFileSync(expectedManifestPath, 'utf8'));
          expect(refactoredManifest).to.be.deep.equal(expectedManifest);
          done();
        });
      });
      it('should throw an \'Invalid Rte version\' error since version is not valid', function (done) {
        process.nextTick(function () { stdin.send(invalidRteVersion + '\n'); });
        grunt.tasks([ '_webpackage-updateRte' ], {}, expect(function b () {
          done();
        }).to.throw(/Invalid Rte version/));
      });
    });

    describe('run grunt task "_webpackage-updateRte", webpackage path configured in param.src', function () {
      beforeEach(function () {
        // Init config
        grunt.initConfig({
          param: {
            src: wpPath
          }
        });
      });
      afterEach(function () {
        grunt.initConfig({});
      });
      it('should rename an artifact', function (done) {
        process.nextTick(function () { stdin.send(validRteVersion + '\n'); });
        grunt.tasks([ '_webpackage-updateRte' ], {}, function () {
          var refactoredManifest = JSON.parse(fs.readFileSync(wpManifestPath, 'utf8'));
          var expectedManifest = JSON.parse(fs.readFileSync(expectedManifestPath, 'utf8'));
          expect(refactoredManifest).to.be.deep.equal(expectedManifest);
          done();
        });
      });
    });
  });
})();
