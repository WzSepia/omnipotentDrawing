<template>
  <div id="main" @mousedown="handleDown" @mouseup="handleUp">board</div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import od from "../lib/index";

let zr = reactive();

onMounted(() => {
  console.log("挂在完成");
  init();
});

function init() {
  createCanvas();
  drawText('考生的分数垃圾分类科技大厦看·1');
  drawImg();
  drawSvg();
}
//创建画布
function createCanvas() {
  const el = document.getElementById("main");
  const w = el.clientWidth;
  const h = el.clientHeight;
  const opts = {
    renderer: "canvas",
    devicePixelRatio: 2,
    width: w,
    height: h,
  };
  zr = od.init.init(el, opts);
  console.log("zr", zr, w, h);
  zr.arr = [];
  handelClick();
}

//绘制文本
function drawText(text) {
  const opts = {
    draggable: true,
    rectHover: true,
    style: {
      text: text,
      fill: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
      fontSize: "38px",
      x: Math.random() * 400,
      y: Math.random() * 400,
    },
  };
  zr.arr.push(od.Displayable.Text(opts, zr));
}

//图片
function drawImg() {
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
  zr.arr.push(od.Displayable.Image(opts, zr));
}

//svg
function drawSvg() {
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
  zr.arr.push(od.Displayable.Image(opts, zr));
}

//鼠标按下
function handleDown(e) {
  const ev = e || window.event;
  const x = ev.zrX;
  const y = ev.zrY;
  if (!zr.arr.length) return;
  const state = od.Displayable.contain({ x, y }, zr.arr);
  state.then((val) => {
    if (!val) return;
    zr.currentEl = val;
  });
}

//鼠标抬起
function handleUp() {
  zr.currentEl = false;
}

//点击
function handelClick() {
  zr.on(
    "click",
    function (e) {
      if (typeof e.target == "object") {
        console.log(e.target);
      }
    },
    zr
  );
}

</script>
<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>

