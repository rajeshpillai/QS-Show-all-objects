define( [
    'js/qlik',
    ],
    function (qlik ) {
        'use strict';
        return {
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    dimensions: {uses: "dimensions"},
                    measures: {uses: "measures"},
                    sorting: {uses: "sorting"},
                    appearance: {uses: "settings"}
                }
            },
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [
                        {
                            qWidth: 10,
                            qHeight: 100
                        }
                    ]
                }
            },
            paint: function ( $element, layout ) {
                var hc = layout.qHyperCube;

                var app = qlik.currApp();

                $element.empty();
                //console.clear(); // rp
                app.getAppObjectList( 'sheet', function(reply){
                    var str = "";
                    $.each(reply.qAppObjectList.qItems, function(key, value) {
                        str +=  value.qData.title + ' ';
                        $.each(value.qData.cells, function(k,v){
                            str +=  ' name: ' + v.name + ' ';

                            console.log("v: ", v);
                        });
                        str += '\n';
                    });
                    //alert(str);
                    console.log(str);
                });


            }
        };
} );

function sayHello() {

    alert("Hello how are you?");
    return false;
}

function debugPanel(hc){
    var html = "<div id='debug' style='overflow:auto;height:300px'>";
    html += "DEBUGGING OUTPUT:"
    html += JSON.stringify(hc.qDimensionInfo);
    html += "<br>";
    html += "<h2>DATA:</h2>";
    html += JSON.stringify(hc.qDataPages[0]);
    html += "</div>"
    return html;

}
