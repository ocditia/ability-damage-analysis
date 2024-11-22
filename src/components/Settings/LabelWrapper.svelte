<script>
    import ImageWrapper from '$components/Settings/ImageWrapper.svelte';

    let { label, img } = $props();
</script>

<div
    class="flex flex-row items-center"
>
    <ImageWrapper img={img} />
    {label}
</div>