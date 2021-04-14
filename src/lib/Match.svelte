<script lang="ts">
	import MediaQuery from 'svelte-media-query';
	import FaRegClock from 'svelte-icons/fa/FaRegClock.svelte';
	import type { MatchI } from 'src/routes/index.svelte';
	import OutcomeRequirements from './OutcomeRequirements.svelte';
	import moment from 'moment';

	export let match: MatchI;
	export let index: number;
	export let tipperCouponRow: string[];

	const kickoffDate = moment(match.event_start.raw.replace(' UTC', ''))
		.add(2, 'hours')
		.format('H:mm');
</script>

<div
	class="match"
	class:correct={match.match_started && tipperCouponRow?.includes(match.outcome)}
	class:wrong={match.match_started && !tipperCouponRow?.includes(match.outcome)}
	class:finished={match.match_finished}
>
	<div class="match-info">
		<div class="match-index">
			<p>{index}</p>
		</div>

		<div class="match-status">
			{#if match.match_finished}
				<p>FT</p>
			{:else if match.match_started}
				<div class="icon"><FaRegClock /></div>
			{:else}
				<p>
					{kickoffDate}
				</p>
			{/if}
		</div>

		<div class="match-outcome">
			<p>{match.outcome}</p>
		</div>

		<div class="match-score">
			<p class:winner={match.outcome === '1'}>{match.home_score || 0}</p>
			<p class:winner={match.outcome === '2'}>{match.away_score || 0}</p>
		</div>
	</div>
	<div class="match-teams">
		<div class="team-row">
			<p class:winner={match.outcome === '1'}>
				<MediaQuery query="(max-width: 600px)" let:matches>
					{#if matches}
						{match.home_long.length < 12 ? match.home_long : match.home_short}
					{:else}
						{match.home_long}
					{/if}
				</MediaQuery>
			</p>
			<OutcomeRequirements team="home" {match} {tipperCouponRow} />
		</div>
		<div class="team-row">
			<p class:winner={match.outcome === '2'}>
				<MediaQuery query="(max-width: 600px)" let:matches>
					{#if matches}
						{match.away_long.length < 12 ? match.away_long : match.away_short}
					{:else}
						{match.away_long}
					{/if}
				</MediaQuery>
			</p>
			<OutcomeRequirements team="away" {match} {tipperCouponRow} />
		</div>
	</div>
	<div class="match-tip">
		<button class="button" class:selected={tipperCouponRow?.includes('1')} disabled>
			<p>1</p>
		</button>
		<button class="button" class:selected={tipperCouponRow?.includes('X')} disabled>
			<p>X</p>
		</button>
		<button class="button" class:selected={tipperCouponRow?.includes('2')} disabled>
			<p>2</p>
		</button>
	</div>
</div>

<style>
	.winner {
		font-weight: bold;
	}

	.correct {
		background-color: #258d25;
	}

	.wrong {
		background-color: #ff0033;
	}
	.finished {
		opacity: 0.5;
		box-shadow: none;
	}
	.icon {
		height: 20px;
		margin: 0 auto;
	}

	.button {
		width: 40px;
		height: 100%;
		background-color: transparent;
		outline: none;
		border: none;
		opacity: 0.25;
		font-size: 16px;
	}
	.selected {
		opacity: 1;
	}
</style>
