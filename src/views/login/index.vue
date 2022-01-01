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
                    @click="handleSubmit('form')"
                  >
                    立即登录
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
        axios
          .post("/admin/login", this.form)
          .then((res) => {
            console.log(res);
            // 1、存储到vuex
            console.log("登录");
            console.log(res.data.data);
            this.$store.commit("login", res.data.data);
            // 2、存储到本地存储
            // 3、成功提示
            this.$message.success("登录成功！");
            // 4、跳转后台首页
            this.$router.push({ name: "index" });
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errorCode) {
              this.$message.error(err.response.data.msg);
            }
          });
      });
    },
  },
};
</script>

<style></style>
