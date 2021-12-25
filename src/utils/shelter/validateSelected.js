/**
 * 确保所选择的元素是页面本身的元素
 */
import $ from "jquery";

/**
 * 判断是否有我们生成的元素，即被我们标记为选中的元素
 * @param {*} element
 */
export default function(element) {
  var el = $(element);

  if (el.attr("__pAp_select")) {
    return false;
  }

  if (el.hasClass("__pAp_selectrow")) {
    return false;
  }
  return true;
}
