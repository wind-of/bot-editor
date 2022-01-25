<template>
  <ul class="toolbar">
    <li class="toolbar__item"><button class="toolbar__item__button" @click="$emit('createState')">Create state</button></li>
  </ul>
</template>


<style lang="scss">

.toolbar {
  z-index: 2147483647;
  position: absolute;
  background-color: #444444;
  
  &__item {
    height: 25px;
    display: inline-block;
    
    &__button {
      color: white;
    }
  }
  
}

</style>