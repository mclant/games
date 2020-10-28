<template>
  <v-container fluid class="homeContainer">
    <v-btn @click="start4OnACouch">Play</v-btn>
    <v-btn @click="see4OnACouchInstructions">Instructions</v-btn>

    <!-- This row will be added when i create the celebrities game -->
    <!-- <v-row justify="center" align="center" style="height: 100px">
      <v-btn @click="startCelebrities">Celebrities</v-btn>
    </v-row> -->
  </v-container>
</template>

<script>
import './hello-world-styles.css';

export default {
  data: () => ({
    
  }),
  methods: {
    start4OnACouch () {
				this.$router.push({ name: 'Start4OnACouch' });
    },   
    see4OnACouchInstructions () {
				this.$router.push({ name: '4OnACouchInstructions' });
    },   
    startCelebrities () {
				this.$router.push({ name: 'StartCelebrities' });
    },
  }
};
</script>
