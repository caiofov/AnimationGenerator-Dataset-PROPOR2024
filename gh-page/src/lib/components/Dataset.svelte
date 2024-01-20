<script lang="ts">
	import { getDataset } from '$lib/utils/dataset';
	import DatasetItem from './DatasetItem.svelte';

	const dataset = getDataset();
</script>

{#each dataset as item}
	<DatasetItem {item} />
{/each}
