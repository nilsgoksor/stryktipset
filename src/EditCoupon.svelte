<script>
  import db from "../firebase";
  import { afterUpdate } from "svelte";
  import EditMatch from "./EditMatch.svelte";

  export let matchData;
  export let coupon;
  export let currentTipper;

  let tippers = [];
  const normalGuards = 20;
  let guards = 13;

  afterUpdate(() => {
    guards = coupon.reduce((acc, element) => acc + element.length, 0);
  });

  async function getUsers() {
    db.collection("participants")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data().names)[0];
        tippers = data;
      });
  }

  function handleUpdateCouponRow(event) {
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

  getUsers();
</script>

<div class="guards-div">
  {#if guards > normalGuards}
    <h2>{"Fler garderingar vi brukar ha"}</h2>
  {:else if guards < normalGuards}
    <h2>{"Färre garderingar vi brukar ha"}</h2>
  {/if}
</div>
<table>
  <tr>
    <th>
      <h2>#</h2>
    </th>
    <th>
      <h2>Hemma</h2>
    </th>
    <th>
      <h2>Borta</h2>
    </th>
    <th>
      <select bind:value={currentTipper} class="tipper-select">
        {#each tippers as tipper}
          <option value={tipper}>
            {tipper}
          </option>
        {/each}
      </select>
    </th>
  </tr>
  {#each matchData as match, index}
    <EditMatch
      match={match.match}
      couponRow={coupon[index]}
      {index}
      on:updateCouponRow={handleUpdateCouponRow}
    />
  {/each}
</table>

<style>
  .tipper-select {
    margin: auto;
    font-size: 1em;
    font-weight: 100;
    min-width: 125px;
  }
  .guards-div {
    height: 100px;
    color: #ff3e00;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
