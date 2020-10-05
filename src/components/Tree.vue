<template>
  <div class="col-12 col-sm-9 col-md-6">
    <a href="#" class="cerrar">
      cerrar
      <i class="fa fa-times"></i>
    </a>
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
      <span v-if="tree.regiones">
        Región de origen: {{ tree.regiones }}
      </span>
      <span v-if="tree.altura">
        Altura: {{ tree.altura }}m
      </span>
    </p>
    <p>
      <i class="fa fa-map-marker fa-fw"></i>
      <span v-if="tree.espacio_verde">
        Espacio verde: {{ tree.espacio_verde }}
      </span>
      <span v-else>
        {{ tree.calle }} {{ tree.calle_altura === 0 ? 's/n' : tree.calle_altura }}
      </span>
    </p>
    <div class="autor panel panel-primary">
      <div class="panel-heading">
        <h4>
          Fuentes
        </h4>
      </div>
      <div class="panel-body">
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
        <a v-if="tree.url" :href="tree.url" target="_blank">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-link fa-stack-1x fa-inverse"></i>
          </span>
        </a>
        <a v-if="tree.facebook" :href="tree.facebook" target="_blank">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
          </span>
        </a>
        <a v-if="tree.instagram" :href="tree.instagram" target="_blank">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-instagram fa-stack-1x fa-inverse"></i>
          </span>
        </a>
        <a v-if="tree.twitter" :href="tree.twitter" target="_blank">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </div>
    </div>
    <div class="panel panel-default">
      <iframe v-if="tree.streetview" :src="tree.streetview" allowfullscreen="" width="100%" height="400" frameborder="0">
      </iframe>
      <iframe v-else :src="streetViewUrl" allowfullscreen="" width="100%" height="400" frameborder="0">
      </iframe>
    </div>
      <div class="autor panel panel-default">
      <div class="panel-heading">
        <h4>
          Este árbol
        </h4>
      </div>
      <div class="panel-body">
        <p>
          El siguiente código sirve para identificar a este árbol:
          <kbd>
            {{ tree.id }}
          </kbd>
          <a :href="`https://www.arboladourbano.com/${tree.id}`" target="_blank">
            <i class="fa fa-external-link"></i>
          </a>
        </p>
        <p>
          Podés usarlo para reportar datos incorrectos enviando el código con
          los comentarios que quieras hacer por medio de
          <a class="text-primary" href="https://www.facebook.com/arboladomapa/" target="_blank">
            <i class="fa fa-facebook-square"></i>/arboladomapa
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
    streetViewUrl() {
      return `https://www.google.com/maps/embed/v1/streetview?heading=210&pitch=10&fov=35&key=${process.env.VUE_APP_GOOGLE_API_KEY}&location=${tree.lat},${tree.lng}`;
    }
  }
}
</script>
