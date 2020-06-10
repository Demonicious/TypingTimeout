<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    const FireInput = (e) => {
        const value = e.target.value;
        dispatch('input', 
            { value }
        );
    }

    export let value;
    export let cps;
    export let words;
    export let cursor;

    const IntroAction = (node) => {
        node.classList.add('bouncyIntro');
        node.classList.add('bounce');
    }
    const ProgressAction = (node, { num, color }) => {
        node.classList.add(`q${num}c`);
    }

    let color = [0, 255, 0];
    let progress = {
        float: 0.0,
        percent: 0.00,
    }

    const calculateProgress = (cursor, words) => {
        let float = cursor / (words.length - 1);
        progress = {
            float,
            percent: (float * 100).toFixed(2)
        }

        if(progress.percent <= 40) color = [0, 255, 0];
        else if(progress.percent >= 41 && progress.percent < 75) color = [255, 255, 0];
        else if(progress.percent >= 75) color = [255, 0, 94];
    }
    $: calculateProgress(cursor, words)
</script>

<div id="center">
    <div id="circular">
        <div use:ProgressAction={{ num: 1, color }} class="quaters movers" id="q1"></div>
        <div use:ProgressAction={{ num: 2, color }} class="quaters movers" id="q2"></div>
        <div use:ProgressAction={{ num: 3, color }} class="quaters movers" id="q3"></div>
        <div use:ProgressAction={{ num: 4, color }} class="quaters movers" id="q4"></div>
        <div use:IntroAction class="bouncy"></div>
        <p id="word">{words[cursor]}</p>
    </div>
    <div id="inputCover">
        <div id="progress">
            <div class="outer">
                <div class="inner" style={`width: ${progress.percent}%; background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});`} />
            </div>
        </div>
        <form autocomplete="off" method="post" action=""><input autocomplete="false" name="hidden" type="text" value={value} on:input={FireInput} id="input" placeholder="Type the text above to begin..." spellcheck="false" /></form>
    </div>
    <div id="message">
        <div>
            Characters / Second
            <span id="cps">{ cps }</span>
        </div>
    </div>
</div>