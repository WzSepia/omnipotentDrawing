<template>
  <div class="box">
    <header class="header">
      <h1>个性化组件配置界面</h1>
      <div class="active">
        <el-button type="primary" @click="changeTheme">切换主题</el-button>
        <el-button type="primary" circle :icon="'Checked'" title="保存" @click="save"></el-button>
        <el-button type="info" circle :icon="'Close'" title="关闭" @click="$emit('close')"></el-button>
      </div>
    </header>
    <main class="main">
      <div class="left">
        <od-left
          ref="od_left"
          @render="odRender"
          @handleDel="delEl"
          :lists="series && series.length ? series : []"
          :currentID = 'currentEl?currentEl.id:null'
        />
      </div>
      <div class="board">
        <div class="header">
          <el-input v-model="grid.name" placeholder="个性化组件名称"></el-input>
          <el-button type="primary" title="显示参数名称" disabled>T</el-button>
          <el-button
            type="primary"
            :icon="'View'"
            title="辅助线显示关闭"
            @click="gridLine = !gridLine"
          ></el-button>
        </div>
        <div :class="'board-box' + (gridLine?' grid-line':'')">
          <el-scrollbar>
            <div id="board-main"></div>
          </el-scrollbar>
        </div>
      </div>
      <div class="config">
        <div class="title">配置</div>
        <component :is="configView" v-model:configEl="config" :text="theme"/>
      </div>
    </main>
  </div>
</template>

<script>
    /* eslint-disable */
    import OdLeft from "./OdLeft.vue";
    import configBox from "../components/configs/configBox.vue";
    import configText from "../components/configs/configText.vue";
    import configImage from "../components/configs/configImage.vue";
    import imgDemo from "@/assets/img.svg";
    import {ElButton, ElInput, ElScrollbar,ElMessage} from 'element-plus';
 
    import qs from "qs";

    export default {
        props:{
            curConfig:String,
        },
        components: {
            OdLeft,
            configBox,
            configText,
            configImage,
            ElButton,
            ElInput,
            ElScrollbar,
            ElMessage
        },
        data() {
            return {
                theme: "light",
                img:imgDemo,
                gridLine:true,
                zr: null,
                zrMark: null,
                grid: {
                    name:'个性化组件名称',
                    width: 500,
                    height: 500,
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
            if(this.curConfig){
                let configObj = JSON.parse(this.curConfig);
                this.grid = configObj.grid;
                this.init();
                if(configObj.series&&configObj.series.length>0){
                    configObj.series.forEach(item=>{
                        this.odRender(item.options.type, item);
                    });
                }
            }else{
                this.init();
            }
        },
        methods: {
            //初始化方法
            init() {
                this.createCanvas();
            },
            //创建画布
            createCanvas() {
                const el = document.getElementById("board-main");
                el.style.width = this.grid.width + 'px';
                el.style.height = this.grid.height + 'px';
                el.style.backgroundImage = "url(" + this.grid.backgroundImage + ')';
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
                const el = document.getElementById("board-main");
                el.style.width = this.grid.width + 'px';
                el.style.height = this.grid.height + 'px';
                this.zr.resize({
                    width:this.grid.width,
                    height:this.grid.height
                });
            },
            /**
             * @name 绘制方法集合
             * @description 包含文本，图片，形状等绘制方法
             */
            odRender(type, opt) {
                switch (type) {
                    case "text":
                        this.drawText(opt);
                        break;
                    case "image":
                        this.drawImg(opt);
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
            drawText(opt) {
                const _this = this;
                const opts = {
                    draggable: true,
                    rectHover: true,
                    x: (opt ? opt.x : null) || Math.round(Math.random() * 20),//(this.grid.width)
                    y: (opt ? opt.y : null) || Math.round(Math.random() * 20),//(this.grid.height)
                    style: {
                        text: (opt ? opt.style.text : null) || "我是文本",
                        fill:(opt ? opt.style.fill : '#000000'),
                            // (opt ? opt.style.fill : null) ||
                            // `rgb(${Math.round(Math.random() * 255)},${Math.round(
                            //     Math.random() * 255
                            // )},${Math.round(Math.random() * 255)})`,
                        fontFamily: (opt ? opt.style.fontFamily : null) || "微软雅黑",
                        fontSize: (opt ? opt.style.fontSize : null) || "18px",
                        // textWidth: (opt ? opt.style.textWidth : null) || 100,//仅设置背景色时有效
                        // textHeight: (opt ? opt.style.textHeight : null) || 40,//仅设置背景色时有效
                        width: (opt ? opt.style.width : null) || 100,
                        height: (opt ? opt.style.height : null) || 40,
                        overflow:(opt ? opt.style.overflow : 'truncate'),//break,breakAll,truncate
                        //文字位置'inside'、 'left'、 'right'、 'top'、 'bottom'
                        textPosition: (opt ? opt.style.textPosition : "inside"),
                    },
                    zlevel: 2,
                    onMousedown(){
                        _this.currentEl = this;
                    },
                    onclick() {
                        _this.configBoardText(this);
                        _this.drawMark(this);
                    },
                    ondrag() {
                        _this.configBoardText(this);
                        _this.drawMarkCancle();
                    },
                };
                const text = new this.$od.Text(opts);
                text.attr({
                    options: {
                        type: (opt ? opt.options.type : null) || "text",
                        name: (opt ? opt.options.name : null) || "text" + text.id,
                        code: (opt ? opt.options.code : null) || "text" + text.id, //图片代码
                        checked: (opt ? opt.options.checked : null) || false, //是否默认选中
                        jumpNumber: {
                            //跳数
                            show: (opt ? opt.options.jumpNumber.show : null) || false,
                            time: (opt ? opt.options.jumpNumber.time : null) || null,
                            split: (opt ? opt.options.jumpNumber.split : null) || null,
                        },
                    },
                });
                this.zr.add(text);
                this.series.push(text);
            },
            /**
             * @name 图片（包括SVG）
             * @description
             */
            drawImg(opt) {
                const _this = this;
                const opts = {
                    draggable: true,
                    // rectHover: true,
                    x: (opt ? opt.x : null) || Math.round(Math.random() * 20),
                    y: (opt ? opt.y : null) || Math.round(Math.random() * 20),
                    style: {
                        image: (opt ? opt.style.image : null) || this.img,
                        width: (opt ? opt.style.width : null) || 50,
                        height: (opt ? opt.style.height : null) || 50,
                    },
                    zlevel: 1,
                    onMousedown(){
                        _this.currentEl = this;
                    },
                    onclick() {
                        _this.configBoardImage(this);
                        _this.drawMark(this);
                    },
                    ondrag() {
                        _this.configBoardImage(this);
                        _this.drawMarkCancle();
                    },
                };
                const img = new this.$od.Image(opts);
                img.attr({
                    options: {
                        type: (opt ? opt.options.type : null) || "image",
                        name: (opt ? opt.options.name : null) || "image" + img.id,
                        code: (opt ? opt.options.code : null) || "image" + img.id, //图片代码
                        checked: (opt ? opt.options.checked : null) || false, //是否默认选中
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
                if (el) this.currentEl = el;
                if(!this.currentEl) return;
                const box = this.currentEl.getBoundingRect();
                this.drawMarkCancle();
                this.zrMark = new this.$od.Rect({
                    draggable: false,
                    x: this.currentEl.x - 5,
                    y: this.currentEl.y - 5,
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
                this.zr
                    .on("click", async function (e) {
                        if (!e.target) {
                            _this.drawMarkCancle();
                            _this.config = _this.grid;
                            _this.currentEl = null;
                            _this.configView = "configBox";
                        }
                    })
                    .on("mouseup", async function (e) {
                        if (e.target) {
                            _this.drawMark();
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
                    return item.id != ele.id;
                });
                this.drawMarkCancle();
                this.configView = "configBox";
            },
            /**
             * @name 配置文本
             */
            configBoardText(el) {
                this.currentEl = el;
                this.config.x = el.x;
                this.config.y = el.y;
                (this.config.options = this.configBoardOptions(el, "text")),
                    (this.config.style = {
                        text: el.style.text,
                        fill: el.style.fill,
                        fontFamily: el.style.fontFamily,
                        fontSize: el.style.fontSize,
                        width: el.style.width,
                        height: el.style.height,
                        overflow: el.style.overflow,
                        // truncate: {
                        //     ellipsis: el.style.truncate.ellipsis,
                        //     outerWidth: el.style.textWidth,
                        //     outerHeight: el.style.textHeight,
                        // },
                        textPosition: el.style.textPosition,
                    });
                this.configView = "configText";
            },
            /**
             * @name 配置图片
             */
            configBoardImage(el) {
                this.currentEl = el;
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
             * @name 创建实例容器
             * @description 图形创建时直接创建分析实例
             * */
            async createFxsl(){
                console.log('创建容器成功');
            },

            /**
             * @name 创建图形
             */
            createTx(){
                let options = {
                    grid: this.grid,
                    events: null,
                    series: [],
                };
                this.series.forEach((item) => {
                    let opt = {};
                    if (item.options.type == "text") {
                        opt = {
                            rectHover: true,
                            x: item.x,
                            y: item.y,
                            options: item.options,
                            style: item.style,
                            zlevel: item.zlevel,
                        };
                    } else if (item.options.type == "image") {
                        opt = {
                            x: item.x,
                            y: item.y,
                            options: item.options,
                            style: item.style,
                            zlevel: item.zlevel,
                        };
                    }
                    options.series.push(opt);
                });
                console.log('保存成功',options);
            },
            /**
             * @name 保存数据，
             * @description 保存现有配置下的图形数据
             * @param grid:网格，容器数据
             * @param events:事件信息或方法
             * @param series:展示和绘制的图形数据
             */
            save() {
                if(this.curConfig){
                    this.createTx(this.$store.state.curComponent.defaultSetting);
                }else {
                    this.createFxsl();
                }
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
    *{
      transition: all 0s ease 0s;
    }

    .header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      clear: both;
      content: "";

      ::v-deep(.el-input){
        .el-input__inner{
          color: var(--color);
        }
      }

      h1 {
        font-size: 20px;
        color: var(--color);
        float: left;
        font-weight: bold;
        letter-spacing: 7px;
        -webkit-background-clip: text;
        -webkit-text-fill-color: var(--color);
      }

      div.active {
        float: right;
        ::v-deep(.el-button){
          color: #f2f2f2;
          .el-icon{
            color: #f2f2f2;
          }
        }
      }
    }

    .main {
      height: calc(100% - 50px);
      display: flex;
      flex-direction: row;
      flex: 1;

      .left {
        width: 240px;
        background-color: var(--bg-box-color);
        box-shadow: 3px 0 10px 1px var(--shadow-box-color);
        *{
          font-size: 16px;
        }
      }

      .board {
        flex: 1;
        background-color: var(--bg-board-color);

        .header {
          height: 40px;
          line-height: 40px;
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

          ::v-deep(.el-button){
            color: #f2f2f2;
            .el-icon{
              color: #f2f2f2;
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
            ),
            linear-gradient(
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
        width: 310px;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-box-color);
        box-shadow: -3px 0 10px 1px var(--shadow-box-color);

        .title {
          color: var(--light-color);
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          text-align: left;
          text-indent: 15px;
          border-bottom: 1px solid var(--color);
        }
      }
    }
  }
</style>
