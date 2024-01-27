<script lang="ts">
	import Grid from '$lib/icons/Grid.svelte';
	import { _ } from 'svelte-i18n';
	import type { PageServerData } from '../$types';

	export let data: PageServerData;
	let selectedIndex = 0;

	let isGrid = false;

	function getGridTooltip() {
		return $_(`dataset.image-player.grid-${isGrid ? 'on' : 'off'}-tooltip`);
	}
</script>

<div>
	<ul>
		<li>
			<b>{$_('dataset.labels.story')}</b>
			{$_(`stories.${data.item.story}.title`)}
		</li>
		<li>
			<b>{$_('dataset.labels.prompt')}</b>
			{data.item.prompt}
		</li>
		<li>
			<b>{$_('dataset.labels.generator')}</b>
			{data.item.generator}
		</li>
		<li>
			<b>{$_('dataset.labels.generatedText')}</b>
			{data.item.generatedText}
		</li>
	</ul>
</div>
<div id="container">
	<div id="view-mode">
		{#key isGrid}
			<Grid title={getGridTooltip()} onClick={() => (isGrid = !isGrid)} />
		{/key}
	</div>
	{#if !isGrid}
		<div id="player">
			{#each Object.entries(data.images) as [name, image], index}
				<img class={selectedIndex == index ? '' : 'hidden'} src={image} alt={name} />
			{/each}

			<div id="pages">
				{#each Object.keys(data.images) as _, index}
					<button
						class={selectedIndex == index ? 'selected' : ''}
						on:click={() => (selectedIndex = index)}>{index + 1}</button
					>
				{/each}
			</div>
		</div>
	{:else}
		<div id="grid">
			{#each Object.entries(data.images) as [name, image]}
				<img src={image} alt={name} />
			{/each}
		</div>
	{/if}
</div>

<style>
	:root {
		--max-grid-width: 25vw;
	}
	#container {
		display: flex;
		justify-content: center;
	}
	.hidden {
		display: none;
	}
	#player {
		align-self: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 40vw;
	}
	#player > img {
		width: 40vw;
		max-height: 60vh;
		object-fit: contain;
	}
	#pages {
		display: flex;
		justify-content: space-between;
	}
	#pages button {
		color: var(--blue);
	}
	#pages button.selected {
		background-color: rgb(191, 187, 187);
	}
	#grid {
		display: grid;
		grid-template-columns: var(--max-grid-width) var(--max-grid-width) var(--max-grid-width);
		column-gap: 0.4rem;
		row-gap: 0.4rem;
	}
	#grid > img {
		width: var(--max-grid-width);
		max-height: var(--max-grid-width);
		object-fit: contain;
	}
</style>
