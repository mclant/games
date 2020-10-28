<template>
	<div class="startGameContainer">
		<div class="paragraphContainer">
			<div class="subParagraph">
				<b>Summary:</b> Fun strategic memory game for medium to large groups. Great for teenagers to adults!
			</div>
			<div class="subParagraph">
				<b>Goal:</b> Try to get four of your teammates on the couch!
			</div>
			<div class="subParagraph">
				<b>Preparation:</b>
				Four marked chairs or a “couch” that can fit four people. Four people must sit on the couch at the beginning of the game. 
					Everyone else can sit on the ground in a circle or in unmarked chairs, with the outer circle boundary including the four special chairs/”couch”.
			</div>
			<div class="subParagraph">
				<b>How to Play Four On A Couch:</b>
			</div>
			<div class="subParagraph">
				1. Split everyone into two equal teams and ask them to sit in a circle. Add one empty seat in the circle. When starting, 
					each participant needs to sit next to his/her opponent on both sides (alternating team members, e.g. boy girl boy girl), including the four 
					people on the “couch”. Have one person click 'Create Game' and everyone else clicks 'Join Game'. Those who click 'Join Game' will enter the 
					game ID from the game leader and then type their names into the text box.
			</div>
			<div class="subParagraph">
				2. After this, the game leader can click 'Shuffle Names' and everyone will randomly receive someone elses name in the group. Players must click 
					'Refresh Name' in order to see their new name. Be sure to keep your name secret and not show other players. You can click on 'Hide Name' so 
					your new name will not show up on your screen.
			</div>
			<div class="subParagraph">
				3. Explain that the goal of the game is to get four of their teammates on the couch. The person on the right of the empty 
					chair/spot calls the name of a game participant. The person who received that name as their new name sits in the empty 
					chair. Whoever sits on the right of the new empty chair calls out another name. Continue this pattern. The first team 
					to have four of their members on the couch wins the game.
			</div>
			<v-btn @click="goHome" class="myBtn">Home</v-btn>
		</div>
	</div>
</template>

<script>

export default {
	methods: {
		goHome () {
			this.$router.push({ name: 'HelloWorld' });
		},
	}
}
</script>
