/// <reference path="../typings/tsd.d.ts" />

import fs = require('fs');
import xml = require('xml');
import chai = require('chai');
import dgml = require('ts-dgml');
import ngdgml = require('../angular-to-dgml');

function getDirectedGraphFromArchJsonPath(path: string): dgml.DirectedGraph {
    var arch = JSON.parse(fs.readFileSync(path, 'utf8')),
        graph = new dgml.DirectedGraph();
    ngdgml.DgmlHelper.addToDirectedGraph(arch.angular, graph);
    return graph;
}

describe('angular architecture graph to directed graph',() => {
    describe('ui-utils-keypress',() => {
        var graph: dgml.DirectedGraph;

        before(() => {
            graph = getDirectedGraphFromArchJsonPath('test/fixtures/ui-utils-keypress.json');
        });
        
        it('should have proper xml',() => {
            var xml = '<DirectedGraph xmlns="http://schemas.microsoft.com/vs/2009/dgml">'
                + '<Nodes>'
                + '<Node Id="ui.keypress" Label="ui.keypress" Category="Module"/>'
                + '<Node Id="keypressHelper" Label="keypressHelper" Category="Factory"/>'
                + '<Node Id="uiKeydown" Label="uiKeydown" Category="Directive"/>'
                + '<Node Id="uiKeypress" Label="uiKeypress" Category="Directive"/>'
                + '<Node Id="uiKeyup" Label="uiKeyup" Category="Directive"/>'
                + '<Node Id="$parse" Category="External"/>'
                + '</Nodes>'
                + '<Links>'
                + '<Link Source="ui.keypress" Target="keypressHelper"/>'
                + '<Link Source="keypressHelper" Target="$parse"/>'
                + '<Link Source="ui.keypress" Target="uiKeydown"/>'
                + '<Link Source="uiKeydown" Target="keypressHelper"/>'
                + '<Link Source="ui.keypress" Target="uiKeypress"/>'
                + '<Link Source="uiKeypress" Target="keypressHelper"/>'
                + '<Link Source="ui.keypress" Target="uiKeyup"/>'
                + '<Link Source="uiKeyup" Target="keypressHelper"/>'
                + '</Links>'
                + '<Categories>'
                + '<Category Id="Module" Label="Module"/>'
                + '<Category Id="Controller" Label="Controller" Background="#FFFF0000"/>'
                + '<Category Id="Service" Label="Service" Background="#FF0000FF"/>'
                + '<Category Id="Factory" Label="Factory" Background="#FFFFA500"/>'
                + '<Category Id="Filter" Label="Filter" Background="#FFFFC0CB"/>'
                + '<Category Id="Provider" Label="Provider" Background="#FF7FFF00"/>'
                + '<Category Id="Directive" Label="Directive" Background="#FF008000"/>'
                + '<Category Id="External" Label="External" Background="#FF808000"/>'
                + '<Category Id="External"/>'
                + '</Categories>'
                + '</DirectedGraph>';

            chai.expect(new dgml.nodeXml.Serializer(graph, { indent: false }).toDgml()).to.equal(xml);
        });
    });
});
