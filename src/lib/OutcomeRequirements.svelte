<script lang="ts">
	import MediaQuery from 'svelte-media-query';
	import type { MatchI } from 'src/routes/index.svelte';
	export let match: MatchI;

	export let team: string;
	export let tipperCouponRow: string[];

	const userCorrect = tipperCouponRow?.includes(match.outcome);
	const couponHas1 = tipperCouponRow?.includes('1');
	const couponHasX = tipperCouponRow?.includes('X');
	const couponHas2 = tipperCouponRow?.includes('2');

	const homeOutcomeRequirements = [];
	const awayOutcomeRequirements = [];
	if (!userCorrect && match.match_started && !match.match_finished) {
		const goalsNeededFor1 =
			match.home_score > match.away_score ? 0 : 1 + match.away_score - match.home_score;
		const goalsNeededForX = Math.abs(match.away_score - match.home_score);
		const goalsNeededFor2 =
			match.away_score > match.home_score ? 0 : 1 + match.home_score - match.away_score;
		const MAX_VALUE = 9999;
		const fewestGoalsNeeded = Math.min(
			goalsNeededFor1 > 0 && couponHas1 ? goalsNeededFor1 : MAX_VALUE,
			goalsNeededForX > 0 && couponHasX ? goalsNeededForX : MAX_VALUE,
			goalsNeededFor2 > 0 && couponHas2 ? goalsNeededFor2 : MAX_VALUE
		);
		if (goalsNeededFor1 === fewestGoalsNeeded && couponHas1) {
			homeOutcomeRequirements.push(goalsNeededFor1);
		}
		if (goalsNeededForX === fewestGoalsNeeded && couponHasX) {
			if (match.home_score > match.away_score) {
				awayOutcomeRequirements.push(goalsNeededForX);
			} else {
				homeOutcomeRequirements.push(goalsNeededForX);
			}
		}
		if (goalsNeededFor2 === fewestGoalsNeeded && couponHas2) {
			awayOutcomeRequirements.push(goalsNeededFor2);
		}
	}
</script>

<p class="outcome-requirement">
	{#if team === 'home'}
		{#if homeOutcomeRequirements.length > 0}
			<MediaQuery query="(max-width: 600px)" let:matches>
				{#if matches}
					{`[${homeOutcomeRequirements}]`}
				{:else}
					{`måste göra ${homeOutcomeRequirements} mål`}
				{/if}
			</MediaQuery>
		{/if}
	{:else if awayOutcomeRequirements.length > 0}
		<MediaQuery query="(max-width: 600px)" let:matches>
			{#if matches}
				{`gör ${awayOutcomeRequirements}`}
			{:else}
				{`måste göra ${awayOutcomeRequirements} mål`}
			{/if}
		</MediaQuery>
	{/if}
</p>

<style>
	.outcome-requirement {
		color: #edddcb;
		margin: 0;
		margin-left: 5px;
		opacity: 0.5;
	}
</style>
