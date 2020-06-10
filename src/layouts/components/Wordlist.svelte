<script>
    export let cursor;
    export let words;

    let box_offset = 162;

    const Scroll = (cursor) => {
        if(cursor === 0) box_offset = 162;
        let offset = box_offset;
        let next = 31;

        box_offset = offset - next;
    }

    $: Scroll(cursor);
</script>

<div id="wordlist">
    <div id="arrow"></div>
    <div style={`margin-top: ${box_offset}px`} id="scrollingwords">
        <ul style="list-style: none;">
            {#each words as word, i}
                {#if i === cursor}  
                    <li style="font-size: 19pt; font-weight: bold; color: rgba(255, 255, 255, 0.7);">{word}</li>
                {:else}
                <li>{word}</li>
                {/if}
            {/each}
        </ul>
    </div>
</div>