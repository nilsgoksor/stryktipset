<script lang="ts">
	import type { MatchI, PayoutI } from 'src/routes/index.svelte';
	import Celebrate from './Celebrate.svelte';

	const GREEAT_RESULT = 10;
	const BAD_RESULT = 6;

	export let matchData: MatchI[];
	export let tipperCoupon: string[];
	export let payouts: PayoutI[];

	const started = matchData.find((match) => match.match_started);
	const finishedGames = matchData.filter((match) => match.match_finished);
	const nonfinishedGames = matchData.filter((match) => !match.match_finished);
	const correctGames = matchData.filter((match, index) =>
		tipperCoupon[index].includes(match.outcome)
	);

	const lostPoints = finishedGames.filter(
		(match, index) => !tipperCoupon[index].includes(match.outcome)
	);

	const payoutsAsString = payouts
		.map((payout) => {
			const nbrOfCorrect = parseInt(payout.name.replace(' rätt', ''));
			if (correctGames.length >= nbrOfCorrect) {
				return `${payout.name} ger ${payout.amount}`;
			}
			return null;
		})
		.filter((payout) => payout?.length > 0)
		.join(', ');
</script>

{#if started}
	<h1 class:good={correctGames.length > GREEAT_RESULT} class:bad={correctGames.length < BAD_RESULT}>
		{correctGames.length}
	</h1>
{/if}
{#if finishedGames.length > 0 && nonfinishedGames.length > 0}
	<p class="result-text">Med hopp om tröja {13 - lostPoints.length}</p>
{/if}
{#if nonfinishedGames.length === 0}
	<p class="result-text">Grattis till tröja {correctGames.length}!</p>
{/if}
<p class="result-text">{payoutsAsString}</p>

{#if correctGames.length > GREEAT_RESULT}
	<Celebrate />
{/if}

<style>
	h1 {
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 500;
		color: #4e5850;
		margin: 0px;
	}
	.result-text {
		color: #4e5850;
	}
	.good {
		color: #258d25;
	}

	.bad {
		color: #ff0033;
	}
</style>
