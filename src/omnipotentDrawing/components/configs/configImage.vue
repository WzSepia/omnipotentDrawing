<template>
  <div class="box">
    <el-form :model="config" ref="formConfig" size="small" :inline="true">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="1">
          <div>
            <div class="content">
              <el-form-item label="图片内容">
                <el-select v-model="image">
                    <el-option label='--请选择--' value='0'></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-upload
                v-model:file-list="fileList"
                ref="uploadRef"
                class="upload-demo"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="imageUpload"
              >
                <template #trigger>
                  <el-button type="primary" circle :icon="'Upload'"></el-button>
                </template>
              </el-upload>
              <el-button
                type="primary"
                circle
                :icon="'Delete'"
                @click="del"
              ></el-button>
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
  props: {
    element,
  },
  data() {
    return {
      activeNames: "1",
      fileList: [], //上传文件
      image:'0',
      config: {
        image:'',//图片内容
      },
    };
  },
  watch: {
  },
  mounted() {},
  methods: {
    /**
     * 画布背景图设置
     */
    imageUpload(file) {
      const _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        _this.grid.backgroundImage = e.target.result;
        _this.$parent.grid.backgroundImage = e.target.result;

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
