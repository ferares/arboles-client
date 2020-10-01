import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Bootstrap Vue
import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue);

// Fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
// import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faTrashAlt, faFacebook);
Vue.component("Icon", FontAwesomeIcon);

// Styles
import "./styles/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
