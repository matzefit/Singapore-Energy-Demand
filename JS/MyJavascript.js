//                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzhlNWRiYi1hOGJkLTQ1ODktOGE5Yy1hYTIxMDIzNzZhYTMiLCJpZCI6OTU1OSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1NDM0ODA2OX0.8mJkaxqhjhLFG-sZu3jSGqU5vAhWiLe6g_zoQjudilc';

//ToDo 


//feature picking with hover and select behavior
//var cesiumTerrainProvider = Cesium.createWorldTerrain();
var viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    scene3DOnly: true,
    selectionIndicator: false,
    shadows: true,
    animation: false,
    timeline: false,

    //Use OpenStreetMaps
    imageryProvider: Cesium.createOpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
    }),
    mapProjection: new Cesium.WebMercatorProjection()

});




//        //Title
function showTable() {
    var x = document.getElementById("chartcontainer");
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";

    } else {
        x.style.visibility = "hidden";
    }
}
// Enable lighting based on sun/moon positions
viewer.scene.globe.enableLighting = true;
//var heightOffset = -10;
viewer.scene.globe.depthTestAgainstTerrain = true;
// Load the buildings tileset
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '/Specs/Data/Cesium3DTiles/Cesium 3DTiles LOD1AllAttributes/clamped/tileset.json',
    maximumScreenSpaceError: 8
}));

//Load LOD2 tileset
var tilesetLOD2 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '/Specs/Data/Cesium3DTiles/Cesium 3DTiles LOD2 AllAttr_Simres_Altern_AlkisCodes/MergedBuildingparts_clamped/tileset.json',
    maximumScreenSpaceError: 8
}));

var tilesetLOD2CBD = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '/Specs/Data/Cesium3DTiles/Cesium 3DTiles LOD2 CBD Area/tileset.json',
    maximumScreenSpaceError: 8
}));

//Adding the LOD1 tileset
viewer.scene.primitives.add(tileset);
//Adding the LOD2 tileset
viewer.scene.primitives.add(tilesetLOD2);
viewer.scene.primitives.add(tilesetLOD2CBD);
// Set the initial camera view to look at the tileset

tilesetLOD2.readyPromise.then(function () {
    var boundingSphere = tilesetLOD2.boundingSphere;
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.3, boundingSphere.radius * 0.9));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tilesetLOD2.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}).otherwise(function (error) {
    throw (error);
});


tileset.show = false;
//STYLING
var defaultStyle = new Cesium.Cesium3DTileStyle({
    color: "color('WHITE')",
    show: true
});

var newstyle = new Cesium.Cesium3DTileStyle({
    "color": {
        "conditions": [
                    ["(${SpecificspaceCoolingdemand} >= 0)  && (${SpecificspaceCoolingdemand} < 60)", "color('#33ACFF')"],
                    ["(${SpecificspaceCoolingdemand} >= 60) && (${SpecificspaceCoolingdemand} < 120)", "color('#2AFF00')"],
                    ["(${SpecificspaceCoolingdemand} >= 120) && (${SpecificspaceCoolingdemand} < 170)", "color('#FFFF00')"],
                    ["(${SpecificspaceCoolingdemand} >= 170) && (${SpecificspaceCoolingdemand} < 230)", "color('#FFA200')"],
                    ["(${SpecificspaceCoolingdemand} >= 230)", "color('#FF0000')"]
//                    ["(${Specific_Space_Cooling} >= 0)  && (${Specific_Space_Cooling} < 50)", "color('#41f443')"],
//                    ["(${Specific_Space_Cooling} >= 50) && (${Specific_Space_Cooling} < 100)", "color('#6af441')"],
//                    ["(${Specific_Space_Cooling} >= 100) && (${Specific_Space_Cooling} < 150)", "color('#91f441')"],
//                    ["(${Specific_Space_Cooling} >= 150) && (${Specific_Space_Cooling} < 200)", "color('#bbf441')"],
//                    ["(${Specific_Space_Cooling} >= 200) && (${Specific_Space_Cooling} < 250)", "color('#ebf441')"],
//                    ["(${Specific_Space_Cooling} >= 250)  && (${Specific_Space_Cooling} < 300)", "color('#f4e241')"],
//                    ["(${Specific_Space_Cooling} >= 300) && (${Specific_Space_Cooling} < 350)", "color('#f4af41')"],
//                    ["(${Specific_Space_Cooling} >= 350) && (${Specific_Space_Cooling} < 400)", "color('#f49441')"],
//                    ["(${Specific_Space_Cooling} >= 400) && (${Specific_Space_Cooling} < 450)", "color('#f47641')"],
//                    ["(${Specific_Space_Cooling} >= 450) && (${Specific_Space_Cooling} < 500)", "color('#f45e41')"],
//                    ["(${Specific_Space_Cooling} >= 500)", "color('#f44141')"]
                ]
    }
});

//$('#CoolingThemeSwitchinput').on('change', function () {
//
//    if ($("#CoolingThemeSwitchinput").prop("checked") == true) {
//        tileset.style = newstyle;
//        tilesetLOD2.style = newstyle;
//        console.log("Heattheme Check true");
//    } else {
//        tileset.style = defaultStyle;
//        tilesetLOD2.style = defaultStyle;
//        console.log("Heattheme Check false");
//    }
//});
$(".rotate").click(function(){
 $(this).toggleClass("down")  ; 
});

function CoolingTheme (){
    tileset.style = newstyle;
    tilesetLOD2.style = newstyle;
    tilesetLOD2CBD.style = newstyle;
    document.getElementById("legend").style.display = "block";
};
function NormalTheme (){
        tileset.style = defaultStyle;
        tilesetLOD2.style = defaultStyle;
    tilesetLOD2CBD.style = defaultStyle;
        document.getElementById("legend").style.display = "none";
};

tileset.style = newstyle;
tilesetLOD2.style = newstyle;


tileset.style = newstyle;
tilesetLOD2.style = newstyle;




//Turn Visualisation of LOD1 on and off
$('#LODSwitchinput').on('change', function () {

    if ($("#LODSwitchinput").prop("checked") == true) {
        // addLayers3DT();
        tileset.show = false;
        tilesetLOD2.show = true;
        console.log("3D-Tile: Check true");
    } else {
        tileset.show = true;
        tilesetLOD2.show = false;
        console.log("3D-Tile: Check false");
    }
});





//Style the overlay
var nameOverlay = document.createElement('div');
viewer.container.appendChild(nameOverlay);
nameOverlay.className = 'backdrop';
nameOverlay.style.display = 'none';
nameOverlay.style.position = 'absolute';
nameOverlay.style.bottom = '0';
nameOverlay.style.left = '0';
nameOverlay.style['pointer-events'] = 'none';
nameOverlay.style.padding = '4px';
nameOverlay.style.backgroundColor = 'black';
nameOverlay.style.fontFamily = 'Fira Sans, sans-serif';

//Selecting a Building
var Pickers_3DTile_Activated = true;
// Information about the currently highlighted feature
function active3DTilePicker() {
    var highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };
    // Information about the currently selected feature
    var selected = {
        feature: undefined,
        originalColor: new Cesium.Color()
    };

    // An entity object which will hold info about the currently selected feature for infobox display
    var selectedEntity = new Cesium.Entity();

    // Get default left click handler for when a feature is not picked on left click
    var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    // Color a feature yellow on hover.
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
        if (Pickers_3DTile_Activated) {
            // If a feature was previously highlighted, undo the highlight
            if (Cesium.defined(highlighted.feature)) {
                highlighted.feature.color = highlighted.originalColor;
                highlighted.feature = undefined;
            }
            // Pick a new feature
            var picked3DtileFeature = viewer.scene.pick(movement.endPosition);
            if (!Cesium.defined(picked3DtileFeature)) {
                nameOverlay.style.display = 'none';
                return;
            }
            // A feature was picked, so show it's overlay content
            nameOverlay.style.display = 'block';
            nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
            nameOverlay.style.left = movement.endPosition.x + 'px';
            var name = picked3DtileFeature.getProperty('gml_id');

            if (!Cesium.defined(name)) {
                name = picked3DtileFeature.getProperty('gml_id');
            }
            nameOverlay.textContent = name;
            // Highlight the feature if it's not already selected.
            if (picked3DtileFeature !== selected.feature) {
                highlighted.feature = picked3DtileFeature;
                Cesium.Color.clone(picked3DtileFeature.color, highlighted.originalColor);
                picked3DtileFeature.color = Cesium.Color.YELLOW;
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Color a feature on selection and show metadata in the InfoBox.
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {

        if (Pickers_3DTile_Activated) {
            // If a feature was previously selected, undo the highlight
            if (Cesium.defined(selected.feature)) {
                selected.feature.color = selected.originalColor;
                selected.feature = undefined;
                $("#chart").html("");
                $("#AddInfos").html("");
                var options = null;
            }
            // Pick a new feature
            var picked3DtileFeature = viewer.scene.pick(movement.position);
            if (!Cesium.defined(picked3DtileFeature)) {
                clickHandler(movement);
                return;
            }
            // Select the feature if it's not already selected
            if (selected.feature === picked3DtileFeature) {
                return;
            }
            selected.feature = picked3DtileFeature;
            // Save the selected feature's original color
            if (picked3DtileFeature === highlighted.feature) {
                Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
                highlighted.feature = undefined;
            } else {
                Cesium.Color.clone(picked3DtileFeature.color, selected.originalColor);
            }
            // Highlight newly selected feature
            picked3DtileFeature.color = Cesium.Color.AQUA;
            // Set feature infobox description
            var featureName = picked3DtileFeature.getProperty('gml_name');
            selectedEntity.name = "Building:" + featureName;
            selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
            viewer.selectedEntity = selectedEntity;
            selectedEntity.description =
                '<table class="cesium-infoBox-defaultTable"><tbody>' +
                '<tr><th>gml-ID</th><td>' + picked3DtileFeature.getProperty('gml_id') + '</td></tr>' +
                '<tr><th>Year of construction</th><td>' + picked3DtileFeature.getProperty('citygml_year_of_construction') + '</td></tr>' +
                '<tr><th>gml-Parent-ID</th><td>' + picked3DtileFeature.getProperty('gml_parent_id') + '</td></tr>' +
                '<tr><th>gml-name</th><td>' + picked3DtileFeature.getProperty('gml_name') + '</td></tr>' +
                '<tr><th>Yearly Cooling Energy Demand</th><td>' + picked3DtileFeature.getProperty('Yearly Cooling demand _kWh/yr_') + '</td></tr>' +
                '<tr><th>Specific Space Cooling Demand</th><td>' + picked3DtileFeature.getProperty('SpecificspaceCoolingdemand') + '</td></tr>' +
                '</tbody></table>';

            console.log(picked3DtileFeature.getProperty('SpecificspaceCoolingdemand'));

            //Fill Table
            options = {
                chart: {
                    foreColor: '#fff',
                    //                    background: '#fff',
                    fontFamily: 'Fira Sans, sans-serif',
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 350
                        }
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    y: {
                        formatter: function (value) {
                            return value + " kW/h"
                        }
                    }
                },
                stroke: {
                    curve: 'straight'
                },
                series: [{
                    name: 'Cooling Energy Demand',
                    data: [picked3DtileFeature.getProperty('January Cooling Demand _kWh_'), picked3DtileFeature.getProperty('February Cooling Demand _kWh_'), picked3DtileFeature.getProperty('March Cooling Demand _kWh_'), picked3DtileFeature.getProperty('April Cooling Demand _kWh_'), picked3DtileFeature.getProperty('May Cooling Demand _kWh_'), picked3DtileFeature.getProperty('June Cooling Demand _kWh_'), picked3DtileFeature.getProperty('July Cooling Demand _kWh_'), picked3DtileFeature.getProperty('August Cooling Demand _kWh_'), picked3DtileFeature.getProperty('September Cooling Demand _kWh_'), picked3DtileFeature.getProperty('October Cooling Demand _kWh_'), picked3DtileFeature.getProperty('November Cooling Demand _kWh_'), picked3DtileFeature.getProperty('December Cooling Demand _kWh_')]
            }],
                title: {
                    text: 'Monthly Cooling Energy Demand',
                    align: 'center'
                },
                xaxis: {
                    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                },
                yaxis: {
                    title: {
                        text: "Energy Demand in kW/h"
                    }
                }
            }
            var chart = new ApexCharts(document.querySelector("#chart"), options);

            //render table
            chart.render();
            $("#AddInfos").html('<table class="table table-bordered"> <tbody> <tr> <th scope="row">ALKIS code</th> <td>'
                                + picked3DtileFeature.getProperty('ALKIS code')+'</td> </tr> <tr> <th scope="row">PrimaryUsageZoneType</th> <td>'
                                + picked3DtileFeature.getProperty('PrimaryUsageZoneType')+'</td> </tr> <tr> <th scope="row">PrimaryUsageZoneArea</th> <td>'
                                + picked3DtileFeature.getProperty('PrimaryUsageZoneArea')+'</td> </tr> <tr> <th scope="row">BuildingType</th> <td>'
                                + picked3DtileFeature.getProperty('BuildingType')+'</td> </tr> <tr> <th scope="row">Footprint area [m2]</th> <td>'
                                + picked3DtileFeature.getProperty('Footprint area _m2_')+'</td> </tr> <tr> <th scope="row">Total wall thermal area above ground [m2]</th> <td>'
                                + picked3DtileFeature.getProperty('Total wall thermal area above ground _m2_')+'</td> </tr> <tr> <th scope="row">Total outwall area [m2]</th> <td>'
                                + picked3DtileFeature.getProperty('Total outwall area _m2_')+'</td> </tr> <tr> <th scope="row">Total sharedwall area [m2]</th> <td>'
                                + picked3DtileFeature.getProperty('Total sharedwall area _m2_')+'</td> </tr> <tr> <th scope="row">Total roof area [m2]</th> <td>'
                                + picked3DtileFeature.getProperty('Total roof area _m2_')+'</td> </tr> <tr> <th scope="row">Gross volume [m3]</th> <td>'
                                + picked3DtileFeature.getProperty('Gross volume _m3_')+'</td> </tr> <tr> <th scope="row">Is Gross volume approximated?</th> <td>'
                                + picked3DtileFeature.getProperty('Is Gross volume approximated?')+'</td> </tr> <tr> <th scope="row">Ridge/mean Height [m]</th> <td>'
                                + picked3DtileFeature.getProperty('Ridge/mean Height _m_')+'</td> </tr> <tr> <th scope="row">Eaves/mean Height [m]</th> <td>'
                                + picked3DtileFeature.getProperty('Eaves/mean Height _m_')+'</td> </tr> <tr> <th scope="row">Storey number</th> <td>'
                                + picked3DtileFeature.getProperty('Storey number')+'</td> </tr> <tr> <th scope="row">Average Storey Height</th> <td>'
                                + picked3DtileFeature.getProperty('Average Storey Height')+'</td> </tr> <tr> <th scope="row">Attic Heating</th> <td>'
                                + picked3DtileFeature.getProperty('Attic Heating')+'</td> </tr> <tr> <th scope="row">Basement Heating</th> <td>'
                                + picked3DtileFeature.getProperty('Basement Heating')+'</td> </tr> <tr> <th scope="row">SA2V ratio [m-1]</th> <td>'
                                + picked3DtileFeature.getProperty('SA2V ratio _m-1_')+'</td> </tr> <tr> <th scope="row">Heated area [m2]</th> <td>'
                                + picked3DtileFeature.getProperty('Heated area _m2_')+'</td> </tr> <tr> <th scope="row">Mean Uvalue [W/m2.K]</th> <td>'
                                + picked3DtileFeature.getProperty('Mean Uvalue _W/m2.K_')+'</td> </tr> <tr> <th scope="row">Specific domestic hot water demand [kWh/m2.yr]</th> <td>'
                                + picked3DtileFeature.getProperty('Specific domestic hot water demand _kWh/m2.yr_')+'</td> </tr></table>');
            
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

active3DTilePicker();


var zoomToTileset = function () {
    console.log('function triggered');
    var boundingSphere = tilesetLOD2.boundingSphere;
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.3, boundingSphere.radius * 0.9));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}
