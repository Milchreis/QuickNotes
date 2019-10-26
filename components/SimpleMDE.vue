<template>
  <div class="editor">
    <textarea ref="area"></textarea>
  </div>
</template>

<script>
import SimpleMDE from "SimpleMDE";
import '@/node_modules/simplemde/dist/simplemde.min.css';

export default {
  name: "simplemde",
  props: ["value"],
  data() {
    return {
      mde: null
    };
  },
  methods: {
    togglePreview() {
      this.mde.togglePreview();
    }
  },

  mounted() {
    this.mde = new SimpleMDE({
      element: this.$refs.area, 
      spellChecker: false,
      placeholder: "Your notes here ...."
    });
    this.mde.value(this.value);
    var self = this;
    this.mde.codemirror.on("change", function() {
      self.$emit("input", self.mde.value());
    });
  },
  watch: {
    value(newVal) {
      if (newVal != this.mde.value()) {
        this.mde.value(newVal);
      }
    }
  },
  beforeDestroy() {
    this.mde.toTextArea();
  }
};
</script>

<style>
.editor-toolbar {
    background-color: white;
}

.editor-preview-side, .editor-preview-active-side {
  color: #111111;
}

</style>