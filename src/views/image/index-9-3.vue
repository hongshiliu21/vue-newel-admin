<template>
  <div>
    <el-container
      style="position: absolute;top: 55px;bottom: 0;left: 0;right: 0;"
    >
      <el-header class="d-flex align-items-center border-bottom">
        <!-- 头部 -->
        <div class="mr-auto">
          <el-select
            size="mini"
            class="mr-2"
            v-model="searchForm.order"
            style="width: 150px;"
            placeholder="图片排列方式"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            size="mini"
            class="mr-2"
            v-model="searchForm.keyword"
            style="width: 150px;"
            placeholder="输入相册名称"
            clearable
          />
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <!-- <el-button type="success" size="mini" @click="handleAlbum(false)"
          >创建相册</el-button
        > -->
         <el-button type="success" size="mini" @click="handleAlbum2(false)"
          >创建相册111</el-button
        >
        <el-button type="warning" size="mini" @click="uploadModel = true"
          >上传图片</el-button
        >
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style="position: absolute;top: 60px;left: 0;bottom: 60px;"
        >
          <!-- 侧边 | 相册列表-->
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              :active="albumIndex === index"
              @change="albumChange"
              @edit="handleAlbum"
              @del="albumDel"
            />
          </ul>
        </el-aside>
        <el-container>
          <el-main
            style="position: absolute;top: 60px;left:200px;bottom: 60px;right: 0;"
          >
            <!-- 主内容 -->
            <el-row :gutter="10">
              <el-col v-for="i in 10" :key="i" :lg="4" :md="6" :sm="8">
                <el-card
                  class="box-card mb-3 position-relative"
                  :body-style="{ padding: '0' }"
                  shadow="hover"
                >
                  <img
                    src="https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg"
                    class="w-100"
                    style="height: 100px;"
                  />
                  <div
                    class="w-100 text-white"
                    style="background: rgba(0,0,0,0.5);margin-top: -25px;position: absolute;"
                  >
                    123
                  </div>
                  <div class="p-2 text-center">
                    <el-button-group>
                      <el-button
                        icon="el-icon-view"
                        size="mini"
                        class="p-2"
                      ></el-button>
                      <el-button
                        icon="el-icon-edit"
                        size="mini"
                        class="p-2"
                      ></el-button>
                      <el-button
                        icon="el-icon-delete"
                        size="mini"
                        class="p-2"
                      ></el-button>
                    </el-button-group>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- 修改|创建相册 -->
    <album-dialog
      v-model="addOrEditData.state"
      :addOrEditData="addOrEditData"
      @close="handleClose"
      @reloadPageList="reloadPageList"
    />

    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <div class="text-center">
        <el-upload
          class="upload-demo w-100"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from "@/components/image/album-item.vue";
import albumDialog from "@/components/dialog/image/album.vue";

export default {
  components: { albumItem, albumDialog },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      searchForm: {
        order: "",
        keyword: ""
      },
      albumIndex: 0,
      albums: [],
      albumModel: false,
      albumEditIndex: -1,
      albumForm: {
        name: "",
        order: 0
      },
      uploadModel: false,
      addOrEditData: {
        state: false,
        data: null
      }
    };
  },
  created() {
    this.__init();
  },
  methods: {
    handleAlbum2(){
      this.addOrEditData.state = true;
    },
    handleClose() {
       this.addOrEditData.state = false;
    },
    reloadPageList() {},
    __init() {
      for (var i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0
        });
      }
    },
    albumChange(index) {
      this.albumIndex = index;
    },
    handleAlbum(obj) {
      if (obj) {
        let { item, index } = obj;
        this.albumForm = {
          name: item.name,
          order: item.order
        };
        this.albumEditIndex = index;
        this.albumModel = true;
      } else {
        this.albumForm = {
          name: "",
          order: 0
        };
        this.albumEditIndex = -1;
        this.albumModel = true;
      }
    },
    handleConfirm() {
      // 在编辑状态下
      if (this.albumEditIndex > -1) {
        this.handleAlbumEdit();
        return (this.albumModel = false);
      }
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0
      });
      this.albumModel = false;
    },
    handleAlbumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
      this.albums[this.albumEditIndex].order = this.albumForm.order;
    },
    albumDel(index) {
      this.$confirm("是否删除该相册", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.albums.splice(index, 1);
        this.$message.success("删除成功!");
      });
    }
  }
};
</script>

<style>
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
