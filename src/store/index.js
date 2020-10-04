import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    species: []
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },
    SET_SPECIES(state, species) {
      state.species = species;
    }
  },
  actions: {
    fetchSpecies(context) {
      context.commit("SET_LOADING_STATUS", true);
      axios.get(`${process.env.VUE_APP_API_URL}/especies`).then(response => {
        context.commit("SET_LOADING_STATUS", false);
        context.commit("SET_SPECIES", response.data);
      });
    }
  },
  getters: {
    getSpecies(state) {
      return state.species;
    }
  },
  modules: {}
});
