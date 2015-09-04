$(function () {

    $("#cy").cytoscape(function () {
        var cytoscape = this;

        $("#layout-button").bind("click", function (e) {

            var options = "";

            //if dagre lyout is to be used load options
            if ($("#layout-select").val() === "dagre")
                options = getDagreOptions();
            else
                options = {
                    name: $("#layout-select").val()
                };

            cytoscape.layout(
                options
            );

            e.preventDefault();
        });
    });

});

function getDagreOptions() {
    var options = {

        name: 'dagre',

        // dagre algo options, uses default value on undefined
        nodeSep: undefined, // the separation between adjacent nodes in the same rank
        edgeSep: undefined, // the separation between adjacent edges in the same rank
        rankSep: undefined, // the separation between adjacent nodes in the same rank
        rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
        minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
        edgeWeight: function( edge ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges
  
        // general layout options
        fit: true, // whether to fit to viewport
        padding: 30, // fit padding
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        ready: function(){}, // on layoutready
        stop: function(){} // on layoutstop
    }

    return options;
}