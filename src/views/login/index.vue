<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header bg-white">
              <h3 class="text-center mb-0 text-secondary">UNI-ADMIN</h3>
            </div>
            <div class="card-body">
              <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="username">
                  <el-input
                    v-model="form.username"
                    size="medium"
                    placeholder="请输入用户名"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    size="medium"
                    type="password"
                    placeholder="请输入密码"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    class="w-100"
                    :loading="loading"
                    @click="handleSubmit('form')"
                  >
                    {{ loading ? "登录中..." : "立即登录" }}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        //提交表单  // 用户名：admin 密码：admin
        this.loading = true;
        axios
          .post("/admin/login", this.form)
          .then((res) => {
            // 1、存储到vuex
            this.$store.commit("login", res.data.data);
            // 2、存储到本地存储
            // 生成后台菜单
            this.$store.commit("createNavBar", res.data.data.tree);
            // 3、成功提示
            this.$message.success("登录成功！");
            // 4、跳转后台首页
            this.$router.push({ name: "index" });
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style></style>
