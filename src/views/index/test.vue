<template>
  <div>
    测试内容123
  </div>
</template>

<script>
import shelter from "@/utils/shelter/shelter";
let shelterUi = new shelter();

export default {
  data() {
    return {
      selectedEl: null
    };
  },
  mounted() {
    let that = this;
    shelterUi.beginSelect(that.onDomClick, that.onContextMenu, function(selectedEl) {
      that.selectedEl = selectedEl;
    });

  },
  methods: {
    onDomClick() {
      console.log("点击");
      console.log(this.selectedEl);
    },
    onContextMenu(){
      console.log("右键操作");
    }
  }
};
</script>
