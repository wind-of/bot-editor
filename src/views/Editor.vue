<template>
  <div class="editor">
    <VueCanvas 
      :messages="messages" 
      @mousedown="onMouseDown($event)"
      @mousemove="onMouseMove"
      @scroll="onCanvasScroll($event)"
    />
  </div>
</template>

<script>
import Toolbar from "@/components/editor/Toolbar.vue"
import VueCanvas from "@/components/editor/Canvas.vue"

const MESSAGE_TYPE_START = "message_type_start"
const MESSAGE_TYPE_DEFAULT = "message_type_default"
const MESSAGE_TYPE_END = "message_type_end"

const SCALE_STEP = .08
const MAX_SCALE = 1
const MIN_SCALE = .2
const EDITOR_DEFAULT_SCROLL_X = 750
const EDITOR_DEFAULT_SCROLL_Y = 750
const EVENT_TYPE_SCROLL = "scroll"

export default {
  components: {
    Toolbar,
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
      messages: [{
        state: "START_STATE",
        type: MESSAGE_TYPE_START,
        options: {
          title: "Kekistan"
        },
        view: {
          top: 1000,
          left: 1500
        }
      }],
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
          ? [this.canvas.scrollLeft, this.canvas.scrollTop] 
          : [this.editor.scrollX + deltaX, this.editor.scrollY + deltaY]
      this.updateEditorPosition(x, y, false)
    },

    updateEditorPosition(x = EDITOR_DEFAULT_SCROLL_X, y = EDITOR_DEFAULT_SCROLL_Y, shouldScroll = true) {
      [x, y] = this.filterScrollValues(x, y)
      this.editor.scrollX = x
      this.editor.scrollY = y
      if(shouldScroll) this.canvas.scrollTo(x, y)
    },
    updateEditorScale(deltaY) {
      this.editor.scale = Math.min(Math.max(this.editor.scale - Math.sign(deltaY) * SCALE_STEP, MIN_SCALE), MAX_SCALE)
      this.$el.querySelector(".editor-canvas-inner-wrapper").style.transform = `scale3d(${this.editor.scale}, ${this.editor.scale}, 1)`
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

    this.$el.onwheel = ({ctrlKey, deltaY}) => ctrlKey ? (this.updateEditorScale(deltaY), false) : true
  }
}
</script>

<style lang="scss">
.editor {
  max-width: 100%;
  max-height: 100%;
}

.toolbar, .editor {
  width: 100%;
}
.toolbar {
  box-sizing: border-box;
  height: 60px;
  padding: 0 20px; 

  display: flex;
  align-items: center;
}
.canvas {
  height: 100%;
}
</style>
