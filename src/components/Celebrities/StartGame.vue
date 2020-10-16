<template>
	<div>
		<p>this is Celebrities page</p>
		<v-btn @click="goHome">Home</v-btn>
	</div>
</template>

<script>
export default {
  data: () => ({
    
  }),
  methods: {
    goHome () {
				this.$router.push({ name: 'HelloWorld' });
    },
  }
}
</script>
