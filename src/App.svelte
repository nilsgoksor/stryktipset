<script>
  import db from "../firebase";
  import Coupon from "./Coupon.svelte";
  import EditCoupon from "./EditCoupon.svelte";

  let dataLoaded = false;
  let modifyTip = false;
  let tipStarted = false;
  let deadline = "";

  let matchData = [];
  let coupon = [];
  let currentTipper = "";

  async function getCoupon() {
    db.collection("tips")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())[0];
        coupon = data.coupon;
        currentTipper = data.author;
      });
  }

  async function getMatches() {
    const siteUrl =
      "https://cors-anywhere.herokuapp.com/https://api.spela.svenskaspel.se/draw/1/stryktipset/draws/";
    await fetch(siteUrl)
      .then((res) =>
        res.json().then((data) => {
          const draws = data.draws[0];
          deadline = new Date(draws.regCloseTime);
          matchData = draws.drawEvents;
          dataLoaded = true;
        })
      )
      .catch(() => (dataLoaded = true));
  }
  function toggleModifyTip() {
    modifyTip = !modifyTip;
    getCoupon();
  }

  function getDeadlineStatus() {
    const timeToDeadLine = (deadline - Date.now()) / (36e5).toFixed(2);
    if (timeToDeadLine < 0) {
      tipStarted = true;
      return "Tipset är igång!";
    } else {
      return `Deadline om ${timeToDeadLine}h`;
    }
  }

  getMatches();
  getCoupon();
</script>

<main>
  <h1>stryktipset</h1>
  {#if matchData.length === 0}
    {#if dataLoaded}
      <p>
        Hittar inga matcher. Kom tillbaka på torsdag, då brukar veckans rad
        släppas!
      </p>
    {:else}
      <p>Loading...</p>
    {/if}
  {:else}
    {#if tipStarted}
      <p>{getDeadlineStatus()}</p>
    {/if}
    {#if modifyTip}
      <EditCoupon {matchData} {coupon} {currentTipper} />
    {:else}
      <Coupon {matchData} {coupon} {currentTipper} />
    {/if}
    <button class="primary-button" on:click={toggleModifyTip}>
      {modifyTip ? "Spara kupong" : "Ändra kupong"}
    </button>
  {/if}
</main>

<style>
  main {
    text-align: center;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
    margin: 0px;
  }

  main :global(h2) {
    font-size: 1.5em;
    font-weight: 100;
    margin: 5px 0px;
  }

  main :global(p) {
    font-size: 1em;
    font-weight: 200;
  }

  main :global(table) {
    margin: auto;
    width: 100%;
    max-width: 650px;
  }
  main :global(td) {
    height: 40px;
  }
</style>
