<script lang="ts">
	import type { DatasetItem } from '$lib/utils/dataset';
	import { concatenateText } from '$lib/utils/text';
	import { _ } from 'svelte-i18n';
	export let item: DatasetItem;
	export let maxPromptLength = 30;
	export let maxTextLength = 30;
</script>

<h3>{$_(`stories.${item.story}.title`)}</h3>
<small>({item.generator})</small>
<p>{concatenateText(item.prompt, maxPromptLength)}</p>
<p>{concatenateText(item.generated_text, maxPromptLength)}</p>
