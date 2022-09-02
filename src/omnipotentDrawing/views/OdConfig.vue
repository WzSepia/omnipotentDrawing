<template>
  <div class="box">
    <div class="title">配置</div>
    <div class="main">
      <el-form :model="config" ref="formConfig" size="small" :inline="true">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基础信息" name="1">
            <div>
              <p>画布大小</p>
              <div class="content">
                <el-form-item label="宽">
                  <el-input
                    class="small"
                    v-model.number="grid.width"
                    placeholder="px"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="长">
                  <el-input
                    class="small"
                    v-model.number="grid.height"
                    placeholder="px"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="btns">
                <el-button
                  type="primary"
                  round
                  :icon="'Check'"
                  @click="sureGrid"
                ></el-button>
              </div>
            </div>
            <div>
              <p>背景图片</p>
              <div class="content">
                <el-form-item label="宽">
                  <el-select v-model="grid.backgroundImage">
                    <el-option label="--请选择--" value='0'></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="btns">
                <el-button
                  type="primary"
                  round
                  :icon="'Check'"
                  @click="sureGrid"
                ></el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "OdConfig",
  props: {},
  data() {
    return {
      activeNames: "1",
      grid: {
        width: null,
        height: null,
      },
      config: {},
    };
  },
  mounted() {},
  methods: {
    /**
     * 确认画布大小配置
     */
    sureGrid() {
      this.$parent.grid = this.grid;
      this.$parent.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    color: var(--color);
    height: 35px;
    line-height: 35px;
    text-align: left;
    text-indent: 35px;
    border-bottom: 1px solid var(--color);
  }
  .main {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    ::v-deep(.el-collapse) {
      background-color: transparent;
      .el-collapse-item__header,
      .el-collapse-item__wrap,
      .el-collapse-item__content {
        color: var(--color);
        background-color: var(--bg-li-color);
      }
      .el-collapse-item__header{
        height: 35px;
        text-indent: 14px;
        background-color: var(--bg-li-color-header)
      }
      .el-collapse-item__content {
        padding: 10px 0;
        > div {
          display: flex;
          p {
            width: 60px;
          }
          .content {
            flex: 1;
          }
          .btns {
            width: 80px;
          }
        }
        .el-form-item {
          margin-right: 6px;
          .el-form-item__label {
            color: var(--color);
          }
          .el-form-item__content {
            .small {
              width: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
