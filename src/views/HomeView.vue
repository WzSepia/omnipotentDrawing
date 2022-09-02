<template>
  <div class="home">
    <od-main />
  </div>
</template>

<script setup>
import OdMain from "../omnipotentDrawing/views/OdMain.vue";
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  // background-image: url(../assets/bg.png);
  background-position: 0 0;
  background-repeat: no-repeat;
}
</style>