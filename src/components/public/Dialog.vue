<template>
  <div class="popup">
    <el-dialog
      :title="textTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :width="width"
      @close="handleCancel"
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
</template>

<script>
export default {
  name: "Dialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    textTitle: {
      type: String,
      default: "标题"
    },
    width: {
      type: String,
      default: "30%"
    },
    confirmButtonText: {
      type: String,
      default: "确 定"
    },
    cancelButtonText: {
      type: String,
      default: "取 消"
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit("close");
    },
    handleSave() {
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.popup {
  /deep/.el-dialog {
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(17, 130, 251, 0.5);
    border-radius: 4px;
  }
  /deep/.el-dialog__header {
    width: 100%;
    border-bottom: 1px solid #f6f7f9;
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 16px;
  }
  /deep/ .el-dialog__close.el-icon.el-icon-close {
    font-size: 20px;
    width: 16px;
    height: 16px;
    
  }
  /deep/.el-dialog__body {
    padding: 10px 20px;
    box-sizing: border-box;
    max-height: 70vh;
    overflow: auto;
  }
  /deep/.el-dialog__headerbtn {
    top: 12px;
    transition: all 0.3s ease; //延迟
    &:hover {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
    }
  }
  /deep/.el-dialog__title {
    color: #3c4354;
    font-size: 16px;
    line-height: 16px;
  }
  /deep/.el-dialog__footer {
    padding: 10px 20px;
    border-top: 1px solid #f6f7f9;
  }
}
</style>
