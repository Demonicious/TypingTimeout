<script>
    import Icon from "fa-svelte";
    import { faStar } from "@fortawesome/free-solid-svg-icons";  

    export let score;
    export let highscore;
</script>

<div id="stats">
    <div style="display:flex;">
        <div id="current">
            <p id="scorehead">Score</p>
            <p id="score">{ score }</p>
        </div>
        <div id="high">
            <p id="highhead">Your High Score <Icon icon={faStar} /></p>
            <p id="highscore">{ highscore }</p>
        </div>
    </div>
</div>