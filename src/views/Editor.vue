<template>
  <div class="editor">
    <VueCanvas 
      :messages="messageObjects" 
      @mousedown="onMouseDown($event)"
      @mousemove="onMouseMove"
      @scroll="onCanvasScroll($event)"
    />
  </div>
</template>

<script>
import Toolbar from "@/components/editor/Toolbar.vue"
import VueCanvas from "@/components/editor/Canvas.vue"

const SCALE_STEP = .08
const MAX_SCALE = 1
const MIN_SCALE = .2
const EDITOR_DEFAULT_SCROLL_X = 750
const EDITOR_DEFAULT_SCROLL_Y = 750

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
      messageObjects: [],
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

      x = Math.max(Math.min(x, MAX_VERTICAL_SCROLL), MIN_VERTICAL_SCROLL)
      y = Math.max(Math.min(y, MAX_HORIZONTAL_SCROLL), MIN_HORIZONTAL_SCROLL)

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
    onCanvasScroll(e) {
      console.log(e)
    },

    updateEditorPosition(x = EDITOR_DEFAULT_SCROLL_X, y = EDITOR_DEFAULT_SCROLL_Y) {
      [x, y] = this.filterScrollValues(x, y)
      this.editor.scrollX = x
      this.editor.scrollY = y
      this.$el.querySelector(".editor-canvas-wrapper").scrollTo(x, y)
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

    this.$el.onwheel = ({ctrlKey, deltaY}) => {
      if(!ctrlKey) return true
      this.updateEditorScale(deltaY)
      return false
    }
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
