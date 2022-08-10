<template>
  <div class="home">
    <div id="main" @mousedown="handleDown" @mouseup="handleUp" @mousemove="handleMove"></div>
    <div class="btns">
      <button type="button" @click="drawArc"> 画圆 </button>
      <button type="button" @click="del"> 删除 </button>
      <button type="button" @click="update"> 修改 </button>
    </div>
    <ul v-if="zr && zr.arr">
      <li v-for="item in zr.arr" :key="item.id">
      {{item.name}}+{{item.id}}
      <button @click="del(item)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import init from "../components/lib/init";
import Displayable from "../components/lib/Displayable";
export default{
  name:'HomeView',
  data(){
    return{
      zr:null,
    }
  },
  mounted(){
    this.init();
  },
  watch(){
    
  },
  methods:{
    init(){
      const el = document.getElementById('main');
      const w = el.clientWidth;
      const h = el.clientHeight;
      const opts = {
        renderer: 'canvas',
        devicePixelRatio: 2,
        width: w,
        height: h,
      }
      this.zr = init.init(el,opts);
      this.zr.arr = [];
    },
    //绘制
    drawArc(){
      const opts = {
          style:{
            fill:'#f00'
          },
          shape:{
            cx: 0,//Math.random()*400,
            cy: 0,//Math.random()*400,
            r: 50,
            startAngle: 0,
            endAngle: Math.PI * 2,
            closed: true,
        }
      }
      this.zr.arr.push(Displayable.Arc(this.zr,opts));
    },
    //删除
    del(el){
      const _el =  el;
      this.zr.arr.splice(0,1);
      this.zr.remove(_el);
    },
    //修改
    update(){
      const _el = this.zr.arr[0];
      _el.attr({
        style:{
          fill:'#00f'
        }
      });
    },
    //鼠标按下
    handleDown(e){
      const ev = e || window.event;
      const x = ev.zrX;
      const y = ev.zrY;
      if(!this.zr.arr.length) return;
      const state = Displayable.contain({x,y},this.zr.arr);
      state.then(val=>{
        if(!val) return;
        this.zr.currentEl = val;
      })
    },
    //鼠标抬起
    handleUp(){
      this.zr.currentEl = false;
    },
    //鼠标移动
    handleMove(e){
      const ev = e || window.event;
      const x = ev.offsetX;
      const y = ev.offsetY;
      if(this.zr.currentEl){
        const _el = this.zr.currentEl;
        if(!_el) return;
        _el.attr({
          position:[x,y]
        });
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  background-color: #ff6600cc;
  box-sizing: border-box;
  #main{
    width:500px;
    height:500px;
    border: 10px solid #43ad43;
    margin-top: 200px;
  }
}
</style>
