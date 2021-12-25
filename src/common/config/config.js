export default {
  logo: "UNI-ADMIN",
  navBar: {
    active: "0",
    list: [
      {
        name: "首页",
        subActive: "0",
        submenu: [
          // {
          //   icon: "el-icon-s-home",
          //   name: "测试",
          //   pathname: "index_test",
          //   pathType: 2
          // },
          {
            icon: "el-icon-s-home",
            name: "后台首页",
            pathname: "index",
            pathType: 1
          },
          {
            icon: "el-icon-picture",
            name: "相册管理",
            pathname: "image",
            pathType: 1
          },
          {
            icon: "el-icon-s-claim",
            name: "商品列表",
            pathname: "shop_goods_list",
            pathType: 1
          }
        ]
      },
      {
        name: "商品",
        subActive: "0",
        submenu: [
          {
            icon: "el-icon-s-claim",
            name: "商品列表",
            pathname: "shop_goods_list",
            pathType: 1
          }
        ]
      },
      { name: "订单" },
      { name: "会员" },
      { name: "设置" }
    ]
  }
};
