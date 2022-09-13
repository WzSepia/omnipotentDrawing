<template>
  <div>
    <el-input
      v-model.number="config.style.x"
      class="small"
      placeholder="px"
    ></el-input>
    <el-input
      v-model.number="config.style.y"
      class="small"
      placeholder="px"
    ></el-input>
    <el-input
      v-model.number="config.style.width"
      class="small"
      placeholder="px"
    ></el-input>
    <el-input
      v-model.number="config.style.height"
      class="small"
      placeholder="px"
    ></el-input>
  </div>
</template>
<script>
/* eslint-disable */
export default({
    name:'',
    data(){
        return{

        }
    },
    mounted(){

    },
    methods:{

    }
})
</script>
<style lang='scss' scoped>

</style>