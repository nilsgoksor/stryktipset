<script>
  import db from "../firebase";
  import Coupon from "./Coupon.svelte";
  import EditCoupon from "./EditCoupon.svelte";

  let dataLoaded = false;
  let modifyTip = false;

  let matchData = [];
  let coupon = [];
  let payouts = [];
  let currentTipper = "";
  let deadline = "";

  async function getCoupon() {
    db.collection("tips")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())[0];
        coupon = data.coupon;
        currentTipper = data.author;
      });
  }

  async function getMatchData() {
    const roundsUrl =
      "https://secret-ocean-49799.herokuapp.com/https://liverattning.se/api/v1/results?product=1";
    await fetch(roundsUrl)
      .then((res) =>
        res.json().then((data) => {
          const roundId = data[0].round_ids[0];
          const couponUrl = `https://secret-ocean-49799.herokuapp.com/https://liverattning.se/api/v1/result?round_id=${roundId}`;
          fetch(couponUrl)
            .then((res) =>
              res.json().then((data) => {
                deadline = data[0].close_time.format;
                matchData = data[0].events;
                payouts = data[0].payouts;
                dataLoaded = true;
              })
            )
            .catch(() => (dataLoaded = true));
        })
      )
      .catch(() => (dataLoaded = true));
  }

  function toggleModifyTip() {
    modifyTip = !modifyTip;
    getCoupon();
  }
  getCoupon();
  getMatchData();
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
  {:else if modifyTip}
    <EditCoupon
      {matchData}
      {coupon}
      {currentTipper}
      on:handleUpdateCouponRow={toggleModifyTip}
    />
  {:else}
    <Coupon
      {matchData}
      {coupon}
      {currentTipper}
      {deadline}
      {payouts}
      on:handleUpdateCouponRow={toggleModifyTip}
    />
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
