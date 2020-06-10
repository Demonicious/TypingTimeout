<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { onMount } from "svelte";

	import Left from "./layouts/Left.svelte";
	import Center from "./layouts/Center.svelte";
	import Right from "./layouts/Right.svelte";
	import Footer from "./layouts/Footer.svelte";

	import Shuffle from "./helpers/Shuffle.js";
	import AllWords from "./helpers/Words.js";
	import { set as SetHighscore, get as GetHighscore } from "./helpers/Highscore.js";

	const { addNotification } = getNotificationsContext();

	let words = Shuffle(AllWords);
	let cursor = 0;
	let value = '';
	let seconds = 5;
	let score = 0;
	let highscore = GetHighscore();
	let interval = null;
	let seconds_passed = 0;
	let typed_words = [];
	let cps = 0;

	const WordMatched = (word) => {
		if((cursor + 1) === words.length) GameOver();
		else {
			value = '';
			cursor += 1;
			typed_words = [...typed_words, word];
		}
	}
	const Restart = () => {
		value = '';
		score = 0;
		cursor = 0;
		clearInterval(interval);
		interval = setInterval(() => {
			seconds_passed += 1;
			if(seconds > 0) {
				seconds--;
			} else {
				GameOver();
			}
		}, 1000);

		addNotification({
			position: 'top-right',
			text: 'Game Started!',
			type: 'success',
			removeAfter: 4000
		});
	}
	const HandleInput = (e) => value = e.detail.value;
	const GameOver = () => {
		addNotification({
			text: `Game Over! Your final score was: ${score} - Your CPS was: ${cps}.`,
			type: 'danger',
			position: 'top-right',
		})
		cursor = 0;
		seconds = 5;
		score = 0;
		cps = 0;
		value = '';
		clearInterval(interval);
	}
	const ManageScore = (score) => {
		if(score > highscore) {
			SetHighscore(score);
			highscore = score;
		}
	}
	const MatchWords = (value) => {
		let word = words[cursor];
		if(value.trim() === word) {
			if(cursor === 0) Restart();
			else {
				score += parseInt(cps * seconds);
				if(seconds <= 2) seconds += 2;
				else seconds += 1; 
			}
			WordMatched(word);
		}
	}

	const CalculateCPS = (seconds) => {
		if(seconds !== 0) {
			let characters = typed_words.map(word => word.length).reduce((a, b) => a + b);
			cps = (characters / seconds).toFixed(2);
		}
	}

	$: MatchWords(value);
	$: ManageScore(score);
	$: CalculateCPS(seconds_passed);
</script>

<Left cursor={cursor} words={words} seconds={seconds} />
<Center value={value} on:input={HandleInput} cps={cps} cursor={cursor} words={words} />
<Right score={score} highscore={highscore} />
<Footer />