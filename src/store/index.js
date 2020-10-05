import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import L from "leaflet";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    species: [],
    map: {
      marker: undefined,
      circle: undefined,
      trees: []
    },
    form: {
      marker: null,
      species: "",
      flavors: false,
      origin: "",
      regions: []
    }
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },
    SET_SPECIES(state, species) {
      state.species = species;
    },
    SET_FORM_SPECIES(state, species) {
      state.form.species = species;
    },
    SET_FORM_FLAVORS(state, flavors) {
      state.form.flavors = flavors;
    },
    SET_FORM_ORIGIN(state, origin) {
      state.form.origin = origin;
    },
    SET_FORM_REGIONS(state, regions) {
      state.form.regions = regions;
    },
    UNSET_MAP_MARKER(state) {
      state.map.marker.remove();
      state.map.circle.remove();
      delete state.map.marker;
      delete state.map.circle;
      state.form.marker = null;
    },
    SET_MAP_MARKER(state, event) {
      const map = event.target;
      // If there's no marker on the map...
      if (!state.map.marker) {
        L.Icon.Default.imagePath = "/img/markers/";
        // Create a new marker
        state.map.marker = new L.marker([event.latlng.lat, event.latlng.lng], {
          draggable: true,
          title: "",
          alt: "",
          riseOnHover: true
        }).addTo(map);

        // Create a circle around it to show the search radius
        state.map.circle = new L.circle(
          [event.latlng.lat, event.latlng.lng],
          parseInt(process.env.VUE_APP_SEARCH_RADIUS),
          {
            color: "#000",
            fillColor: "#ddd",
            fillOpacity: 0.3
          }
        ).addTo(map);

        // When the marker is dragged move the circle to it
        state.map.marker.on("dragend", event => {
          const latlng = event.target.getLatLng();
          state.map.circle.setLatLng(latlng);
          map.panTo(new L.LatLng(latlng.lat, latlng.lng));
        });
      } else {
        // If a marker already exists, move it and its circle
        state.map.marker.setLatLng([event.latlng.lat, event.latlng.lng]);
        state.map.circle.setLatLng([event.latlng.lat, event.latlng.lng]);
      }

      // Set the selected coordinates
      state.form.marker = `${event.latlng.lat} ${event.latlng.lng}`;
    },
    SET_MAP_TREES(state, trees) {
      state.map.trees = trees;
    }
  },
  getters: {
    getSpecies(state) {
      return state.species;
    },
    getFormFlavors(state) {
      return state.form.flavors;
    },
    getFormSpecies(state) {
      return state.form.species ? state.form.species.id : "";
    },
    getFormOrigin(state) {
      return state.form.origin;
    },
    getFormRegions(state) {
      return state.form.regions;
    },
    getFormMarker(state) {
      return state.form.marker;
    },
    getTrees(state) {
      return state.map.trees;
    }
  },
  actions: {
    fetchSpecies(context) {
      context.commit("SET_LOADING_STATUS", true);
      axios.get(`${process.env.VUE_APP_API_URL}especies`).then(response => {
        context.commit("SET_LOADING_STATUS", false);
        context.commit("SET_SPECIES", response.data);
      });
    },
    fetchTrees(context) {
      context.commit("SET_LOADING_STATUS", true);
      axios.get(`${process.env.VUE_APP_API_URL}arboles`).then(response => {
        context.commit("SET_LOADING_STATUS", false);
        context.commit("SET_MAP_TREES", response.data);
      });
    }
  },
  modules: {}
});
