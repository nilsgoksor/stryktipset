<script>
  import MediaQuery from "svelte-media-query";
  import Match from "./Match.svelte";
  import CouponResult from "./CouponResult.svelte";

  export let matchData;
  export let coupon;
  export let currentTipper;
  export let payouts;
  export let deadline;

  let result = [];

  function editResultHandler(event) {
    result[event.detail.index] = {
      correct: event.detail.correct,
      requirement: event.detail.requirement,
      matchStarted: event.detail.matchStarted,
      matchFinished: event.detail.matchFinished,
      data: event.detail.data,
    };
  }
</script>

<CouponResult {result} {payouts} {deadline} />
<table>
  <tr>
    <th>
      <h2>#</h2>
    </th>
    <th>
      <h2>Hemma</h2>
    </th>
    <th />
    <th>
      <h2>Borta</h2>
    </th>
    <th class="result">
      <MediaQuery query="(max-width: 780px)" let:matches>
        {#if matches}
          <h2>X</h2>
        {/if}
      </MediaQuery>
      <MediaQuery query="(min-width: 780px)" let:matches>
        {#if matches}
          <h2>Resultat</h2>
        {/if}
      </MediaQuery>
    </th>
    <th>
      <h2>{currentTipper}</h2>
    </th>
  </tr>
  {#each matchData as match, index}
    <Match
      {match}
      coupon={coupon[index]}
      {index}
      on:editResult={editResultHandler}
    />
  {/each}
</table>

<style>
  .result {
    max-width: 55px;
  }
</style>
