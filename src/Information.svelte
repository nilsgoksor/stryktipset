<script>
  export let result;

  const BAD_RESULT = 7;
  const GREEAT_RESULT = 11;
</script>

<div class="info-wrapper">
  <h1
    class:bad={result.filter((r) => r.correct).length < BAD_RESULT}
    class:great={result.filter((r) => r.correct).length > GREEAT_RESULT}
  >
    {result.filter((r) => r.correct).length}
  </h1>
  <div class="req-events">
    {#if result.filter((r) => r.correct).length >= BAD_RESULT}
      {#each result.filter((r) => r.information.length > 0) as resultData}
        <div>
          <p>{resultData.information}</p>
        </div>
      {/each}
    {:else}
      <p>May the foce be with you</p>
    {/if}
  </div>
</div>

<style>
  .info-wrapper {
    display: flex;
    justify-content: center;
  }
  .req-events {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 25px;
  }
  h1 {
    color: #00cc00;
    text-transform: uppercase;
    font-size: 10em;
    font-weight: 100;
    margin: 0px;
  }
  .bad {
    color: #ff3e00;
  }
  .great {
    color: #d8d808;
  }
  p {
    font-size: 1em;
    font-weight: 200;
    margin: 5px;
    text-align: left;
  }
</style>
