import Dialog from "./public/Dialog";

const publicComponents = {
  install: function(Vue) {
    Vue.component("ComDialog", Dialog);
  }
};

export default publicComponents;
