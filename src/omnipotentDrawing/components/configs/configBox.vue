<template>
  <div class="box">
    <el-form :model="config" ref="formConfig" size="small" :inline="true">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="1">
          <div>
            <el-form-item label="画布大小">
              <el-form-item label="宽" label-width="23px" align="center">
                <el-input
                  class="small"
                  v-model.number="grid.width"
                  placeholder="px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="长" label-width="23px" align="center">
                <el-input
                  class="small"
                  v-model.number="grid.height"
                  placeholder="px"
                >
                </el-input>
              </el-form-item>
            </el-form-item>
            <div class="btns">
              <el-button
                type="primary"
                circle
                :icon="'Check'"
                @click="sureGrid"
              ></el-button>
            </div>
          </div>

          <div>
            <el-form-item label="背景图片  img/svg">
              <el-select v-model="bgimg" @change="bgImgSelect">
                <el-option label="--请选择--" value="0"></el-option>
              </el-select>
            </el-form-item>
            <div class="btns">
              <el-upload
                v-model:file-list="fileList"
                ref="uploadRef"
                action=""
                class="upload-demo"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="bgImgUpload"
              >
                <template #trigger>
                  <el-button type="primary" circle :icon="'Upload'"></el-button>
                </template>
              </el-upload>
              <el-button type="primary" circle :icon="'Delete'" @click="delBgImage()"></el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
    /* eslint-disable */
    import {
        ElScrollbar,
        ElForm,
        ElFormItem,
        ElCollapse,
        ElCollapseItem,
        ElInput,
        ElSwitch,
        ElColorPicker,
        ElRadioGroup,
        ElRadio,
        ElButton,
        ElInputNumber,
        ElSelect,
        ElOption,
        ElUpload
    } from 'element-plus';
    import {Check, Delete, Upload} from '@element-plus/icons-vue';

    export default {
        name: "OdConfig",
        props: {
            configEl: {
                type: Object,
                default: () => {
                    return null
                }
            }
        },
        components: {
            ElScrollbar,
            ElForm,
            ElFormItem,
            ElCollapse,
            ElCollapseItem,
            ElInput,
            ElSwitch,
            ElColorPicker,
            ElRadioGroup,
            ElRadio,
            ElButton,
            ElInputNumber,
            ElSelect,
            ElOption,
            ElUpload,
            Check,
            Delete,
            Upload
        },
        data() {
            return {
                activeNames: "1",
                fileList: [], //上传文件
                bgimg: "0", //
                grid: {
                    width: this.configEl.width,
                    height: this.configEl.height,
                    backgroundImage: this.configEl.backgroundImage,
                },
                config: {},
            };
        },
        mounted() {
        },
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
            /**
             * @name 容器背景图片删除
             * @description 背景图base64编码
             * */
            delBgImage() {
                this.grid.backgroundImage = null;
                this.$parent.grid.backgroundImage = null;
                const el = document.getElementById("board-main");
                el.style.backgroundImage = "url(" + null + ")";
            }
        },
    };
</script>
<style lang="scss" scoped>
  @import './css/index.scss';
</style>
