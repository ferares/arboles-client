<template>
  <form @submit="submit($event)">
    <input type="hidden" name="user_latlng" />
    <input type="hidden" name="radio" value="1000" />
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <h2>
            ¿Dónde?
          </h2>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="marker-all"
              name="marker"
              class="custom-control-input"
              value="0"
              v-model="marker"
            />
            <label class="custom-control-label" for="marker-all">
              En todo el mapa
            </label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="marker-point"
              name="marker"
              class="custom-control-input"
              value="1"
              v-model="marker"
            />
            <label class="custom-control-label" for="marker-point">
              Marcar en el mapa
            </label>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="form-group">
          <h2>
            ¿Qué especie?
            <a href="#">
              <Icon :icon="['far', 'trash-alt']" />
            </a>
          </h2>
          <multiselect
            track-by="id"
            :options="speciesOptions"
            v-model="species"
            placeholder="Todas"
            :custom-label="speciesLabel"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
          >
            <slot slot="singleLabel" slot-scope="props">
              {{ props.option.nombre_cientifico }}
              <small class="muted-text">
                {{ props.option.nombre_comun }}
              </small>
            </slot>
            <slot slot="option" slot-scope="props">
              {{ props.option.nombre_cientifico }}
              <small class="muted-text">
                {{ props.option.nombre_comun }}
              </small>
            </slot>
            <slot slot="noResult" slot-scope="props">
              No hay resultados para
              <i>"{{ props.search }}"</i>
            </slot>
          </multiselect>
        </div>
      </div>

      <b-collapse class="col-12" id="filters">
        <div class="form-group">
          <h2>
            Sabores
          </h2>
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="input-flavors"
              name="flavors"
              v-model="flavors"
            />
            <label class="custom-control-label" for="input-flavors">
              Frutales y medicinales
            </label>
          </div>
        </div>

        <div class="form-group">
          <h2>
            Origen
          </h2>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="rorigen-nativas"
              name="user_origen"
              class="custom-control-input"
              value="Nativo/Autóctono"
              v-model="origin"
            />
            <label class="custom-control-label" for="rorigen-nativas">
              Nativas
            </label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="rorigen-exoticas"
              name="user_origen"
              class="custom-control-input"
              value="Exótico"
              v-model="origin"
            />
            <label class="custom-control-label" for="rorigen-exoticas">
              Exóticas
            </label>
          </div>
          <a href="#" id="borrar_origen">
            <Icon :icon="['far', 'trash-alt']" />
          </a>
        </div>

        <div class="form-group">
          <div class="regiones">
            <h2>
              Región de origen
            </h2>
            <div class="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="borigen_pampeana"
                name="borigen_pampeana"
                value="borigen_pampeana"
                v-model="regions"
              />
              <label class="custom-control-label" for="borigen_pampeana">
                Pampeana
              </label>
            </div>
            <div class="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="borigen_nea"
                name="borigen_nea"
                value="borigen_nea"
                v-model="regions"
              />
              <label class="custom-control-label" for="borigen_nea">
                NEA
              </label>
            </div>
            <div class="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="borigen_noa"
                name="borigen_noa"
                value="borigen_noa"
                v-model="regions"
              />
              <label class="custom-control-label" for="borigen_noa">
                NOA
              </label>
            </div>
            <div class="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="borigen_cuyana"
                name="borigen_cuyana"
                value="borigen_cuyana"
                v-model="regions"
              />
              <label class="custom-control-label" for="borigen_cuyana">
                Cuyana
              </label>
            </div>
            <div class="custom-control custom-switch custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="borigen_patagonica"
                name="borigen_patagonica"
                value="borigen_patagonica"
                v-model="regions"
              />
              <label class="custom-control-label" for="borigen_patagonica">
                Patagónica
              </label>
            </div>
          </div>
        </div>
      </b-collapse>
      <div class="col-12">
        <button v-b-toggle.filters type="button" class="btn btn-secondary">
          Ocultar filtros
        </button>
      </div>
    </div>
    <input
      name="Buscar"
      type="submit"
      value="Buscar"
      class="btn btn-primary btn-lg btn-block mt-4"
    />
  </form>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "Form",
  components: {
    Multiselect
  },
  computed: {
    speciesOptions() {
      return this.$store.getters.getSpecies;
    },
    flavors: {
      get() {
        return this.$store.getters.getFormFlavors;
      },
      set(value) {
        this.$store.commit("SET_FORM_FLAVORS", value);
      }
    },
    species: {
      get() {
        const id = this.$store.getters.getFormSpecies;
        if (id) {
          return this.speciesOptions.find(s => s.id === id);
        }

        return "";
      },
      set(value) {
        this.$store.commit("SET_FORM_SPECIES", value);
      }
    },
    origin: {
      get() {
        return this.$store.getters.getFormOrigin;
      },
      set(value) {
        this.$store.commit("SET_FORM_ORIGIN", value);
      }
    },
    regions: {
      get() {
        return this.$store.getters.getFormRegions;
      },
      set(value) {
        this.$store.commit("SET_FORM_REGIONS", value);
      }
    },
    marker: {
      get() {
        if (this.$store.getters.getFormMarker) {
          return "1";
        }

        return "0";
      },
      set(value) {
        if (value === "0") {
          this.$store.commit("UNSET_MAP_MARKER");
        }
      }
    }
  },
  methods: {
    // For letting vue-multiselect search use the species common and scientific name
    speciesLabel: function({ nombre_comun, nombre_cientifico }) {
      return `${nombre_comun} ${nombre_cientifico}`;
    },
    submit: function(event) {
      event.preventDefault();
      this.$store.dispatch("fetchTrees");
    }
  },
  created: function() {
    this.$store.dispatch("fetchSpecies");
  }
};
</script>
