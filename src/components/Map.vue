<template>
  <l-map :zoom="zoom" :center="center" :options="options">
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
// import L from "leaflet";
// import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer
    // LMarker
  },
  data: function() {
    return {
      zoom: 12,
      center: [-34.618, -58.44],
      options: {
        maxZoom: 21,
        minZoom: 5
      },
      url:
        "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
    };
  }
};
</script>
