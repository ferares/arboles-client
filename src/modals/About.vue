<template>
  <b-modal id="modal-about" size="lg" hide-footer>
    <template v-slot:modal-title>
      ¿Qué es esto?
    </template>
    <div class="d-block">
      <p>
        Este mapa surge gracias a la publicación de una información increíble:
        el
        <a
          href="https://data.buenosaires.gob.ar/dataset?q=arbolado"
          target="_blank"
        >
          censo del arbolado de la Ciudad de Buenos Aires
        </a>
        realizado durante el año 2011 y publicado en 2013.
      </p>
      <p>
        El objetivo inicial fue simplificar el acceso a esta valiosa información
        pero rápidamente se expandió para incluir otros censos. Hoy en día el
        sitio ayuda a visualizar la posición de miles de árboles ubicados en
        varias ciudades. La mayor cantidad se concetra en la Ciudad de Buenos
        Aires, pero también existen registros en Rosario, La Plata y Montevideo
        entre otras esperando que colabore con el conocimiento y el cuidado de
        nuestro arbolado urbano.
      </p>
      <a
        href="http://martinsimonyan.com/arboles-de-buenos-aires/"
        class="btn btn-secondary"
        target="_blank"
      >
        Más información
        <Icon :icon="['fas', 'caret-right']" />
      </a>
      <hr />
      <h2>
        ¿Con qué seguir?
      </h2>
      <p>
        Podés dejar tu opinión y tus idas para seguir mejorando esta
        herramienta. Estas son algunas de las ideas que están en curso:
      </p>
      <ul>
        <li>
          permitir seleccionar el radio de búsqueda
        </li>
        <li>
          buscar por barrio o comuna
        </li>
        <li>
          incorporar a otras ciudades
        </li>
        <li>
          incorporar otras fuentes y no tan sólo las del censo del GCBA y poder
          buscar filtrando por fuente
        </li>
        <li>
          permitir interacción con usuarios para que carguen ejemplares,
          fotografías y reporten errores
        </li>
      </ul>
      <hr />
      <p class="text-center">
        <a href="https://github.com/suberek/arboles" target="_blank">
          <Icon :icon="['fab', 'github']" />
          Ver en GitHub
        </a>
      </p>
      <p class="text-center">
        <a href="https://www.facebook.com/arboladomapa" target="_blank">
          <Icon :icon="['fab', 'facebook']" />
          Seguir en Facebook
        </a>
      </p>
      <p class="text-center">
        <a href="https://www.instagram.com/arbolado.urbano/" target="_blank">
          <Icon :icon="['fab', 'instagram']" />
          Seguir en Instagram
        </a>
      </p>
      <p class="text-center">
        <a href="https://twitter.com/arboladomapa" target="_blank">
          <Icon :icon="['fab', 'twitter']" />
          Seguir en Twitter
        </a>
      </p>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('modal-about')">
      Gracias por leer
    </b-button>
  </b-modal>
</template>
