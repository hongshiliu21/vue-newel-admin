<template>
  <diagram
    ref="diag"
    :model-data="diagramData"
    @model-changed="modelChanged"
    @changed-selection="changedSelection"
    style="border: solid 1px black; width:100%; height:400px"
  ></diagram>
</template>

<script>
import diagram from "@/components/GoDiagramTreeLayout";

export default {
  name: "index",
  components: { diagram },
  data() {
    return {
      diagramData: {
        // nodeDataArray: [
        //   { key: 1, items: ["Alpha", "Beta", "Gamma", "Delta"] },
        //   { key: 2, items: ["first", "second", "third"] }
        // ],
        // linkDataArray: [{ from: 1, to: 2 }]
        // class: "GraphLinksModel",
        // copiesArrays: true,
        // copiesArrayObjects: true,
        // linkFromPortIdProperty: "fromPort",
        // linkToPortIdProperty: "toPort",
        nodeDataArray: [
          {
            key: "Record1",
            widths: [{ class: "NaN" }, { class: "NaN" }, 60],
            fields: [
              {
                name: "field1",
                info: "first field",
                color: "#F7B84B",
                figure: "Ellipse"
              },
              {
                name: "field2",
                info: "the second one",
                color: "#F25022",
                figure: "Ellipse"
              },
              { name: "fieldThree", info: "3rd", color: "#00BCF2" }
            ],
            loc: "-42 -151"
          },
          {
            key: "Record2",
            widths: [{ class: "NaN" }, { class: "NaN" }, { class: "NaN" }],
            fields: [
              { name: "fieldA", info: "", color: "#FFB900", figure: "Diamond" },
              {
                name: "fieldB",
                info: "",
                color: "#F25022",
                figure: "Rectangle"
              },
              { name: "fieldC", info: "", color: "#7FBA00", figure: "Diamond" },
              {
                name: "fieldD",
                info: "fourth",
                color: "#00BCF2",
                figure: "Rectangle"
              }
            ],
            loc: "230 -97"
          }
        ],
        // linkDataArray: [
        //   {
        //     from: "Record1",
        //     fromPort: "field1",
        //     to: "Record2",
        //     toPort: "fieldA"
        //   },
        //   {
        //     from: "Record1",
        //     fromPort: "field2",
        //     to: "Record2",
        //     toPort: "fieldD"
        //   },
        //   {
        //     from: "Record1",
        //     fromPort: "fieldThree",
        //     to: "Record2",
        //     toPort: "fieldB"
        //   }
        // ]
        // passed to <diagram> as its modelData
        // nodeDataArray: [
        //   { key: 1, text: "Alpha", color: "lightblue" },
        //   { key: 2, text: "Beta", color: "orange" },
        //   { key: 3, text: "Gamma", color: "lightgreen" },
        //   { key: 4, text: "Delta", color: "pink" }
        // ],
        // linkDataArray: [
        //   { from: 1, to: 2 },
        //   { from: 1, to: 3 },
        //   { from: 3, to: 4 }
        // ]
      },
      currentNode: null
    };
  },
  computed: {},
  methods: {
    // tell the GoJS Diagram to update based on the arbitrarily modified model data
    updateDiagramFromData: function() {
      this.$refs.diag.updateDiagramFromData();
    },
    // this event listener is declared on the <diagram>
    modelChanged: function(e) {
      if (e.isTransactionFinished) {
        // show the model data in the page's TextArea
        this.savedModelText = e.model.toJson();
      }
    },
    changedSelection: function(e) {
      let node = e.diagram.selection.first();
      if (node instanceof window.go.Node) {
        this.currentNode = node;
        this.currentNodeText = node.data.text;
      } else {
        this.currentNode = null;
        this.currentNodeText = "";
      }
    }
  }
};
</script>

<style></style>
