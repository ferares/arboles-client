<template>
  <l-map
    class="map"
    :zoom="zoom"
    :center="center"
    :options="options"
    @click="setMarker($event)"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <v-marker-cluster v-if="trees.length" :options="clusterOptions">
      <l-marker
        v-for="tree in trees"
        :key="tree.id"
        :latLng="[tree.lat, tree.lng]"
        @click="displayTree(tree.id)"
      >
        <l-icon
          :iconUrl="'/img/markers/' + (tree.icono ? tree.icono : 'marker.png')"
          :iconSize="[30, 34]"
          :iconAnchor="[15, 31]"
        >
        </l-icon>
      </l-marker>
    </v-marker-cluster>
  </l-map>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    "v-marker-cluster": Vue2LeafletMarkerCluster
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
      url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
      clusterOptions: {
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
        spiderfyDistanceMultiplier: 2,
        maxClusterRadius: 100, // px
        disableClusteringAtZoom: process.env.VUE_APP_MAP_DISABLE_CLUSTERING_AT,
        polygonOptions: {
          fillColor: process.env.VUE_APP_HIGHLIGHT_COLOR,
          color: process.env.VUE_APP_HIGHLIGHT_COLOR,
          weight: 1,
          opacity: 1,
          fillOpacity: 0.1
        }
      }
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
    },
    displayTree: function(id) {
      this.$store.dispatch("fetchTree", id);
    }
  }
};
</script>
