/***
 * 这是主函数
 */
import $ from "jquery";
import validateSelect from "./validateSelected";
import isContentElement from "./isContentElement";

export default class {
  constructor() {
    this.shelter = $("<div class='layuiex'></div>"); //选择过程中的div
    this.shelter.attr("id", "__pAp_SpiderShelter");

    this.block = $("<div class='layuiex'></div>");

    this.lastSelectEl = null; //当前鼠标移动到元素
    this.shelterInterval = null;

    $(document.body).append(this.shelter);
    $(document.body).append(this.block);
  }

  beginSelect(onDomClick, onContextMenu, callback) {
    let that = this;
    this.shelter.css("position", "absolute");
    this.shelter.css("display", "block");
    this.shelter.addClass("pAp_spider_Selecter_Block");
    this.shelter.bind("click", onDomClick);
    this.shelter.show();
    this.shelter.css("width", "100%");
    this.shelter.css("height", $(document).height() + "px");
    this.shelter.css("left", "0");
    this.shelter.css("top", "0");
    this.shelter.mousemove(this.onShelterMouseMove(callback));
    //初始化遮罩
    function initCover() {
      that.shelterInterval = setInterval(function() {
        //如果遮罩层的高度小于页面高度，则将遮罩的高度设置成页面高度
        if ($(document).height() > that.shelter.height()) {
          that.hideCover();
          that.showCover();
        }
      }, 500);
    }

    //鼠标移动到遮罩层上的时候，重置遮罩层
    this.shelter
      .mouseover(function() {
        if (that.shelterInterval) {
          clearInterval(that.shelterInterval);
          that.shelterInterval = null;
        }
      })
      .mouseout(initCover);

    this.block.css("position", "absolute");
    this.block.css("display", "block");
    this.block.show();
    this.showShelter(); //显示遮罩阴影
    this.block.css("z-index", "19891009");
    this.shelter.css("z-index", "19891010");

    //绑定右键事件
    document.oncontextmenu = onContextMenu;

    //鼠标滚动事件，目的是防止页面滚动
    $(this.shelter).on("mousewheel", function(evt) {
      event.stopPropagation();
      event.preventDefault();
      var height = evt.originalEvent.wheelDelta;
      if (!that.lastSelectEl) return;
      var el = that.lastSelectEl.get(0);
      while (el) {
        if (el.scrollHeight > el.offsetHeight || el.tagName == "BODY") {
          var lastTop = el.scrollTop;
          el.scrollTop = el.scrollTop - height;
          if (lastTop !== el.scrollTop) {
            break;
          }
        }
        el = el.parentElement;
      }
    });
    initCover();
  }
  endSelect(callback) {
    if (this.shelterInterval) {
      clearInterval(this.shelterInterval);
      this.shelterInterval = null;
    }
    this.shelter.unbind();
    this.shelter.remove();
    this.block.remove();
    $(document).unbind();
    document.oncontextmenu = function() {
    };
    callback && callback();
  }

  showShelter() {
    this.block.css("box-shadow", "0 0 20px #d4930d");
  }

  hideShelter() {
    this.block.css("box-shadow", "none");
  }

  //鼠标移动时的操作
  onShelterMouseMove(callback) {
    let that = this;
    var position = {
      x: 0,
      y: 0
    };

    return function(e) {
      event.stopPropagation();
      if (
        Math.abs(position.x - e.pageX) > 10 ||
        Math.abs(position.y - e.pageY) > 10
      ) {
        //隐藏蒙层
        that.hideCover();
        //返回当前鼠标所在位置的最顶层元素，也就是鼠标所在的页面元素
        var el = $(document.elementFromPoint(e.clientX, e.clientY));
        //显示蒙层
        that.showCover();

        //如果是弹出框或者是遮罩则返回
        if (!isContentElement(el)) return;

        //如果元素中有我们生成的属性，则取父元素
        if (!validateSelect(el)) {
          el = el.parent();
        }
        if (!that.lastSelectEl || that.lastSelectEl.get(0) != el.get(0)) {
          that.lastSelectEl = el;
        }
        position = {
          x: e.pageX,
          y: e.pageY
        };
        that.setPosition(el, that.block);
        callback && callback(that.lastSelectEl);
      }
    };
  }

  setShelterPosition(el) {
    this.setPosition(el, this.shelter);
  }

  /**
   * 把选择框设置当当前选择元素的位置
   * @param {Jquery Dom Element} el 选择的元素
   * @param {Jquery Dom Element} shelter 遮罩层
   */
  setPosition(el, shelter) {
    if (
      (el.width() == 0 || el.height() == 0) &&
      el.get(0).tagName == "A" &&
      el.children().length
    ) {
      that.setPosition(el.children().eq(0), shelter);
      return;
    }

    var paddingObject = {
      left: parseInt(el.css("padding-left")),
      top: parseInt(el.css("padding-top")),
      right: parseInt(el.css("padding-right")),
      bottom: parseInt(el.css("padding-bottom"))
    };

    var _width = 0,
      _height = 0;
    if (!isNaN(paddingObject.left)) {
      _width += paddingObject.left;
    }
    if (!isNaN(paddingObject.right)) {
      _width += paddingObject.right;
    }
    if (!isNaN(paddingObject.top)) {
      _height += paddingObject.top;
    }
    if (!isNaN(paddingObject.bottom)) {
      _height += paddingObject.bottom;
    }

    var top = parseInt(el.offset().top);
    var height = el.height() + _height;
    var availHeight = $(document).height() - top;
    height = height > availHeight ? availHeight : height;

    var obj = {
      left: parseInt(el.offset().left) + "px",
      top: top + "px",
      width: el.width() + _width,
      height: height
    };

    shelter.css(obj);
  }

  hideCover() {
    this.block.css("z-index", "-2");
    this.shelter.css("z-index", "-1");
    this.shelter.css("display", "none");
    this.block.css("display", "none");
  }

  showCover() {
    this.shelter.css("display", "block");
    this.block.css("display", "block");
    this.block.css("z-index", "19891009");
    this.shelter.css("z-index", "19891010");

    var height = $(document).height();
    this.shelter.css("width", "100%");
    this.shelter.css("height", height + "px");
    this.shelter.css("left", "0");
    this.shelter.css("top", "0");
  }

  setBlockCss(key, value) {
    this.block.css(key, value);
  }

  setShelterCss(key, value) {
    this.shelter.css(key, value);
  }
}
