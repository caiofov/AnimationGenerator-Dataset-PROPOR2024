<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

{#each Object.entries(data.images) as [name, image]}
	<img src={image} alt={name} />
{/each}
