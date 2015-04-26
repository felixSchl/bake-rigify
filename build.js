'use strict';

var pkg = require('./package.json')
  , _ = require('lodash')
  , Promise = require('bluebird')
  , fs = Promise.promisifyAll(require('fs'))
  , path = require('path')
  , rimraf = Promise.promisify(require('rimraf'))
  , kopeer = require('kopeer')
  , JSZip = require('jszip')
;

Promise.resolve()

    .bind({
        version: pkg.version
      , output:  path.join(__dirname, 'bake-rigify-' + pkg.version + '.zip')
    })

    /* Clean output directory. */
    .then(function() {
        return Promise.all([
            rimraf(this.output)
          , rimraf(path.join(__dirname, './bake-rigify/'))
        ]);
    })

    /* Copy files to output directory. */
    .then(function() {
        return Promise.all(
            _.map([ '__init__.py', 'README.md' ]
              , function(filename) {
                    return kopeer.file(
                        path.join(__dirname, filename)
                      , path.join(__dirname, './bake-rigify/')
                    );
                }
            )
        );
    })

    /* Update __init__.py version */
    .then(function() {
        return (
            fs.readFileAsync(path.join(
                __dirname, './bake-rigify/', '__init__.py'
            )).then(_.method('toString', 'utf8'))
        );
    })
    .then(_.method('split', '\n'))
    .then(function(lines) {
        var build = this
          , version = build.version.split('.').join(', ')
        ;
        return _.map(lines, function(line) {
            return (/^([ ]*)"version":[ ]*\([0-9, ]*\)/.test(line))
                ? '    "version": (' + version + '),'
                : line
            ;
        });
    })
    .then(_.method('join', '\n'))

    /* Zip */
    .then(function() {
        var zip = new JSZip()
          , folder = zip.folder('bake-rigify')
        ;
        _.each(
            [ '__init__.py', 'README.md' ]
          , function(filename) {
                folder.file(
                    filename
                  , fs.readFileSync(path.join(__dirname, filename))
                );
            }
        );

        return fs.writeFileAsync(
            this.output
          , zip.generate({type: 'nodebuffer'})
        );
    })
;
