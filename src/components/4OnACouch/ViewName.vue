<template>
	<div v-if="!shufflingAllNames">
		<v-col cols="12" sm="6">
			<v-progress-circular
				v-if="loadingName"
				indeterminate
				color="primary"
			></v-progress-circular>
			<h3 v-else-if="name && showName && !loadingName">{{ name }}</h3>
		</v-col>
		<v-col cols="12" sm="6">
			<v-btn
				v-if="showName"
				@click="showOrHideName"
			>Hide Name</v-btn>
			<v-btn
				v-else
				@click="showOrHideName"
			>Show Name</v-btn>
		</v-col>
		<v-col cols="12" sm="6">
			<v-btn
				v-if="user.isLeader"
				@click="shuffleNames"
			>Shuffle Names</v-btn>
		</v-col>
		<v-col cols="12" sm="6">
			current game ID: {{ game.number }}
		</v-col>
	</div>
	<div v-else>
		<v-progress-circular
			indeterminate
			color="primary"
		></v-progress-circular>
	</div>
</template>

<script>
// import firebase from 'firebase';
import { db } from '../../main';
import { mapGetters } from 'vuex';

	export default {
		props: {
			playerId: { type: String, default: null },
			isLeader: { type: Boolean, default: false },
			gameId: { type: String, required: true },
		},
		data () {
			return {
				name: '',
				showName: true,

				loadingName: false,
				shufflingAllNames: false,
			}
		},
		computed: {
			...mapGetters([
				'user',
				'game',
			])
		},
		created: function () {
			this.getPlayerName();
		},
		methods: {
			showOrHideName () {
				this.showName = !this.showName;
			},
			getPlayerName () {
				this.loadingName = true;
				db.collection('players').doc(this.playerId).get()
				.then((doc) => {
					this.name = doc.data().name;
					this.loadingName = false;
				})
				.catch((err) => {
					console.log({ err });
					this.loadingName = false;
				});
			},
			async shuffle(array) {
				console.log('starting shuffle: ', array);
				if (array.length) {
					var currentIndex = array.length, randomIndex;
					let temporaryValue = '';

					while (0 !== currentIndex) {
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;

						temporaryValue = array[currentIndex];
						array[currentIndex] = array[randomIndex];
						array[randomIndex] = temporaryValue;
					}
					console.log('done with shuffle', array);
					return await array;
				} else {
					return null;
				}
			},
			async shuffleNames () {
				this.shufflingAllNames = true;
				// const finishedNameArray = await this.getPlayersNames();
				let promise = new Promise((resolve, reject) => {
					const finishedNameArray = this.getPlayersNames();
					if (finishedNameArray.length) {
						resolve('stuff worked');
					} else {
						console.log({ finishedNameArray});
						reject(Error('it broke'));
					}
				});

				promise.then(result => {
					console.log({ result });
				}, error => {
					console.log({ error });
				})

				// console.log({ finishedNameArray });
				// const shuffledNameArray = this.shuffle(finishedNameArray);
				// console.log({ shuffledNameArray });
				// this.shuffle(['kevin', 'chris', 'matt']);
			},
			async getPlayersNames () {
				const originalNameArray = [];
				await db.collection('games').doc(this.gameId).get()
					.then(async function(currGame) {
						await currGame.data().players.forEach(async function(player) {
							await db.collection('players').doc(player.id).get()
							.then((currentPlayer) => {
								console.log( currentPlayer.data() );
								originalNameArray.push(currentPlayer.data().name);
							})
						});
					});
				return originalNameArray;
			},
		}
	}
</script>