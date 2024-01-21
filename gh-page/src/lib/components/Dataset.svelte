<script lang="ts">
	import { getGroupedDataset } from '$lib/utils/dataset';
	import { _ } from 'svelte-i18n';
	import DatasetTable from './DatasetTable.svelte';
	let dataset = getGroupedDataset();
</script>

<DatasetTable />

<!-- 
{#each Object.entries(dataset) as [story, storyGroup]}
	<div class="story">
		<h3>{$_(`stories.${story}.title`)}</h3>

		{#each Object.entries(storyGroup) as [prompt, promptGroup]}
			<div class="prompt">
				<b></b>

				{#each Object.entries(promptGroup) as [generator, generatorGroup]}
					<small>{generator}</small>
					{#each generatorGroup as item}
						<p>{concatenateText(item.generatedText, 50)}</p>
					{/each}
				{/each}
			</div>
		{/each}
	</div>
{/each} -->

<style>
</style>
