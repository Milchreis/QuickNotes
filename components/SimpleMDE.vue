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
  props: ["value", "id"],

  methods: {
    generateUuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  },

  mounted() {
    this.mde = new SimpleMDE({
      element: this.$refs.area, 
      spellChecker: false,
      // autosave: {
      //   enabled: true,
      //   delay: 2000,
      //   uniqueId: this.id ? this.id : this.generateUuidv4()
      // },
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