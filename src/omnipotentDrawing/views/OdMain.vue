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
        <div
          id="board-main"
          @mousedown="handleDown"
          @mouseup="handleUp"
          @mousemove="handleMove"
        ></div>
        <!-- <div id="board-main"></div> -->
      </div>
      <div class="config">
        <div class="title">配置</div>
        <component :is="configView" />
      </div>
    </main>
  </div>
</template>

<script>
// import od from "../lib/index";
import OdLeft from "./OdLeft.vue";
import configBox from "../components/configs/configBox.vue";
import configText from "../components/configs/configText.vue";
import configImage from "../components/configs/configImage.vue";
// import func from 'vue-editor-bridge';
// import { toRaw } from "@vue/reactivity";
export default {
  components: {
    OdLeft,
    configBox,
    configText,
    configImage
  },
  data() {
    return {
      theme: "dark",
      zr: null,
      zrMark: null,
      grid: {
        width: "400",
        height: "400",
        backgroundImage: "",
      }, //画布设置数据
      currentElPos: {}, //当前元素文职信息
      events: [], //事件数据
      series: [], //画布元素集
      configView: "configBox",
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
     * @name 绘制文本
     * @description
     */
    drawText(opts) {
      const text = new this.$od.Text(opts);
      text.attr({
        type: "text",
        name: "text" + text.id,
      });
      text.dirty();
      // this.handleClickEL(text);
      this.zr.add(text);
      this.series.push(text);
      console.log("this.series", this.series);
    },
    /**
     * @name 图片（包括SVG）
     * @description
     */
    drawImg(opts) {
      const img = new this.$od.Image(opts);
      img.attr({
        type: "image",
        name: "image" + img.id,
      });
      this.zr.add(img);
      this.series.push(img);
    },
    /**
     * @name 模态框
     * @description 绘制当前元素标记
     */
    async drawMark(el) {
      const box = el.getBoundingRect();
      this.drawMarkCancle().then(() => {
        this.zrMark = new this.$od.Rect({
          shape: {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
          },
          style: {
            fill: "transparent",
            stroke: "#f00",
            lineDash: [4, 1, 2, 3],
          },
          zlevel: 0,
        });
        this.zr.add(this.zrMark);
      });
    },
    /**
     * @name 取消模态框
     * @description 取消当前元素标记
     */
    drawMarkCancle() {
      return new Promise((resolve) => {
        if (this.zrMark) {
          this.zr.remove(this.zrMark);
          this.zrMark = null;
        }
        resolve();
      });
    },
    /**
     * @name 鼠标按下（点击）
     * @description 鼠标在实例有按下（点击）操作，
     * @description 检测并校验当前可操作图形元素
     * */
    handleDown(e) {
      const ev = e || window.event;
      const x = ev.zrX;
      const y = ev.zrY;
      if (!this.series.length) return;
      this.series.forEach((element) => {
        if (element.contain(x, y)) {
          this.zr.currentEl = element;
          const box = element.getBoundingRect();
          this.currentElPos = {
            x: Math.ceil(x - box.x),
            y: Math.ceil(y - box.y),
          };
          return;
        }
      });
    },
    /**
     * 元素移动
     */
    handleMove(e) {
      const ev = e || window.event;
      const x = ev.zrX;
      const y = ev.zrY;
      if (this.zr.currentEl) {
        this.zr.currentEl.attr({
          style: {
            x: x - this.currentElPos.x,
            y: y - this.currentElPos.y,
          },
        });
      } else {
        return;
      }
      if (this.zrMark) {
        this.zr.remove(this.zrMark);
      }
    },
    /**
     * @name 鼠标抬起
     * @description
     */
    handleUp() {
      this.zr.currentEl = false;
    },
    /**
     * @name 点击
     * @description 选中操作元素，当前图形
     * */
    handelClick() {
      const _this = this;
      this.zr.on(
        "click",
        async function (e) {
          if (typeof e.target == "object") {
            _this.drawMark(e.target);
            if(e.target.type == 'text'){
              _this.configView = 'configText'
            }else if(e.target.type == 'image'){
              _this.configView = 'configImage'
            }
          } else {
            _this.drawMarkCancle();
          }
        },
        this.zr
      );
    },
    /**
     * @name 元素点击
     * @description 配置面板可配置元素点击事件
     * @param context:可执行上下文，可执行操作元素（图形元素）
     * */
    handleClickEL(context) {
      context.on("mousedown", (e) => {
        console.log(e);
      });
    },
    /**
     * @name 删除元素（图形元素）
     * @description 删除实例上的图形元素，同时调整元素集
     * @param el:元素
     * @param index:元素在元素集合的索引值
     * */
    delEl(el) {
      this.series.filter((item) => {
        return item.id != el.id;
      });
      this.zr.remove(el);
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
        events: this.events,
        series: this.series,
      };
      console.log(options);
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
