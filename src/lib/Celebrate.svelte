<script>
	import { writable } from 'svelte/store';

	const gifSources = [
		'https://media.giphy.com/media/1zkMbX7k4nd1AM4i4k/giphy.gif',
		'https://media.giphy.com/media/dyvZ6yMa84lsAGpmuh/giphy.gif',
		'https://media.giphy.com/media/1X65fH4wRhr4l6Mfh6/giphy.gif',
		'https://media.giphy.com/media/kGp7NNQSphvJPvCHt6/giphy.gif',
		'https://media.giphy.com/media/LM9DAeihcA2p4ZuhQi/giphy.gif',
		'https://media.giphy.com/media/fYqRXWcYSFpfSAplum/giphy.gif',
		'https://giphy.com/gifs/MOLATV-coach-premierleague-pelatih-Y0PcVB4uE22ejmq8ZT'
	];

	let tick = writable(0, () => {
		let interval = setInterval(() => {
			tick.update((value) => {
				if (value === gifSources.length - 1) return 0;
				return value + 1;
			});
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="celebrate">
	<img class="celebrate-img" src={gifSources[$tick]} alt="" />
	<img class="celebrate-img" src={gifSources[$tick]} alt="" />
	<img class="celebrate-img" src={gifSources[$tick]} alt="" />
	<img class="celebrate-img" src={gifSources[$tick]} alt="" />
	<img class="celebrate-img" src={gifSources[$tick]} alt="" />
	<img class="celebrate-img" src={gifSources[$tick]} alt="" />
</div>

<style>
	.celebrate {
		display: flex;
		justify-content: center;
		position: absolute;
		overflow: hidden;
		top: 0;
		width: 100%;
		max-width: 700px;
		margin: auto;
		opacity: 0.2;
	}
	.celebrate-img {
		height: 155px;
	}
</style>
