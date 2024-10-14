<script setup lang="ts">
import {Editor} from "~/utils/editor";

const canvas = ref<HTMLCanvasElement>();
const editor = ref<Editor>();

onMounted(() => {
  if (canvas.value) editor.value = new Editor(canvas.value);
});
</script>

<template>
  <div :class="$style.root">
    <canvas ref="canvas" :class="$style.canvas" />
    <Card :class="$style.toolbox">
      <template #content>
        <Button @click="editor?.creator.addLine" label="Add line" :class="$style.button" />
        <Button @click="editor?.creator.addRectangle" label="Add rectangle" :class="$style.button" />
        <Button @click="editor?.creator.cancel" label="Cancel" :class="$style.button" />
      </template>
    </Card>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  height: 100svh;
}

.canvas {
  width: calc(100% - 200px);
  height: 100%;
}

.toolbox {
  width: 200px;
}

.button {
  width: 100%;
}
</style>
