<template>
  <div class="editor-canvas-wrapper" 
    @scroll="$emit('scroll', $event)" 
    @mousewheel="$emit('scroll', $event)"
  >
    <section class="editor-canvas" 
      @mousedown="$emit('mousedown', $event)"
      @mousemove="$emit('mousemove', $event)"
    >
      <div class="editor-canvas-inner-wrapper">
        <CanvasMessage 
          v-for="(message, i) of messages" 
          :key="message.view.top + `${i}` + message.view.left"
          :message="message"
          @click="$emit('messageClick', {$event, id: message.id})"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CanvasMessage from "@/components/editor/canvas/CanvasMessage.vue"
export default {
  name: "Canvas",
  props: {
    messages: Array
  },
  components: {
    CanvasMessage
  }
}
</script>

<style lang="scss">
.editor-canvas-wrapper {
  display: block;
  max-width: 78vw;
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

    transition: .2s ease;
  }
}
</style>