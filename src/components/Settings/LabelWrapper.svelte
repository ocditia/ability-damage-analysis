<script>
    import ImageWrapper from '$components/Settings/ImageWrapper.svelte';

    export let label;
    export let img;
</script>

<div
    class="flex flex-row items-center"
>
    <ImageWrapper img={img} />
    {label}
</div>