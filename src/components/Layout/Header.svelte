<script>
	export let img;
	export let icon;
	export let text = '';
</script>

<header
	class="flex items-center bg-center bg-cover relative z-0 h-32 md:h-80 mt-0"
	style="background-image:url({img})"
>
	<div class="responsive-container">
		<h1 class="text-white text-2xl md:text-4xl xl:text-6xl font-semibold ml-8 mb-0">
			{#if icon}
				<img class="inline w-auto h-[40px] md:h-[128px]" src={icon} />
			{/if}
			{text}
		</h1>
	</div>
</header>
