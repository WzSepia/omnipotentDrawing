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
          <li v-for="(item,index) in lists" :key='item.id' @click='liClick($event,item)'>
            <span>{{item.name}}</span>
            <el-button type="danger" @click="del(item,index)">删除</el-button>
          </li>
        </ul> -->
        <el-tree
          ref="treeRef"
          class="filter-tree"
          :data="lists"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span>{{ node.label }}</span>
              <el-button type="danger" @click="del(data, node)">删除</el-button>
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
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { toRaw } from "@vue/reactivity";
import { setOpts } from "../lib/Options/opts";
import img from '../../assets/img.svg';
export default {
  props: {
    lists: Array,
  },
  data() {
    return {
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
    liClick(e, data) {
      console.log(e, data);
    },
    /**
     * 绘制文本
     * */
    drawText() {
      if (!this.text) return;
      const opts = {
        draggable: true,
        rectHover: true,
        style: {
          text: this.text,
          fill: `rgb(${Math.random() * 255},${Math.random() * 255},${
            Math.random() * 255
          })`,
          fontSize: "38px",
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      };
      this.$emit("render", "text", setOpts(opts));
    },
    //图片
    drawImage() {
      const opts = {
        draggable: true,
        rectHover: true,
        style: {
          //string|HTMLImageElement|HTMLCanvasElement	图片的内容，可以是图片的 URL，也可以是 dataURI。
          image: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMTJweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzcHgiIHZpZXdCb3g9IjAgMCA2IDMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI1Ljk5MiwwIDIuOTkyLDMgLTAuMDA4LDAgIi8+PC9zdmc+`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          width: 50,
          height: 25,
        },
      };
      this.$emit("render", "image", setOpts(opts));
    },
    //删除
    del(el, node) {
      const parent = node.parent;
      const children = parent.data || parent.data.children;
      const index = children.findIndex((d) => {
        return d.id == el.id;
      });
      this.$emit("handleDel", el, index);
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
        img,h1 {
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
