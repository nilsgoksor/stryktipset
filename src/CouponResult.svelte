<script>
  export let result;

  const BAD_RESULT = 6;
  const GREEAT_RESULT = 10;
</script>

<div class="coupon-res">
  <div class="info-wrapper">
    <h1
      class="score"
      class:bad={result.filter((r) => r.correct).length < BAD_RESULT}
      class:great={result.filter((r) => r.correct).length > GREEAT_RESULT}
    >
      {result.filter((r) => r.correct).length}
    </h1>
    <div class="req-events">
      {#if result.filter((r) => r.correct).length >= BAD_RESULT}
        {#each result.filter((r) => r.requirement.length > 0 && !r.matchFinished) as resultData}
          <div>
            <p>{resultData.requirement}</p>
          </div>
        {/each}
      {:else}
        <p>May the foce be with you</p>
      {/if}
    </div>
  </div>
  <p>
    {`Högsta möjliga tröja som kan vinnas är  ${
      result.filter((res) => !res.matchFinished || res.correct).length || 0
    }!`}
  </p>
  {#if result.filter((r) => r.correct).length > GREEAT_RESULT}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://spela.svenskaspel.se/stryktipset/1_4674"
    >
      {`Det luktar vinst! Men hur mycket?`}
    </a>
  {/if}
</div>

<style>
  .coupon-res {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info-wrapper {
    display: flex;
    justify-content: center;
  }
  .req-events {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 25px 0px;
    margin-left: 25px;
  }
  .score {
    color: #00cc00;
    text-transform: uppercase;
    font-size: 10em;
    font-weight: 100;
    margin: 25px 0px;
  }
  .bad {
    color: #ff3e00;
  }
  .great {
    color: #e0eb05;
  }
  p {
    margin: 5px;
    text-align: left;
  }
</style>
