<template>
  <v-app>
    <v-app-bar app class="headline">
      <v-toolbar-title class="text-uppercase">
        <span>Four on a Couch</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

  </v-app>
</template>

<script>
  import './appStyles.css';

  export default {
    name: 'App',
    data: () => ({
      //
    }),
  };
</script>
