<template>
  <div class="box">
    <el-scrollbar>
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
              <div class="content">
                <el-form-item label="文本内容">
                  <el-input
                    class="large"
                    v-model="config.style.text"
                    placeholder="px"
                    clearable
                    @input="(val) => textChange(val)"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="btns">
                <el-button
                  type="primary"
                  circle
                  :icon="'Delete'"
                  @click="del"
                ></el-button>
              </div>
            </div>

            <div>
              <div class="content">
                <el-form-item label="文本代码">
                  <el-input
                    class="large"
                    v-model="config.options.code"
                    clearable
                    @input="(val) => codeChange(val)"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="btns">
                <el-button
                  type="primary"
                  circle
                  :icon="'Delete'"
                  @click="delCode"
                ></el-button>
              </div>
            </div>

            <div>
              <div class="content">
                <el-form-item label="默认选中">
                  <el-switch
                    v-model="config.options.checked"
                    @change="checkedChange()"
                  />
                </el-form-item>
              </div>
            </div>
            <div>
              <div class="content xywh">
                <el-form-item label="位置尺寸">
                  <el-form-item label="X" label-width="20px">
                    <el-input-number
                      v-model="config.x"
                      class="middle"
                      placeholder="px"
                      controls-position="right"
                    />
                  </el-form-item>
                  <el-form-item label="Y" label-width="20px">
                    <el-input-number
                      v-model="config.y"
                      class="middle"
                      placeholder="px"
                      controls-position="right"
                    />
                  </el-form-item>

                  <el-form-item label="W" label-width="20px">
                    <el-input-number
                      v-model="config.style.textWidth"
                      class="middle"
                      placeholder="px"
                      controls-position="right"
                    />
                  </el-form-item>

                  <el-form-item label="H" label-width="20px">
                    <el-input-number
                      v-model="config.style.textHeight"
                      class="middle"
                      placeholder="px"
                      controls-position="right"
                    />
                  </el-form-item>
                </el-form-item>
              </div>
              <el-button
                type="primary"
                circle
                :icon="'Refresh'"
                @click="xywhChange()"
              ></el-button>
            </div>
            <div>
              <div class="content">
                <el-form-item label="文字超出">
                  <el-radio-group v-model="config.style.truncate.ellipsis">
                    <el-radio label="null">折行展示</el-radio>
                    <el-radio label="...">省略号展示</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="样式设置" name="2">
            <div>
              <div class="content">
                <el-form-item label="文本样式">
                  <el-input
                    class="large"
                    v-model="config.style.fill"
                    placeholder="#000000"
                    clearable
                    @change="fillChange()"
                  >
                  </el-input>
                  <span style="margin: 0 0 0 10px"></span>
                  <el-color-picker
                    v-model="config.style.fill"
                    show-alpha
                    @change="fillChange()"
                  />
                  <el-input
                    class="large"
                    v-model="config.style.fontFamily"
                    placeholder="微软雅黑"
                    clearable
                    @change="fontFamilyChange()"
                  >
                  </el-input>
                  <el-input
                    class="large"
                    v-model.number="config.style.fontSize"
                    placeholder="px"
                    clearable
                    @change="fontSizeChange()"
                  >
                  </el-input>
                </el-form-item>
              </div>
            </div>

            <div>
              <div class="content">
                <el-form-item label="文本位置">
                  <el-select v-model="config.style.textPosition">
                    <el-option lable="内部" value="inside"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="数字跳数" name="3">
            <div>
              <div class="content">
                <el-form-item label="跳数效果">
                  <el-switch
                    v-model="config.options.jumpNumber.show"
                    @change="jumpNumberChange()"
                  />
                </el-form-item>
              </div>
            </div>

            <div v-if="config.options.jumpNumber.show">
              <div class="content">
                <el-form-item label="跳数时长">
                  <el-input
                    class="middle"
                    v-model="config.options.jumpNumber.time"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="分隔符">
                  <el-input
                    class="middle"
                    v-model="config.options.jumpNumber.split"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive } from "vue";
import { toRaw } from "@vue/reactivity";
import _ from "lodash";
export default {
  name: "configText",
  props: {
    configEl: {
      type: Object,
      default: () => {
        return reactive({});
      },
    },
    text: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      activeNames: "1",
      config: {
        // x: this.configEl.x,
        // y: this.configEl.y,
        // options: {
        //   type: this.configEl.options.type,
        //   name: this.configEl.options.name,
        //   code: this.configEl.options.code, //图片代码
        //   checked: this.configEl.options.checked, //是否默认选中
        //   jumpNumber: {
        //     //跳数
        //     show: this.configEl.options.jumpNumber.show,
        //     time: this.configEl.options.jumpNumber.time,
        //     split: this.configEl.options.jumpNumber.split,
        //   },
        // },
        // style: {
        //   text: this.configEl.style.text,
        //   fill: this.configEl.style.fill,
        //   fontFamily: this.configEl.style.fontFamily,
        //   fontSize: this.configEl.style.fontSize,
        //   textWidth: this.configEl.style.textWidth,
        //   textHeight: this.configEl.style.textHeight,
        //   truncate: {
        //     ellipsis: this.configEl.style.truncate.ellipsis,
        //     outerWidth: this.configEl.style.textWidth,
        //     outerHeight: this.configEl.style.textHeight,
        //   },
        //   textPosition: this.configEl.style.textPosition,
        // },
      },
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
  mounted() {},
  methods: {
    /**
     * @name 文本修改
     * @description
     */
    textChange(val) {
      // this.$parent.config.style.text = val;
      this.$parent.currentEl.attr({
        style: {
          text: val,
        },
      });
      this.$parent.drawMark(this.$parent.currentEl);
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
    codeChange(val) {
      this.$parent.currentEl.attr({
        code: val,
      });
    },
    /**
     * @name 代码删除
     * @description 删除当前图片元素代码
     */
    delCode() {
      this.config.code = null;
      this.codeChange();
    },
    /**
     * @name 是否选中
     */
    checkedChange() {
      this.$parent.currentEl.options.checked= this.config.options.checked;
    },
    /**
     * @name 位置大小变化
     */
    xywhChange() {
      this.$parent.currentEl.attr({
        x: this.config.x,
        y: this.config.y,
        style: {
          textWidth: this.config.style.textWidth,
          textHeight: this.config.style.textHeight,
          truncate: {
            ellipsis: this.configEl.style.truncate.ellipsis,
            outerWidth: this.configEl.style.textWidth,
            outerHeight: this.configEl.style.textHeight,
          },
        },
      });
      this.$parent.drawMark(this.$parent.currentEl);
    },
    /**
     * @name 改变文字颜色
     */
    fillChange() {
      this.$parent.currentEl.attr({
        style: {
          fill: this.config.style.fill,
        },
      });
    },
    /**
     * @name 改变文字字体
     */
    fontFamilyChange() {
      this.$parent.currentEl.attr({
        style: {
          fontFamily: this.config.style.fontFamily,
        },
      });
    },
    /**
     * @name 改变文字大小
     */
    fontSizeChange() {
      const fontSize = this.config.style.fontSize + "px";
      this.config.style.fontSize = fontSize;
      this.$parent.currentEl.attr({
        style: {
          fontSize: fontSize,
        },
      });
      this.$parent.drawMark(this.$parent.currentEl);
    },
    /**
     *
     */
    jumpNumberChange() {},
  },
};
</script>
<style lang="scss" scoped>
  @import './css/index.scss';
</style>
