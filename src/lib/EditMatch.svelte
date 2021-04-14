<script lang="ts">
	import MediaQuery from 'svelte-media-query';
	import FaRegClock from 'svelte-icons/fa/FaRegClock.svelte';
	import type { MatchI } from 'src/routes/index.svelte';
	import { createEventDispatcher } from 'svelte';
	import moment from 'moment';

	export let match: MatchI;
	export let index: number;
	export let tipperCouponRow: string[];

	const dispatch = createEventDispatcher();

	const handleUpdateCouponRow = (value: string) => {
		dispatch('updateCouponRow', {
			index: index,
			value: value
		});
	};

	const kickoffDate = moment(match.event_start.raw.replace(' UTC', ''))
		.add(2, 'hours')
		.format('H:mm');
</script>

<div class="match">
	<div class="match-info">
		<div class="match-index">
			<p>{index + 1}</p>
		</div>

		<div class="match-status">
			{#if match.match_finished}
				<p>FT</p>
			{:else if match.match_started}
				<div class="icon"><FaRegClock /></div>
			{:else}
				<p>{kickoffDate}</p>
			{/if}
		</div>
	</div>
	<div class="match-teams">
		<div class="team-row">
			<p>
				<MediaQuery query="(max-width: 600px)" let:matches>
					{#if matches}
						{match.home_long.length < 12 ? match.home_long : match.home_short}
					{:else}
						{match.home_long}
					{/if}
				</MediaQuery>
			</p>
		</div>
		<div class="team-row">
			<p>
				<MediaQuery query="(max-width: 600px)" let:matches>
					{#if matches}
						{match.away_long.length < 12 ? match.away_long : match.away_short}
					{:else}
						{match.away_long}
					{/if}
				</MediaQuery>
			</p>
		</div>
	</div>
	<div class="match-tip">
		<button
			class="button"
			class:selected={tipperCouponRow?.includes('1')}
			on:click={() => handleUpdateCouponRow('1')}
		>
			<p>1</p>
		</button>
		<button
			class="button"
			class:selected={tipperCouponRow?.includes('X')}
			on:click={() => handleUpdateCouponRow('X')}
		>
			<p>X</p>
		</button>
		<button
			class="button"
			class:selected={tipperCouponRow?.includes('2')}
			on:click={() => handleUpdateCouponRow('2')}
		>
			<p>2</p>
		</button>
	</div>
</div>

<style>
	.button {
		width: 40px;
		height: 100%;
		background-color: transparent;
		outline: none;
		border: none;
		cursor: pointer;
		font-size: 16px;
	}
	.selected {
		background-color: #258d25;
	}
</style>
