import Vue from "vue";
import App from "./App.vue";
import PriceSeparator from "./common/PriceSeparator";

Vue.config.productionTip = false;
Vue.filter("priceSeparator", PriceSeparator);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
