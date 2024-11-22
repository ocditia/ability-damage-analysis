<script>
    let { children } = $props();
</script>

<div class="flex flex-row items-center justify-between h-8 pt-0.5">
    {@render children?.()}
</div>