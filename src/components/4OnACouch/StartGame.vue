<template>
	<div>
		<p>this is 4 on a couch page</p>
		<v-btn @click="createGame">Create a Game</v-btn>
		<v-btn @click="joinGame">Join a Game</v-btn>
		<v-btn @click="goHome">Home</v-btn>
		<p v-if="docRef">{{ docRef }}</p>
	</div>
</template>

<script>
import { db } from '../../main';
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    docRef: null,
  }),
  methods: {
	...mapMutations([
		'setGameId',
		'setGameNumber',
	]),
    createGame () {
		const newGameId = Math.floor(Math.random() * 901) + 100; // random # between 100 and 1000
		db.collection('games').add({
			gameId: newGameId,
			players: [],
		})
		.then((docRef) => {
			console.log({ docRef });
			this.setGameId(docRef.id);
			this.setGameNumber(newGameId);
			this.$router.push({ name: 'EnterName', params: { gameId: docRef.id, isLeader: true } });
		})
		.catch(function(err) {
			console.log(err);
		});
    },
    joinGame () {
		this.$router.push({ name: 'JoinGame' });
    },
    goHome () {
		this.$router.push({ name: 'HelloWorld' });
    },
  }
}
</script>
