<script lang="ts">
	import type { MatchI } from 'src/routes/index.svelte';
	import Match from './Match.svelte';

	export let matchData: MatchI[];
	export let tipperCoupon: string[];
</script>

{#each matchData as match, index}
	<Match {match} tipperCouponRow={tipperCoupon[index]?.toString()?.split('')} index={index + 1} />
{/each}
