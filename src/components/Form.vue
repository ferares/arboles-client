<template>
  <form method="post">
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
              id="rdonde-ciudad"
              name="rdonde"
              class="custom-control-input"
              value="0"
            />
            <label class="custom-control-label" for="rdonde-ciudad">
              En todo el mapa
            </label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="rdonde-mapa"
              name="rdonde"
              class="custom-control-input"
              value="1"
            />
            <label class="custom-control-label" for="rdonde-mapa">
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
              id="user_sabores"
              name="user_sabores"
            />
            <label class="custom-control-label" for="user_sabores">
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
  data: function() {
    return {
      species: ""
    };
  },
  computed: {
    speciesOptions() {
      return this.$store.getters.getSpecies;
    }
  },
  methods: {
    // For letting vue-multiselect search use the species common and scientific name
    speciesLabel: function({ nombre_comun, nombre_cientifico }) {
      return `${nombre_comun} ${nombre_cientifico}`;
    }
  },
  created: function() {
    this.$store.dispatch("fetchSpecies");
  }
};
</script>
