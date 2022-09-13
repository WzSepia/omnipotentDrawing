<template>
  <div class="box">
    <div class="list">
      <p class="title">图层</p>
      <el-input
        v-model="filterText"
        placeholder="搜索"
        :prefix-icon="'Search'"
        clearable
      >
      </el-input>
      <el-scrollbar max-height="310px">
        <!-- <ul>
          <li v-for="item in lists" :key='item.id' @click='liClick($event,item)'>
            <span>{{item.options.name}}</span>
            <el-button type="danger" @click="del(item)">删除</el-button>
          </li>
        </ul> -->
        <el-tree
          ref="treeRef"
          class="filter-tree"
          :data="lis"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="liClick"
        >
          <template #default="{ data }">
            <div class="custom-tree-node">
              <span>{{ data.options.name }}</span>
              <!-- <el-button type="danger" @click="del(data)">删除</el-button> -->
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="btns">
      <p class="title">元素</p>
      <el-scrollbar max-height="280px">
        <ul>
          <li @click="drawText">
            <h1>TEXT</h1>
            <p>文本</p>
          </li>
          <li @click="drawImage">
            <img src="@/assets/img.svg" alt="图片" />
            <p>图片</p>
          </li>
          <li @click="renderImage">
            <img src="@/assets/img.svg" alt="图片" />
            <p>模拟绘制</p>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { reactive } from 'vue';
import { toRaw } from "@vue/reactivity";
import { setOpts } from "../lib/Options/opts";
import img from "../../assets/img.svg";
export default {
  props: {
    lists: Array,
  },
  data() {
    return {
      lis: [],
      text: "我是文本",
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  mounted() {},
  watch: {
    lists: {
      handler(val) {
        if (!val) return;
        this.lis = this.lists;
        this.lis.filter((item) => {
          return item.type != "mark";
        });
      },
      deep: true,
    },
    filterText(val) {
      this.$refs["treeRef"].filter(val);
    },
  },
  methods: {
    /**
     * 菜单筛选
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.name.includes(value);
    },
    /**
     *
     */
    liClick(node) {
      console.log(node);
      this.$parent.configBoardImage(node);
      this.$parent.drawMark(node);
    },
    /**
     * 绘制文本
     * */
    drawText() {
      const _this = this;
      if (!this.text) return;
      const opts = {
        draggable: true,
        rectHover: true,
        x: Math.round(Math.random() * 300),
        y: Math.round(Math.random() * 300),
        style: {
          text: this.text,
          fill: `rgb(${Math.round(Math.random() * 255)},${Math.round(
            Math.random() * 255
          )},${Math.round(Math.random() * 255)})`,
          fontFamily: "微软雅黑",
          fontSize: "38px",
          textWidth: 100,
          textHeight: 40,
          truncate: {
            ellipsis: "...",
            outerWidth: 100,
            outerHeight: 40,
          },
          //文字位置'inside'、 'left'、 'right'、 'top'、 'bottom'
          textPosition: "left",
        },
        zlevel: 2,
        onclick() {
          _this.$parent.configBoardText(this);
          _this.$parent.drawMark(this);
        },
        ondrag() {
          _this.$parent.configBoardText(this);
          _this.$parent.drawMarkCancle();
        },
      };
      this.$emit("render", "text", opts); //setOpts(opts)
    },
    //图片
    drawImage() {
      const _this = this;
      const opts = {
        draggable: true,
        // rectHover: true,
        x: Math.round(Math.random() * 300),
        y: Math.round(Math.random() * 300),
        style: {
          image: img,
          width: 50,
          height: 50,
        },
        zlevel: 1,
        onclick() {
          _this.$parent.configBoardImage(this);
          _this.$parent.drawMark(this);
        },
        ondrag() {
          _this.$parent.configBoardImage(this);
          _this.$parent.drawMarkCancle();
        },
      };
      this.$emit("render", "image", opts); //setOpts(opts)
    },
    //删除
    del(el) {
      this.$emit("handleDel", el);
    },
    /**
     * 有数据情况下的绘制-模拟
     */
    renderImage() {
      const series = this.$parent.saveData.series;
      series.forEach((element) => {
        this.$parent.odRender(element.options.type, element);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .list {
    width: 100%;
    height: 390px;
    .title {
      color: var(--color);
      height: 35px;
      line-height: 35px;
      text-align: left;
      text-indent: 35px;
      border-bottom: 1px solid var(--color);
    }
    ::v-deep(.el-input) {
      background-color: transparent;
      .el-input__wrapper {
        box-shadow: none;
        background-color: transparent;
        border-bottom: 1px solid var(--color);
        .el-input__inner {
          color: var(--color);
        }
      }
    }
    ::v-deep(.el-tree) {
      color: var(--color);
      background-color: transparent;
      .el-tree-node {
        margin: 10px 0;
        .el-tree-node__content {
          height: auto;
        }
        &.is-current {
          background-color: var(--bg-li-color-hover);
          .el-tree-node__content {
            background-color: var(--bg-li-color-hover);
          }
        }
        .el-tree-node__content:hover,
        .el-tree-node__content:focus {
          background-color: var(--bg-li-color-hover);
        }
        .custom-tree-node {
          flex: 1;
          height: 32px;
          line-height: 32px;
          display: flex;
          justify-content: space-between;
          color: var(--color);
          text-align: left;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        color: var(--color);
        text-align: left;
        margin: 5px 0;
        padding: 0 10px;
        box-sizing: border-box;
        &.is-current {
          background-color: var(--bg-li-color-hover);
        }
      }
    }
  }
  .btns {
    width: 100%;
    height: calc(100% - 310px);
    .title {
      color: var(--color);
      height: 35px;
      line-height: 35px;
      text-align: left;
      text-indent: 35px;
      border-top: 1px solid var(--color);
      border-bottom: 1px solid var(--color);
    }
    ul {
      width: 100%;
      clear: both;
      content: "";
      li {
        width: 90px;
        height: 110px;
        float: left;
        color: var(--color);
        border-radius: 4px;
        list-style: none;
        margin: 8px;
        cursor: pointer;
        img,
        h1 {
          width: 90px;
          height: 90px;
          line-height: 90px;
        }
        p {
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: var(--color);
          text-align: center;
        }
      }
    }
  }
}
</style>
