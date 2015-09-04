/**
 * Initialized the formatting of original objects to "Cytoscape" objects
 * @param nodes
 * @param edges
 */
function parseInput(nodes, edges) {

    var cyNodes = loopAndAssignDataAttribute(nodes, []),
        cyEdges = loopAndAssignDataAttribute(edges, []);

    return [cyNodes, cyEdges];
};

/**
 * Formats each array of node/edge objects from DB to the correct input of "Cytocape"
 * @param inputArr, the input array containing original objects.
 * @param targetArr, the output array containing "Cytoscape" objects. 
 */
function loopAndAssignDataAttribute(inputArr, targetArr) {

    for (var i = 0; i < inputArr.length; i++) {

        if('FranNode' in inputArr[i])
        {
            inputArr[i]['source'] = inputArr[i]['FranNode'] + "";
            inputArr[i]['target'] = inputArr[i]['TillNode'] + "";

            delete inputArr[i]['FranNode'];
            delete inputArr[i]['TillNode'];
        }
        if ('Id' in inputArr[i])
        {
            inputArr[i]['id'] = inputArr[i]['Id'] + "";

            delete inputArr[i]['Id'];
        }

        targetArr[i] = { data: inputArr[i] };
    }
    return targetArr;
};

function correctEdgeAttributes() {
    
};

/**
 * Initializes the "Cytoscape" core object with specified options
 * @param nodes, the array containing all node objects in the graph
 * @param edges, the array containing all edge objects in the graph
 */
function initGraph(nodes, edges, test) {

    if (!test)
    {
        //Original object array to "Cytoscape" object arrays
        var cyInput = parseInput(nodes, edges),
            cyNodes = cyInput[0],
            cyEdges = cyInput[1];
    }
    else
    {
        cyNodes = nodes;
        cyEdges = edges;
    }
   

    //Initialize the "Cytoscape" core
    $('#cy').cytoscape({
        style: cytoscape.stylesheet()
          .selector('node')
            .css({
                'content': 'data(NodeName)',
                'shape': 'roundrectangle',
                'text-valign': 'center',
                'color': 'Black',
                'text-wrap': 'wrap',
                'font-family' : 'Tahoma',
                'font-size': '8pt',
                'background-color': '#F8F8F8',
                'background-blacken': -.2,
                'border-width': '.5px',
                'border-style': 'solid',
                'border-color': 'black'
            })
          .selector('edge')
            .css({
                'target-arrow-shape': 'triangle',
                'line-color': 'black',
                'width': '.5px',
                'target-arrow-color': 'black'
            })
          .selector(':selected')
            .css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            })
          .selector('.faded')
            .css({
                'opacity': 0.10,
                'text-opacity': 0
            }),

        elements: {
            nodes: cyNodes,
            edges: cyEdges
        },

        ready: function () {

            //Bind 'cy' to the cytoscape core object
            window.cy = this;

            //Make the selection states of elements immutable
            cy.elements().unselectify();

            //On tap of a node, fade non-neighboring nodes
            cy.on('tap', 'node', function (e) {

                var node = e.cyTarget;
                var neighborhood = node.neighborhood().add(node);

                cy.elements().addClass('faded');
                neighborhood.removeClass('faded');

            });

            //On re-tap of a node, un-fade non-neighboring nodes 
            cy.on('tap', function (e) {

                if (e.cyTarget === cy)
                {
                    cy.elements().removeClass('faded');
                }

            });

            /**
            * Set the layout of the graph to "Dagre", options/attributes specified
            * in function "getDagreOptions()".
            */
            var options = getDagreOptions();
            cy.layout(options);

            /**
            * Update the each node with its label width, done to get automatic 
            * resizing of nodes.
            * Wrap in a "cy.batch" function, doing so will cause the render-function
            *  not to be called multiple times, saving resources.
            * 
            * ele: selection of the current node being processed  
            */
            cy.batch(function () {
                cy.nodes().each(function (i, ele) {

                    // Update the width of node 'ele'
                    ele.css({ 'width': ele._private.rstyle.labelWidth })

                });
            });

        },
      
        zoom: 0.5,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        wheelSensitivity: .2

    });
}

/**
 * Specifies the options used be "Dagre" algorithm during allignment of nodes in the graph
 */
function getDagreOptions() {
    var options = {

        // dagre algo options, uses default value on undefined
        name: 'dagre',

        // the separation between adjacent nodes in the same rank
        nodeSep: undefined,

        // the separation between adjacent edges in the same rank
        edgeSep: undefined,

        // the separation between adjacent nodes in the same rank
        rankSep: undefined,

        // 'TB' for top to bottom flow, 'LR' for left to right
        rankDir: undefined,

        // number of ranks to keep between the source and target of the edge
        minLen: function (edge) { return 1; },

        // higher weight edges are generally made shorter and straighter than lower weight edges
        edgeWeight: function (edge) { return 1; }, 

        // whether to fit to viewport
        fit: true,

        // fit padding
        padding: 30,

        // whether to transition the node positions
        animate: false,

        // duration of animation in ms if enabled
        animationDuration: 500,

        // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        boundingBox: undefined,

        // on layoutready
        ready: function () { },

        // on layoutstop
        stop: function () { } 
    }

    return options;
}


/**
* Creates a gridded background pattern
*/
function setGriddedBackground() {
    var gridStylesheet = {

        'background-color': '#FDFDFD',
        'background-size': '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        'background-position': '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
        'background-image': '-webkit-linear-gradient(#D5D5D0 0px, transparent 0px),'+ 
            'webkit-linear-gradient(0, #D5D5D0 0px, transparent 0px),'+
            '-webkit-linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px),'+
            '-webkit-linear-gradient(0, rgba(187, 187, 187,.3) 1px, transparent 1px)',
        'background-image': '-moz-linear-gradient(#D5D5D0 0px, transparent 0px),'+
            '-moz-linear-gradient(0, #D5D5D0 0px, transparent 0px),'+
            '-moz-linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px),'+
            '-moz-linear-gradient(0, rgba(187, 187, 187,.3) 1px, transparent 1px)',
        'background-image': 'linear-gradient(#D5D5D0 0px, transparent 0px),'+
            'linear-gradient(90deg, #D5D5D0 0px, transparent 0px),'+
            'linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px)'+
            ',linear-gradient(90deg, rgba(187, 187, 187,.3) 1px, transparent 1px)',
        '-pie-background': 'linear-gradient(#D5D5D0 0px, transparent 0px) -2px -2px / 100px,'+
            'linear-gradient(90deg, #D5D5D0 0px, transparent 0px) -2px -2px / 100px,'+
            'linear-gradient(rgba(187, 187, 187,.3) 1px, transparent .1px) -1px -1px / 20px,'+
            'linear-gradient(90deg, rgba(187, 187, 187,.3) 1px, transparent 1px) -1px -1px / 20px,#269'

    }

    $('#cy').css(gridStylesheet);
}


$(function () {

    //Set a gridded background
    setGriddedBackground();

    //Set test boolean
    var test = false;

    if (test) {
        var nodes = [
        { data: { id: 'j', nodeName: 'Berry' } },
        { data: { id: 'e', nodeName: 'Elaine' } },
        { data: { id: 'k', nodeName: 'lksdjlfjlskjldjfljsdlfjlsdvnebwvuiewbebvöbviebviebseövub' } },
        { data: { id: 'g', nodeName: 'George' } }
        ];

        var edges = [
                  { data: { source: 'j', target: 'e' } },
                  { data: { source: 'j', target: 'k' } },
                  { data: { source: 'j', target: 'g' } },
                  { data: { source: 'e', target: 'j' } },
                  { data: { source: 'e', target: 'k' } },
                  { data: { source: 'k', target: 'j' } },
                  { data: { source: 'k', target: 'e' } },
                  { data: { source: 'k', target: 'g' } },
                  { data: { source: 'g', target: 'j' } }
        ];

        initGraph(nodes, edges, test);
    }

    $('#storeGraph').on('click', function (e) {
        var a = '{ "elements": { "nodes": [{ "data": { "NodeName": "Jerry", "AktTypName": "arnold", "id": "1" }, "position": { "x": 0, "y": 0 }, "group": "nodes", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "NodeName": "Elaine", "AktTypName": "a", "id": "2" }, "position": { "x": 15, "y": 95 }, "group": "nodes", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "NodeName": "Kramer", "AktTypName": "a", "id": "3" }, "position": { "x": 40, "y": 175 }, "group": "nodes", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "NodeName": "George", "AktTypName": "a", "id": "4" }, "position": { "x": 40, "y": 255 }, "group": "nodes", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }], "edges": [{ "data": { "Version": "1", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "1", "target": "2", "id": "e0" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "2", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "1", "target": "3", "id": "e1" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "3", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "1", "target": "4", "id": "e2" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "4", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "2", "target": "1", "id": "e3" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "5", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "2", "target": "3", "id": "e4" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "6", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "3", "target": "1", "id": "e5" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "7", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "3", "target": "2", "id": "e6" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "8", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "3", "target": "4", "id": "e7" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }, { "data": { "Version": "9", "ProcessTyp": "1", "UtFallVärdeNamn": "1", "source": "4", "target": "1", "id": "e8" }, "position": {}, "group": "edges", "removed": false, "selected": false, "selectable": false, "locked": false, "grabbed": false, "grabbable": true, "classes": "" }] }, "style": [{ "selector": "node", "style": { "text-valign": "center", "color": "Black", "content": "data(NodeName)", "text-wrap": "wrap", "font-family": "Tahoma", "font-size": "8", "shape": "roundrectangle", "background-color": "#F8F8F8", "background-blacken": "-0.2", "border-color": "black", "border-width": "0.5px", "border-style": "solid" } }, { "selector": "edge", "style": { "width": "0.5px", "line-color": "black", "target-arrow-shape": "triangle", "target-arrow-color": "black" } }, { "selector": ":selected", "style": { "background-color": "black", "line-color": "black", "source-arrow-color": "black", "target-arrow-color": "black" } }, { "selector": ".faded", "style": { "text-opacity": "0", "opacity": "0.1" } }], "zoomingEnabled": true, "userZoomingEnabled": true, "zoom": 2.7356746765249538, "minZoom": 1e-50, "maxZoom": 1e+50, "panningEnabled": true, "userPanningEnabled": true, "pan": { "x": 342.4297597042514, "y": 30.68391866913123 }, "boxSelectionEnabled": false, "layout": { "name": "grid" }, "renderer": { "name": "canvas" }, "wheelSensitivity": 0.2 }';
        var b = '[{"data":{"NodeName":"Terry","AktTypName":"a","id":"1"},"position":{"x":0,"y":0},"group":"nodes","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"NodeName":"Elaine","AktTypName":"a","id":"2"},"position":{"x":15,"y":95},"group":"nodes","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"NodeName":"Kramer","AktTypName":"a","id":"3"},"position":{"x":40,"y":175},"group":"nodes","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"NodeName":"George","AktTypName":"a","id":"4"},"position":{"x":40,"y":255},"group":"nodes","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""}]';

        var c = '[{"data":{"Version":"1","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"1","target":"2","id":"e0"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"2","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"1","target":"3","id":"e1"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"3","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"1","target":"4","id":"e2"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"4","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"2","target":"1","id":"e3"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"5","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"2","target":"3","id":"e4"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"6","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"3","target":"1","id":"e5"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"7","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"3","target":"2","id":"e6"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"8","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"3","target":"4","id":"e7"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""},{"data":{"Version":"9","ProcessTyp":"1","UtFallVärdeNamn":"1","source":"4","target":"1","id":"e8"},"position":{},"group":"edges","removed":false,"selected":false,"selectable":false,"locked":false,"grabbed":false,"grabbable":true,"classes":""}]';
        console.log(b);
        console.log(c);
        var nodes = b;
        var edges = c;
        initGraph(nodes, edges, true);
        e.preventDefault();
    });

});