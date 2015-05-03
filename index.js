'use strict';

var through = require('through2');
var File = require('vinyl');
var path = require('path');
var angularArhitectureGraph = require('angular-architecture-graph');
var dgml = require('ts-dgml');
var angularToDgml = require('./angular-to-dgml');

module.exports = function (file, opt) {
    if (!file) {
        throw new Error('no options');
    }
    opt = opt || {};
    
    var firstFile;
    var fileName;
    
    var files = [];
    fileName = file;
    
    if (typeof file === 'string') {
        fileName = file;
    } else if (typeof file.path === 'string') {
        fileName = path.basename(file.path);
        firstFile = new File(file);
    } else {
        throw new Error('Missing path in file options');
    }
    
    function bufferContents(file, enc, cb) {
        // ignore empty files
        if (file.isNull()) {
            cb();
            return;
        }
        
        // we dont do streams (yet)
        if (file.isStream()) {
            this.emit('error', new Error('Streaming not supported'));
            cb();
            return;
        }
        
        //set first file if not already set
        if (!firstFile) {
            firstFile = file;
        }
        
        files.push({
            id: path.basename(file.path),
            text: file.contents.toString('utf8')
        });
        cb();
    }
    
    function endStream(cb) {
        if (!firstFile || files.length === 0) {
            cb();
            return;
        }
        
        var joinedFile;
        
        // if file opt was a file path
        // clone everything from the first file
        if (typeof file === 'string') {
            joinedFile = firstFile.clone({ contents: false });
            joinedFile.path = path.join(firstFile.base, file);
        } else {
            joinedFile = firstFile;
        }
        var graph = angularArhitectureGraph(files);

        var dg = new dgml.DirectedGraph();

        angularToDgml.DgmlHelper.addToDirectedGraph(graph.angular, dg);
        
        var ds = new dgml.nodeXml.Serializer(dg);
        
        joinedFile.contents = new Buffer(ds.toDgml());
        
        this.push(joinedFile);
        cb();
    }
    
    return through.obj(bufferContents, endStream);
};