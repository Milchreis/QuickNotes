<template>
  <v-layout>
    <v-flex>
      <v-text-field label="Title" v-model="item.title" placeholder="Placeholder" outlined></v-text-field>

      <simplemde v-model="item.note"
        v-shortkey="['ctrl', 's']" @shortkey.native="saveNote()"></simplemde>

      <v-btn depressed medium color="primary" @click="saveNote()">Save</v-btn>
      <v-btn depressed medium color="error" @click="deleteNote()" v-show="itemId">Delete</v-btn>
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

export default {
  props: ["itemId"],
  components: {
    simplemde: SimpleMDE
  },
  data() {
    return {
      item: {
        id: this.createUUID(),
        title: "",
        note: "",
        created: new Date(),
        updated: null
      },
      snackbar: {
        visible: false,
        text: ""
      }
    };
  },

  mounted() {
    if (this.itemId) {
      let quicknote = JSON.parse(localStorage.getItem("quicknote"));
      this.item = quicknote.notes.find(note => note.id === this.itemId);
    }
  },

  methods: {
    saveNote() {
      let quicknote = this.loadNotes();

      quicknote.notes = quicknote.notes.filter(
        note => note.id !== this.item.id
      );

      this.item.updated = new Date();
      quicknote.notes.push(this.item);

      localStorage.setItem("quicknote", JSON.stringify(quicknote));
      this.snackbar.visible = true;
      this.snackbar.text = "Note saved";

      setTimeout(() => this.snackbar.visible = false, 1500);
    },

    deleteNote() {
      let quicknote = this.loadNotes();
      quicknote.notes = quicknote.notes.filter(
        note => note.id !== this.item.id
      );
      localStorage.setItem("quicknote", JSON.stringify(quicknote));
      this.snackbar.visible = true;
      this.snackbar.text = "Note deleted";
    },

    loadNotes() {
      let quicknote = JSON.parse(localStorage.getItem("quicknote"));
      if (!quicknote) {
        quicknote = {
          notes: []
        };
      }
      return quicknote;
    },

    createUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let dt = new Date().getTime();
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    }
  }
};
</script>
