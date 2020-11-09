<template>
	<div v-if="!shufflingAllNames" class="enterNameContainer">
		<v-col cols="12" sm="6" class="innerContainer">
			<v-progress-circular
				v-if="loadingName"
				indeterminate
				color="primary"
			></v-progress-circular>
			<h3 v-else-if="name && showName && !loadingName">{{ name }}</h3>
		</v-col>
		<v-col cols="12" sm="6">
			<div class="innerContainer">
				<v-btn
					class="myBtn"
					@click="showOrHideName"
				>{{showName ? 'Hide Name' : 'Show Name'}}</v-btn>
			</div>
			<div class="innerContainer">
				<v-btn
					class="myBtn"
					@click="getPlayerName"
				>Refresh Name</v-btn>
			</div>
		</v-col>
		<v-col cols="12" sm="6" class="innerContainer" v-if="user.isLeader">
			<h3>Game ID: {{ game.number }}</h3>
		</v-col>
		<v-col cols="12" sm="6" class="innerContainer">
			<v-btn
				class="myBtn"
				color="primary"
				v-if="user.isLeader"
				@click="shuffleNames"
			>Shuffle Names</v-btn>
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
				playerIdArray: [],

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
				let promise = new Promise((resolve, reject) => {
					if (array.length !== 0) {
						var currentIndex = array.length, randomIndex;
						let temporaryValue = '';

						while (0 !== currentIndex) {
							randomIndex = Math.floor(Math.random() * currentIndex);
							currentIndex -= 1;

							temporaryValue = array[currentIndex];
							array[currentIndex] = array[randomIndex];
							array[randomIndex] = temporaryValue;
						}
						resolve(array);
					} else {
						return null;
					}
				});
				return promise;
			},
			async shuffleNames () {
				this.shufflingAllNames = true;
				const finishedNameArray = await this.getPlayersNames();
				const shuffledArray = await this.shuffle(finishedNameArray);
				this.saveNewShuffledNames(shuffledArray);

				this.shufflingAllNames = false;
			},
			getPlayersNames () {
				let promise = new Promise((resolve, reject) => {
					db.collection('games').where('gameId', '==', this.game.number).get()
						.then((currGame) => {
							if (!currGame.empty) {
								const originalNameArray = [];
								this.playerIdArray = [];
								let playersProcessed = 0;
								const playerArray = currGame.docs[0].data().players;

								playerArray.forEach((player) => {
									db.collection('players').doc(player.id).get()
									.then((currentPlayer) => {
										originalNameArray.push(currentPlayer.data().name);
										this.playerIdArray.push(currentPlayer.id);

										playersProcessed++;

										if (playersProcessed === playerArray.length) {
											resolve(originalNameArray);
										}
									});
								});
							} else {
								console.log('currGame does not exist');
								return null;
							}
							
						})
						.catch(function(error) {
							console.log({error});
							return null;
						});
				});
				return promise;
			},
			saveNewShuffledNames (shuffledNameArray) {
				this.playerIdArray.forEach((id, index) => {
					db.collection('players').doc(id).set({
						name: shuffledNameArray[index],
					}, { merge: true });
				});
			},
		}
	}
</script>