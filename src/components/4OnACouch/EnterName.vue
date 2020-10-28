<template>
	<div class="enterNameContainer">
		<v-col cols="12" sm="6">
			<h3 v-if="showGameId">Game ID: {{ showGameId }}</h3>
			<v-progress-circular
				v-else
				indeterminate
				color="primary"
			></v-progress-circular>
		</v-col>
		<v-col cols="12" sm="6">
			<v-text-field
				label="Enter Your Name"
				outlined
				v-model="name"
			>
			</v-text-field>
			<v-btn
				@click="addPlayer"
				:disabled="!name"
			>Submit</v-btn>
		</v-col>
	</div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../../main';
import { mapGetters, mapMutations } from 'vuex';

	export default {
		props: {
			gameId: { type: String, required: true },
			isLeader: { type: Boolean, default: false },
		},
		data () {
			return {
				name: '',
				showGameId: null,
			}
		},
		computed: {
			...mapGetters([
				'user',
				'game',
			]),
		},
		created: function () {
			this.getShowGameId();
		},
		methods: {
			...mapMutations([
				'setUserName',
				'setUserAsLeader',
			]),
			getShowGameId () {
				db.collection('games').doc(this.gameId).get()
				.then((doc) => {
					this.showGameId = doc.data().gameId;
				})
				.catch((err) => {
					console.error({ err });
				});
			},
			addPlayer () {
				db.collection('players').add({
					name: this.name,
					game: db.collection('games').doc(this.gameId),
					isLeader: this.isLeader ? this.isLeader : false,
				})
				.then((docRef) => {
					db.collection('games').doc(this.gameId).update({
						players: firebase.firestore.FieldValue.arrayUnion(db.collection('players').doc(docRef.id)),
					});
					this.setUserName(this.name);
					if (this.isLeader) {
						this.setUserAsLeader();
					}
					this.$router.push({
						name: 'ViewName',
						params: {
							playerId: docRef.id,
							isLeader: this.isLeader ? this.isLeader : false,
							gameId: this.gameId,
						}
					});
				})
				.catch((err) => {
					console.log({ err });
				});
			},
		}
	}
</script>