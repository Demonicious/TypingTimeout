<script>
    import Timer from "./components/Timer.svelte";
    import Wordlist from "./components/Wordlist.svelte";

    export let cursor;
    export let words;
    export let seconds;
</script>

<div id="left">
    <Timer seconds={seconds} />
    <Wordlist cursor={cursor} words={words} />
</div>