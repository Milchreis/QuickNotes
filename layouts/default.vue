<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      @transitionend="drawerToggle"
      fixed
      app
    >
      <!-- List with functions -->
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- List with latest notes -->
      <v-list>
        <v-list-item v-show="latestNotes.length > 0">
          <v-list-item-content>Latest Notes</v-list-item-content>
        </v-list-item>

        <v-list-item
          v-show="latestNotes.length > 0"
          v-for="(item, i) in latestNotes"
          :key="i"
          :to="'/note/' + item.id"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-file-document-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon>mdi-notebook</v-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NoteUtils from "@/modules/NoteUtils";

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "mdi-file-plus",
          title: "New note",
          to: "/"
        },
        {
          icon: "mdi-file-document-box-multiple",
          title: "Notes",
          to: "/notes"
        },
        {
          icon: "mdi-swap-vertical-bold",
          title: "Import/Export",
          to: "/exchange"
        }
      ],
      latestNotes: [],
      latestNotesMax: 5,
      title: "QuickNotes",
      noteUtils: new NoteUtils()
    };
  },
  mounted() {},
  methods: {
    drawerToggle(event) {
      this.loadLatestNotes();
    },

    loadLatestNotes() {
      let notes = this.noteUtils.loadNotes();
      if (!notes) return;

      this.latestNotes = notes
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
        .splice(0, this.latestNotesMax);
    }
  }
};
</script>

<style>
.info-card {
  padding: 10px;
  margin-bottom: 15px;
}
</style>
