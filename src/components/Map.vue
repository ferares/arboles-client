<template>
  <l-map
    class="map"
    :zoom="zoom"
    :center="center"
    :options="options"
    @click="setMarker($event)"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker
      v-for="tree in trees"
      :key="tree.id"
      :latLng="[tree.lat, tree.lng]"
    >
      <l-icon
        :iconUrl="'/img/markers/' + (tree.icono ? tree.icono : 'marker.png')"
      >
      </l-icon>
    </l-marker>
  </l-map>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data: function() {
    return {
      marker: undefined,
      circle: undefined,
      zoom: 12,
      center: [-34.618, -58.44],
      options: {
        maxZoom: 21,
        minZoom: 5
      },
      url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`
    };
  },
  computed: {
    trees() {
      return this.$store.getters.getTrees;
    }
  },
  methods: {
    // Set a marker on the map
    setMarker: function(event) {
      const map = event.target;
      this.$store.commit("SET_MAP_MARKER", event);

      // Re-center the map around the marker
      map.panTo(new L.LatLng(event.latlng.lat, event.latlng.lng));
    }
  }
};
</script>
