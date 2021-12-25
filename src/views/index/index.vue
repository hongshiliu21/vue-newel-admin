<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <i
              :class="[item.icon, item.color]"
              class="h4 mb-0 text-white text-center mr-3"
              style="width: 40px; height: 40px; line-height: 40px"
            ></i>
            <div>
              <h4 class="mb-1">{{ item.num }}</h4>
              <small class="text-muted">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺及商品提示、交易提示 | 订单总数统计 -->
    <el-row :gutter="20" class="mt-3">
      <!-- 店铺及商品提示、交易提示 -->
      <el-col :span="12" class="d-flex flex-column" style="height: 370px">
        <el-card class="mb-auto" shadow="never">
          <div slot="header" class="clearfix">
            <span>店铺及商品提示</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >您需要关注的店铺信息以及待处理事项</el-button
            >
          </div>
          <div class="row">
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">10</h4>
                <small class="text-muted">待回复</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">0</h4>
                <small class="text-muted">库存预警</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">3</h4>
                <small class="text-muted">仓库中</small>
              </button>
            </div>
          </div>
        </el-card>
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>交易提示</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >您需要立即处理的交易订单</el-button
            >
          </div>
          <div class="row">
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">0</h4>
                <small class="text-muted">待付款</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">10</h4>
                <small class="text-muted">待发货</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">0</h4>
                <small class="text-muted">已发货</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">3</h4>
                <small class="text-muted">已收货</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">3</h4>
                <small class="text-muted">退款中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">3</h4>
                <small class="text-muted">待售后</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 订单总数统计 -->
      <el-col :span="12">
        <el-card shadow="never" style="height: 370px">
          <div slot="header" class="clearfix">
            <span>订单总数统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >订单数量</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counts: [
        {
          icon: "el-icon-user-solid",
          desc: "关注人数(个)",
          num: "30",
          color: "bg-primary",
        },
        {
          icon: "el-icon-s-finance",
          desc: "订单总数(笔)",
          num: "120",
          color: "bg-success",
        },
        {
          icon: "el-icon-s-order",
          desc: "今日订单总金额(元)",
          num: "4183.80",
          color: "bg-danger",
        },
        {
          icon: "el-icon-s-data",
          desc: "本月销量(笔)",
          num: "100",
          color: "bg-warning",
        },
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "您需要关注的店铺信息以及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "待回复", value: "10" },
            { name: "库存预警", value: "0" },
            { name: "仓库中", value: "3" },
          ],
        },
        {
          title: "交易提示",
          desc: "您需要立即处理的交易订单",
          list: [
            { name: "待付款", value: "0" },
            { name: "待发货", value: "10" },
            { name: "已发货", value: "0" },
            { name: "已收货", value: "3" },
            { name: "退款中", value: "3" },
            { name: "待售后", value: "3" },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
