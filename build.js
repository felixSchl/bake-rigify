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
        name:    pkg.name
      , version: pkg.version
      , blender: pkg.blender
      , output:  path.join(__dirname, 'bake-rigify-' + pkg.version + '.zip')
    })

    /* Clean output directory. */
    .then(function() {
        return Promise.all([
            rimraf(this.output)
          , rimraf(path.join(__dirname, './bake-rigify/'))
        ]);
    })

    /* Update __init__.py version */
    .then(function() {
        return (
            fs.readFileAsync(path.join(
                __dirname, '__init__.py'
            )).then(_.method('toString', 'utf8'))
        );
    })
    .then(_.method('split', '\n'))
    .then(function(lines) {
        var build = this
          , addonVersion = build.version.split('.').join(', ')
          , blenderVersion = build.blender.version.split('.').join(', ')
        ;

        var pre = _.takeWhile(
            lines
          , function(line) {
                return /^bl_info = {$/.test(line) === false;
            }
        );

        var post = _.drop(_.dropWhile(
            _.drop(lines, pre.length)
          , function(line) {
                return /^}$/.test(line) === false;
            }
        ), 1);

        return pre
            .concat([
                "bl_info = {"
              , [ '    "name":'     + '"' + build.blender.name     + '"'
                , '    "author":'   + '"' + build.blender.author   + '"'
                , '    "version":'  + '(' + addonVersion           + ')'
                , '    "blender":'  + '(' + blenderVersion         + ')'
                , '    "category":' + '"' + build.blender.category + '"'
                ].join(',\n')
              , "}"
            ])
            .concat(post)
        ;
    })
    .then(_.method('join', '\n'))

    /* Zip */
    .then(function(modified) {
        var zip = new JSZip()
          , folder = zip.folder('bake-rigify')
        ;

        _.each(
            [ 'README.md' ]
          , function(filename) {
                folder.file(
                    filename
                  , fs.readFileSync(path.join(__dirname, filename))
                );
            }
        );

        folder.file('__init__.py', modified);

        return fs.writeFileAsync(
            this.output
          , zip.generate({type: 'nodebuffer'})
        );
    })
;
