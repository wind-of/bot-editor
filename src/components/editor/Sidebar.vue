<template>
  <div class="sidebar">
    <h1>{{ (selectedMessage || {}).id }}</h1>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    selectedMessage: Object
  }
}
</script>

<style lang="scss">
.sidebar {
  box-sizing: border-box;

  width: 12vw;
  height: 100%;

  z-index: 2147483647;
  position: absolute;
  top: 0;
  right: 0;
  
  background-color: #f2f2f2;
  color: black;
}
</style>