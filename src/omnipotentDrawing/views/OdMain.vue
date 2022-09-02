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
        <div id="board-main" @mousedown="handleDown" @mouseup="handleUp"></div>
      </div>
      <div class="config">
        <od-config :grid="grid" />
      </div>
    </main>
  </div>
</template>

<script>
import od from "../lib/index";
import OdLeft from "./OdLeft.vue";
import OdConfig from "./OdConfig.vue";
import { toRaw } from "@vue/reactivity";
export default {
  components: {
    OdLeft,
    OdConfig,
  },
  data() {
    return {
      theme: "dark",
      zr: null,
      grid: {}, //画布设置数据
      events: [], //事件数据
      series: [], //画布元素集
    };
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
      const opts = {
        renderer: "canvas",
        devicePixelRatio: 2,
        width: this.grid.width,
        height: this.grid.height,
      };
      this.zr = od.init.init(el, opts);
      // this.handelClick();
    },

    //绘制方法集合
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
    //绘制文本
    drawText(opts) {
      const text = od.Displayable.Text(opts);
      this.handleClickEL(text);
      this.zr.add(text);
      this.series.push(text);
    },
    //图片（包括SVG）
    drawImg(opts) {
      const img = od.Displayable.Image(opts);
      this.zr.add(img);
      this.series.push(img);
    },
    /**
     * 鼠标按下
     * */
    handleDown(e) {
      const ev = e || window.event;
      const x = ev.zrX;
      const y = ev.zrY;
      if (!this.series.length) return;
      const state = od.Displayable.contain({ x, y }, this.series);
      state.then((val) => {
        if (!val) return;
        this.zr.currentEl = val;
      });
    },
    //鼠标抬起
    handleUp() {
      this.zr.currentEl = false;
    },
    //点击
    handelClick() {
      this.zr.on(
        "click",
        function (e) {
          if (typeof e.target == "object") {
            console.log(e.target);
          }
        },
        this.zr
      );
    },
    /**
     * 元素点击
     * */
    handleClickEL(context) {
      context.on("mousedown", (e) => {
        console.log(e);
      });
    },
    /**
     * @description 删除
     * @param el:元素
     * @param index:元素在元素集合的索引值
     * */
    delEl(el, index) {
      console.log("el, index", toRaw(el), index);
      this.zr.remove(el);
      this.series.splice(index, 1);
    },
    /**
     * @description 保存
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
     * 关闭
     */
    close() {
      this.$message({
        message: "关闭页面",
        type: "error",
      });
    },
    //切换主题
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
      }
    }
    .config {
      width: 330px;
    }
  }
}
</style>
