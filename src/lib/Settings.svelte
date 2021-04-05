<script lang="ts">
	import db from '../firebase/db';
	import { createEventDispatcher } from 'svelte';
	import MdModeEdit from 'svelte-icons/md/MdModeEdit.svelte';

	export let deadline: string;
	export let editCoupon: boolean;
	export let tipper: string;
	export let tipperCoupon: string[];
	export let participants: string[];

	const dispatch = createEventDispatcher();

	function toggleModifyTip() {
		dispatch('toggleEditCoupon');
	}

	const handleUpdatetipper = () => {
		db.collection('tips').doc('coupon').set({
			author: tipper,
			coupon: tipperCoupon
		});
	};

	let started = true;
</script>

{#if !started}
	<a href="https://spela.svenskaspel.se/stryktipset/" target="_blank">
		Glöm inte skicka in ditt tips
	</a>
{/if}

<div class="settings">
	<p class="deadline">Start: {deadline}</p>
	<div class="tipper">
		{#if editCoupon}
			<select bind:value={tipper} on:blur={handleUpdatetipper} class="tipper-select">
				{#each participants as participant}
					<option value={participant}>
						{participant}
					</option>
				{/each}
			</select>
		{:else}
			<p class="tipper-text">{tipper}</p>
		{/if}
		<div class="icon" on:click={toggleModifyTip}>
			<MdModeEdit />
		</div>
	</div>
</div>

<style>
	.deadline {
		color: #4e5850;
	}
	.tipper-text {
		color: #4e5850;
	}
	.settings {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		width: 100%;
		margin-top: 15px;
		margin-bottom: 5px;
		text-align: left;
	}

	.tipper {
		display: flex;
		justify-content: space-around;
		align-items: center;
		cursor: pointer;
		text-align: right;
		color: #4e5850;
	}

	.icon {
		width: 24px;
		height: 24px;
		margin-left: 5px;
	}

	.tipper-select {
		background-color: transparent;
		color: #4e5850;
		border: 1px solid #4e5850;
		outline: none;
		padding: 0px 5px;
	}
</style>
