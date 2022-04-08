<template>
  <div :style="bodyStyle" class="loader full-width">
    <i class="el-icon-loading" style="font-size: 34px;"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ['height', 'color', 'width'],
  computed: {
    bodyStyle() {
      return {
        height: this.height || '100vh',
        width: this.width || '100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: rotate linear 3s infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
