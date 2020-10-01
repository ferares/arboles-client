<template>
  <div class="container-fluid">
    <aside class="col-12 col-md-4 col-lg-3 py-4">
      <a class="d-flex flex-row-reverse align-items-center mb-4" href="/">
        <h1 class="main-title">
          Arbolado Urbano
          <small class="text-secondary">Internacional</small>
        </h1>
        <img class="img-fluid" src="../assets/logo-blanco.png" alt="" />
      </a>

      <Form />

      <div class="row mt-4">
        <div class="col-12 col-sm-3 col-md-6">
          <a
            class="btn btn-light btn-small btn-block"
            href="https://www.facebook.com/arboladomapa"
            target="_blank"
          >
            <Icon :icon="['fab', 'facebook']" />
            Seguinos
          </a>
        </div>
        <div class="col-12 col-sm-3 col-md-6">
          <!-- TODO: Modals -->
          <button class="btn btn-light btn-small btn-block">
            Sobre el mapa
          </button>
        </div>
      </div>

      <!-- TODO: Adsense -->

      <div class="row text-center mt-4">
        <p class="col-12 col-sm-3 col-md-12 text-muted">
          Este mapa cuenta con<br />
          la valiosa colaboración de:
        </p>
        <a
          class="col-6 col-sm-3 col-md-6 col-lg-4"
          href="https://www.facebook.com/LaCiudadNosRegalaSabores"
          target="_blank"
        >
          <img
            class="img-fluid"
            src="../assets/colaborador-lcnrs.png"
            alt="La ciudad nos regala sabores"
          />
        </a>
        <a
          class="col-6 col-sm-3 col-md-6 col-lg-4"
          href="https://www.facebook.com/elrenacerdelalaguna/"
          target="_blank"
        >
          <img
            class="img-fluid"
            src="../assets/colaborador-laguna-fvet.png"
            alt="El Renacer de la Laguna - FVET - UBA"
          />
        </a>
        <a
          class="col-12 col-sm-3 col-md-12 col-lg-4"
          href="https://www.facebook.com/AsociacionRiberaNorte/"
          target="_blank"
        >
          <img
            class="img-fluid"
            src="../assets/colaborador-arn.png"
            alt="Asociación Ribera Norte"
          />
        </a>
      </div>
    </aside>
    <main class="col-md-8 col-lg-9">
      <!-- TODO: iframe -->
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    Form
  }
};
</script>
