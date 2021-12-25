<template>
  <div></div>
</template>

<script>
import go from "gojs";
const $ = go.GraphObject.make; // 声明个全局的常量MAKE，用来“创造”所需图像配置
import RowResizingTool from '@/utils/RowResizingTool.js';

export default {
  name: "",
  props: ["modelData"],
  data() {
    return {
      diagram: null
    };
  },
  watch: {
    modelData: function(val) {
      this.updateModel(val);
    }
  },
  mounted() {
    console.log(go);
    console.log("123");
    console.log(go.Diagram);
    console.log(this.$el);
    console.log(RowResizingTool);
    let self = this;
    let myDiagram = $(go.Diagram, this.$el, {
      validCycle: go.Diagram.CycleNotDirected, // don't allow loops
      "undoManager.isEnabled": true,
      // Model ChangedEvents get passed up to component users
      ModelChanged: function(e) {
        self.$emit("model-changed", e);
      },
      ChangedSelection: function(e) {
        self.$emit("changed-selection", e);
      }
    });
    myDiagram.toolManager.mouseDownTools.add(RowResizingTool.RowResizingTool());
    myDiagram.toolManager.mouseDownTools.add(new ColumnResizingTool());

    // This template is a Panel that is used to represent each item in a Panel.itemArray.
    // The Panel is data bound to the item object.
    // 这个模板是一个Panel，用于表示Panel.itemArray 中的每一项。
    // Panel 是绑定到 item 对象的数据。

    var fieldTemplate = $(
      go.Panel,
      "TableRow", // 这个 Panel 是包含 Table 中的一行
      new go.Binding("portId", "name"), // 这个面板是一个“端口”
      {
        background: "transparent", // 所以这个端口的背景可以被鼠标选中
        fromSpot: go.Spot.Right, // 链接只从右侧到左侧
        toSpot: go.Spot.Left,
        // 允许绘制从此端口或到此端口的链接：
        fromLinkable: true,
        toLinkable: true
      },
      $(
        go.Shape,
        {
          column: 0,
          width: 12,
          height: 12,
          margin: 4,
          // 但不允许绘制来自或指向此形状的链接：
          fromLinkable: false,
          toLinkable: false
        },
        new go.Binding("figure", "figure"),
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        {
          column: 1,
          margin: new go.Margin(0, 2),
          stretch: go.GraphObject.Horizontal,
          font: "bold 13px sans-serif",
          wrap: go.TextBlock.None,
          overflow: go.TextBlock.OverflowEllipsis,
          // 并禁止从或到此文本的绘图链接：
          fromLinkable: false,
          toLinkable: false
        },
        new go.Binding("text", "name")
      ),
      $(
        go.TextBlock,
        {
          column: 2,
          margin: new go.Margin(0, 2),
          stretch: go.GraphObject.Horizontal,
          font: "13px sans-serif",
          maxLines: 3,
          overflow: go.TextBlock.OverflowEllipsis,
          editable: true
        },
        new go.Binding("text", "info").makeTwoWay()
      )
    );

    // 这个模板代表了一个完整的“记录”。
    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      // 这个矩形围绕着节点的内容
      $(go.Shape, { fill: "#EEEEEE" }),
      // 内容由标题和项目列表组成
      $(
        go.Panel,
        "Vertical",
        { stretch: go.GraphObject.Horizontal, alignment: go.Spot.TopLeft },
        // 这是整个节点的头部
        $(
          go.Panel,
          "Auto",
          { stretch: go.GraphObject.Horizontal }, // 和整个节点一样宽
          $(go.Shape, { fill: "#1570A6", stroke: null }),
          $(
            go.TextBlock,
            {
              alignment: go.Spot.Center,
              margin: 3,
              stroke: "white",
              textAlign: "center",
              font: "bold 12pt sans-serif"
            },
            new go.Binding("text", "key")
          )
        ),
        // 此面板为 itemArray 中的每个项目对象保存一个面板；
        // 每个itemPanel被itemTemplate定义为这个Table中的一个TableRow
        $(
          go.Panel,
          "Table",
          {
            name: "TABLE",
            stretch: go.GraphObject.Horizontal,
            minSize: new go.Size(100, 10),
            defaultAlignment: go.Spot.Left,
            defaultStretch: go.GraphObject.Horizontal,
            defaultColumnSeparatorStroke: "gray",
            defaultRowSeparatorStroke: "gray",
            itemTemplate: fieldTemplate
          },
          $(go.RowColumnDefinition, this.makeWidthBinding(0)),
          $(go.RowColumnDefinition, this.makeWidthBinding(1)),
          $(go.RowColumnDefinition, this.makeWidthBinding(2)),
          new go.Binding("itemArray", "fields")
        ) // 结束表格项目面板
      ) // 结束垂直面板
    ); // 结束节点

    // myDiagram.nodeTemplate = $(
    //   go.Node,
    //   "Vertical",
    //   new go.Binding("itemArray", "items")
    // );
    // myDiagram.nodeTemplate = $(
    //   go.Node,
    //   "Auto",
    //   $(
    //     go.Shape,
    //     {
    //       fill: "white",
    //       strokeWidth: 0,
    //       portId: "",
    //       fromLinkable: true,
    //       toLinkable: true,
    //       cursor: "pointer"
    //     },
    //     new go.Binding("fill", "color")
    //   ),
    //   $(
    //     go.TextBlock,
    //     { margin: 8, editable: true },
    //     new go.Binding("text").makeTwoWay()
    //   )
    // );
    // myDiagram.linkTemplate = $(
    //   go.Link,
    //   { relinkableFrom: true, relinkableTo: true },
    //   $(go.Shape),
    //   $(go.Shape, { toArrow: "OpenTriangle" })
    // );

    myDiagram.linkTemplate = $(
      go.Link,
      { relinkableFrom: true, relinkableTo: true, toShortLength: 4 }, // 让用户重新连接链接
      $(go.Shape, { strokeWidth: 1.5 }),
      $(go.Shape, { toArrow: "Standard", stroke: null })
    );

    this.diagram = myDiagram;
    this.updateModel(this.modelData);
  },
  methods: {
    // 返回 RowColumnDefinition 的初始化，指定特定的列
    // 并将 RowColumnDefinition.width 的 Binding 添加到 data.widths 数组中的第 IDX 个数字
    makeWidthBinding(idx) {
      // 这两个转换函数在 IDX 变量上关闭。
      // 此源到目标转换从给定索引处的 Array 中提取一个数字。
      function getColumnWidth(arr) {
        if (Array.isArray(arr) && idx < arr.length) return arr[idx];
        return NaN;
      }
      // 此目标到源转换在给定索引处设置数组中的数字。
      function setColumnWidth(w, data) {
        var arr = data.widths;
        if (!arr) arr = [];
        if (idx >= arr.length) {
          for (var i = arr.length; i <= idx; i++) arr[i] = NaN; // 默认为 NaN
        }
        arr[idx] = w;
        return arr; // 需要返回Array（作为data.widths的值）
      }
      return [
        { column: idx },
        new go.Binding("width", "widths", getColumnWidth).makeTwoWay(
          setColumnWidth
        )
      ];
    },

    model: function() {
      return this.diagram.model;
    },
    updateModel: function(val) {
      // No GoJS transaction permitted when replacing Diagram.model.
      if (val instanceof go.Model) {
        this.diagram.model = val;
      } else {
        let m = new go.GraphLinksModel();
        if (val) {
          for (let p in val) {
            m[p] = val[p];
          }
        }
        this.diagram.model = m;
      }
    },
    updateDiagramFromData: function() {
      this.diagram.startTransaction();
      // This is very general but very inefficient.
      // It would be better to modify the diagramData data by calling
      // Model.setDataProperty or Model.addNodeData, et al.
      this.diagram.updateAllRelationshipsFromData();
      this.diagram.updateAllTargetBindings();
      this.diagram.commitTransaction("updated");
    }
  }
};
</script>
