<template>
  <div class="box">
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
              <el-form-item label="img/svg">
                <el-select v-model="bgimg" @change="bgImgSelect">
                  <el-option label="--请选择--" value="0"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="btns">
              <el-upload
                v-model:file-list="fileList"
                ref="uploadRef"
                class="upload-demo"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="bgImgUpload"
              >
                <template #trigger>
                  <el-button type="primary" circle :icon="'Upload'"></el-button>
                </template>
              </el-upload>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "OdConfig",
  props: {},
  data() {
    return {
      activeNames: "1",
      fileList: [], //上传文件
      bgimg: "", //
      grid: {
        width: null,
        height: null,
        backgroundImage: "",
      },
      config: {},
    };
  },
  watch: {
    // 该回调将会在被侦听的对象的属性改变时调动，无论其被嵌套多深
    // grid: {
    //   handler(data) {
    //     console.log(data)
    //   },
    //   deep: true
    // },
  },
  mounted() {},
  methods: {
    /**
     * @name 确认画布大小配置
     * @description 配置图形容器大小，也是画布大小，调用创建和更新画布
     */
    sureGrid() {
      if (!this.grid.width || !this.grid.height) return;
      Object.assign(this.$parent.grid, this.grid);
      if (!!this.$parent.zr) {
        this.$parent.resize();
      } else {
        this.$parent.init();
      }
    },
    /**
     * 画布背景图设置
     */
    bgImgUpload(file) {
      const _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        _this.grid.backgroundImage = e.target.result;
        _this.$parent.grid.backgroundImage = e.target.result;
        const el = document.getElementById("board-main");
        el.style.backgroundImage = "url(" + _this.grid.backgroundImage + ")";
      };
    },
    /**
     * @name 容器背景图片选择
     * @description 背景图base64编码
     */
    bgImgSelect(data) {
      console.log(data);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
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
    .el-collapse-item__header {
      height: 35px;
      text-indent: 14px;
      background-color: var(--bg-li-color-header);
    }
    .el-collapse-item__wrap {
      border-bottom: none;
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
</style>
