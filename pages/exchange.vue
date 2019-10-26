<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8 lg8>
      <div class="text-center">
        <h1>Exchange</h1>
        <br />
      </div>

      <div class="text-center">
        <v-btn x-large color="green" dark @click="downloadAll()">
          <v-icon>mdi-download</v-icon>Download all Notes
        </v-btn>
        <p>Extract all your notes to your device to backup your notes into a file.</p>
      </div>

      <div class="text-center">
        <v-btn x-large color="primary" dark @click="$refs.inputUpload.click()">
          <v-icon>mdi-upload</v-icon>Upload notes
        </v-btn>
        <p>Upload your notes from to backup-file. Existing notes are not deleted. Duplicates with identical note text will be not imported.</p>
        <input
          v-show="false"
          type="file"
          accept="application/json"
          ref="inputUpload"
          @change="upload"
        />
      </div>

      <div class="text-center">
        <v-btn x-large color="error" dark @click="deleteAllNotes()">
          <v-icon>mdi-delete-forever</v-icon>Delete all notes
        </v-btn>
        <p>Delete all saved notes in this browser.</p>
      </div>

      <v-snackbar v-model="snackbar.visible" top>
        <v-icon>mdi-check</v-icon>
        {{ snackbar.text }}
        <v-btn color="green" text @click="snackbar.visible = false">Close</v-btn>
      </v-snackbar>
      <br />
    </v-flex>
  </v-layout>
</template>

<script>
import NoteUtils from "@/modules/NoteUtils";

export default {
  components: {},
  data() {
    return {
      items: [],
      snackbar: {
        visible: false,
        text: ""
      },
      noteUtils: new NoteUtils()
    };
  },

  mounted() {
    this.items = this.noteUtils.loadNotes();
  },

  methods: {
    upload() {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        let data = reader.result;
        let notes = JSON.parse(data);
        this.updateNotes(notes);
      };

      if(input && input.files.length > 0)
        reader.readAsBinaryString(input.files[0]);
    },

    downloadAll() {
      let quicknote = this.noteUtils.loadNotes();
      this.download("data.json", JSON.stringify(quicknote.notes));
    },

    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },

    updateNotes(importNotes) {
      let importStatus = this.noteUtils.importNotes(importNotes);

      this.snackbar.visible = true;
      this.snackbar.text = `${importStatus.newNotes} new notes imported,
          ${importStatus.sameNotes} duplicates found and imported as new notes and
          ${importStatus.ignoredNotes} notes are ignored.`;
      setTimeout(() => (this.snackbar.visible = false), 5000);
    },

    deleteAllNotes() {
      this.noteUtils.deleteNotes();

      this.snackbar.visible = true;
      this.snackbar.text = `All notes deleted.`;
      setTimeout(() => (this.snackbar.visible = false), 2000);
    }
  }
};
</script>

<style scoped>
</style>