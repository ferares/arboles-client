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
import {
  faCaretRight,
  faLink,
  faExternalLinkAlt,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faTrashAlt,
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faCaretRight,
  faGithub,
  faInstagram,
  faTwitter,
  faLink,
  faExternalLinkAlt,
  faMapMarkerAlt
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
