<template>
  <ComDialog
    :visible.sync="addOrEditData.state"
    :textTitle="textTitle"
    @close="closeModal"
    @confirm="handleConfirm('form')"
  >
    <el-form ref="form" :model="albumForm" label-width="80px">
      <el-form-item label="相册名称" prop="name">
        <el-input
          v-model="albumForm.name"
          size="medium"
          placeholder="请输入相册名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="相册排序" prop="order">
        <el-input-number
          v-model="albumForm.order"
          :min="0"
          size="medium"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </ComDialog>
</template>

<script>
export default {
  name: "album",
  props: {
    addOrEditData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      albumForm: {
        name: "",
        order: 0
      },
      textTitle: "编辑打印机"
    };
  },
  methods: {
    // 确定
    handleConfirm() {
      this.closeModal();
    },
    // 关闭
    closeModal() {
      this.$emit("close", { state: false });
      this.$refs["form"].resetFields();
    }
  }
};
</script>
>
<style lang="scss" scoped></style>
