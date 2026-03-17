<script>
    const { abilityInfo } = $props();
</script>

<div class="flex text-left mb-1 mt-1">
    <img class="p-0 mr-3 w-[30px] h-[30px] object-contain" src={abilityInfo.src} alt="" />
    {abilityInfo.title}
</div>
