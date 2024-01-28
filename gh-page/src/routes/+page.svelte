<script lang="ts">
	import Play from '$lib/icons/Play.svelte';
	import {
		getGroupedDataset,
		type GroupedGeneratorItems,
		type GroupedPromptItems
	} from '$lib/utils/dataset';
	import { _ } from 'svelte-i18n';
	import type { PageServerData } from './$types';
	import { base } from '$app/paths';

	const dataset = getGroupedDataset();
	export let data: PageServerData;

	const availableImages: string[] = data.availableImages;

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

<div id="summary">
	<ul>
		{#each Object.keys(dataset) as story}
			<li><a href={'#' + story} class="summary-item">{$_(`stories.${story}.title`)}</a></li>
		{/each}
	</ul>
</div>

<div id="table-container">
	<table>
		<tr>
			<th>{$_('dataset.labels.story')}</th>
			<th>{$_('dataset.labels.prompt')}</th>
			<th>{$_('dataset.labels.generator')}</th>
			<th>{$_('dataset.labels.generatedText')}</th>
			<th>ID</th>
			<th></th>
		</tr>
		{#each Object.entries(dataset) as [story, storyGroup]}
			<tr>
				<td rowspan={storyRows(storyGroup)} class="story-title"
					><p id={story}>{$_(`stories.${story}.title`)}</p></td
				>
			</tr>

			{#each Object.entries(storyGroup) as [prompt, promptGroup]}
				<tr>
					<td rowspan={promptRows(promptGroup)} class="prompt">
						<p>
							{prompt} - {Object.values(promptGroup)[0][0].prompt}
						</p>
					</td>
				</tr>

				{#each Object.entries(promptGroup) as [generator, generatorGroup]}
					<tr><td rowspan={generatorGroup.length + 1} class="generator">{generator}</td></tr>
					{#each generatorGroup as item}
						<tr>
							<td class="generated">
								<p>{item.generatedText}</p>
							</td>
							<td class="generated-id">
								<p>{item.id}</p>
							</td>
							{#if availableImages.includes(item.id)}
								<td class="play-icon">
									<a href={`${base}/${item.id}`}><Play /></a>
								</td>
							{/if}
						</tr>
					{/each}
				{/each}
			{/each}
		{/each}
	</table>
</div>

<style>
	#summary {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}
	ul {
		border-radius: 5px;
		display: flex;
		border: solid 1px black;
	}

	li {
		list-style: none;
		margin-left: 3rem;
		padding: 1rem 1rem;
	}

	.summary-item {
		text-decoration: none;
		color: var(--blue);
		padding: 0.5rem;
		border-radius: 5px;
	}
	.summary-item:hover {
		border-left: solid 1px var(--blue);
		border-right: solid 1px var(--blue);
		transition: 0.1s;
	}
	.prompt {
		width: 10%;
		text-align: justify;
	}
	.generated {
		width: 20%;
		text-align: justify;
	}
	.generator,
	.generated-id {
		width: 5%;
		text-align: center;
	}
	.story-title {
		font-weight: bold;
		text-align: center;
		border-bottom: solid black 1px;
		width: 10%;
	}
	.play-icon {
		width: 1%;
	}
	#table-container {
		justify-content: center;
		display: flex;
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
