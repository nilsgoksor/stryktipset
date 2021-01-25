<script>
  import Match from "./Match.svelte";
  import TipMatch from "./TipMatch.svelte";

  let modifyTip = false;
  let matches = [];
  let deadline = "";
  let currentTipper = "Nils";
  const tippers = [
    "Nils",
    "Johan",
    "Sebastian",
    "Anna",
    "Thord",
    "Petter",
    "Anne-Li",
  ];
  let coupon = ["1", "", "", "", "", "", "", "", "", "", "", "", ""];

  async function getData() {
    const siteUrl =
      "https://cors-anywhere.herokuapp.com/https://api.spela.svenskaspel.se/draw/1/stryktipset/draws/4673%7C";
    await fetch(siteUrl)
      .then((res) =>
        res.json().then((data) => {
          deadline = data.draw?.regCloseDescription;
          matches = data.draw?.drawEvents;
        })
      )
      .catch((err) => console.log("err", err));
  }

  function toggleModifyTip() {
    modifyTip = !modifyTip;
  }

  function editCouponHandler(event) {
    const value = [event.detail.value][0];
    const index = [event.detail.index];

    if (coupon[index].includes(value)) {
      coupon[index] = coupon[index].replace(value, "");
    } else {
      coupon[index] = `${coupon[index]}${value}`;
    }
  }

  getData();
</script>

<main>
  <h1>stryktipset</h1>
  <!-- {#if matches.length === 0} -->
  <p>
    Hittar inga matcher. Kom tillbaka på torsdag, då brukar veckans rad släppas!
  </p>
  <!-- {:else} -->
  <p>{deadline}</p>
  <button on:click={toggleModifyTip}>
    {modifyTip ? "Spara tips" : "Ändra tips"}
  </button>
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
          <h2>1/X/2</h2>
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
      {#each matches as matchData, index}
        <TipMatch
          match={matchData.match}
          couponRow={coupon[index]}
          {index}
          on:editCoupon={editCouponHandler}
        />
      {/each}
    {:else}
      {#each matches as matchData, index}
        <Match match={matchData.match} coupon={coupon[index]} {index} />
      {/each}
    {/if}
  </table>
  <!-- {/if} -->
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
  }

  table {
    margin: auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  button {
    color: #ff3e00;
    background-color: transparent;
    text-transform: uppercase;
    font-size: 1em;
  }

  h2 {
    font-size: 2em;
    font-weight: 100;
  }

  p {
    font-size: 1em;
    font-weight: 200;
  }

  th {
    padding: 0px 15px;
  }
</style>
