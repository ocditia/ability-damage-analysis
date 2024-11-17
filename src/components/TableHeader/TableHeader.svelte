<script>
    let { onclick, sortType, title } = $props()
</script>

<button {onclick}>
    {title}
    {#if sortType === 'asc'}
        🔼
    {:else if sortType === 'desc'}
        🔽
    {/if}
</button>
