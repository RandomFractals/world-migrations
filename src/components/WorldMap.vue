<template>
  <md-card class="card map-card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="card-title md-title">
          {{selectedCountryName}} {{ mapTitle }}
        </div>
        <div class="card-subtitle md-subhead">
          {{ mapSubtitle }}
          <select id="country-list" v-model="selectedCountryIndex">
            <option selected value="-1">All Countries</option>
            <option v-for="country in countries" 
              v-bind:value="country.id">{{ country.properties.name }}</option>
          </select>
        </div>      
      </md-card-header>
      <md-card-content>
        <div id="map-container" class="map-container"></div>
        <div id="map-tool-tip" class="map-tool-tip hidden"></div>        
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
const topojson = require('topojson');

//const graticule = d3.geo.graticule();
const graticule = d3.geoGraticule();

// map zoom setup
const mapZoom = d3.zoom()
  // .extent([1, 9])
  .scaleExtent([1, 9])
  .on('zoom', onMapZoom);

// map container vars
let mapContainer, mapWidth, mapHeight;

// map svg vars
let mapVue, mapSvg, 
  topologySvgGroup, mapProjection, 
  geoPath, topology, selectedRegion;

// map tooltip vars
let mapToolTip, mapToolTipLeftOffset, mapToolTipTopOffset;

// WorldMap.vue comp JS setup
export default {
  name: 'worldMap',
  data () {
    return {
      mapTitle: 'Migrants',
      mapSubtitle: 'country:',
      topology: topology,
      selectedCountryIndex: -1
    }
  },
  created: function() {
    console.log('WorldMap.created()');
  },  
  mounted: function() {
    // init map view
    mapVue = this;
    mapContainer = document.getElementById('map-container');
    mapWidth = mapContainer.offsetWidth;
    mapHeight = mapWidth/2;   
    console.log(`WorldMap.mounted(): mapWidth=${mapWidth} mapHeight=${mapHeight}`);

    // init map tooltip
    mapToolTip = d3.select('#map-tool-tip');
    mapToolTipLeftOffset = mapContainer.offsetLeft + 20;
    mapToolTipTopOffset = mapContainer.offsetTop + 10;
    
    // create initial map view
    createMapSvg(mapWidth, mapHeight);

    // add window resize handler
    d3.select(window).on('resize', onWindowResize);

    // load world map topo JSON
    loadTopology('data/world-topo-min.json');
  },
  computed: {
    countries: function() {
      return this.topology;
    },
    selectedCountryName: function() {
      let countryName = 'World';
      if ( this.selectedCountryIndex >= 0) {
        countryName = this.topology[this.selectedCountryIndex].properties.name;
        // FIXME: should be handled elsewhere!!!
        if (selectedRegion) {
          selectedRegion.classed('selected-country', false);
        }
        selectedRegion = d3.select(`#country-${this.selectedCountryIndex}`)
          .classed('selected-country', true);        
      }
      console.log('WorldMap.selectedCountryName:', countryName);
      return countryName;
    }
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
  // mapProjection = d3.geo.mercator() // d3 v4
  mapProjection = d3.geoMercator()
    .translate([(width/2), (height/2)])
    .scale(width/2/Math.PI);

  //geoPath = d3.geo.path().projection(mapProjection); // d3 v4
  geoPath = d3.geoPath().projection(mapProjection);

  // create map svg
  mapSvg = d3.select("#map-container").append("svg")
    .attr('id', 'map-svg')
    .attr('width', width)
    .attr('height', height);
    //.call(mapZoom);
    //.on('click', onMapClick);
    //.append('g');

  // add map svg group for region clicks
  topologySvgGroup = mapSvg.append('g')
    .attr('id', 'topology');
    //.on('click', onMapClick);
}


/**
 * Map click coordinates translation event handler.
 */
function onMapClick() {
  console.log('map click');
  let latLon = mapProjection.invert(d3.mouse(this));
  console.log('WorldMap.onMapClick():coordinates:', latLon);
}


/**
 * Map view resize throttle timer and redraw.
 */
let mapViewThrottleTimer;
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
  drawToplogy(topology);
}


/**
 * Loads svg map topo JSON data and adds it to map display view.
 * 
 * @param topoJsonPath Map topo JSON data path.
 **/
function loadTopology(topoJsonPath) {
  d3.json(topoJsonPath, function(error, world) {
    // get countries topology
    topology = topojson.feature(world, world.objects.countries).features;
    mapVue.topology = topology;    
    console.log('WorldMap.loadTopology(): regions count:', topology.length);
    //console.log(mapVue);
    drawTopology(topology);
  });
}


/**
 * Draws svg map topology datum.
 *
 * @param topology SVG map topoJSON topology.
 */
function drawTopology(topology) {

  // draw globe graticules
  topologySvgGroup.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('d', geoPath);

  // draw equator path
  topologySvgGroup.append('path')
   .datum({type: 'LineString', coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
   .attr('class', 'equator')
   .attr('d', geoPath);

  // get all country regions
  let countries = topologySvgGroup.selectAll('.country').data(topology);

  // draw country regions paths
  countries.enter().append('path')
    .attr('class', 'country')
    .attr('d', geoPath)
    .attr('id', function(d,i) {return `country-${d.id}`;})
    .attr('title', function(d,i) {return d.properties.name;})
    //.style('fill', function(d, i) {return d.properties.color;})
    .on('mouseover', onRegionMouseOver)
    .on('mouseout', onRegionMouseOut)
    .on('click', onRegionClick);

  // add some capitals for good map UX reference from csv (updated it as needed)
  d3.csv('data/country-capitals.csv', function(err, capitals) {
    capitals.forEach( function(i) {
      addPoint(i.CapitalLongitude, i.CapitalLatitude, i.CapitalName);
    });
  });    
  
  console.log('WorldMap.drawTopology(topology): done!');

} // end of drawTopology()


/**
 * Map region mouse over event handler.
 */
function onRegionMouseOver(){
  let d3Mouse = d3.mouse(mapSvg.node()).map( function(d) {return parseInt(d);} );
  mapToolTip.classed('hidden', false)
    .attr('style', `left: ${(d3Mouse[0] + mapToolTipLeftOffset)}px; top: ${(d3Mouse[1] + mapToolTipTopOffset)}px`)
    .html(this.__data__.properties.name);
}


/**
 * Map region mouse out event handler.
 */
function onRegionMouseOut(){
  mapToolTip.classed('hidden', true);
}


/**
 * Map region click event handler.
 */
function onRegionClick(d, i) {
  mapVue.selectedCountryIndex = d.id;
  console.log('WorldMap.onRegionClick(): region:', d.properties.name);
}


/**
 * D3 svg zoom event handler.
 */
function onMapZoom() {
  //var t = d3.event.translate;
  let t = [d3.event.transform.x, d3.event.transform.y];
  //var s = d3.event.scale; 
  let s = d3.event.transform.k;
  let h = mapHeight/4;

  t[0] = Math.min( 
    (mapWidth/mapHeight)*(s-1), 
    Math.max(mapWidth*(1-s), t[0]) 
  );

  t[1] = Math.min(
    h*(s-1) + h*s,
    Math.max(mapHeight*(1-s) - h*s, t[1])
  );

  //zoom.translateBy(t);
  topologySvgGroup.attr('transform', `translate(${t})scale(${s})`);

  //adjust country path hover stroke width based on zoom level
  d3.selectAll('.country').style('stroke-width', 1.5/s);
}


/**
 * Adds a city point to the map.
 */
function addPoint(lon, lat, text) {

  let pointGroup = topologySvgGroup.append('g').attr('class', 'city');
  let x = mapProjection([lon, lat])[0];
  let y = mapProjection([lon, lat])[1];

  pointGroup.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('class', 'city')
    .attr('r', 1.5);

  if ( text.length > 0) {
    pointGroup.append('text')
      .attr('x', x+2)
      .attr('y', y+2)
      .attr('class', 'city-text')
      .text(text);
  }
}

</script>

<style>

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
  stroke: #ccc;
  stroke-width: .5px;
  stroke-opacity: .2;
}

.equator {
  stroke: #bbb;
  stroke-width: .5px;
  stroke-opacity: .4;
}

.country {
  fill: #eee;
  stroke: #999;
  stroke-width: .5px;
}

.country:hover{
  stroke: #666;
  stroke-width: 1px;
}

.selected-country {
  fill: #aaa;
  stroke: #333;
}

.city-text {
  font-size: 10px;
  text-transform: capitalize;
}

.map-tool-tip {
  color: #222; 
  background: #f6f6f6; 
  font-size: .8em;
  padding: 3px; 
  text-shadow: #f5f5f5 0 1px 0;
  border-radius: 2px; 
  box-shadow: 0px 0px 2px 0px #a6a6a6; 
  opacity: 0.9; 
  position: absolute;
}

.hidden { 
  display: none; 
}
</style>
