<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8 lg8>
      Exchange
      <br />
      
      <v-btn x-large color="green" dark @click="downloadAll()">
        <v-icon>mdi-download</v-icon>
        Download all Notes
      </v-btn>
      
      <v-btn x-large color="green" dark @click="upload()">
        <v-icon>mdi-upload</v-icon>
        Upload notes
      </v-btn>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      items: []
    };
  },

  mounted() {
    let quicknote = JSON.parse(localStorage.getItem("quicknote"));
    if (quicknote && quicknote.notes) this.items = quicknote.notes;
  },

  methods: {
    upload() {
      console.warn("Not yet implemented");
    },

    downloadAll() {
      let quicknote = JSON.parse(localStorage.getItem("quicknote"));
      this.download('data.json', JSON.stringify(quicknote.notes));
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
    }
  }
};
</script>

<style scoped>
</style>