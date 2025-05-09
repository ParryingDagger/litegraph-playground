<script setup lang="ts">
import { LiteGraph, LGraph, LGraphCanvas, LGraphNode } from '@comfyorg/litegraph'
import { onMounted, ref } from 'vue'
import { MyAddNode } from '@/nodes/MyAddNode'
import { MyMultiInputNode } from '@/nodes/MyMultiInputNode'

const editor = ref<LGraphCanvas | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
// const graph = ref<LGraph | null>(null)

// Register the node type
LiteGraph.registerNodeType('basic/sum', MyAddNode)

function resizeCanvas() {
  const scale = Math.max(window.devicePixelRatio, 1)
  const container = document.getElementById('canvas-container')
  const { width, height } = container.getBoundingClientRect()

  canvas.value.style.width = '100%'
  canvas.value.style.height = '100%'

  canvas.value.width = Math.round(width * scale)
  canvas.value.height = Math.round(height * scale)

  const ctx = canvas.value.getContext('2d').scale(scale, scale)

  editor.value.draw(true, true)
}

function onClick(event, pos, canvas) {
  console.log('clicked', event, pos, canvas)
}

onMounted(() => {
  const container = document.getElementById('canvas-container')

  canvas.value = document.createElement('canvas')
  container.appendChild(canvas.value)

  const graph = new LGraph()

  editor.value = new LGraphCanvas(canvas.value, graph)
  editor.value.state.readOnly = false
  editor.value.dirty_bgcanvas = true

  LiteGraph.registerNodeType('basic/sum', MyAddNode)
  LiteGraph.registerNodeType('basic/multi-input', MyMultiInputNode)
  const firstNode = LiteGraph.createNode('basic/sum')
  firstNode.pos = [100, 100]
  graph.add(firstNode)

  console.log(firstNode)
  const secondNode = LiteGraph.createNode('basic/sum')
  secondNode.pos = [200, 200]
  graph.add(secondNode)

  console.log(secondNode)
  firstNode.connect(0, secondNode, 1)

  const thirdNode = LiteGraph.createNode('basic/multi-input')
  thirdNode.pos = [300, 300]
  graph.add(thirdNode)

  console.log(editor.value)
  resizeCanvas()
  graph.start(1000)

  // const secondNode = LiteGraph.createNode('txt1', true)
  // graph.value.add(secondNode)
})
</script>
<template>
  <div id="canvas-container" />
</template>
<style scoped>
#canvas-container {
  width: 100%;
  height: 100%;
}
</style>
