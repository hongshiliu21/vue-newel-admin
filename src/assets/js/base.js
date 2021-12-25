import Vue from "vue";

// 行数判断
Vue.filter("getCol", total => {
  return `col-${12 / total}`;
});
