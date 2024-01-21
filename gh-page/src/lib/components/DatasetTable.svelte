<script lang="ts">
	import {
		getGroupedDataset,
		type GroupedGeneratorItems,
		type GroupedPromptItems
	} from '$lib/utils/dataset';
	import { concatenateText } from '$lib/utils/text';
	import { _ } from 'svelte-i18n';
	const dataset = getGroupedDataset();

	const maxTextLength = 100;
	function promptRows(storyGroup: GroupedGeneratorItems) {
		const generators = Object.values(storyGroup);

		return generators.length + generators.flat(1).length + 1;
	}
	function storyRows(storyGroup: GroupedPromptItems) {
		const prompts = Object.values(storyGroup);
		const values = prompts.map((a) => Object.values(a).map((b) => Object.values(b))).flat(2);
		const generators = prompts.map((b) => Object.values(b)).flat(1).length;

		return values.length + prompts.length + generators + 1;
	}
</script>

<table>
	<tr>
		<th>{$_('dataset.labels.story')}</th>
		<th>{$_('dataset.labels.prompt')}</th>
		<th>{$_('dataset.labels.generator')}</th>
		<th>{$_('dataset.labels.generatedText')}</th>
	</tr>
	{#each Object.entries(dataset) as [story, storyGroup]}
		<tr>
			<td rowspan={storyRows(storyGroup)} class="story-title"
				><p>{$_(`stories.${story}.title`)}</p></td
			>
		</tr>

		{#each Object.entries(storyGroup) as [prompt, promptGroup]}
			<tr>
				<td rowspan={promptRows(promptGroup)} class="prompt"
					><p>
						{prompt} - {Object.values(promptGroup)[0][0].prompt}
					</p>
				</td>
			</tr>

			{#each Object.entries(promptGroup) as [generator, generatorGroup]}
				<tr><td rowspan={generatorGroup.length + 1} class="generator">{generator}</td></tr>
				{#each generatorGroup as item}
					<tr><td class="generated"><p>{item.generatedText}</p></td></tr>
				{/each}
			{/each}
		{/each}
	{/each}
</table>

<style>
	.prompt {
		width: 10%;
	}
	.generated {
		width: 20%;
	}
	.generator {
		width: 5%;
		text-align: center;
	}
	.story-title {
		font-weight: bold;
		text-align: center;
		border-bottom: solid black 1px;
		width: 10%;
	}
	table {
		max-width: 80vw;
	}
	th {
		border-bottom: 1px black solid;
	}

	td {
		width: fit-content;
		padding: 0;
	}

	td > p {
		text-wrap: wrap;
	}
</style>
