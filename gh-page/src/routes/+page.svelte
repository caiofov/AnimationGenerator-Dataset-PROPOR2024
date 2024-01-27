<script lang="ts">
	import DatasetTable from '$lib/components/DatasetTable.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<DatasetTable avaibleImages={data.avaibleImages} />
