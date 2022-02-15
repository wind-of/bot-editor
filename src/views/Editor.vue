<template>
  <div class="editor-wrapper">
    <div class="editor">
      <VueCanvas 
        :messages="messages" 
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove"
        @scroll="onCanvasScroll($event)"
        @messageClick="onMessageClick"
      />
    </div>
    <Sidebar :selectedMessage="selectedMessage"/>
  </div>
</template>

<script>
import Sidebar from "@/components/editor/Sidebar.vue"
import VueCanvas from "@/components/editor/Canvas.vue"

import { 
  SCALE_STEP, MAX_SCALE, MIN_SCALE, 
  EDITOR_DEFAULT_SCROLL_X, EDITOR_DEFAULT_SCROLL_Y, 
  EVENT_TYPE_SCROLL
} from "@/constants.js"

import { messages } from "@/messages.js"

export default {
  components: {
    Sidebar,
    VueCanvas,
  },
  data() {
    return {
      grabbingCanvas: false,
      editor: {
        scale: 1,
        scrollX: EDITOR_DEFAULT_SCROLL_X,
        scrollY: EDITOR_DEFAULT_SCROLL_Y
      },
      messages,
      selectedMessage: undefined,
      previousMousePosition: null,
      canvas: null,
      innerCanvas: null
    }
  },

  methods: {
    filterScrollValues(x, y) {
      const MAX_VERTICAL_SCROLL = this.innerCanvas.clientHeight - this.canvas.clientHeight
      const MAX_HORIZONTAL_SCROLL = this.innerCanvas.clientWidth - this.canvas.clientWidth 
      const MIN_VERTICAL_SCROLL = 0
      const MIN_HORIZONTAL_SCROLL = 0

      x = Math.max(Math.min(x, MAX_HORIZONTAL_SCROLL), MIN_HORIZONTAL_SCROLL)
      y = Math.max(Math.min(y, MAX_VERTICAL_SCROLL), MIN_VERTICAL_SCROLL)

      return [x, y]
    },
    preventDefaultZooming() {
      this.$el.onwheel = ({ctrlKey, deltaY}) => ctrlKey ? (this.updateEditorScale(deltaY), false) : true
    },

    onMouseMove({ clientX: x, clientY: y }) {
      if(!this.grabbingCanvas) return

      const deltaX = this.previousMousePosition.x - x
      const deltaY = this.previousMousePosition.y - y

      this.updateEditorPosition(this.editor.scrollX + deltaX, this.editor.scrollY + deltaY)
      this.previousMousePosition = {x, y}
    },
    onMouseDown(event) {
      this.updateCanvasGrabbing(true, event)
      window.addEventListener("mouseup", () => this.updateCanvasGrabbing(false), {once: true})
    },
    onCanvasScroll({type, ctrlKey, deltaX, deltaY}) {
      if(ctrlKey) return
      const [x, y] = type === EVENT_TYPE_SCROLL 
          ? this.getActualCanvasScroll()
          : [this.editor.scrollX + deltaX, this.editor.scrollY + deltaY]
      this.updateEditorPosition(x, y, false)
    },
    onMessageClick({ event, id }) {
      this.selectedMessage = this.messages.find(({ id: id_ }) => id_ === id)
      this.$el.querySelector(`#${id}`).classList.add("active")
    },

    getActualCanvasScroll() {
      return [this.canvas.scrollLeft, this.canvas.scrollTop]
    },

    updateEditorPosition(x = EDITOR_DEFAULT_SCROLL_X, y = EDITOR_DEFAULT_SCROLL_Y, shouldScroll = true) {
      [x, y] = this.filterScrollValues(x, y)
      this.editor.scrollX = x
      this.editor.scrollY = y
      shouldScroll && this.canvas.scrollTo(x, y)
    },
    updateEditorScale(deltaY) {
      this.editor.scale = Math.min(Math.max(this.editor.scale - Math.sign(deltaY) * SCALE_STEP, MIN_SCALE), MAX_SCALE)
      this.innerCanvas.style.transform = `scale3d(${this.editor.scale}, ${this.editor.scale}, 1)`
    },
    updateCanvasGrabbing(flag, e) {
      this.grabbingCanvas = flag
      if(!flag) return

      const { clientX: x, clientY: y } = e
      this.previousMousePosition = {x, y}
    },
  },

  mounted() {
    this.canvas = this.$el.querySelector(".editor-canvas-wrapper")
    this.innerCanvas = this.canvas.querySelector(".editor-canvas-inner-wrapper")
    this.updateEditorPosition(this.editor.scrollX, this.editor.scrollY)
    this.preventDefaultZooming()
  }
}
</script>

<style lang="scss">
.editor {
  width: 100%;
  height: 100%;
}
</style>
