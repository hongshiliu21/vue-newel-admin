/**
 * 这个函数的作用也是确保所选择的的元素是页面自有的元素
 */
import $ from "jquery";

/*
    判断是否内容元素，也就是判断是不是我们的弹出框或者是遮罩
*/
export default function(element) {
  var expectClasses = [
    ".layuiex",
    ".layuiex-layer",
    ".layuiex-layer-shade",
    ".layuiex-layer-moves",
    ".pAp_spider_Selecter_Block"
  ];
  for (var _i = 0; _i < expectClasses.length; _i++) {
    var els = $(expectClasses[_i]);
    for (var a = 0; a < els.length; a++) {
      //$.contains( container, contained )
      //检测一个元素包含在另一个元素之内
      //container    Element类型 指定可能包含其他元素的祖辈容器元素。
      //contained    Element类型 指定可能被其他元素包含的后代元素。
      if (
        $.contains(els.eq(a).get(0), element) ||
        els.eq(a).get(0) == element
      ) {
        return false;
      }
    }
  }
  return true;
}
