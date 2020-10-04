<template>
  <l-map
    :zoom="zoom"
    :center="center"
    :options="options"
    @click="setMarker($event)"
  >
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer
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
  methods: {
    // Set a marker on the map
    setMarker: function(event) {
      const map = event.target;
      // If there's no marker on the map...
      if (!this.marker) {
        L.Icon.Default.imagePath = "/img/";
        // Create a new marker
        this.marker = new L.marker([event.latlng.lat, event.latlng.lng], {
          draggable: true,
          title: "",
          alt: "",
          riseOnHover: true
        }).addTo(map);

        // Create a circle around it to show the search radius
        this.circle = new L.circle(
          [event.latlng.lat, event.latlng.lng],
          parseInt(process.env.VUE_APP_SEARCH_RADIUS),
          {
            color: "#000",
            fillColor: "#ddd",
            fillOpacity: 0.3
          }
        ).addTo(map);

        // When the marker is dragged move the circle to it
        this.marker.on("dragend", event => {
          const latlng = event.target.getLatLng();
          this.circle.setLatLng(latlng);
          map.panTo(new L.LatLng(latlng.lat, latlng.lng));
        });
      } else {
        // If a marker already exists, move it and its circle
        this.marker.setLatLng([event.latlng.lat, event.latlng.lng]);
        this.circle.setLatLng([event.latlng.lat, event.latlng.lng]);
      }

      // Re-center the map around the marker
      map.panTo(new L.LatLng(event.latlng.lat, event.latlng.lng));
    }
  }
};
</script>
