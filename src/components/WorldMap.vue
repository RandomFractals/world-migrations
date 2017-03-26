<template>
  <md-card class="card map-card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="card-title md-title">{{ title }}</div>
        <div class="card-subtitle md-subhead">{{ subtitle }}</div>      
      </md-card-header>
      <md-card-content>
        <div id="map-container" class="map-container">
        </div>
      </md-card-content>
    </md-card-area>
  </md-card>
</template>

<script>

/**
 * Stock D3 world map vue.js comp. setup loosely based on:
 * 
 * http://techslides.com/demos/d3/worldmap-template-d3v4.html
 */

// import d3 and topojson libs
const d3 = require('d3');
const topojson = require('topojson')
//const graticule = d3.geo.graticule();
const graticule = d3.geoGraticule();

// map zoom setup
const mapZoom = d3.zoom()
  // .extent([1, 9])
  .scaleExtent([1, 9])
  .on('zoom', move)

// map tooltip
const mapToolTip = d3.select('#map-container').append('div').attr('class', 'tooltip hidden');

// map container vars
var mapContainer, mapWidth, mapHeight;

// map svg vars
var mapSvg, mapProjection, geoPath, topology, g;

// WorldMap.vue comp JS setup
export default {
  name: 'worldMap',
  data () {
    return {
      title: '[map title]',
      subtitle: '[subtitle]'
    }
  },
  created: function() {
    console.log('WorldMap.created()');
  },  
  mounted: function() {
    // init map container
    mapContainer = document.getElementById('map-container');
    mapWidth = mapContainer.offsetWidth;
    mapHeight = mapWidth/2;   
    console.log(`WorldMap.mounted(): mapWidth=${mapWidth} mapHeight=${mapHeight}`);

    // create initial map view
    createMapSvg(mapWidth, mapHeight);

    // add window resize handler
    d3.select(window).on('resize', onWindowResize);

    // load world map topo JSON
    loadTopology('data/world-topo-min.json');
  }

} // end of WorldMap.vue js setup

/*--------------------- D3 World Map JS Functions ----------------------------------*/

/**
 * Creates d3 maps svg for the specified map view width and height.
 * 
 * @param width Map view width.
 * @param height Map view height.
 */
function createMapSvg(width, height) {
  // cue in projection :)
  // mapProjection = d3.geo.mercator()
  mapProjection = d3.geoMercator()
    .translate([(width/2), (height/2)])
    .scale(width/2/Math.PI);

  //geoPath = d3.geo.path().projection(projection);
  geoPath = d3.geoPath().projection(mapProjection);

  // create map svg
  mapSvg = d3.select("#map-container").append("svg")
    .attr('id', 'map-svg')
    .attr('width', width)
    .attr('height', height)
    //.call(mapZoom)
    .on('click', onMapClick)
    .append('g');

  // add map svg group for region clicks
  g = mapSvg.append('g').on('click', onMapClick);
}


/**
 * Map click coordinates translation event handler.
 */
function onMapClick() {
  var latLon = mapProjection.invert(d3.mouse(this));
  console.log('WorldMap.onMapClick():coordinates:', latLon);
}

function move() {
  console.log('move');
}


/**
 * Map view resize throttle timer and redraw.
 */
var mapViewThrottleTimer;
function onWindowResize() {
  console.log('WorldMap.onWindowResize()...');
  window.clearTimeout(mapViewThrottleTimer);
    mapViewThrottleTimer = window.setTimeout(function() {
      redrawMapSvg();
    }, 200);
}


/**
 * Redraws world map svg on app window resize.
 */
function redrawMapSvg() {
  // get new map view width and height
  mapWidth = mapContainer.offsetWidth;
  mapHeight = mapWidth/2;
  console.log(`WorldMap.redraw(): mapWidth=${mapWidth} mapHeight=${mapHeight}`);

  // create new svg map
  d3.select('#map-svg').remove();
  createMapSvg(mapWidth, mapHeight);

  // redraw world map topology
  draw(topology);
}


/**
 * Loads svg map topo JSON data and adds it to map display view.
 * 
 * @param topoJsonPath Map topo JSON data path.
 **/
function loadTopology(topoJsonPath) {
  d3.json(topoJsonPath, function(error, world) {
    // get countries topology
    var countries = topojson.feature(world, world.objects.countries).features;
    topology = countries;
    console.log('WorldMap.loadTopology(): regions count:', countries.length);

    // draw world map topology
    draw(topology);
  });
}


/**
 * Draws svg map topology datum.
 *
 * @param topology SVG map topoJSON topology.
 */
function draw(topology) {

  // draw globe graticules
  mapSvg.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', geoPath);

  // draw equator path
  g.append('path')
   .datum({type: 'LineString', coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
   .attr('class', 'equator')
   .attr('d', geoPath);

  // get all country regions
  var country = g.selectAll('.country').data(topology);

  // draw country regions
  country.enter().insert('path')
    .attr('class', 'country')
    .attr('d', geoPath)
    .attr('id', function(d,i) { return d.id; })
    .attr('title', function(d,i) { return d.properties.name; })
    .style('fill', function(d, i) { return d.properties.color; })
    .on('mouseOver', onRegionMouseOver)
    .on('mouseOut', onRegionMouseOut);
  
  console.log('WorldMap.draw(topology): done!');
}


/**
 * Map region mouse over event handler.
 */
function onRegionMouseOver(){
  var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
  mapToolTip.classed('hidden', false)
    .attr('style', `left: ${(mouse[0]+offsetL)}px; top: ${(mouse[1]+offsetT)}px`)
    .html(this.__data__.properties.name);
}


/**
 * Map region mouse out event handler.
 */
function onRegionMouseOut(){
  mapToolTip.classed('hidden', true);
}

</script>

<style scoped>

/* Map styles */
.map-container {
  border: 1px solid #999;
  margin: 0px;
  height: 100%;
  width: 100%;
  overflow: hidden;  
}

.graticule {
  fill: none;
  stroke: #bbb;
  stroke-width: .5px;
  stroke-opacity: .5;
}

.equator {
  stroke: #ccc;
  stroke-width: 1px;
}

.country:hover{
  stroke: #fff;
  stroke-width: 1.5px;
}

.hidden { 
  display: none; 
}
</style>
