<template>
  <div class="editor">
    <Toolbar @createState="createState"/>
    <VueCanvas/>
  </div>
</template>

<script>
import Toolbar from "@/components/editor/Toolbar.vue"
import VueCanvas from "@/components/editor/Canvas.vue"

export default {
  data() {
    return {
      scale: 1
    }
  },
  methods: {
    createState() {
      
    },
    scaleEditor(deltaY) {
      this.scale = Math.min(Math.max(this.scale - Math.sign(deltaY) * .08, .2), 1)
      this.$el.querySelector(".editor-canvas-inner-wrapper").style.transform = `scale3d(${this.scale}, ${this.scale}, 1)`
    }
  },
  components: {
    Toolbar,
    VueCanvas,
  },
  mounted() {
    this.$el.scrollTo(750, 750)
    this.$el.onwheel = ({ctrlKey, deltaY}) => {
      if(!ctrlKey) return true

      this.scaleEditor(deltaY)
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
