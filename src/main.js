import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Bootstrap Vue
import { BootstrapVue } from "bootstrap-vue";

// Fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faTrashAlt,
  faFacebook,
  faCaretRight,
  faGithub,
  faInstagram,
  faTwitter
);
Vue.component("Icon", FontAwesomeIcon);

// Styles
import "./styles/main.scss";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
