<script lang="ts" context="module">
	export interface MatchI {
		home_long: string;
		home_short: string;
		away_long: string;
		away_short: string;
		home_score: number | null;
		away_score: number | null;
		outcome: string;
		match_finished: boolean;
		match_started: boolean;
		event_start: { format: string };
	}
	[];
	export interface PayoutI {
		name: string;
		winners: number;
		amount: string;
	}
	export async function load({ fetch }) {
		const roundsUrl =
			'https://secret-ocean-49799.herokuapp.com/https://liverattning.se/api/v1/results?product=1';
		const rounds = await fetch(roundsUrl);
		if (rounds.ok) {
			const roundsData = await rounds.json();
			const currentRoundId = roundsData[0].round_ids[0];

			const couponUrl = `https://secret-ocean-49799.herokuapp.com/https://liverattning.se/api/v1/result?round_id=${currentRoundId}`;
			const coupon = await fetch(couponUrl);
			const couponData = await coupon.json();

			return {
				props: {
					deadline: couponData[0].close_time.format,
					matchData: couponData[0].events,
					payouts: couponData[0].payouts
				}
			};
		}
		return {
			status: rounds.status,
			error: new Error(`Could not load ${roundsUrl}`)
		};
	}
</script>

<script lang="ts">
	import Coupon from '$lib/Coupon.svelte';
	import EditCoupon from '$lib/EditCoupon.svelte';
	import Settings from '$lib/Settings.svelte';
	import Result from '$lib/Result.svelte';
	import db from '../firebase/db';

	export let deadline: string;
	export let matchData: MatchI[];
	export let payouts: PayoutI[];

	export let tipper: string | undefined = undefined;
	export let tipperCoupon: string[] | undefined = undefined;
	export let participants: string[] | undefined = undefined;

	db.collection('tips')
		.get()
		.then((querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => doc.data())[0];
			tipperCoupon = data.coupon;
			tipper = data.author;
		});

	db.collection('participants')
		.get()
		.then((querySnapshot) => {
			participants = querySnapshot.docs.map((doc) => doc.data().names)[0];
		});

	export let editCoupon: boolean = false;

	function toggleEditCoupon() {
		editCoupon = !editCoupon;
	}
</script>

<main>
	<h1>stryktipset</h1>
	{#if typeof participants !== 'undefined' && typeof tipperCoupon !== 'undefined' && typeof tipper !== 'undefined'}
		<Result {matchData} {tipperCoupon} {payouts} />
		<Settings
			{deadline}
			{tipperCoupon}
			{editCoupon}
			{tipper}
			{participants}
			on:toggleEditCoupon={toggleEditCoupon}
		/>

		{#if !editCoupon}
			<Coupon {matchData} {tipperCoupon} />
		{:else}
			<EditCoupon {matchData} {tipperCoupon} {tipper} />
		{/if}
	{/if}
</main>

<style>
	main {
		margin: 0 auto;
		max-width: 700px;
		text-align: center;
	}

	main :global(p) {
		margin: 0px;
		white-space: nowrap;
		font-weight: 100;
		color: #fff;
	}

	h1 {
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		color: #258d25;
		margin: 0px 5px;
	}
</style>
