<template>
  <v-layout justify-center align-center >
    <v-flex xs12 sm8 md10>
      <noteform :itemId="$route.params.id"></noteform>
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
