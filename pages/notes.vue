<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md8 lg8>
      <v-list two-line v-show="items.length > 0">
        <v-list-item v-for="item in items" :key="item.id" :to="'/note/' + item.id" nuxt>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
              <v-list-item-subtitle class="timeData">
              {{ `Created ${formatRelativeTime(item.created)}` }}
              <br />
              {{ `Updated: ${formatRelativeTime(item.updated)}` }}
              </v-list-item-subtitle>
              <pre class="previewText">{{ item.note.substr(0, 100) + ' ...' }}</pre>
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

<style scoped>
.v-list-item__title {
  font-size: 2.0em;
}

.previewText {
  margin-top: 0.5em;
  margin-bottom: 0.5em;

  color: #e8e8e8;
  background-color: #4e4e4e;
  padding: 0.5em;
  border-radius: 3px;
}

.timeData {
  /* float: right; */
  display: inline-block;
  margin-top: -2.8em;
  text-align: right;
  font-size: 0.8em;
}
</style>