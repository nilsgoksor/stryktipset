<script lang="ts">
	import type { MatchI } from 'src/routes/index.svelte';
	import EditMatch from './EditMatch.svelte';
	import db from '../firebase/db';

	export let matchData: MatchI[];
	export let tipper: string;
	export let tipperCoupon: string[];

	const handleUpdateCouponRow = ({ detail }) => {
		const { value, index } = detail;

		if (typeof value === 'string' && typeof index === 'number') {
			if (tipperCoupon[index]?.includes(value)) {
				tipperCoupon[index] = tipperCoupon[index].replace(value, '');
			} else {
				const newTip = `${tipperCoupon[index]}${value}`;
				const tip1 = newTip.includes('1') ? '1' : '';
				const tipX = newTip.includes('X') ? 'X' : '';
				const tip2 = newTip.includes('2') ? '2' : '';
				tipperCoupon[index] = `${tip1}${tipX}${tip2}`;
			}

			db.collection('tips').doc('coupon').set({
				author: tipper,
				coupon: tipperCoupon
			});
		}
	};
</script>

{#each matchData as match, index}
	<EditMatch
		{match}
		tipperCouponRow={tipperCoupon[index]?.toString()?.split('')}
		{index}
		on:updateCouponRow={handleUpdateCouponRow}
	/>
{/each}
