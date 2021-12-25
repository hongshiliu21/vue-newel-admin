<template>
  <div style="width:100%;height:500px;">
    <zr-draw-html
      isShowImg
      isCheckable
      :tableArr.sync="tableArr"
      :legendColors="legendColors"
    ></zr-draw-html>
  </div>
</template>

<script>
export default {
  data() {
    return {
      legendColors: {
        blue: "#ff0000"
      },
      tableArr: [
        {
          x: 100,
          y: 100,
          // width: 310,
          // height: 100,
          souceName:"业务层次-库名称1",
          tableName: "表1",
          tableId: "01",
          state: 1,
          collapsed: false,
          to: [{ tableId: "03", fieldId: 0, lineName: "连线" }],
          children: [
            {
              name: "用户编码",
              fieldId: "11",
              fieldType: "M",
              key: true,
              selected: true,
              disabled: true,
              to: [
                // { tableId: "02", fieldId: "22", lineName: "连线" },
                // { tableId: "02", fieldId: "222", lineName: "连线" }
              ]
            },
            {
              name: "用户编码1",
              fieldId: "111",
              fieldType: "M"
              // to: [{ tableId: "03", fieldId: "333", lineName: "连线" }]
            },
            {
              name: "用户编码2",
              fieldId: "1111",
              fieldType: "D",
              to: []
            },
            {
              name: "用户编码3",
              fieldId: "11111",
              fieldType: "C",
              to: []
            },
            {
              name: "用户编码4",
              fieldId: "111111",
              to: []
            }
          ]
        },
        {
          x: 400,
          y: 200,
          souceName:"业务层次-库名称2",
          tableName: "表2",
          tableId: "02",
          state: 2,
          to: [{ tableId: "01", fieldId: 0, lineName: "连线" }],
          children: [
            {
              name: "用户编码",
              fieldId: "22",
              to: [
                {
                  tableId: "03",
                  fieldId: "33",
                  lineName: "连线",
                  color: "#000"
                },
                {
                  tableId: "03",
                  fieldId: "3333",
                  lineName: "连线",
                  color: "#000"
                }
                // { tableId: "01", fieldId: 0, lineName: "连线" }
              ]
            },
            {
              name: "用户编码2",
              fieldId: "222",
              to: []
            }
          ]
        },
        {
          x: 600,
          y: 100,
          // height: 100,
          souceName:"业务层次-库名称3",
          tableName: "表3",
          tableId: "03",
          state: 2,
          to: [],
          children: [
            {
              name: "用户编码",
              fieldId: "33",
              to: []
            },
            {
              name: "用户编码2",
              fieldId: "333",
              to: []
            },
            {
              name: "用户编码3",
              fieldId: "3333",
              to: []
            },
            {
              name: "用户编码4",
              fieldId: "33333",
              to: []
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
