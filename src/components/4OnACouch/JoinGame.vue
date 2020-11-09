<template>
	<div class="startGameContainer">
		<v-col cols="12" sm="6">
			<h5>*Enter the 6 digit number from your game leader</h5>
			<v-text-field
				label="Enter Game ID"
				outlined
				v-model="gameId"
			>
			</v-text-field>
			<v-btn @click="findGame" :disabled="!gameId">Join Game</v-btn>
			<v-progress-circular
				v-if="searchingForGameId"
				indeterminate
				color="primary"
			></v-progress-circular>
		</v-col>

		<!-- dialog modal for if a game is not found -->
		<div class="text-center">
			<v-dialog
			v-model="dialog"
			width="500"
			>
			<v-card>
				<v-card-title
				class="headline grey lighten-2"
				primary-title
				>
				oh no!
				</v-card-title>

				<v-card-text>
				A game with this ID could not be found. Please make sure you are entering the correct game ID.
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					text
					@click="dialog = false"
				>
					OK
				</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
	// import firebase from 'firebase';
	import { db } from '../../main';
	import { mapMutations } from 'vuex';

	export default {
		data () {
			return {
				gameId: null,
				dialog: false,
				searchingForGameId: false,
			}
		},
		methods: {
			...mapMutations([
				'setGameId',
				'setGameNumber',
			]),
			findGame () {
				this.searchingForGameId = true;
				db.collection('games').where('gameId', '==', Number(this.gameId)).get()
				.then((querySnapshot) => {
					if (querySnapshot.empty) {
						this.searchingForGameId = false;
						this.dialog = true;
					} else {
						querySnapshot.forEach((doc) => {
							this.setGameId(doc.id);
							this.setGameNumber(doc.data().gameId);
							this.searchingForGameId = false;
							this.$router.push({ name: 'EnterName', params: { gameId: doc.id } });
						});
					}
				})
				.catch((err) => {
					console.log({ err });
					this.searchingForGameId = false;
				});
			},
		}
	}
</script>