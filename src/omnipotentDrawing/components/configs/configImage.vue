<template>
  <div class="box">
    <el-form
      :model="config"
      ref="formConfig"
      size="small"
      :inline="true"
      label-width="64px"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="1">
          <div>
            <el-form-item label="图片内容">
              <el-select class="big" v-model="image" @change="select">
                <el-option
                  v-for="item in imgs"
                  :key="item.name"
                  :label="item.name"
                  :value="item.img"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="btns">
              <el-upload
                v-model:file-list="fileList"
                ref="uploadRef"
                class="upload-demo"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="upload"
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
          </div>
          <div>
            <el-form-item label="图片代码">
              <el-input class="big" v-model="config.options.code" clearable></el-input>
            </el-form-item>
            <div class="btns">
<!--              <el-button-->
<!--                type="primary"-->
<!--                circle-->
<!--                :icon="'Delete'"-->
<!--                @click="delCode"-->
<!--              ></el-button>-->
            </div>
          </div>
          <div>
            <el-form-item label="默认选中">
              <el-switch
                v-model="config.options.checked"
                @change="checkedChange()"
              />
            </el-form-item>
          </div>
          <div>
            <div class="xywh">
              <el-form-item label="位置尺寸">
                <el-form-item label="X" label-width="20px">
                  <el-input-number
                    v-model.number="config.x"
                    class="default"
                    placeholder="px"
                    controls-position="right"
                  />
                </el-form-item>
                <el-form-item label="Y" label-width="20px">
                  <el-input-number
                    v-model.number="config.y"
                    class="default"
                    placeholder="px"
                    controls-position="right"
                  />
                </el-form-item>

                <el-form-item label="W" label-width="20px">
                  <el-input-number
                    v-model.number="config.style.width"
                    class="default"
                    placeholder="px"
                    controls-position="right"
                  />
                </el-form-item>

                <el-form-item label="H" label-width="20px">
                  <el-input-number
                    v-model.number="config.style.height"
                    class="default"
                    placeholder="px"
                    controls-position="right"
                  />
                </el-form-item>
              </el-form-item>
            </div>
            <div class="btns">
              <el-button
                type="primary"
                circle
                :icon="'Refresh'"
                @click="xywhChange()"
              ></el-button>
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
        ElUpload,
        ElSelect,
        ElOption
    } from 'element-plus';

    export default {
        name: "configImage",
        props: {
            configEl: Object,
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
            ElUpload,
            ElSelect,
            ElOption
        },
        data() {
            return {
                activeNames: "1",
                fileList: [], //上传文件
                image: this.configEl.style.image || "--请选择--",
                imgs: [],
                config: {},
            };
        },
        watch: {
            // 侦听单个嵌套属性：
            "configEl.x": {
                handler(val) {
                    this.config.x = val;
                    this.config.y = this.configEl.y;
                },
                deep: true,
            },
        },
        beforeMount() {
            this.config = this.configEl;
        },
        mounted() {
        },
        methods: {
            /**
             * @name 图片选择
             * @description 图片base64编码
             */
            select(data) {
                this.config.style.image = data;
                this.$parent.currentEl.attr({
                    style: {
                        image: this.config.style.image,
                    },
                });
            },
            /**
             * 图片上传
             */
            upload(file) {
                const _this = this;
                var reader = new FileReader();
                reader.readAsDataURL(file.raw);
                reader.onload = function (e) {
                    _this.config.style.image = e.target.result;
                    _this.$parent.currentEl.attr({
                        style: {
                            image: _this.config.style.image,
                        },
                    });
                    _this.image = "--请选择--";
                };
            },
            /**
             * @name 图片删除
             * @description 删除当前图片元素
             */
            del() {
                this.$parent.delEl();
            },
            /**
             * @name 代码改变
             * @description 修改当前图片元素代码
             */
            codeChange() {
                this.$parent.currentEl.attr({
                    options: {
                        code: this.config.options.code,
                    },
                });
            },
            /**
             * @name 代码删除
             * @description 删除当前图片元素代码
             */
            delCode() {
                this.config.options.code = null;
                this.codeChange();
            },
            /**
             * @name 是否选中
             */
            checkedChange() {
                this.$parent.currentEl.options.checked = this.config.options.checked;
            },
            /**
             * @name 刷新
             */
            xywhChange() {
                this.$parent.currentEl.attr({
                    x: this.config.x,
                    y: this.config.y,
                    style: {
                        width: this.config.style.width,
                        height: this.config.style.height,
                    },
                });
                this.$parent.drawMark(this.$parent.currentEl);
            },
        },
    };
</script>
<style lang="scss" scoped>
  @import "./css/index.scss";
</style>
