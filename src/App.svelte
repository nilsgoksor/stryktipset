<script>
  import Match from "./Match.svelte";
  import TipMatch from "./TipMatch.svelte";
  import Information from "./Information.svelte";
  import MediaQuery from "svelte-media-query";
  import db from "../firebase";

  let modifyTip = false;
  let couponMatches = [];
  let deadline = "";
  let currentTipper = "";
  let tippers = [];
  let coupon = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
  let result = [
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
    { correct: false, information: "" },
  ];

  async function getCoupon() {
    db.collection("tips")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())[0];
        coupon = data.coupon;
        currentTipper = data.author;
      });
  }
  async function getUsers() {
    db.collection("participants")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data().names)[0];
        tippers = data;
      });
  }
  async function getMatches() {
    const siteUrl =
      "https://cors-anywhere.herokuapp.com/https://api.spela.svenskaspel.se/draw/1/stryktipset/draws/4673%7C";
    await fetch(siteUrl)
      .then((res) =>
        res.json().then((data) => {
          deadline = data.draw?.regCloseDescription;
          couponMatches = data.draw?.drawEvents;
        })
      )
      .catch((err) => console.log("err", err));
  }

  function toggleModifyTip() {
    modifyTip = !modifyTip;
  }

  function editCouponHandler(event) {
    const value = event.detail.value;
    const index = event.detail.index;

    if (coupon[index].includes(value)) {
      coupon[index] = coupon[index].replace(value, "");
    } else {
      coupon[index] = `${coupon[index]}${value}`;
    }

    db.collection("tips").doc("coupon").set({
      author: currentTipper,
      coupon: coupon,
    });
  }
  function editResultHandler(event) {
    result[event.detail.index] = {
      correct: event.detail.correct,
      information: event.detail.information,
    };
  }
  getUsers();
  getMatches();
  getCoupon();
</script>

<main>
  <h1>stryktipset</h1>
  {#if couponMatches.length === 0}
    <p>
      Hittar inga matcher. Kom tillbaka på torsdag, då brukar veckans rad
      släppas!
    </p>
  {:else}
    <Information {result} />
    <div>
      <p>{deadline}</p>
      <button on:click={toggleModifyTip}>
        {modifyTip ? "Spara kupong" : "Ändra kupong"}
      </button>
    </div>
    <table>
      <tr>
        <th />
        <th>
          <h2>Hemma</h2>
        </th>
        <th />
        <th />
        <th>
          <h2>Borta</h2>
        </th>
        {#if !modifyTip}
          <th>
            <MediaQuery query="(max-width: 780px)" let:matches>
              {#if matches}
                <h2>X</h2>
              {/if}
            </MediaQuery>
            <MediaQuery query="(min-width: 780px)" let:matches>
              {#if matches}
                <h2>1 | X | 2</h2>
              {/if}
            </MediaQuery>
          </th>
        {/if}
        <th>
          {#if modifyTip}
            <select bind:value={currentTipper}>
              {#each tippers as tipper}
                <option value={tipper}>
                  {tipper}
                </option>
              {/each}
            </select>
          {:else}
            <h2>{currentTipper}</h2>
          {/if}
        </th>
      </tr>
      {#if modifyTip}
        {#each couponMatches as matchData, index}
          <TipMatch
            match={matchData.match}
            couponRow={coupon[index]}
            {index}
            on:editCoupon={editCouponHandler}
          />
        {/each}
      {:else}
        {#each couponMatches as matchData, index}
          <Match
            match={matchData.match}
            coupon={coupon[index]}
            {index}
            on:editResult={editResultHandler}
          />
        {/each}
      {/if}
    </table>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    color: #000;
  }

  table {
    margin: auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3.5em;
    font-weight: 100;
    margin: 0px;
    margin-bottom: 20px;
  }

  button {
    color: #ff3e00;
    background-color: transparent;
    text-transform: uppercase;
    font-size: 1em;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 100;
  }

  p {
    font-size: 1em;
    font-weight: 200;
  }

  th {
    padding: 0px 5px;
  }
  select {
    margin: auto;
    font-size: 1.5em;
    font-weight: 100;
  }
</style>
