<template>
  <div class="home">
    <div id="main" @mousedown="handleDown" @mouseup="handleUp"></div>
    <div class="btns">
      <button type="button" @click="drawArc">画圆</button>
      <input type="text" v-model="text" />
      <button type="button" @click="drawText">文本</button>
      <button type="button" @click="drawImg">图片</button>
      <button type="button" @click="drawSvg">svg</button>
    </div>
    <ul v-if="zr && zr.arr">
      <li v-for="(item, index) in zr.arr" :key="item.id">
        {{ item.name }}+{{ item.id }}
        <button @click="del(item, index)">删除</button>
        <button type="button" @click="update(item)">修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
import od from "../components/lib/";
export default {
  name: "HomeView",
  data() {
    return {
      zr: null,
      text: '文字'
    };
  },
  mounted() {
    this.init();
  },
  watch() { },
  methods: {
    init() {
      const el = document.getElementById("main");
      const w = el.clientWidth;
      const h = el.clientHeight;
      const opts = {
        renderer: "canvas",
        devicePixelRatio: 2,
        width: w,
        height: h,
      };
      this.zr = od.init.init(el, opts);
      this.zr.arr = [];
      this.handelClick();
    },
    //绘制圆
    drawArc() {
      const opts = {
        draggable: true,
        style: {
          fill: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255
            })`,
        },
        shape: {
          cx: Math.random() * 400,
          cy: Math.random() * 400,
          r: 50,
          startAngle: 0,
          endAngle: Math.PI * 2,
          closed: true,
        },
      };
      this.zr.arr.push(od.Displayable.Arc(opts, this.zr));
    },
    //文本
    drawText() {
      const opts = {
        draggable: true,
        rectHover: true,
        style: {
          text: this.text,
          fill: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
          fontSize: '18px',
        },
        position: [Math.random() * 400, Math.random() * 400]
      };
      this.zr.arr.push(od.Displayable.Text(opts, this.zr));
    },
    //矩形
    drawRect() {
      const opts = {
        draggable: true,
        rectHover: true,
        style: {
          text: this.text,
          fill: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
          fontSize: '18px',
        },
        shape: {
          r: 0,//number|number[]	0	用于创建圆角矩形。左上、右上、右下、左下角的半径依次为 r1、 r2、 r3、 r4。r 缩写为 1 相当于 [1, 1, 1, 1]；r 缩写为 [1] 相当于 [1, 1, 1, 1]；r 缩写为 [1, 2] 相当于 [1, 2, 1, 2]；r 缩写为 [1, 2, 3] 相当于 [1, 2, 3, 2]。
          x: 0,//number	0	左上角的横坐标。
          y: 0,//number	0	左上角的纵坐标。
          width: 100,//number	0	宽度。
          height: 50,//
        },
        position: [Math.random() * 400, Math.random() * 400]
      };
      this.zr.arr.push(od.Displayable.Text(opts, this.zr));
    },
    //图片
    drawImg() {
      const opts = {
        style: {
          //string|HTMLImageElement|HTMLCanvasElement	图片的内容，可以是图片的 URL，也可以是 dataURI。
          image: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMTJweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzcHgiIHZpZXdCb3g9IjAgMCA2IDMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI1Ljk5MiwwIDIuOTkyLDMgLTAuMDA4LDAgIi8+PC9zdmc+`,
          x: Math.random() * 400,
          y: Math.random() * 400,
          width: 50,
          height: 25,
        },
      };
      this.zr.arr.push(od.Displayable.Image(opts, this.zr));
    },
    //svg
    drawSvg() {
      const opts = {
        draggable: true,
        rectHover: true,
        style: {
          //string|HTMLImageElement|HTMLCanvasElement	图片的内容，可以是图片的 URL，也可以是 dataURI。
          //image: `data:image/svg+xml;<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="12px" y="0px" width="24px" height="3px" viewBox="0 0 6 3" enable-background="new 0 0 6 3" xml:space="preserve"><polygon points="5.992,0 2.992,3 -0.008,0 "/></svg>`,
          image: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMTJweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzcHgiIHZpZXdCb3g9IjAgMCA2IDMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI1Ljk5MiwwIDIuOTkyLDMgLTAuMDA4LDAgIi8+PC9zdmc+`,
          x: Math.random() * 400,
          y: Math.random() * 400,
          width: 50,
          height: 50,
        },
      };
      this.zr.arr.push(od.Displayable.Image(opts, this.zr));
    },
    //删除
    del(el, index) {
      const _el = el;
      this.zr.arr.splice(index, 1);
      this.zr.remove(_el);
    },
    //修改
    update(el) {
      el.attr({
        style: {
          fill: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255
            })`,
        },
      });
    },
    //鼠标按下
    handleDown(e) {
      const ev = e || window.event;
      const x = ev.zrX;
      const y = ev.zrY;
      if (!this.zr.arr.length) return;
      const state = od.Displayable.contain({ x, y }, this.zr.arr);
      state.then((val) => {
        if (!val) return;
        this.zr.currentEl = val;
      });
    },
    //鼠标抬起
    handleUp() {
      this.zr.currentEl = false;
    },
    //鼠标移动
    handleMove(e) {
      const ev = e || window.event;
      const x = ev.offsetX;
      const y = ev.offsetY;
      if (this.zr.currentEl) {
        const _el = this.zr.currentEl;
        if (!_el) return;
        _el.attr({
          shape: {
            cx: x,
            cy: y,
          },
        });
      }
    },
    /**
     * 点击 
    */
   handelClick(){
    this.zr.on('click',function(e){
      console.log(e)
    },this.zr)
   },
    /**
     * 保存
    */
    save(){
      let options = {
        grid:{
          width:'',// string
          height:'',// string
        },
        events:['click'],
        els:this.zr.arr,// Array
      }
      console.log(options);
    }
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #ff6600cc;
  box-sizing: border-box;

  #main {
    width: 500px;
    height: 500px;
    border: 10px solid #43ad43;
  }

  .btns {
    button {
      width: $buttonw;
      height: $buttonh;
      color: $highlight;
    }
  }
}
</style>
