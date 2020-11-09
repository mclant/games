<template>
	<div class="startGameContainer">
		<v-btn @click="createGame" class="myBtn">Create a Game</v-btn>
		<v-btn @click="joinGame" class="myBtn">Join a Game</v-btn>
		<v-btn @click="goHome" class="myBtn">Home</v-btn>
		<p v-if="docRef">{{ docRef }}</p>
	</div>
</template>

<script>
import { db } from '../../main';
import { mapMutations } from 'vuex';
import './styles.css';

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
		const newGameId = Math.floor(Math.random() * 1000000) + 100000; // random # between 100,000 and 1,000,000
		db.collection('games').where('gameId', '==', newGameId).get()
		.then(game => {
			if (game.empty) {
				db.collection('games').add({
					gameId: newGameId,
					players: [],
				})
				.then((docRef) => {
					console.log('docref id: ', docRef.id);
					this.setGameId(docRef.id);
					this.setGameNumber(newGameId);
					this.$router.push({ name: 'EnterName', params: { gameId: docRef.id, isLeader: true } });
					
					// delete the game in 24 hours
					setTimeout(() => {
						this.deleteGame(docRef.id);
					}, 86400000);
				})
				.catch(function(err) {
					console.log(err);
				});
			} else {
				alert('please try again');
			}
		})
		.catch(err => {
			console.log({err});
		})
    },
    joinGame () {
		this.$router.push({ name: 'JoinGame' });
    },
    goHome () {
		this.$router.push({ name: 'HelloWorld' });
	},
	deleteGame (gameId) {
		db.collection('games').doc(gameId).delete().then(function() {
			console.log("Document successfully deleted!");
		}).catch(function(error) {
			console.error("Error removing document: ", error);
		});
	},
  }
}
</script>
