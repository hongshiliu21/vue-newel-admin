<template>
  <transition name="dialog-fade">
    <div>
      <el-dialog
        :title="textTitle"
        :visible.sync="visible"
        :width="width"
        @close="handleCancel"
        @closed="handleClosed"
      >
        <!-- 内容   -->
        <div><slot /></div>
        <!-- 按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
          <el-button type="primary" @click="handleSave">{{
            confirmButtonText
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    textTitle: {
      type: String,
      defalut: "标题"
    },
    width: {
      type: String,
      defalut: "30%"
    },
    confirmButtonText: {
      type: String,
      defalut: "确 定"
    },
    cancelButtonText: {
      type: String,
      defalut: "取 消"
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleClosed() {},
    handleSave() {
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0.3s;
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0.3s;
  animation: dialog-fade-out 0.3s;
}
@-webkit-keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
@keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
