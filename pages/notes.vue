<template>
  <v-layout>
    <v-flex xs12 sm8 md10>
      <v-list two-line v-show="items.length > 0">
        <v-list-item v-for="item in items" :key="item.id" :to="'/note/' + item.id" nuxt>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="`Created ${formatRelativeTime(item.created)} - Updated: ${formatRelativeTime(item.updated)}`"
              ></v-list-item-subtitle>
              <v-list-item-subtitle v-show="item.note" v-text="item.note.substr(0, 100) + ' ...'"></v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card class="text-center info-card" v-show="items.length === 0">No saved notes found.</v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SimpleMDE from "@/components/SimpleMDE";

export default {
  components: {
    simplemde: SimpleMDE
  },
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
    selectNote(item) {
      window.location.href = "/note/" + item.id;
    },

    formatRelativeTime(date) {
      if (!date) return "";

      date = new Date(date);

      let delta = Math.round((date - new Date()) / 1000);
      let deltaInUnit = delta;
      let unit = "second";

      var minute = 60,
        hour = minute * 60,
        day = hour * 24;

      if (Math.abs(delta) > 2 * minute) {
        deltaInUnit = delta / minute;
        unit = "minute";
      }
      if (Math.abs(delta) > hour) {
        deltaInUnit = deltaInUnit / hour;
        unit = "hour";
      }
      if (Math.abs(delta) > day) {
        deltaInUnit = deltaInUnit / day;
        unit = "day";
      }
      if (Math.abs(delta) > day * 400) {
        deltaInUnit = deltaInUnit / 365;
        unit = "year";
      }
      return new Intl.RelativeTimeFormat("en", {
        style: "long",
        numeric: "auto"
      }).format(deltaInUnit.toFixed(0), unit);
    }
  }
};
</script>