<script>
    export let img = undefined;
</script>

<div class="flex w-7 mr-2 justify-center">
    {#if img}
        <img class="h-7" src={img} alt=""/>
    {/if}
</div>