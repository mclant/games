import Vue from 'vue';
import Router from 'vue-router';

//Route components
import HelloWorld from '../components/HelloWorld';
import Start4OnACouch from '../components/4OnACouch/StartGame.vue';
import JoinGame from '../components/4OnACouch/JoinGame.vue';
import StartCelebrities from '../components/Celebrities/StartGame.vue';
import EnterName from '../components/4OnACouch/EnterName.vue';
import ViewName from '../components/4OnACouch/ViewName.vue';

Vue.use(Router);

export default new Router({
	routes: [
		/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 *  PARENT ACCOUNT ROUTES
		 */
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld,
		},
		{
			path: '/4onacouch',
			name: 'Start4OnACouch',
			component: Start4OnACouch,
		},
		{
			path: '/4onacouch/joingame',
			name: 'JoinGame',
			component: JoinGame,
		},
		{
			path: '/celebrities',
			name: 'StartCelebrities',
			component: StartCelebrities,
		},
		{
			path: './entername',
			name: 'EnterName',
			component: EnterName,
			props: true,
		},
		{
			path: './viewname',
			name: 'ViewName',
			component: ViewName,
			props: true,
		},
	],
		mode: 'history'
	});
	