<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md10>
      <v-card class="text-center info-card">
        <v-icon>mdi-information-outline</v-icon>Write quickly and easily some notes in markdown. All notes are stored
        <b>locally</b> in your browser.
      </v-card>
      <noteform></noteform>
    </v-flex>
  </v-layout>
</template>

<script>
import NoteForm from "@/components/NoteForm";

export default {
  components: {
    noteform: NoteForm
  },
};
</script>