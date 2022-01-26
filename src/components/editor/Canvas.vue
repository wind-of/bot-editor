<template>
  <div class="editor-canvas-wrapper" @mousewheel="$emit('scroll', $event)">
    <section class="editor-canvas" 
      @mousedown="$emit('mousedown', $event)"
      @mousemove="$emit('mousemove', $event)">
      <div class="editor-canvas-inner-wrapper">
        <div class="message">
          <div class="message__title-wrapper">
            <h3 class="message__title">Entry</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  props: {
    messages: Array
  },
}
</script>

<style lang="scss">
.editor-canvas-wrapper {
  display: block;
  max-width: 100vw;
  max-height: 100vh;
  overflow: scroll;
}
.editor-canvas {
  width: 3000px;
  height: 2000px;

  background-image: 
    linear-gradient(#fafafa 1px,transparent 1px),
    linear-gradient(90deg, #fafafa 1px, transparent 1px), 
    linear-gradient(#fafafa 1px,transparent 1px),
    linear-gradient(90deg, #fafafa 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: -1px -1px;

  cursor: grab;
  &.grabbing {
    cursor: grabbing;
  }

  &-inner-wrapper {
    width: 100%;
    height: 100%;

    transition: .4s ease;
  }
}

.message {
  box-sizing: border-box;
  position: relative;
  width: 200px;

  border: 1px solid #e1e1e1;
  border-radius: 5px;

  transition: .2s ease;

  &:hover {
    border-color: cornflowerblue;
  }
  &:hover &__title {
    color: cornflowerblue;
    border-color: cornflowerblue;
  }

  &__title { 
    padding: 0 5px;

    font-size: 16px;
    font-weight: 400;

    border: 5px solid #e1e1e1;
    border-top: none;
    border-bottom: none;
    border-right: none;

    transition: .2s ease;

    &-wrapper {
      padding: 10px 0;
      background-color: #fafafa;
      border-radius: 5px;

      cursor: pointer;
    }
  }
}
</style>