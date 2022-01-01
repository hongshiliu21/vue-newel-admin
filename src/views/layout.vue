<template>
  <div>
    <el-container
      style="
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
      "
    >
      <el-header class="d-flex align-items-center" style="background: #545c64">
        <a class="h5 text-light mb-0 mr-auto">{{ $conf.logo }}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numToString"
            v-for="(item, index) in navBar.list"
            :key="index"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                :src="
                  user.user.avatar
                    ? user.user.avatar
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              ></el-avatar>
              {{ user.user.username }}
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu
            default-active="0"
            @select="slideSelect"
            style="height: 100%"
          >
            <el-menu-item
              :index="index | numToString"
              v-for="(item, index) in slideMenus"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主布局 -->
        <el-main
          class="bg-light position-relative"
          style="padding-bottom: 60px"
        >
          <!-- 面包屑导航 -->
          <div
            class="border-bottom mb-3 bg-white"
            v-if="bran.length > 0"
            style="padding: 20px; margin: -20px"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :key="index"
                :to="{ path: item.path }"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>

          <!-- 主内容 -->
          <!-- <iframe
            style="width:100%;"
            :height="heightH"
            id="mobsf"
            scrolling="no"
            frameborder="0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          ></iframe> -->
          <router-view></router-view>

          <!-- 返回顶部 -->
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="
                 {
                  height: 100%;
                  width: 100%;
                  background-color: #f2f5f6;
                  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                  text-align: center;
                  line-height: 40px;
                  color: #1989fa;
                }
              "
            >
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "layout",
  mixins: [common],
  data() {
    return {
      navBar: {},
      bran: [],
    };
  },
  watch: {
    $route(to, from) {
      // 本地存储
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navBar.active || "0",
          left: this.slideMenuActive || "0",
        })
      );
      this.getRouterBran();
    },
  },
  computed: {
    // 字段代码貌似没用
    slideMenuActive: {
      get() {
        return this.navBar.list[this.navBar.active].subActive || "0";
      },
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val;
      },
      // heightH: function () {
      //   const windowH = Number(document.documentElement.clientHeight) + "px";
      //   return windowH;
      // },
    },
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    },
    ...mapState(["user"]),
  },
  created() {
    // 初始化菜单
    this.navBar = this.$conf.navBar;
    // 获取面包屑导航
    this.getRouterBran();
    // 初始化选中菜单
    this.__initNavBar();
    console.log("123");
    console.log(this.user);
  },
  methods: {
    __initNavBar() {
      let r = localStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r);
        this.navBar.active = r.top;
        this.slideMenuActive = r.left;
      }
    },
    getRouterBran() {
      let b = this.$route.matched.filter((v) => v.name),
        arr = [];
      b.forEach((item) => {
        // 过滤index和layout
        if (item.name == "index" || item.name == "layout") return;
        arr.push({
          name: item.name,
          path: item.path,
          title: item.meta.title,
        });
      });
      console.log(arr);
      if (arr.length > 0) {
        arr.unshift({ name: "index", path: "/index", title: "后台首页" });
      }
      this.bran = arr;
    },
    // 顶部导航
    handleSelect(key, keyPath) {
      if (key === "100-1") {
        return console.log("修改资料");
      }
      if (key === "100-2") {
        // 退出登录
        return this.logout();
      }
      this.navBar.active = key;
      // 默认选中跳转到当前激活
      this.slideMenuActive = "0";
      if (this.slideMenus.length) {
        this.$router.push({
          name: this.slideMenus[this.slideMenuActive].pathname,
        });
      }
    },
    // 左侧菜单导航
    slideSelect(key, keyPath) {
      this.slideMenuActive = key;
      console.log("slideSelect");
      console.log(key);
      console.log(keyPath);
      // 跳转到指定页面
      this.$router.push({
        name: this.slideMenus[key].pathname,
      });
    },
    logout() {
      axios
        .post(
          "/admin/logout",
          {},
          {
            headers: {
              token: this.user.token,
            },
          }
        )
        .then((res) => {
          this.$message.success("退出成功!");
          //清楚状态和存储
          this.$store.commit("logout");
          // 返回登录页面
          this.$router.push({
            name: "login",
          });
        })
        .catch((err) => {
          if (err.response.data && err.response.data.errorCode) {
            this.$message.error(err.response.data.msg);
            //清楚状态和存储
            this.$store.commit("logout");
            // 返回登录页面
            this.$router.push({
              name: "login",
            });
          }
        });
    },
  },
};
</script>

<style></style>
