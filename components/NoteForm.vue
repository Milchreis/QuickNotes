<template>
  <v-layout>
    <v-flex>
      <v-text-field label="Title" v-model="item.title" placeholder="Placeholder" outlined></v-text-field>

      <simplemde
        v-model="item.note"
        v-shortkey="['ctrl', 's']"
        ref="mde"
        @shortkey.native="saveNote()"
      ></simplemde>

      <!-- Bad hack, but in that way vue-shortkey uses multiple shortcuts -->
      <simplemde v-show="false" v-shortkey="['ctrl', 'alt', 'p']" @shortkey.native="printNote()"></simplemde>

      <v-layout>
        <v-flex>
          <v-btn depressed medium color="primary" @click="saveNote()">Save</v-btn>
          <v-btn depressed medium color="green" @click="printNote()" v-show="itemId">Print</v-btn>
        </v-flex>

        <v-btn depressed medium color="error" @click="deleteNote()" v-show="itemId">Delete</v-btn>
        <v-btn
          depressed
          medium
          color="primary"
          :to="'/note/' + item.parentId"
          v-show="item.parentId"
        >Original Note</v-btn>
      </v-layout>
    </v-flex>

    <v-snackbar v-model="snackbar.visible" top>
      <v-icon>mdi-check</v-icon>
      {{ snackbar.text }}
      <v-btn color="green" text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import SimpleMDE from "@/components/SimpleMDE";
import NoteUtils from "@/modules/NoteUtils";
import printJS from "print-js";

export default {
  props: ["itemId"],
  components: {
    simplemde: SimpleMDE
  },
  data() {
    return {
      item: {
        id: new NoteUtils().createUUID(),
        title: "",
        note: "",
        created: new Date(),
        updated: null
      },
      noteUtils: new NoteUtils(),
      snackbar: {
        visible: false,
        text: ""
      }
    };
  },

  async mounted() {
    if (this.itemId) {
      let notes = this.noteUtils.loadNotes();
      this.item = notes.find(note => note.id === this.itemId);
    }
  },

  methods: {
    saveNote() {
      this.noteUtils.saveNote(this.item);
      this.snackbar.visible = true;
      this.snackbar.text = "Note saved";

      setTimeout(() => (this.snackbar.visible = false), 1500);
    },

    deleteNote() {
      this.noteUtils.deleteNote(this.item);
      this.snackbar.visible = true;
      this.snackbar.text = "Note deleted";
    },

    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    findPreviewElementAndSetId() {
      let previews = document.getElementsByClassName("editor-preview");
      if (!previews || previews.length == 0) {
        console.error("Could not find preview elements");
        return;
      }
      previews[0].setAttribute("id", "editor-preview");
    },

    async printNote() {
      this.$refs.mde.togglePreview();
      await this.timeout(500);
      this.findPreviewElementAndSetId();
      await printJS({
        printable: "editor-preview",
        type: "html",
      });
      this.$refs.mde.togglePreview();
    },

    loadNotes() {
      let quicknote = this.noteUtils.loadNotes();
      if (!quicknote) {
        quicknote = {
          notes: []
        };
      }
      return quicknote;
    }
  }
};
</script>

<style>
</style>