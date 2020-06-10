<script>
    import Icon from "fa-svelte";
    import { faClock } from "@fortawesome/free-solid-svg-icons";

    export let seconds;
</script>

<div id="timeLeft">
    <p id="counthead">Time Left <Icon icon={faClock} /></p>
    <p id="secs">{ seconds }</p>
</div>