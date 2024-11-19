<script>
    const { abilityInfo } = $props();
</script>

<div class="flex text-left mb-1 mt-1">
    <img class="p-0 mr-3" src={abilityInfo.src} alt="" />
    {abilityInfo.title}
</div>
