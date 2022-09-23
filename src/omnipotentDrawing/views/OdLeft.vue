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
        <ul :key="lists.length">
          <li v-for="item in lis" :key="item.id" :class="(currentID == item.id?'is-current':'')" @click="liClick(item)">
            {{item.options.name}}
          </li>
        </ul>
        <!--        <el-tree-->
        <!--          ref="treeRef"-->
        <!--          class="filter-tree"-->
        <!--          :data="lis"-->
        <!--          :props="defaultProps"-->
        <!--          default-expand-all-->
        <!--          :filter-node-method="filterNode"-->
        <!--          @node-click="liClick"-->
        <!--        >-->
        <!--          <template #default="{ data }">-->
        <!--            <div :class="'custom-tree-node' + data.id ">-->
        <!--              <span>{{ data.options.name }}</span>-->
        <!--              &lt;!&ndash; <el-button type="danger" @click="del(data)">删除</el-button> &ndash;&gt;-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-tree>-->
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
            <img :src="img" alt="图片"/>
            <p>图片</p>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
    /* eslint-disable */
    import {ElScrollbar, ElTree, ElInput} from 'element-plus';
    import imgDemo from '../../assets/img.svg';
    export default {
        props: {
            currentID: Number || String,
            configEl: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            lists: Array,
        },
        components: {
            ElScrollbar,
            ElTree,
            ElInput
        },
        data() {
            return {
                filterText: "",
                defaultProps: {
                    children: "children",
                    label: "name",
                },
                img:imgDemo
            };
        },
        computed:{
            lis(){
                return this.lists.filter(item=>{
                    return item.options.name.includes(this.filterText);
                })
            }
        },
        mounted() {

        },
        watch: {
            // filterText(val) {
            //     // this.$refs["treeRef"].filter(val);
            //     this.lis = this.lists.filter(item => {
            //         return item.options.name.includes(val);
            //     })
            // },
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
                if (node.options.type == 'text') {
                    this.$parent.configBoardText(node);
                } else if (node.options.type == 'image') {
                    this.$parent.configBoardImage(node);
                }
                this.$parent.drawMark(node);
            },
            /**
             * 绘制文本
             * */
            drawText() {
                this.$emit("render", "text"); //setOpts(opts)
            },
            //图片
            drawImage() {
                this.$emit("render", "image"); //setOpts(opts)
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
        color: var(--light-color);
        height: 40px;
        line-height: 40px;
        text-align: left;
        text-indent: 15px;
        border-bottom: 1px solid var(--color);
      }

      ::v-deep(.el-input) {
        width: 90%;
        background-color: transparent;
        margin-left: 5%;
        border-radius: 0;

        .el-input__wrapper {
          width: 90%;
          box-shadow: none;
          background-color: transparent;
          border-bottom: 1px solid var(--color);
          border-radius: 0;

          .el-input__inner {
            color: var(--color);
          }
        }
      }

      ul {
        color: var(--color);
        background-color: transparent;
        padding: 0 10px;
        text-align: left;

        li {
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          text-indent: 18px;

          &:hover {
            background-color: var(--bg-list-item-hover-color);
          }

          &.is-current {
            background-color: var(--bg-list-item-hover-color);
          }
        }
      }

      ::v-deep(.el-tree) {
        color: var(--color);
        background-color: transparent;

        .el-tree-node {
          .el-tree-node__content {
            height: 50px;

            span {
              font-size: 14px;
            }
          }

          &.is-current {
            background-color: var(--bg-list-item-hover-color);

            .el-tree-node__content {
              background-color: var(--bg-list-item-hover-color);
            }
          }

          .el-tree-node__content:hover,
          .el-tree-node__content:focus {
            background-color: var(--bg-list-item-hover-color);
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
            font-size: 28px;
            text-align: center;
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
