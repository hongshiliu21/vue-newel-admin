<template>
  <div>
    <el-container
      style="position: absolute;left: 0;top: 0;bottom: 0;right: 0; overflow: hidden;"
    >
      <el-header class="d-flex align-items-center">
        <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <!-- <el-menu-item index="2">商品</el-menu-item>
          <el-menu-item index="3">订单</el-menu-item>
          <el-menu-item index="4">会员</el-menu-item>
          <el-menu-item index="5">设置</el-menu-item> -->
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              summer
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%;padding-bottom: 60px;">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu default-active="2" @select="slideSelect">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main>
          <div v-for="(item, index) in 100" :key="index">{{ index }}</div>
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
export default {
  name: "layout",
  mixins: [common],
  data() {
    return {
      navBarIndex: "1",
      navBar: {
        active: "0",
        list: [
          {
            name: "首页",
            subActive: "0",
            submenu: [
              {
                icon: "el-icon-s-home",
                name: "后台首页"
              },
              {
                icon: "el-icon-s-claim",
                name: "商品列表"
              }
            ]
          },
          {
            name: "商品",
            subActive: "0",
            submenu: [
              {
                icon: "el-icon-s-claim",
                name: "商品列表"
              }
            ]
          },
          { name: "订单" },
          { name: "会员" },
          { name: "设置" }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    slideSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-header {
  background-color: #545c64;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
