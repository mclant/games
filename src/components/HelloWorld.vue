<template>
  <v-container fluid>
    <!-- <v-layout
      text-center
      wrap
    >
      <v-flex xs12 class="pt4">
        <v-btn @click="start4OnACouch">4 On A Couch</v-btn>
      </v-flex>
      <v-flex xs12 class="pt4">
        <v-btn @click="startCelebrities">Celebrities</v-btn>
      </v-flex>
    </v-layout> -->
    <v-row justify="center" align="center" style="height: 100px">
      <v-btn @click="start4OnACouch">4 On A Couch</v-btn>
    </v-row>
    <v-row justify="center" align="center" style="height: 100px">
      <v-btn @click="startCelebrities">Celebrities</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    
  }),
  methods: {
    start4OnACouch () {
				this.$router.push({ name: 'Start4OnACouch' });
    },   
    startCelebrities () {
				this.$router.push({ name: 'StartCelebrities' });
    },
  }
};
</script>
