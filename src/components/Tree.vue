<template>
  <div v-if="display" class="col-12 col-sm-9 col-md-6 p-4 info-arbol">
    <button type="button" class="close" aria-label="Close" @click="close()">
      <span aria-hidden="true">&times;</span>
    </button>
    <h1>
      {{ tree.nombre_cientifico }}
      <br />
      <small>
        {{ tree.nombre_comun }}
      </small>
    </h1>
    <p>
      {{ tree.tipo }}
      <br />
      Familia: {{ tree.familia }}
      <br />
      Origen: {{ tree.origen }}
      <br />
      <span v-if="tree.procedencia_exotica">
        Procedencia: {{ tree.procedencia_exotica }}
      </span>
      <span v-if="tree.regiones">Región de origen: {{ tree.regiones }}</span>
      <br />
      <span v-if="tree.altura">Altura: {{ tree.altura }}m</span>
    </p>
    <p>
      <Icon :icon="['fas', 'map-marker-alt']" />
      <span v-if="tree.espacio_verde">
        Espacio verde: {{ tree.espacio_verde }}
      </span>
      <span v-else>
        {{ tree.calle }}
        {{ tree.calle_altura === 0 ? "s/n" : tree.calle_altura }}
      </span>
    </p>
    <div class="card border-primary mb-4">
      <div class="card-header bg-primary">
        <h4>
          Fuentes
        </h4>
      </div>
      <div class="card-body">
        <p>
          Dato aportado por
          <strong>
            {{ tree.nombre }}
          </strong>
        </p>
        <p>
          <small>
            {{ tree.fecha_creacion }}
            <br />
            {{ tree.descripcion }}
          </small>
        </p>
        <a
          v-if="tree.url"
          :href="tree.url"
          target="_blank"
          class="badge badge-pill badge-secondary mr-2"
        >
          <Icon :icon="['fas', 'link']" />
        </a>
        <a
          v-if="tree.facebook"
          :href="tree.facebook"
          target="_blank"
          class="badge badge-pill badge-secondary mr-2"
        >
          <Icon :icon="['fab', 'facebook-f']" />
        </a>
        <a
          v-if="tree.instagram"
          :href="tree.instagram"
          target="_blank"
          class="badge badge-pill badge-secondary mr-2"
        >
          <Icon :icon="['fab', 'instagram']" />
        </a>
        <a
          v-if="tree.twitter"
          :href="tree.twitter"
          target="_blank"
          class="badge badge-pill badge-secondary mr-2"
        >
          <Icon :icon="['fab', 'twitter']" />
        </a>
      </div>
    </div>
    <div class="card">
      <iframe
        v-if="tree.streetview"
        :src="tree.streetview"
        allowfullscreen=""
        width="100%"
        height="400"
        frameborder="0"
      >
      </iframe>
      <iframe
        v-else
        :src="streetViewUrl"
        allowfullscreen=""
        width="100%"
        height="400"
        frameborder="0"
      >
      </iframe>
    </div>
    <div class="autor card my-4">
      <div class="card-header">
        <h4>
          Este árbol
        </h4>
      </div>
      <div class="card-body">
        <p>
          El siguiente código sirve para identificar a este árbol:
          <kbd class="mr-1">{{ tree.id }}</kbd>
          <a
            :href="`https://www.arboladourbano.com/${tree.id}`"
            target="_blank"
          >
            <Icon :icon="['fas', 'external-link-alt']" />
          </a>
        </p>
        <p>
          Podés usarlo para reportar datos incorrectos enviando el código con
          los comentarios que quieras hacer por medio de
          <a
            class="text-primary"
            href="https://www.facebook.com/arboladomapa/"
            target="_blank"
          >
            <Icon :icon="['fab', 'facebook-square']" />/arboladomapa
          </a>
          <br />
          ¡Gracias!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tree",
  computed: {
    tree() {
      return this.$store.getters.getTree;
    },
    display() {
      return this.$store.getters.getShowTreePanel;
    },
    streetViewUrl() {
      return `https://www.google.com/maps/embed/v1/streetview?heading=210&pitch=10&fov=35&key=${process.env.VUE_APP_GOOGLE_API_KEY}&location=${this.tree.lat},${this.tree.lng}`;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("closeTreePanel");
    }
  }
};
</script>
