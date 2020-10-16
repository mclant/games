import state from './state';

const mutations = {
	setGameId (state, id) {
		state.game.id = id;
	},
	setUserId (id) {
		state.user.id = id;
	},
	setUserName (state, name) {
		state.user.name = name;
	},
	setUserAsLeader () {
		state.user.isLeader = true;
	},
	setGameNumber (state, num) {
		state.game.number = num;
	},
}

export default mutations;
