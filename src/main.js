import './css/App.css';
import TypingGame from './App.svelte';

const App = new TypingGame({
	target: document.body,
});

export default App;