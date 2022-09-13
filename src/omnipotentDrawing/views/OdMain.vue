<template>
  <div class="box">
    <header class="header">
      <h1>个性化组件配置界面</h1>
      <div class="active">
        <el-button type="primary" @click="changeTheme">切换主题</el-button>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="info" @click="close">关闭</el-button>
      </div>
    </header>
    <main class="main">
      <div class="left">
        <od-left
          ref="od_left"
          @render="odRender"
          @handleDel="delEl"
          :lists="series && series.length ? series : []"
        />
      </div>
      <div class="board">
        <div class="header">
          <el-input v-model="grid.name" placeholder="个性化组件名称"></el-input>
          <el-button type="primary" title="显示参数名称">T</el-button>
          <el-button
            type="primary"
            :icon="'View'"
            title="辅助线显示关闭"
          ></el-button>
        </div>
        <div class="board-box grid-line">
          <div id="board-main"></div>
        </div>
        <!-- <div
          id="board-main"
          @mouseup="handleUp"
          @mousemove="handleMove"
          @mouseleave="handelLeave"
        ></div> -->
      </div>
      <div class="config">
        <div class="title">配置</div>
        <component :is="configView" v-model:configEl="config" :text="theme" />
      </div>
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive } from "vue";
import OdLeft from "./OdLeft.vue";
import configBox from "../components/configs/configBox.vue";
import configText from "../components/configs/configText.vue";
import configImage from "../components/configs/configImage.vue";
import { toRaw } from "@vue/reactivity";
export default {
  components: {
    OdLeft,
    configBox,
    configText,
    configImage,
  },
  data() {
    return {
      theme: "dark",
      zr: null,
      zrMark: null,
      saveData: {},
      grid: {
        width: "400",
        height: "400",
        backgroundImage: "",
      }, //画布设置数据
      currentEl: null, //当前操作元素
      config: {}, //
      events: [], //事件数据
      series: [], //画布元素集
      configView: "configBox", //"configBox",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化方法
    init() {
      this.createCanvas();
    },
    //创建画布
    createCanvas() {
      const el = document.getElementById("board-main");
      el.style.width = this.grid.width;
      el.style.height = this.grid.height;
      el.style.backgroundImage = this.grid.backgroundImage;
      const opts = {
        renderer: "canvas",
        devicePixelRatio: 2,
        width: this.grid.width,
        height: this.grid.height,
      };
      this.zr = this.$od.init(el, opts);
      //打开点击，方便于选中和配置元素
      this.handelClick();
    },
    /**
     * @name 更新画布大小
     * @description 当容器大小改变时，更新画布大小
     */
    resize() {
      this.zr.resize(this.grid);
    },
    /**
     * @name 绘制方法集合
     * @description 包含文本，图片，形状等绘制方法
     */
    odRender(type, opts) {
      switch (type) {
        case "text":
          this.drawText(opts);
          break;
        case "image":
          this.drawImg(opts);
          break;
      }
    },
    /**
     * @图形重绘
     * @description 删除并新增
     */
    resetRender(type, opts) {
      this.delEl(this.currentEl);
      this.odRender(type, opts);
    },
    /**
     * @name 绘制文本
     * @description
     */
    drawText(opts) {
      const text = new this.$od.Text(opts);
      text.attr({
        options: {
          type: "text",
          name: "text" + text.id,
          code: "text" + text.id, //图片代码
          checked: false, //是否默认选中
          jumpNumber: {
            //跳数
            show: false,
            time: null,
            split: null,
          },
        },
      });
      this.zr.add(text);
      this.series.push(text);
      // console.log("this.series", this.zr.storage._roots);
    },
    /**
     * @name 图片（包括SVG）
     * @description
     */
    drawImg(opts) {
      const img = new this.$od.Image(opts);
      img.attr({
        options: {
          type: "image",
          name: "image" + img.id,
          code: "image" + img.id, //图片代码
          checked: false, //是否默认选中
        },
      });
      this.zr.add(img);
      this.series.push(img);
    },
    /**
     * @name 模态框
     * @description 绘制当前元素标记
     */
    drawMark(el) {
      this.currentEl = el;
      const box = el.getBoundingRect();
      this.drawMarkCancle();
      this.zrMark = new this.$od.Rect({
        draggable: false,
        x: el.x - 5,
        y: el.y - 5,
        type: "mark",
        cursor: "auto",
        shape: {
          width: box.width + 10,
          height: box.height + 10,
        },
        style: {
          fill: "transparent",
          stroke: "#f00",
          lineDash: [4, 1, 2, 3],
        },
        zlevel: 0,
      });
      this.zr.add(this.zrMark);
    },
    /**
     * @name 取消模态框
     * @description 取消当前元素标记
     */
    drawMarkCancle() {
      if (this.zrMark) {
        this.zr.remove(this.zrMark);
        this.zrMark = null;
      }
    },
    /**
     * @name 点击
     * @description 选中操作元素，当前图形
     * */
    handelClick() {
      const _this = this;
      this.zr.on("click", async function (e) {
        if (!e.target) {
          _this.drawMarkCancle();
          _this.configView = "configBox";
        }
      });
    },
    /**
     * @name 删除元素（图形元素）
     * @description 删除实例上的图形元素，同时调整元素集
     * @param el:元素
     * @param index:元素在元素集合的索引值
     * */
    delEl(el) {
      const ele = el || this.currentEl;
      let arr = this.series;
      this.zr.remove(ele);
      this.series = arr.filter((item) => {
        console.log(item.id, ele.id);
        return item.id != ele.id;
      });
      this.drawMarkCancle();
      this.configView = "configBox";
    },
    /**
     * @name 配置文本
     */
    configBoardText(el) {
      this.config.x = el.x;
      this.config.y = el.y;
      (this.config.options = this.configBoardOptions(el, "text")),
        (this.config.style = {
          text: el.style.text,
          fill: el.style.fill,
          fontFamily: el.style.fontFamily,
          fontSize: el.style.fontSize,
          textWidth: el.style.textWidth,
          textHeight: el.style.textHeight,
          truncate: {
            ellipsis: el.style.truncate.ellipsis,
            outerWidth: el.style.textWidth,
            outerHeight: el.style.textHeight,
          },
          textPosition: el.style.textPosition,
        });
      this.configView = "configText";
    },
    /**
     * @name 配置图片
     */
    configBoardImage(el) {
      this.config.x = el.x;
      this.config.y = el.y;
      (this.config.options = this.configBoardOptions(el, "image")),
        (this.config.style = {
          image: el.style.img,
          width: el.style.width,
          height: el.style.height,
        });
      this.configView = "configImage";
    },
    /**
     * @name 配置自定义属性
     */
    configBoardOptions(el, type) {
      switch (type) {
        case "text":
          return {
            type: el.options.type,
            name: el.options.name,
            code: el.options.code, //图片代码
            checked: el.options.checked, //是否默认选中
            jumpNumber: {
              //跳数
              show: el.options.jumpNumber.show,
              time: el.options.jumpNumber.time,
              split: el.options.jumpNumber.split,
            },
          };
          break;
        case "image":
          return {
            type: el.options.type,
            name: el.options.name,
            code: el.options.code, //图片代码
            checked: el.options.checked, //是否默认选中
          };
          break;
      }
    },
    /**
     * @name 保存数据，
     * @description 保存现有配置下的图形数据
     * @param grid:网格，容器数据
     * @param events:事件信息或方法
     * @param series:展示和绘制的图形数据
     */
    save() {
      let options = {
        grid: this.grid,
        events: null,
        series: [],
      };
      this.series.forEach((item) => {
        let opt = {};
        if ((item.options.type == "text")) {
          opt = {
            draggable:true,
            rectHover: true,
            x:item.x,
            y:item.y,
            options:item.options,
            style: item.style,
            zlevel: item.zlevel,
          };
        } else if ((item.options.type == "image")) {
          opt = {
            draggable:true,
            x:item.x,
            y:item.y,
            options:item.options,
            style: item.style,
            zlevel: item.zlevel,
          };
        }
        options.series.push(opt);
      });
      console.log(options);
      this.saveData = options;
    },
    /**
     * @name 关闭绘图系统界面
     * @description 对现有信息进行处理和确认，然后关闭配置界面
     */
    close() {
      this.$message({
        message: "关闭页面",
        type: "error",
      });
    },
    /**
     * @name 切换主题
     * @description 现有浅色系和深色系主题切换
     */
    changeTheme() {
      this.theme = this.theme == "light" ? "dark" : "light";
      document
        .getElementsByTagName("html")[0]
        .setAttribute("class", this.theme);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #f3f3f3;
    box-sizing: border-box;
    clear: both;
    content: "";
    h1 {
      font-size: 16px;
      color: var(--color);
      float: left;
    }
    div.active {
      float: right;
    }
  }
  .main {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: row;
    flex: 1;
    & > div {
      border: 1px salmon solid;
    }
    .left {
      width: 330px;
    }
    .board {
      flex: 1;
      .header {
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: flex-start;
        ::v-deep(.el-input) {
          width: 150px;
          .el-input__wrapper {
            height: 30px;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid var(--color);
            box-shadow: none;
            border-radius: 0;
          }
        }
      }
      .board-box {
        width: 100%;
        height: calc(100% - 35px);
        &.grid-line {
          background-image: linear-gradient(
            0deg,
            var(--bg-grid-line-color) 0px,
            var(--bg-grid-line-color) 1px,
            transparent 1px,
            transparent 100px
          ),linear-gradient(
            90deg,
            var(--bg-grid-line-color) 0px,
            var(--bg-grid-line-color) 1px,
            transparent 1px,
            transparent 100px
          );
          background-size: 15px 15px;
        }
        #board-main {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid #f60;
          background-position: 0 0;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .config {
      display: flex;
      flex-direction: column;
      width: 330px;
      .title {
        color: var(--color);
        height: 35px;
        line-height: 35px;
        text-align: left;
        text-indent: 35px;
        border-bottom: 1px solid var(--color);
      }
    }
  }
}
</style>
