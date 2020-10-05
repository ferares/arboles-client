<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <Tree />
      <aside class="col-12 col-md-4 col-lg-3 py-4">
        <a
          class="d-flex flex-row-reverse align-items-center mb-4 justify-content-end"
          href="/"
        >
          <h1 class="main-title">
            Arbolado Urbano
            <br />
            <small class="text-secondary">
              Internacional
            </small>
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
            <button
              class="btn btn-light btn-small btn-block"
              @click="$bvModal.show('modal-about')"
            >
              Sobre el mapa
            </button>
          </div>
        </div>

        <Adsense :ad-client="adsenseClient" :ad-slot="adsenseSlot"></Adsense>

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
      <main class="col-md-8 col-lg-9 p-0">
        <Map />
      </main>
    </div>
    <About />
  </div>
</template>

<script>
// @ is an alias to /src

// Components
import Form from "@/components/Form.vue";
import Adsense from "@/components/Adsense.vue";
import Map from "@/components/Map.vue";
import Tree from "@/components/Tree.vue";

// Modals
import About from "@/modals/About.vue";

export default {
  name: "Home",
  components: {
    Form,
    Adsense,
    Map,
    About,
    Tree
  },
  data: function() {
    return {
      adsenseSlot: process.env.VUE_APP_ADSENSE_SLOT,
      adsenseClient: process.env.VUE_APP_ADSENSE_CLIENT
    };
  }
};
</script>
